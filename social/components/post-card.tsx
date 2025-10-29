"use client";

import { useMemo, useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Loader2, MessageCircle } from "lucide-react";
import type { FeedComment, FeedPost } from "@/lib/db/queries";
import { cn } from "@/lib/utils";

function formatTimeAgo(date: Date) {
  const diffMs = Date.now() - date.getTime();
  const diffSeconds = Math.round(diffMs / 1000);

  if (diffSeconds < 60) return `${diffSeconds}s ago`;

  const diffMinutes = Math.round(diffSeconds / 60);
  if (diffMinutes < 60) return `${diffMinutes}m ago`;

  const diffHours = Math.round(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h ago`;

  const diffDays = Math.round(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d ago`;

  const diffWeeks = Math.round(diffDays / 7);
  if (diffWeeks < 4) return `${diffWeeks}w ago`;

  const diffMonths = Math.round(diffDays / 30);
  if (diffMonths < 12) return `${diffMonths}mo ago`;

  const diffYears = Math.round(diffDays / 365);
  return `${diffYears}y ago`;
}

type PostCardProps = {
  data: FeedPost;
};

export function PostCard({ data }: PostCardProps) {
  const [isLiking, startLikeTransition] = useTransition();
  const [isCommenting, startCommentTransition] = useTransition();
  const [likeCount, setLikeCount] = useState(data.likeCount);
  const [viewerHasLiked, setViewerHasLiked] = useState(data.viewerHasLiked);
  const [comments, setComments] = useState<FeedComment[]>(data.recentComments);
  const [commentText, setCommentText] = useState("");
  const [error, setError] = useState<string | null>(null);

  const commentPlaceholder = useMemo(() => {
    if (data.commentCount === 0) {
      return "Add a comment...";
    }

    if (comments.length < data.commentCount) {
      return `View all ${data.commentCount} comments`;
    }

    return "Join the conversation";
  }, [data.commentCount, comments.length]);

  async function toggleLike() {
    startLikeTransition(async () => {
      const response = await fetch(`/api/posts/${data.post.id}/like`, {
        method: "POST",
      });

      if (!response.ok) {
        return;
      }

      const result = (await response.json()) as { liked: boolean; likeCount: number };
      setViewerHasLiked(result.liked);
      setLikeCount(result.likeCount);
    });
  }

  async function submitComment(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!commentText.trim()) {
      return;
    }

    setError(null);

    startCommentTransition(async () => {
      const response = await fetch(`/api/posts/${data.post.id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: commentText }),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null);
        setError(result?.error ?? "Unable to add comment.");
        return;
      }

      const result = (await response.json()) as {
        comment: FeedComment;
      };

      setComments(current => [result.comment, ...current].slice(0, 2));
      setCommentText("");
    });
  }

  const authorUsername = data.author?.username ?? "unknown";

  return (
    <article className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm">
      <header className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-zinc-100">
            {data.author?.avatarUrl ? (
              <Image
                src={data.author.avatarUrl}
                alt={authorUsername}
                width={36}
                height={36}
                className="h-9 w-9 object-cover"
              />
            ) : (
              <span className="text-xs font-semibold uppercase">{authorUsername.slice(0, 2)}</span>
            )}
          </div>
          <div>
            <Link href={`/users/${authorUsername}`} className="text-sm font-semibold">
              {authorUsername}
            </Link>
            <p className="text-xs text-zinc-500">{formatTimeAgo(new Date(data.post.createdAt))}</p>
          </div>
        </div>
      </header>

      <div className="relative aspect-square w-full bg-zinc-100">
        <Image
          src={data.post.imageUrl}
          alt={data.post.caption ?? "Post"}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 600px"
        />
      </div>

      <footer className="space-y-3 px-4 py-3">
        <div className="flex items-center gap-4 text-zinc-700">
          <button
            type="button"
            onClick={toggleLike}
            disabled={isLiking}
            className={cn(
              "flex items-center gap-2 text-sm font-medium",
              viewerHasLiked ? "text-red-500" : "hover:text-black",
            )}
          >
            {isLiking ? <Loader2 className="h-4 w-4 animate-spin" /> : <Heart className="h-5 w-5" fill={viewerHasLiked ? "currentColor" : "none"} />}
            {likeCount} likes
          </button>
          <span className="flex items-center gap-2 text-sm text-zinc-500">
            <MessageCircle className="h-4 w-4" />
            {data.commentCount} comments
          </span>
        </div>

        {data.post.caption ? (
          <p className="text-sm">
            <span className="mr-1 font-semibold">{authorUsername}</span>
            {data.post.caption}
          </p>
        ) : null}

        <div className="space-y-2 text-sm text-zinc-600">
          {comments.map(comment => (
            <p key={comment.id}>
              <Link href={`/users/${comment.author?.username ?? authorUsername}`} className="mr-1 font-semibold">
                {comment.author?.username ?? authorUsername}
              </Link>
              {comment.content}
            </p>
          ))}
          {comments.length < data.commentCount ? (
            <p className="text-xs text-zinc-500">{commentPlaceholder}</p>
          ) : null}
        </div>

        <form onSubmit={submitComment} className="flex items-center gap-2">
          <input
            type="text"
            value={commentText}
            onChange={event => setCommentText(event.target.value)}
            placeholder="Add a comment..."
            className="flex-1 rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
          />
          <button
            type="submit"
            disabled={isCommenting || !commentText.trim()}
            className="rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-blue-600 transition disabled:text-zinc-400"
          >
            {isCommenting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Post"}
          </button>
        </form>
        {error ? <p className="text-sm text-red-500">{error}</p> : null}
      </footer>
    </article>
  );
}
