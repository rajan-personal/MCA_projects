import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { CreatePostForm } from "../create-post-form";
import type { Profile } from "@/lib/db/queries";
import { afterAll, afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const baseProfile: Profile = {
  id: 1,
  userId: "user-1",
  username: "tester",
  displayName: "Tester",
  bio: null,
  avatarUrl: null,
  createdAt: new Date("2024-01-01T00:00:00.000Z"),
  updatedAt: new Date("2024-01-01T00:00:00.000Z"),
};

const refreshMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: refreshMock,
  }),
}));

const originalCreateObjectURL = global.URL.createObjectURL;
const originalRevokeObjectURL = global.URL.revokeObjectURL;
const originalFetch = global.fetch;

describe("CreatePostForm", () => {
  beforeEach(() => {
    refreshMock.mockReset();
    Object.defineProperty(global.URL, "createObjectURL", {
      configurable: true,
      writable: true,
      value: vi.fn(() => "blob:preview"),
    });
    Object.defineProperty(global.URL, "revokeObjectURL", {
      configurable: true,
      writable: true,
      value: vi.fn(),
    });
    global.fetch = vi.fn() as unknown as typeof fetch;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  afterAll(() => {
    if (originalCreateObjectURL) {
      Object.defineProperty(global.URL, "createObjectURL", {
        configurable: true,
        writable: true,
        value: originalCreateObjectURL,
      });
    } else {
      delete ((global.URL as unknown) as { createObjectURL?: typeof originalCreateObjectURL }).createObjectURL;
    }

    if (originalRevokeObjectURL) {
      Object.defineProperty(global.URL, "revokeObjectURL", {
        configurable: true,
        writable: true,
        value: originalRevokeObjectURL,
      });
    } else {
      delete ((global.URL as unknown) as { revokeObjectURL?: typeof originalRevokeObjectURL }).revokeObjectURL;
    }

    if (originalFetch) {
      global.fetch = originalFetch;
    } else {
      delete (global as { fetch?: typeof fetch }).fetch;
    }
  });

  it("shows an error when submitting without selecting an image", async () => {
    const { container } = render(<CreatePostForm profile={baseProfile} />);

    const form = container.querySelector("form");
    expect(form).toBeTruthy();

    fireEvent.submit(form!);

    expect(await screen.findByText("Add an image to share a post.")).toBeInTheDocument();
  });

  it("rejects files that are not supported image types", async () => {
  render(<CreatePostForm profile={baseProfile} />);

    const fileInput = screen.getByLabelText("Click to upload") as HTMLInputElement;
    const invalidFile = new File(["content"], "sample.gif", { type: "image/gif" });

    fireEvent.change(fileInput, { target: { files: [invalidFile] } });

    expect(await screen.findByText("Please choose a JPEG, PNG, or WebP image.")).toBeInTheDocument();
  });

  it("submits the form and resets the fields on success", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({}),
    });
    global.fetch = fetchMock as unknown as typeof fetch;

  const { container } = render(<CreatePostForm profile={baseProfile} />);

  const fileInput = screen.getByLabelText("Click to upload") as HTMLInputElement;
  const textarea = screen.getByPlaceholderText("Write a caption...") as HTMLTextAreaElement;

    const validFile = new File(["hello"], "picture.png", { type: "image/png" });
    Object.defineProperty(validFile, "size", { value: 1024 * 100, configurable: true });

    fireEvent.change(fileInput, { target: { files: [validFile] } });
    fireEvent.change(textarea, { target: { value: "Great day!" } });

  const form = container.querySelector("form");
    fireEvent.submit(form!);

    await waitFor(() => expect(fetchMock).toHaveBeenCalled());
    expect(textarea.value).toBe("");
    expect(refreshMock).toHaveBeenCalled();
  });
});
