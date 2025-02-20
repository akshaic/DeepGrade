import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-pro" });

export async function GET() {
  try {
    const result = await model.generateContent("Say 'Hello, whats 1+1!'");
    const message = await result.response.text();

    return NextResponse.json({ message });
  } catch (error) {
    console.error("❌ Error testing Gemini API:", error);
    return NextResponse.json({ error: "Gemini API test failed" }, { status: 500 });
  }
}
