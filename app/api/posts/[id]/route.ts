import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
// import { auth } from "@clerk/nextjs/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: params.id,
      },
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to fetch post", e },
      { status: 500 }
    );
  }
}
