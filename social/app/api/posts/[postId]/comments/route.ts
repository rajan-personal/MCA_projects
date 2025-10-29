import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/lib/auth";
import {
  addComment,
  ensureProfileForUser,
  type FeedComment,
} from "@/lib/db/queries";

const commentSchema = z.object({
  content: z.string().min(1).max(500),
});

export async function POST(
  request: Request,
  context: { params: Promise<{ postId: string }> },
) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { postId: routePostId } = await context.params;
  const postId = Number(routePostId);

  if (Number.isNaN(postId)) {
    return NextResponse.json({ error: "Invalid post id" }, { status: 400 });
  }

  const payload = await request.json().catch(() => null);
  const parsed = commentSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: "Comment must be between 1 and 500 characters" }, { status: 400 });
  }

  const { comment, author } = await addComment({
    postId,
    userId: session.user.id,
    content: parsed.data.content,
  });

  const viewerProfile = await ensureProfileForUser({ userId: session.user.id });

  const response: { comment: FeedComment } = {
    comment: {
      id: comment.id,
      postId: comment.postId,
      content: comment.content,
      createdAt: comment.createdAt,
  author: author ?? null,
    },
  };

  revalidatePath("/");
  revalidatePath(`/users/${viewerProfile.username}`);

  return NextResponse.json(response);
}
