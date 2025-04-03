import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const roll = searchParams.get("roll");

    if (!roll) {
        return NextResponse.json({ error: "Roll number not provided" });
    }

    try {
        const results = await prisma.studentanswers.findMany({
            where: { roll: roll },
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
