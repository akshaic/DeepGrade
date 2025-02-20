import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export const Next_AUTH_CONFIG = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "text", placeholder: "email@example.com" },
        password: { label: "Password", type: "password", placeholder: "Your password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const { username: email, password } = credentials;
        console.log("Trying to authenticate:", email, password);

        try {
          // 1️⃣ Check if the user is a Student
          const student = await prisma.user.findFirst({
            where: { email, password, role: "STUDENT" },
          });

          if (student) {
            console.log("Authenticated as Student:", student);
            cookies().set("role", "STUDENT");
            return { id: student.id, email: student.email, role: "STUDENT" };
          }

          // 2️⃣ Check if the user is a Teacher
          const teacher = await prisma.user.findFirst({
            where: { email, password, role: "TEACHER" },
          });

          if (teacher) {
            console.log("Authenticated as Teacher:", teacher);
            cookies().set("role", "TEACHER");
            return { id: teacher.id, email: teacher.email, role: "TEACHER" };
          }

          // 3️⃣ Check if the user is an Exam Center
          const examCenter = await prisma.user.findFirst({
            where: { email, password, role: "EXAM_CENTER" },
          });

          if (examCenter) {
            console.log("Authenticated as Exam Center:", examCenter);
            cookies().set("role", "EXAM_CENTER");
            return { id: examCenter.id, email: examCenter.email, role: "EXAM_CENTER" };
          }

          console.log("No user found for provided credentials.");
          return null;
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        } finally {
          await prisma.$disconnect();
        }
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user = {
        id: token.id,
        email: token.email,
        role: token.role,
      };
      return session;
    },
  },
};
