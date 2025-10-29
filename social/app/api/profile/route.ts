import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { ensureProfileForUser, updateProfile } from "@/lib/db/queries";

const profileSchema = z.object({
  username: z.string().min(3).max(30),
  displayName: z.string().max(60).optional().nullable(),
  bio: z.string().max(160).optional().nullable(),
});

export async function PUT(request: Request) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = profileSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid profile data" }, { status: 400 });
  }

  const profile = await ensureProfileForUser({
    userId: session.user.id,
    name: session.user.name,
    email: session.user.email,
  });

  try {
    const updated = await updateProfile(session.user.id, parsed.data);
    revalidatePath("/");
    revalidatePath(`/users/${updated.username}`);

    if (updated.username !== profile.username) {
      revalidatePath(`/users/${profile.username}`);
    }

    return NextResponse.json({ profile: updated });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to update profile";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
