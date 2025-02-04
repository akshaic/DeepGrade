import { NextResponse } from "next/server";
import multer from "multer";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";

// Set up multer to store the file in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

const genAI = new GoogleGenerativeAI(process.env.API_KEY); // API key from environment
const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-pro" });

export async function POST(req) {
  try {
    // Use multer to handle file upload
    const formData = await req.formData();
    const file = formData.get("pdf");

    if (!file) {
      return NextResponse.json({ error: "No PDF uploaded" }, { status: 400 });
    }

    // Convert the file to Base64
    const pdfBuffer = Buffer.from(await file.arrayBuffer());
    const pdfBase64 = pdfBuffer.toString("base64");

    // Send the Base64 PDF to Gemini for transcription or summarization
    const result = await model.generateContent([
      {
        inlineData: {
          data: pdfBase64,
          mimeType: "application/pdf",
        },
      },
      "Transcribe the answer sheet you need to arrange it according to question number and your job is to just give exactly the sql for entering into table answer like a1,a2 etc",
    ]);

    const transcribedText = result.response.text();

    // Return the transcribed text back to the frontend
    return NextResponse.json({ transcribed: transcribedText });
  } catch (error) {
    console.error("Error processing file:", error);
    return NextResponse.json({ error: "Error processing file" }, { status: 500 });
  }
}
