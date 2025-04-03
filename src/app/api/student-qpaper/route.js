import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    
    const name = searchParams.get("name");
    
    // Get unique roll numbers
    let uniqueResults;
    
    if (name) {
      // Find students with the specified name and get distinct roll numbers
      uniqueResults = await prisma.studentanswers.findMany({
        where: { name },
        select: { roll: true },
        distinct: ['roll']
      });
    } else {
      // Find all distinct roll numbers
      uniqueResults = await prisma.studentanswers.findMany({
        select: { roll: true },
        distinct: ['roll']
      });
    }
    
    // Format the response to be an array of roll numbers
    const formattedResults = uniqueResults.map(item => item.roll);
    
    return NextResponse.json(
      formattedResults.length > 0 ? formattedResults : { error: "No records found" }, 
      { status: formattedResults.length > 0 ? 200 : 404 }
    );
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}