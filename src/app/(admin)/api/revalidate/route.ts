import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { path, tag } = body;

  if (!path && !tag) {
    return NextResponse.json(
      { error: "Either path or tag is required" },
      { status: 400 }
    );
  }

  if (path) {
    console.log(`Revalidating path: ${path}`);
    revalidatePath(path);
  }

  if (tag) {
    console.log(`Revalidating tag: ${tag}`);
    revalidateTag(tag);
  }

  return NextResponse.json({
    revalidated: true,
    now: Date.now(),
    path: path || null,
    tag: tag || null,
  });
}
