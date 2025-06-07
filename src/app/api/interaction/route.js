import { NextResponse } from "next/server";
import { connectMongoDB } from "@/libs/config/db";
import PostModel from "@/libs/models/Post";

export async function POST(req) {
  try {
    const { user, text, postId, like, tag } = await req.json();
    await connectMongoDB();

    if (tag === "Comments") {
      const newComment = {
        user,
        text,
        createdAt: new Date(),
      };

      const updatedPost = await PostModel.findByIdAndUpdate(
        postId,
        { $push: { comments: newComment } },
        { new: true }
      );

      return NextResponse.json(
        {
          message: "Comment Added",
          comments: updatedPost.comments,
        },
        { status: 201 }
      );
    }

    if (tag === "Likes") {
      const update = like ? { $inc: { likes: 1 } } : { $inc: { likes: -1 } };

      const updatedPost = await PostModel.findByIdAndUpdate(postId, update, {
        new: true,
      });

      return NextResponse.json(
        {
          message: "Like Updated",
          likes: updatedPost.likes,
        },
        { status: 201 }
      );
    }

    return NextResponse.json({ message: "Invalid tag" }, { status: 400 });
  } catch (error) {
    console.error("Error: ", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("postId");

    if (!postId) {
      return NextResponse.json(
        { message: "postId is required" },
        { status: 400 }
      );
    }

    await connectMongoDB();
    const post = await PostModel.findById(postId).select("comments");

    return NextResponse.json({ comments: post.comments }, { status: 200 });
  } catch (error) {
    console.error("Error: ", error);
    return NextResponse.json(
      { message: "Error fetching comments" },
      { status: 500 }
    );
  }
}
