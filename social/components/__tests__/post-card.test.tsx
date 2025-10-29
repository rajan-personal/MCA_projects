import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { PostCard } from "../post-card";
import type { FeedComment, FeedPost, Profile } from "@/lib/db/queries";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const authorProfile: Profile = {
  id: 1,
  userId: "user-1",
  username: "tester",
  displayName: "Tester",
  bio: "Bio",
  avatarUrl: null,
  createdAt: new Date("2024-01-01T00:00:00.000Z"),
  updatedAt: new Date("2024-01-01T00:00:00.000Z"),
};

const viewerComment: FeedComment = {
  id: 1,
  postId: 10,
  content: "Nice",
  createdAt: new Date("2024-01-02T00:00:00.000Z"),
  author: authorProfile,
};

const basePost: FeedPost = {
  post: {
    id: 10,
    userId: "user-1",
    imageUrl: "/uploads/sample.jpg",
    caption: "A sunny day",
    visibility: "public",
    createdAt: new Date(Date.now() - 60 * 60 * 1000),
  },
  author: authorProfile,
  likeCount: 5,
  commentCount: 1,
  viewerHasLiked: false,
  recentComments: [viewerComment],
};

const originalFetch = global.fetch;

describe("PostCard", () => {
  beforeEach(() => {
    global.fetch = vi.fn() as unknown as typeof fetch;
  });

  afterEach(() => {
    global.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it("sends a like request and updates the counter", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({ ok: true, json: vi.fn().mockResolvedValue({ liked: true, likeCount: 6 }) });
    global.fetch = fetchMock as unknown as typeof fetch;

    render(<PostCard data={basePost} />);

    const likeButton = screen.getByRole("button", { name: /5 likes/i });
    fireEvent.click(likeButton);

    await waitFor(() => expect(fetchMock).toHaveBeenCalledWith("/api/posts/10/like", { method: "POST" }));
    await waitFor(() => expect(screen.getByRole("button", { name: /6 likes/i })).toBeInTheDocument());
  });

  it("surfaces an error message when comment submission fails", async () => {
    const errorResponse = {
      ok: false,
      json: vi.fn().mockResolvedValue({ error: "Unable" }),
    };
    const fetchMock = vi.fn().mockResolvedValue(errorResponse);
    global.fetch = fetchMock as unknown as typeof fetch;

    render(<PostCard data={basePost} />);

    const input = screen.getByPlaceholderText("Add a comment...");
    fireEvent.change(input, { target: { value: "Great shot" } });

    const form = input.closest("form");
    expect(form).toBeTruthy();
    fireEvent.submit(form!);

    await waitFor(() => expect(fetchMock).toHaveBeenCalledWith("/api/posts/10/comments", expect.any(Object)));
    expect(await screen.findByText("Unable")).toBeInTheDocument();
  });
});
