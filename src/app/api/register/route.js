import { NextResponse } from "next/server";
import { connectMongoDB } from "@/libs/config/db"
import UserModel from "@/libs/models/UserModel"

export async function POST(req) {
    try {
        const { fullname, email, password, isAdmin } = await req.json();
        console.log("Name:", fullname);
        console.log("Email:", email);
        console.log("Password:", password);
        console.log("Admin:", isAdmin);

        const hashedPassword = await bcrypt.hash(password, 10)
        await connectMongoDB();
        await UserModel.create({ fullname, email, password: hashedPassword, isAdmin })


        return NextResponse.json({ message: "User Registered" }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: "An Error occured while registering the user" }, { status: 500 });
    }
}


