import { and, desc, eq, inArray, ne, sql } from "drizzle-orm";
import { db, schema } from "./index";
import type { InferSelectModel } from "drizzle-orm";

const { profiles, posts, postLikes, postComments } = schema;

export type Profile = InferSelectModel<typeof profiles>;
export type Post = InferSelectModel<typeof posts>;
export type Comment = InferSelectModel<typeof postComments>;

export type FeedComment = {
  id: number;
  postId: number;
  content: string;
  createdAt: Date;
  author: Profile | null;
};

export type FeedPost = {
  post: Post;
  author: Profile | null;
  likeCount: number;
  commentCount: number;
  viewerHasLiked: boolean;
  recentComments: FeedComment[];
};

const USERNAME_FALLBACK = "user";
const MAX_USERNAME_ATTEMPTS = 10;
const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;

function slugifyUsername(input: string) {
  const slug = input
    .toLowerCase()
    .replace(/[^a-z0-9_]+/g, "")
    .replace(/_{2,}/g, "_")
    .replace(/^_+|_+$/g, "");
  return slug || USERNAME_FALLBACK;
}

export async function ensureProfileForUser(params: {
  userId: string;
  name?: string | null;
  email?: string | null;
}) {
  const existing = await db.query.profiles.findFirst({
    where: eq(profiles.userId, params.userId),
  });

  if (existing) {
    return existing;
  }

  const seedFromName = params.name?.trim();
  const seedFromEmail = params.email?.split("@")[0];
  const base = slugifyUsername(seedFromName || seedFromEmail || USERNAME_FALLBACK);

  let candidate = base;
  let attempt = 0;

  while (attempt < MAX_USERNAME_ATTEMPTS) {
    const clash = await db.query.profiles.findFirst({
      where: eq(profiles.username, candidate),
    });

    if (!clash) {
      const [created] = await db
        .insert(profiles)
        .values({
          userId: params.userId,
          username: candidate,
          displayName: params.name || seedFromEmail || USERNAME_FALLBACK,
        })
        .returning();

      return created;
    }

    attempt += 1;
    candidate = `${base}${attempt}`;
  }

  const fallback = `${base}${Date.now().toString(36)}`;
  const [created] = await db
    .insert(profiles)
    .values({
      userId: params.userId,
      username: fallback,
      displayName: params.name || seedFromEmail || USERNAME_FALLBACK,
    })
    .returning();

  return created;
}

export async function getProfileByUserId(userId: string) {
  return db.query.profiles.findFirst({
    where: eq(profiles.userId, userId),
  });
}

export async function getProfileByUsername(username: string) {
  return db.query.profiles.findFirst({
    where: eq(profiles.username, username),
  });
}

export async function updateProfile(userId: string, data: {
  username: string;
  displayName?: string | null;
  bio?: string | null;
  avatarUrl?: string | null;
}) {
  const cleanedUsername = slugifyUsername(data.username);

  const existingWithUsername = await db.query.profiles.findFirst({
    where: and(
      eq(profiles.username, cleanedUsername),
      ne(profiles.userId, userId),
    ),
  });

  if (existingWithUsername) {
    throw new Error("Username is already taken");
  }

  const [updated] = await db
    .update(profiles)
    .set({
      username: cleanedUsername,
      displayName: data.displayName?.trim() || null,
      bio: data.bio?.trim() || null,
      avatarUrl: data.avatarUrl || null,
      updatedAt: new Date(),
    })
    .where(eq(profiles.userId, userId))
    .returning();

  return updated;
}

export async function createPost(input: {
  userId: string;
  imageUrl: string;
  caption?: string | null;
  visibility?: (typeof schema.postVisibility.enumValues)[number];
}) {
  await ensureProfileForUser({ userId: input.userId });

  const [created] = await db
    .insert(posts)
    .values({
      userId: input.userId,
      imageUrl: input.imageUrl,
      caption: input.caption?.trim() || null,
      visibility: input.visibility ?? "public",
    })
    .returning();

  return created;
}

export async function toggleLike(postId: number, userId: string) {
  const existing = await db
    .select({ postId: postLikes.postId })
    .from(postLikes)
    .where(and(eq(postLikes.postId, postId), eq(postLikes.userId, userId)))
    .limit(1);

  if (existing.length) {
    await db
      .delete(postLikes)
      .where(and(eq(postLikes.postId, postId), eq(postLikes.userId, userId)));
  } else {
    await db
      .insert(postLikes)
      .values({ postId, userId })
      .onConflictDoNothing();
  }

  const [{ count }] = await db
    .select({ count: sql<number>`count(*)`.mapWith(Number) })
    .from(postLikes)
    .where(eq(postLikes.postId, postId));

  return {
    liked: !existing.length,
    likeCount: Number(count),
  };
}

export async function addComment(input: {
  postId: number;
  userId: string;
  content: string;
}) {
  await ensureProfileForUser({ userId: input.userId });

  const trimmed = input.content.trim();
  if (!trimmed) {
    throw new Error("Comment cannot be empty");
  }

  const [created] = await db
    .insert(postComments)
    .values({
      postId: input.postId,
      userId: input.userId,
      content: trimmed,
    })
    .returning();

  const author = await getProfileByUserId(input.userId);

  return {
    comment: created,
    author,
  };
}

export async function getFeedPosts(viewerId: string, limit = 20) {
  const base = await db
    .select({
      post: posts,
      author: profiles,
    })
    .from(posts)
    .leftJoin(profiles, eq(posts.userId, profiles.userId))
    .orderBy(desc(posts.createdAt))
    .limit(limit);

  const postIds = base.map(item => item.post.id);

  if (postIds.length === 0) {
    return [] as FeedPost[];
  }

  const likeRows = await db
    .select({
      postId: postLikes.postId,
      count: sql<number>`count(*)`.mapWith(Number),
    })
    .from(postLikes)
    .where(inArray(postLikes.postId, postIds))
    .groupBy(postLikes.postId);

  const commentRows = await db
    .select({
      postId: postComments.postId,
      count: sql<number>`count(*)`.mapWith(Number),
    })
    .from(postComments)
    .where(inArray(postComments.postId, postIds))
    .groupBy(postComments.postId);

  const viewerLikes = await db
    .select({ postId: postLikes.postId })
    .from(postLikes)
    .where(and(eq(postLikes.userId, viewerId), inArray(postLikes.postId, postIds)));

  const comments = await db
    .select({
      comment: postComments,
      author: profiles,
    })
    .from(postComments)
    .leftJoin(profiles, eq(postComments.userId, profiles.userId))
    .where(inArray(postComments.postId, postIds))
    .orderBy(desc(postComments.createdAt));

  const likeMap = new Map<number, number>();
  for (const row of likeRows) {
    likeMap.set(row.postId, Number(row.count));
  }

  const commentMap = new Map<number, number>();
  for (const row of commentRows) {
    commentMap.set(row.postId, Number(row.count));
  }

  const viewerLikeSet = new Set(viewerLikes.map(row => row.postId));

  const groupedComments = new Map<number, FeedComment[]>();
  for (const row of comments) {
    const collection = groupedComments.get(row.comment.postId) ?? [];
    if (collection.length < 2) {
      collection.push({
        id: row.comment.id,
        postId: row.comment.postId,
        content: row.comment.content,
        createdAt: row.comment.createdAt,
        author: row.author,
      });
      groupedComments.set(row.comment.postId, collection);
    }
  }

  return base.map(item => ({
    post: item.post,
    author: item.author,
    likeCount: likeMap.get(item.post.id) ?? 0,
    commentCount: commentMap.get(item.post.id) ?? 0,
    viewerHasLiked: viewerLikeSet.has(item.post.id),
    recentComments: groupedComments.get(item.post.id) ?? [],
  }));
}

export async function getPostsForUser(userId: string, viewerId: string) {
  const base = await db
    .select({
      post: posts,
      author: profiles,
    })
    .from(posts)
    .leftJoin(profiles, eq(posts.userId, profiles.userId))
    .where(eq(posts.userId, userId))
    .orderBy(desc(posts.createdAt));

  if (base.length === 0) {
    return [] as FeedPost[];
  }

  const postIds = base.map(item => item.post.id);

  const likeRows = await db
    .select({
      postId: postLikes.postId,
      count: sql<number>`count(*)`.mapWith(Number),
    })
    .from(postLikes)
    .where(inArray(postLikes.postId, postIds))
    .groupBy(postLikes.postId);

  const commentRows = await db
    .select({
      postId: postComments.postId,
      count: sql<number>`count(*)`.mapWith(Number),
    })
    .from(postComments)
    .where(inArray(postComments.postId, postIds))
    .groupBy(postComments.postId);

  const viewerLikes = await db
    .select({ postId: postLikes.postId })
    .from(postLikes)
    .where(and(eq(postLikes.userId, viewerId), inArray(postLikes.postId, postIds)));

  const groupedComments: Map<number, FeedComment[]> = new Map();

  const likeMap = new Map<number, number>();
  for (const row of likeRows) {
    likeMap.set(row.postId, Number(row.count));
  }

  const commentMap = new Map<number, number>();
  for (const row of commentRows) {
    commentMap.set(row.postId, Number(row.count));
  }

  const viewerLikeSet = new Set(viewerLikes.map(row => row.postId));

  return base.map(item => ({
    post: item.post,
    author: item.author,
    likeCount: likeMap.get(item.post.id) ?? 0,
    commentCount: commentMap.get(item.post.id) ?? 0,
    viewerHasLiked: viewerLikeSet.has(item.post.id),
    recentComments: groupedComments.get(item.post.id) ?? [],
  }));
}

export function validateImage(file: File) {
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    throw new Error("Unsupported image format");
  }

  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    throw new Error("Image is larger than 5MB");
  }
}

export type ProfilePageData = {
  profile: Profile;
  posts: FeedPost[];
  stats: {
    posts: number;
    likes: number;
  };
  viewerOwnsProfile: boolean;
};

export async function getProfilePageData(username: string, viewerId: string) {
  const profile = await getProfileByUsername(username);

  if (!profile) {
    return null;
  }

  const postsForUser = await getPostsForUser(profile.userId, viewerId);
  const totalLikes = postsForUser.reduce((acc, item) => acc + item.likeCount, 0);

  return {
    profile,
    posts: postsForUser,
    stats: {
      posts: postsForUser.length,
      likes: totalLikes,
    },
    viewerOwnsProfile: profile.userId === viewerId,
  } satisfies ProfilePageData;
}
