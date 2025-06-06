import { connectMongoDB } from "@/libs/config/db";
import UserModel from "@/libs/models/UserModel";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials", // Corrected from "fullname" to "name"
      credentials: {},

      async authorize(credentials) {
        const { email, password } = credentials;
        try {
          await connectMongoDB();
          const user = await UserModel.findOne({ email });

          if (!user) {
            return null;
          }

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (!passwordMatch) {
            return null;
          }

          // Return only necessary user data (without password)
          return {
            id: user._id.toString(),
            email: user.email,
            fullname: user.fullname,
            isAdmin: user.isAdmin,
          };
        } catch (error) {
          console.log("Error: ", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Add user data to token on initial sign in
      if (user) {
        token.id = user.id;
        token.fullname = user.fullname;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      // Add user data to session
      if (token) {
        session.user.id = token.id;
        session.user.fullname = token.fullname;
        session.user.isAdmin = token.isAdmin;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
