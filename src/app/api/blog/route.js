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
            image: postData.image
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

export async function GET(req) {
    try {
        await connectMongoDB();
        console.log("DB Connected")

        const getPosts = await PostModel.find();


         return NextResponse.json(
            getPosts,
            { status: 200 }
        );
        
        
    } catch (error) {
        console.error("Error fetching post:", error);
        return NextResponse.json(
            { message: "Error fetching blog post", error: error.message },
            { status: 500 }
        );
    }
}