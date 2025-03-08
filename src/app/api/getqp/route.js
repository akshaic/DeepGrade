import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const res = await prisma.questionpaper.findMany({
      select: {
        name: true,
        password:true
      },
    });
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch question papers" }, { status: 500 });
  }
}
