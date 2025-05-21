import NextAuth from "next-auth";
import CredentialsProvider  from "next-auth/providers/credentials";
import Credentials from "next-auth/providers/credentials";

const authOptions = {
    providers: [
        CredentialsProvider({
            fullname: "credentials",
            credentials: {},

            async authorize(credentials){
                const user = { id: "1"};
                return user;
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