import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { ensureProfileForUser, toggleLike } from "@/lib/db/queries";

export async function POST(
  request: Request,
  context: { params: Promise<{ postId: string }> },
) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { postId: routePostId } = await context.params;
  const postId = Number(routePostId);

  if (Number.isNaN(postId)) {
    return NextResponse.json({ error: "Invalid post id" }, { status: 400 });
  }

  const result = await toggleLike(postId, session.user.id);
  const profile = await ensureProfileForUser({
    userId: session.user.id,
  });

  revalidatePath("/");
  revalidatePath(`/users/${profile.username}`);

  return NextResponse.json(result);
}
