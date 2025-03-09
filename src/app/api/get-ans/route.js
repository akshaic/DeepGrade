import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name");
    const roll = searchParams.get("roll");

    if (!name || !roll) {
      return NextResponse.json({ error: "Missing name or roll" }, { status: 400 });
    }

    const answers = await prisma.studentanswers.findMany({
      select: {
        q_no: true,
        answer: true,
        grade:true
      },
      where: {
        name: name,
        roll: roll,
      },
      orderBy: {
        q_no: "asc", // Sorting by q_no in ascending order
      },
    });

    return NextResponse.json(answers);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
