import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from 'bcrypt';
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import GoogleProvider from "next-auth/providers/google";

import prismaClient from "@/lib/prisma";

export default NextAuth({
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                if (!(!credentials?.email && !credentials?.password)) {
                    const User = await prismaClient.user.findUnique({
                        where: {
                            email: credentials.email
                        }
                    })
                    if (!User || !User?.hashedPassword) {
                        throw new Error("Email doesn't exists");
                    }
                    const isPasswordCorrect = await compare(credentials.password, User.hashedPassword)
                    if (!isPasswordCorrect) {
                        throw new Error("Enter Correct Password ");
                    }
                    return User
                }
                else {
                    if (!credentials?.email && !credentials?.password) {
                        throw new Error("Email and Password required");
                    }
                    else {
                        if (!credentials?.email) {
                            throw new Error("Email required");
                        }
                        else {
                            throw new Error("Password required");
                        }
                    }
                }
            }

        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
        })
    ],
    pages: {
        signIn: '/Auth'
    }
    ,
    debug: process.env.NODE_ENV == 'development',
    session: {
        strategy: 'jwt'
    },
    adapter: PrismaAdapter(prismaClient),
    jwt: {
        secret: process.env.NEXTAUTH_JWT_SECRET
    },
    secret: process.env.NEXTAUTH_SECRET

})