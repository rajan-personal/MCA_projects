import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { ensureProfileForUser } from "@/lib/db/queries";
import { NavBar } from "@/components/nav-bar";
import { ProfileEditForm } from "@/components/profile-edit-form";

export default async function ProfileSettingsPage() {
  const incomingHeaders = new Headers(await headers());
  const session = await auth.api.getSession({
    headers: incomingHeaders,
  });

  if (!session?.user) {
    redirect("/login");
  }

  const profile = await ensureProfileForUser({
    userId: session.user.id,
    name: session.user.name,
    email: session.user.email,
  });

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <NavBar profile={profile} />
      <main className="mx-auto w-full max-w-2xl px-4 py-10">
        <header className="mb-8">
          <h1 className="text-2xl font-semibold">Edit profile</h1>
          <p className="mt-2 text-sm text-zinc-500">
            Update your username, display name, and bio as they appear on your public profile.
          </p>
        </header>
        <div className="rounded-xl border border-zinc-200 bg-white p-8 shadow-sm">
          <ProfileEditForm profile={profile} />
        </div>
      </main>
    </div>
  );
}
