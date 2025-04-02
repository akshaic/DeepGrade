import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const results = await prisma.studentanswers.findMany({
            select: {
                q_no: true,
                answer: true,
                grade: true,
            },
        });

        return NextResponse.json(results);
    } catch (error) {
        console.error("Error fetching student results:", error);
        return NextResponse.json({ error: "Failed to fetch results" });
    }
}
