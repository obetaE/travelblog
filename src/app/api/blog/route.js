import { NextResponse } from "next/server";
import { connectMongoDB } from "@/libs/config/db";
import PostModel from "@/libs/models/Post";

export async function POST(req) {
    try {
        // Get the FULL postData from request body
        const postData = await req.json();
        
        console.log("Received post data:", postData);

        await connectMongoDB();
        console.log("DB Connected")

        // Create post with CORRECT FIELDS
        await PostModel.create({
            title: postData.title,
            desc: postData.desc,
            category: postData.category,
            readTime: postData.readTime,
            image: postData.image,
            comments: [], // Initialize empty array
            likes: 0      // Initialize likes
        });

        return NextResponse.json(
            { message: "Blog post created successfully" },
            { status: 201 }
        );
        
    } catch (error) {
        console.error("Error creating post:", error);
        return NextResponse.json(
            { message: "Error creating blog post", error: error.message },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        await connectMongoDB();
        const posts = await PostModel.find().sort({ createdAt: -1 });
        return NextResponse.json(posts, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Error fetching posts", error: error.message },
            { status: 500 }
        );
    }
}

export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        
        await connectMongoDB();
        await PostModel.findByIdAndDelete(id);
        
        return NextResponse.json(
            { message: "Post deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Error deleting post", error: error.message },
            { status: 500 }
        );
    }
}