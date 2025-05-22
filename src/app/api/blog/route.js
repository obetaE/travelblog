import { NextResponse } from "next/server";
import { connectMongoDB } from "@/libs/config/db"
import PostModel from "@/libs/models/Post";

export async function POST(req) {
    try {
        const { fullname, email, password } = await req.json();
        console.log("Name:", fullname);
        console.log("Email:", email);
        console.log("Password:", password);


        await connectMongoDB();
        await PostModel.create({ fullname, email, password: hashedPassword })


        return NextResponse.json({ message: "POST Uploaded" }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: "An Error occured while registering the user" }, { status: 500 });
    }
}