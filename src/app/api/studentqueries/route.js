import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// This is the correct way to handle POST requests in App Router
export async function POST(request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { rollNumber, query } = body;
    
    // Basic validation
    if (!rollNumber || !query) {
      return NextResponse.json(
        { error: "Roll number and query are required" }, 
        { status: 400 }
      );
    }
    
    // Find the student based on roll number
    const student = await prisma.student.findUnique({
      where: { roll: rollNumber },
    });

    if (!student) {
      return NextResponse.json(
        { error: "Student not found" }, 
        { status: 404 }
      );
    }

    // Find the latest question paper associated with the student
    const latestAnswer = await prisma.studentanswers.findFirst({
      where: { roll: rollNumber },
      orderBy: { sa_id: "desc" },
    });

    if (!latestAnswer) {
      return NextResponse.json(
        { error: "No answer record found for the student" }, 
        { status: 404 }
      );
    }

    const questionPaperName = latestAnswer.name;

    // Save the query in the database
    const savedQuery = await prisma.query.create({
      data: {
        roll: rollNumber,
        name: questionPaperName,
        query: query,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Query submitted successfully",
      query: savedQuery
    });
  } catch (error) {
    console.error("Error saving query:", error);
    return NextResponse.json(
      { error: "Failed to save the query: " + error.message }, 
      { status: 500 }
    );
  }
}