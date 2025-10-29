import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { SignupForm } from "@/components/auth/signup-form";

export default async function SignupPage() {
  const incomingHeaders = new Headers(await headers());
  const session = await auth.api.getSession({
    headers: incomingHeaders,
  });

  if (session?.user) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-zinc-50 to-white px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <Link href="/" className="text-3xl font-semibold tracking-tight text-zinc-900">
            Prismgram
          </Link>
          <p className="mt-2 text-sm text-zinc-500">Create an account to start sharing</p>
        </div>
        <SignupForm />
      </div>
    </div>
  );
}
