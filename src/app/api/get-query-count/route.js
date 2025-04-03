import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const roll = searchParams.get("roll");

        if (!roll) {
            return NextResponse.json({ error: "Roll number not provided" }, { status: 400 });
        }

        // Count queries raised by the student
        const queryCount = await prisma.query.count({
            where: { roll: roll }, // Ensure this field matches your database schema
        });

        return NextResponse.json({ count: queryCount }, { status: 200 });
    } catch (error) {
        console.error("❌ Error fetching query count:", error.message);
        return NextResponse.json({ error: "Failed to fetch query count" }, { status: 500 });
    }
}
