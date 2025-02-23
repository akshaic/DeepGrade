
import NextAuth from "next-auth";

import Next_AUTH_CONFIG from "@/app/lib/auth"


secret: process.env.NEXTAUTH_SECRET;
const handler = NextAuth(Next_AUTH_CONFIG)
export { handler as GET, handler as POST };