import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import {
  ensureProfileForUser,
  getProfilePageData,
} from "@/lib/db/queries";
import { NavBar } from "@/components/nav-bar";

function formatStat(value: number) {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  }

  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1)}K`;
  }

  return value.toString();
}

type ProfilePageProps = {
  params: Promise<{ username: string }>;
};

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params;

  const incomingHeaders = new Headers(await headers());
  const session = await auth.api.getSession({
    headers: incomingHeaders,
  });

  if (!session?.user) {
    redirect("/login");
  }

  const viewerProfile = await ensureProfileForUser({
    userId: session.user.id,
    name: session.user.name,
    email: session.user.email,
  });

  const profilePage = await getProfilePageData(username, session.user.id);

  if (!profilePage) {
    notFound();
  }

  const { profile, posts, stats, viewerOwnsProfile } = profilePage;

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <NavBar profile={viewerProfile} />
      <main className="mx-auto w-full max-w-4xl px-4 py-10">
        <section className="mb-10 flex flex-col gap-8 md:flex-row md:items-center md:justify-start">
          <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-zinc-100 md:h-36 md:w-36">
            {profile.avatarUrl ? (
              <Image
                src={profile.avatarUrl}
                alt={profile.username}
                width={144}
                height={144}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-xl font-semibold uppercase">
                {profile.username.slice(0, 2)}
              </span>
            )}
          </div>
          <div className="flex-1 space-y-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
              <h1 className="text-2xl font-semibold">{profile.username}</h1>
              {viewerOwnsProfile ? (
                <Link
                  href="/profile"
                  className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:border-zinc-400"
                >
                  Edit Profile
                </Link>
              ) : null}
            </div>
            <ul className="flex gap-6 text-sm text-zinc-600">
              <li>
                <span className="font-semibold text-zinc-900">{stats.posts}</span> posts
              </li>
              <li>
                <span className="font-semibold text-zinc-900">{formatStat(stats.likes)}</span> likes
              </li>
            </ul>
            {profile.displayName ? (
              <p className="font-semibold text-zinc-900">{profile.displayName}</p>
            ) : null}
            {profile.bio ? <p className="max-w-xl text-sm text-zinc-600">{profile.bio}</p> : null}
          </div>
        </section>

        <section className="border-t border-zinc-200 pt-8">
          {posts.length ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
              {posts.map(item => (
                <div key={item.post.id} className="group relative overflow-hidden rounded-lg bg-zinc-100">
                  <Image
                    src={item.post.imageUrl}
                    alt={item.post.caption ?? "Post"}
                    width={400}
                    height={400}
                    className="h-full w-full object-cover transition group-hover:scale-105"
                  />
                  <div className="absolute inset-0 hidden items-center justify-center gap-4 bg-black/40 text-white group-hover:flex">
                    <span className="flex items-center gap-2 text-sm font-semibold">
                      ❤️ {item.likeCount}
                    </span>
                    <span className="flex items-center gap-2 text-sm font-semibold">
                      💬 {item.commentCount}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-zinc-300 bg-white p-16 text-center text-sm text-zinc-500">
              No posts yet.
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
