import { connectMongoDB } from "@/libs/config/db";
import UserModel from "@/libs/models/UserModel";
import { User } from "lucide-react";
import { NextResponse } from "next/server";

export async function POST(req){
    try {
        await connectMongoDB();
        const {email} = await req.json();
        const user = await UserModel.findOne({email}).select("_id");
        console.log("user: ", user);
        return NextResponse.json({user})
    } catch (error) {
        console.log(error)
    }
}