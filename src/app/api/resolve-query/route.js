// File: /app/api/resolve-query/route.js
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(req) {
  try {
    const { queryId } = await req.json();

    if (!queryId) {
      return NextResponse.json({ error: "Missing query ID" }, { status: 400 });
    }

    // Delete the query from the database
    const deletedQuery = await prisma.query.delete({
      where: {
        query_id: queryId
      }
    });

    if (!deletedQuery) {
      return NextResponse.json({ error: "Query not found" }, { status: 404 });
    }

    return NextResponse.json(
      { success: true, message: "Query resolved successfully" }, 
      { status: 200 }
    );

  } catch (error) {
    console.error("Error resolving query:", error.message);
    return NextResponse.json(
      { error: "Failed to resolve query", details: error.message }, 
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}