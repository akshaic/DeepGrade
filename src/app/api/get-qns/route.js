import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name");

    if (!name) {
      return NextResponse.json({ error: "Missing name or roll" }, { status: 400 });
    }

    const answers = await prisma.questiondetails.findMany({
      select: {
        question:true,
        evaluationCriteria:true
      },
      where: {
        name: name,
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
