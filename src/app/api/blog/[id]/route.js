import { NextResponse } from "next/server";
import { connectMongoDB } from "@/libs/config/db";
import PostModel from "@/libs/models/Post";

export async function GET(request, context) {
  const { id } = await context.params;

  try {
    await connectMongoDB();
    const post = await PostModel.findById(id);

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching post", error: error.message },
      { status: 500 }
    );
  }
}

