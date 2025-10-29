import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { ensureProfileForUser, getFeedPosts } from "@/lib/db/queries";
import { NavBar } from "@/components/nav-bar";
import { CreatePostForm } from "@/components/create-post-form";
import { PostCard } from "@/components/post-card";

export default async function Home() {
  const incomingHeadersList = await headers();
  const incomingHeaders = new Headers(incomingHeadersList);
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

  const posts = await getFeedPosts(session.user.id);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <NavBar profile={profile} />
      <main className="mx-auto flex w-full max-w-5xl gap-10 px-4 py-8 lg:px-0">
        <section className="flex-1 space-y-6">
          <CreatePostForm profile={profile} />
          <div className="space-y-6">
            {posts.length ? (
              posts.map(post => <PostCard key={post.post.id} data={post} />)
            ) : (
              <div className="rounded-lg border border-dashed border-zinc-300 bg-white p-8 text-center text-sm text-zinc-500">
                Follow friends and share your first photo to see your feed.
              </div>
            )}
          </div>
        </section>
        <aside className="hidden w-72 shrink-0 lg:block">
          <div className="sticky top-24 space-y-4">
            <div className="rounded-lg border border-zinc-200 bg-white p-5 text-sm text-zinc-600">
              <p className="text-base font-semibold text-zinc-900">
                Welcome back, {profile.displayName ?? profile.username}
              </p>
              <p className="mt-2 leading-relaxed">
                Capture your favorite moments and explore what friends are up to.
              </p>
            </div>
            <div className="rounded-lg border border-zinc-200 bg-white p-5 text-sm text-zinc-600">
              <p className="text-xs uppercase tracking-widest text-zinc-400">Tips</p>
              <ul className="mt-3 space-y-2">
                <li>Use square images (1080px) for the best look.</li>
                <li>Add captions to share the story behind each post.</li>
                <li>Engage with friends through likes and comments.</li>
              </ul>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
