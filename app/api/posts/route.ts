import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";

// Create a new post
export async function POST(request: Request) {
  const session = await auth();
  const userId = session.userId;
  const user = await currentUser();

  if (!userId || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    await prisma.user.upsert({
      where: { id: userId },
      create: {
        id: userId,
        email: user.emailAddresses[0].emailAddress,
        name: `${user.firstName} ${user.lastName}`.trim(),
        imageUrl: user.imageUrl,
      },
      update: {
        email: user.emailAddresses[0].emailAddress,
        name: `${user.firstName} ${user.lastName}`.trim(),
        imageUrl: user.imageUrl,
      },
    });

    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        published: body.published || false,
        authorId: userId,
      },
      include: {
        author: true,
      },
    });
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("Failed to create post:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: true,
      },
    });
    return NextResponse.json(posts);
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to fetch posts", e },
      { status: 500 }
    );
  }
}
