import Image from "next/image";
import Link from "next/link";
import { Home, PlusSquare, User } from "lucide-react";
import type { Profile } from "@/lib/db/queries";
import { SignOutButton } from "./sign-out-button";

type NavBarProps = {
  profile: Profile | null;
};

export function NavBar({ profile }: NavBarProps) {
  return (
  <header className="border-b border-zinc-200 bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/75">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-4">
        <Link href="/" className="text-2xl font-semibold tracking-tight">
          Prismgram
        </Link>
        <nav className="flex items-center gap-4 text-zinc-700">
          <Link href="/" aria-label="Home" className="hover:text-black">
            <Home className="h-5 w-5" />
          </Link>
          <Link href="/#create" aria-label="Create post" className="hover:text-black">
            <PlusSquare className="h-5 w-5" />
          </Link>
          <Link
            href={profile ? `/users/${profile.username}` : "/profile"}
            aria-label="Profile"
            className="flex items-center gap-2 hover:text-black"
          >
            {profile?.avatarUrl ? (
              <Image
                src={profile.avatarUrl}
                alt={profile.username}
                width={32}
                height={32}
                className="h-8 w-8 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 text-sm font-medium">
                <User className="h-4 w-4" />
              </div>
            )}
          </Link>
          <SignOutButton />
        </nav>
      </div>
    </header>
  );
}
