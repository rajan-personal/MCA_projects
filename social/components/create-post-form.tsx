"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ImagePlus, Loader2 } from "lucide-react";
import type { Profile } from "@/lib/db/queries";

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_BYTES = 5 * 1024 * 1024;

type CreatePostFormProps = {
  profile: Profile;
};

export function CreatePostForm({ profile }: CreatePostFormProps) {
  const router = useRouter();
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const previewUrl = useMemo(() => {
    if (!file) {
      return null;
    }

    return URL.createObjectURL(file);
  }, [file]);

  useEffect(() => {
    if (!previewUrl) {
      return;
    }

    return () => URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files?.[0];

    if (!selected) {
      setFile(null);
      return;
    }

    if (!ACCEPTED_TYPES.includes(selected.type)) {
      setError("Please choose a JPEG, PNG, or WebP image.");
      return;
    }

    if (selected.size > MAX_BYTES) {
      setError("Image must be 5MB or smaller.");
      return;
    }

    setError(null);
    setFile(selected);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!file) {
      setError("Add an image to share a post.");
      return;
    }

    setError(null);

    startTransition(async () => {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("caption", caption);

      const response = await fetch("/api/posts", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null);
        setError(result?.error ?? "Unable to publish the post.");
        return;
      }

      setCaption("");
      setFile(null);
      router.refresh();
    });
  }

  return (
    <section id="create" className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
      <header className="mb-4 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-zinc-100">
          {profile.avatarUrl ? (
            <Image
              src={profile.avatarUrl}
              alt={profile.username}
              width={48}
              height={48}
              className="h-12 w-12 object-cover"
            />
          ) : (
            <span className="text-sm font-semibold uppercase">{profile.username.slice(0, 2)}</span>
          )}
        </div>
        <div>
          <p className="font-semibold">Share something new</p>
          <p className="text-sm text-zinc-500">Add an image and a short caption.</p>
        </div>
      </header>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-zinc-300 p-6 text-sm text-zinc-500 hover:border-zinc-400">
          {previewUrl ? (
            <Image
              src={previewUrl}
              alt="Selected"
              width={400}
              height={400}
              className="h-48 w-full rounded-md object-cover"
              unoptimized
            />
          ) : (
            <>
              <ImagePlus className="h-8 w-8" />
              <span>Click to upload</span>
            </>
          )}
          <input type="file" name="image" accept="image/*" className="hidden" onChange={handleFileChange} />
        </label>
        <textarea
          name="caption"
          value={caption}
          onChange={event => setCaption(event.target.value)}
          placeholder="Write a caption..."
          rows={3}
          className="w-full resize-none rounded-md border border-zinc-300 bg-white p-3 text-sm focus:border-black focus:outline-none"
        />
        {error ? <p className="text-sm text-red-500">{error}</p> : null}
        <button
          type="submit"
          disabled={isPending || !file}
          className="flex w-full items-center justify-center gap-2 rounded-md bg-black py-2 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:bg-zinc-400"
        >
          {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          Share
        </button>
      </form>
    </section>
  );
}
