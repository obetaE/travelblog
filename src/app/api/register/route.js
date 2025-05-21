import { NextResponse } from "next/server";
import { connectMongoDB } from "@/libs/config/db"
import UserModel from "@/libs/models/UserModel"
import bcrypt from "bcryptjs"

export async function POST(req) {
    try {
        const { fullname, email, password } = await req.json();
        console.log("Name:", fullname);
        console.log("Email:", email);
        console.log("Password:", password);

        const hashedPassword = await bcrypt.hash(password, 10)
        await connectMongoDB();
        await UserModel.create({ fullname, email, password: hashedPassword })


        return NextResponse.json({ message: "User Registered" }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: "An Error occured while registering the user" }, { status: 500 });
    }
}