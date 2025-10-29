import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { join } from "path";
import { auth } from "@/lib/auth";
import {
  createPost,
  ensureProfileForUser,
  validateImage,
} from "@/lib/db/queries";

export async function POST(request: Request) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("image");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Image is required" }, { status: 400 });
  }

  try {
    validateImage(file);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid image";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  const captionInput = formData.get("caption");
  const caption = typeof captionInput === "string" ? captionInput : null;

  const uploadDir = join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const extension = file.type.split("/")[1] ?? "jpg";
  const fileName = `${Date.now()}-${session.user.id}-${randomUUID()}.${extension}`;
  const filePath = join(uploadDir, fileName);
  await writeFile(filePath, buffer);

  const profile = await ensureProfileForUser({
    userId: session.user.id,
    name: session.user.name,
    email: session.user.email,
  });

  const post = await createPost({
    userId: session.user.id,
    imageUrl: `/uploads/${fileName}`,
    caption,
  });

  revalidatePath("/");
  revalidatePath(`/users/${profile.username}`);

  return NextResponse.json({ post });
}
