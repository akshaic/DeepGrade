import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const rollNumber = searchParams.get("roll");

    if (!rollNumber) {
      return NextResponse.json({ error: "Missing roll number" }, { status: 400 });
    }

    // Query using Prisma instead of direct SQL
    const queries = await prisma.query.findMany({
      where: {
        roll: rollNumber
      },
      include: {
        questionPaper: {
          select: {
            name: true
          }
        },
        student: {
          select: {
            email: true,
            roll: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    if (!queries || queries.length === 0) {
      return NextResponse.json({ message: "No queries found for this student" }, { status: 404 });
    }

    return NextResponse.json(queries, { status: 200 });

  } catch (error) {
    console.error("Error fetching student queries:", error.message);
    return NextResponse.json({ error: "Failed to fetch queries" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}