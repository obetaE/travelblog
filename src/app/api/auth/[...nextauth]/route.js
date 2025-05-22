import { connectMongoDB } from "@/libs/config/db";
import UserModel from "@/libs/models/UserModel";
import NextAuth from "next-auth";
import CredentialsProvider  from "next-auth/providers/credentials";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"

export const authOptions = {
    providers: [
        CredentialsProvider({
            fullname: "credentials",
            credentials: {},

            async authorize(credentials){
                // This below is for testing
                // const user = { id: "1"};
                const { email, password} = credentials;
                try {
                    await connectMongoDB();
                    const user = await UserModel.findOne({email});

                    if (!user){
                        return null;
                    }

                    const passwordMatch = await bcrypt.compare(password, user.password);

                    if(!passwordMatch){
                        return null;
                    }

                    return user;

                } catch (error) {
                    console.log("Error: " , error);
                }
            }
        })
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.AUTH_SECRET,
    pages:{
        signIn: "/"
    }
}

const handler = NextAuth(authOptions);

export { handler as GET , handler as POST}