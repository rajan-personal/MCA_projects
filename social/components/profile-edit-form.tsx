"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { Profile } from "@/lib/db/queries";

type ProfileEditFormProps = {
  profile: Profile;
};

export function ProfileEditForm({ profile }: ProfileEditFormProps) {
  const router = useRouter();
  const [username, setUsername] = useState(profile.username);
  const [displayName, setDisplayName] = useState(profile.displayName ?? "");
  const [bio, setBio] = useState(profile.bio ?? "");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    startTransition(async () => {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          displayName,
          bio,
        }),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null);
        setError(result?.error ?? "Unable to update profile");
        return;
      }

      const result = await response.json();
      router.push(`/users/${result.profile.username}`);
      router.refresh();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error ? (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
      ) : null}

      <div className="space-y-2">
        <label htmlFor="username" className="block text-sm font-medium text-zinc-700">
          Username
        </label>
        <input
          id="username"
          value={username}
          onChange={event => setUsername(event.target.value)}
          required
          minLength={3}
          maxLength={30}
          className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
        />
        <p className="text-xs text-zinc-500">Lowercase letters, numbers, and underscores only.</p>
      </div>

      <div className="space-y-2">
        <label htmlFor="displayName" className="block text-sm font-medium text-zinc-700">
          Display name
        </label>
        <input
          id="displayName"
          value={displayName}
          onChange={event => setDisplayName(event.target.value)}
          maxLength={60}
          className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="bio" className="block text-sm font-medium text-zinc-700">
          Bio
        </label>
        <textarea
          id="bio"
          value={bio}
          onChange={event => setBio(event.target.value)}
          rows={4}
          maxLength={160}
          className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
        />
        <p className="text-xs text-zinc-500">Short description visible on your profile.</p>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-md bg-black py-2 text-sm font-semibold text-white transition disabled:opacity-50"
      >
        {isPending ? "Saving..." : "Save changes"}
      </button>
    </form>
  );
}
