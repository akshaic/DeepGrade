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
        "Transcribe the answer sheet and return only a valid JSON array with fields: name(question paper name in lowercase), roll, q_no (question number data type int), answer. No explanations, only JSON output.",
      ]);
      
      let responseText = result?.response?.text();
      if (!responseText) {
        throw new Error("Empty response from Gemini API");
      }
      
      // Remove Markdown-style triple backticks
      responseText = responseText.replace(/^```json/, "").replace(/```$/, "").trim();
      
      // Parse cleaned JSON
      extractedData = JSON.parse(responseText);
    } catch (error) {
      console.error("❌ Gemini API Error:", error);
      return NextResponse.json({ error: "Gemini API failed: " + error.message }, { status: 500 });
    }
    
    console.log("📜 Extracted Data:", extractedData);
    
    // Ensure extractedData is a valid array
    if (!Array.isArray(extractedData) || extractedData.length === 0) {
      return NextResponse.json({ error: "Invalid or empty data received" }, { status: 400 });
    }
    
    try {
      // Enrich data with automatic grading for each question
      const enrichedData = await Promise.all(
        extractedData.map(async (studentAnswer) => {
          // Fetch reference answer and evaluation criteria from database
          const questionDetail = await prisma.questiondetails.findFirst({
            where: {
              name: studentAnswer.name,
              q_no: studentAnswer.q_no
            }
          });
          
          if (!questionDetail) {
            console.warn(`Question details not found for ${studentAnswer.name} q_no: ${studentAnswer.q_no}`);
            // Default grade if question not found
            return { ...studentAnswer, grade: 5 };
          }
          
          // Use AI to grade the answer based on evaluation criteria
          const gradingPrompt = `
You are an expert teacher grading a student's answer.

Reference Answer:
${questionDetail.answer}

Evaluation Criteria:
${questionDetail.evaluationCriteria}

Student Answer:
${studentAnswer.answer}

Grade this answer on a scale of 0 to 10, where 10 is perfect.
Provide only a numeric score as a decimal number (e.g., 7.5).
`;
          
          try {
            const gradingResult = await model.generateContent(gradingPrompt);
            const gradeText = gradingResult?.response?.text().trim();
            
            // Extract numeric grade using regex to handle any text the AI might include
            const gradeMatch = gradeText.match(/\b([0-9]+(\.[0-9]+)?)\b/);
            const grade = gradeMatch ? parseFloat(gradeMatch[0]) : 5; // Default to 5 if parsing fails
            
            // Ensure grade is within bounds
            const boundedGrade = Math.min(Math.max(grade, 0), 10);
            
            return {
              ...studentAnswer,
              grade: boundedGrade
            };
          } catch (gradingError) {
            console.error("Grading error:", gradingError);
            // Default grade if AI grading fails
            return { ...studentAnswer, grade: 5 };
          }
        })
      );
      
      // Insert enriched data into the database
      await prisma.studentanswers.createMany({
        data: enrichedData.map(({ q_no, grade, answer, roll, name }) => ({
          q_no,
          answer,
          grade,
          roll,
          name
        })),
      });
      
      return NextResponse.json({ 
        message: "Answers inserted successfully",
        processed: enrichedData.length
      });
    } catch (error) {
      console.error("Database or processing error:", error);
      return NextResponse.json({ error: "Operation failed: " + error.message }, { status: 500 });
    }
  } catch (error) {
    console.error("❌ Processing Error:", error);
    return NextResponse.json({ error: "Error processing file: " + error.message }, { status: 500 });
  }
}