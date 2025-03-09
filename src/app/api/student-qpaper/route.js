import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient(); 

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url); 
    const name = searchParams.get("name"); 

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const res = await prisma.studentanswers.findFirst({
      select: { roll: true },
      where: { name },
    });

    return NextResponse.json(res ? { roll: res.roll } : { error: "Not found" }, { status: res ? 200 : 404 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
