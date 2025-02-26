import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { GoogleGenerativeAI } from "@google/generative-ai";

const prisma = new PrismaClient();
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-pro" });

export async function POST(req) {
  try {
    // Extract PDF from request
    const formData = await req.formData();
    const file = formData.get("pdf");

    if (!file) {
      return NextResponse.json({ error: "No PDF uploaded" }, { status: 400 });
    }

    // Convert PDF to Base64
    const pdfBuffer = Buffer.from(await file.arrayBuffer());
    const pdfBase64 = pdfBuffer.toString("base64");

    let extractedData;
    try {
      // Send PDF to Gemini for transcription
      const result = await model.generateContent([
        {
          inlineData: {
            data: pdfBase64,
            mimeType: "application/pdf",
          },
        },
        "Transcribe the answer sheet and return only a valid JSON array with fields: name(question paper name in lowercase), roll, q_no (question number data type int), answer, and grade(give 5 data type is float ),roll-turn to lowercase if uppercase. No explanations, only JSON output.",
      ]);

      let responseText = result?.response?.text();
      if (!responseText) {
        throw new Error("Empty response from Gemini API");
      }

      // 🛠️ Remove Markdown-style triple backticks
      responseText = responseText.replace(/^```json/, "").replace(/```$/, "").trim();

      // 🛠️ Parse cleaned JSON
      extractedData = JSON.parse(responseText);
    } catch (error) {
      console.error("❌ Gemini API Error:", error);
      return NextResponse.json({ error: "Gemini API failed" }, { status: 500 });
    }

    console.log("📜 Extracted Data:", extractedData);

    // Ensure extractedData is a valid array
    if (!Array.isArray(extractedData) || extractedData.length === 0) {
      return NextResponse.json({ error: "Invalid or empty data received" }, { status: 400 });
    }

    try {
      // Insert data into the database
      await prisma.studentanswers.createMany({
        data: extractedData.map(({ q_no,grade,answer,roll,name}) => ({
          q_no,
          answer,
          grade,
          roll,
          name
        })),
      });

      return NextResponse.json({ message: "Answers inserted successfully" });
    } catch (error) {
    
      return NextResponse.json({ error: "Database insertion failed"+error }, { status: 500 });
    }
  } catch (error) {
    console.error("❌ Processing Error:", error);
    return NextResponse.json({ error: "Error processing file" }, { status: 500 });
  }
}
