import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Email", type: "text", placeholder: "you@example.com" },
                password: { label: "Password", type: "password", placeholder: "your password" }
            },
            async authorize(credentials) {
                if (!credentials) return null;

                const user = await prisma.user.findFirst({
                    where: {
                        email: credentials.username,
                        password: credentials.password,
                    },
                });

                if (!user) return null;

                return {
                    id: user.id.toString(),
                    email: user.email,
                    name: `${user.firstName} ${user.lastName}`,
                    role: user.role,
                };
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.email = user.email;
                token.name = user.name;
                token.role = user.role;  // ✅ Ensure role is stored
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user = {
                    email: token.email,
                    name: token.name,
                    role: token.role, // ✅ Ensure role is passed to session
                };
            }
            return session;
        }
    },
   
    session: {
        strategy: "jwt",
    },
};

export default authOptions;
