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
    const qpname = formData.get("name");
    console.log(qpname);
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
        `Transcribe the answer sheet and return only a valid JSON array with fields: name(${qpname}), roll(in lowercase), q_no (question number data type int), answer. No explanations, only JSON output.`,
      ]);
      
      let responseText = result?.response?.text();
      if (!responseText) {
        throw new Error("Empty response from Gemini API");
      }
      
      // Remove Markdown-style triple backticks
      responseText = responseText.replace(/^```json/, "").replace(/```$/, "").trim();
      
      // Parse cleaned JSON
      try {
        extractedData = JSON.parse(responseText);
      } catch (parseError) {
        console.error("JSON Parse Error:", parseError.message || "Unknown error", "Raw text:", responseText);
        // Try to extract JSON by finding the first [ and last ]
        const jsonStart = responseText.indexOf('[');
        const jsonEnd = responseText.lastIndexOf(']');
        if (jsonStart >= 0 && jsonEnd > jsonStart) {
          const jsonOnly = responseText.substring(jsonStart, jsonEnd + 1);
          extractedData = JSON.parse(jsonOnly);
        } else {
          throw parseError;
        }
      }
    } catch (error) {
      console.error("❌ Gemini API Error:", error.message || "Unknown error");
      return NextResponse.json({ error: "Gemini API failed: " + (error.message || "Unknown error") }, { status: 500 });
    }
    
    console.log("📜 Extracted Data:", extractedData);
    
    // Ensure extractedData is a valid array
    if (!Array.isArray(extractedData) || extractedData.length === 0) {
      return NextResponse.json({ error: "Invalid or empty data received" }, { status: 400 });
    }
    
    try {
      // First, verify the question paper name exists in parent table
      const existingQuestionPaper = await prisma.questionpaper.findUnique({
        where: {
          name: qpname
        }
      });
      
      if (!existingQuestionPaper) {
        return NextResponse.json({ 
          error: `Question paper with name '${qpname}' not found in database. Please create it first.` 
        }, { status: 400 });
      }
      
      // Check if student records exist, create them if they don't
      const uniqueRolls = [...new Set(extractedData.map(item => item.roll))];
      
      for (const roll of uniqueRolls) {
        const existingStudent = await prisma.student.findUnique({
          where: { roll }
        });
        
        if (!existingStudent) {
          // Create a placeholder student record if it doesn't exist
          await prisma.student.create({
            data: {
              roll,
              email: `${roll}@placeholder.com` // Placeholder email since it's required
            }
          });
          console.log(`Created placeholder student record for roll: ${roll}`);
        }
      }
      
      // Fetch all question details at once with evaluation criteria
      const questionNos = [...new Set(extractedData.map(item => item.q_no))];
      
      console.log("Fetching question details for:", qpname, "Question numbers:", questionNos);
      
      const allQuestionDetails = await prisma.questiondetails.findMany({
        where: {
          name: qpname,
          q_no: { in: questionNos }
        },
        select: {
          q_no: true,
          answer: true,
          evaluationCriteria: true
        }
      });
      
      console.log("Question details found:", allQuestionDetails.length);
      
      // Create a lookup map for faster access
      const questionDetailsMap = {};
      allQuestionDetails.forEach(qd => {
        questionDetailsMap[qd.q_no] = qd;
        console.log(`Question ${qd.q_no} evaluation criteria:`, qd.evaluationCriteria, qd.answer);
      });
      
      // Prepare batch grading data
      const gradingData = extractedData.map(studentAnswer => {
        const questionDetail = questionDetailsMap[studentAnswer.q_no];
        
        if (!questionDetail) {
          console.warn(`⚠️ No question details found for q_no: ${studentAnswer.q_no}`);
          return {
            id: `${studentAnswer.roll}_${studentAnswer.q_no}`,
            reference_answer: "No reference answer available",
            evaluation_criteria: "Grade on a scale of 0-10 based on correctness",
            student_answer: studentAnswer.answer || "",
            q_no: studentAnswer.q_no,
            roll: studentAnswer.roll,
            name: qpname
          };
        }
        
        return {
          id: `${studentAnswer.roll}_${studentAnswer.q_no}`,
          reference_answer: questionDetail.answer,
          evaluation_criteria: questionDetail.evaluationCriteria || "Grade on a scale of 0-10 based on correctness",
          student_answer: studentAnswer.answer || "",
          q_no: studentAnswer.q_no,
          roll: studentAnswer.roll,
          name: qpname
        };
      });
      
      console.log("Grading data sample:", JSON.stringify(gradingData[0] || {}));
      
      // Build a single prompt for batch grading
      const batchGradingPrompt = `
You are grading student answers based on the provided model answer and evaluation criteria.

For each answer below:
1. Read the evaluation criteria and reference answer carefully 
2. Compare the student answer with the reference answer and look for keyword matching,context meaning ,contextual meaning,sentence structure,logical coherence
3. Assign a grade based strictly on how well the student answer satisfies the criteria answer is close to reference answer,if very close all points in reference answer give full mark,if some missing reduce some mark accordingly,answer should be descriptive,grade how a professional strict teacher would grade when given the evualuation criteria and reference answer

${gradingData.map((item, index) => `
--- ANSWER ${index + 1} ---
ID: ${item.id}
Question Number: ${item.q_no}
Reference Answer: ${item.reference_answer}
EVALUATION CRITERIA: ${item.evaluation_criteria}
Student Answer: ${item.student_answer}
`).join('\n')}

Return ONLY a JSON array with this exact format:
[
  {
    "id": "student_roll_question_number",
    "grade": numeric_grade
  }
]
No explanations, just the JSON.
`;
      
      // Send batch grading request
      const gradingResult = await model.generateContent(batchGradingPrompt);
      let gradingResponseText = gradingResult?.response?.text();
      
      // Log the raw response for debugging
      console.log("Raw grading response:", gradingResponseText);
      
      // Clean up response text
      gradingResponseText = gradingResponseText.replace(/```json\s*/g, "").replace(/```\s*/g, "").trim();
      
      // Parse grading results with error handling
      let gradesArray;
      try {
        gradesArray = JSON.parse(gradingResponseText);
      } catch (parseError) {
        console.error("JSON Parse Error:", parseError.message || "Unknown error");
        
        // Try to extract JSON by finding the first [ and last ]
        const jsonStart = gradingResponseText.indexOf('[');
        const jsonEnd = gradingResponseText.lastIndexOf(']');
        if (jsonStart >= 0 && jsonEnd > jsonStart) {
          const jsonOnly = gradingResponseText.substring(jsonStart, jsonEnd + 1);
          try {
            gradesArray = JSON.parse(jsonOnly);
          } catch (extractError) {
            console.error("Failed to extract JSON:", extractError.message || "Unknown error");
            // Default grading if all parsing fails
            gradesArray = gradingData.map(item => ({
              id: item.id,
              grade: 0
            }));
          }
        } else {
          // Default grading if JSON structure not found
          gradesArray = gradingData.map(item => ({
            id: item.id,
            grade: 0
          }));
        }
      }
      
      // Create a grades lookup map
      const gradesMap = {};
      gradesArray.forEach(grade => {
        if (grade && grade.id && grade.grade !== undefined) {
          gradesMap[grade.id] = grade.grade;
        }
      });
      
      // Combine original data with grades
      const enrichedData = extractedData.map(studentAnswer => {
        const gradeId = `${studentAnswer.roll}_${studentAnswer.q_no}`;
        const grade = gradesMap[gradeId] !== undefined ? 
          gradesMap[gradeId] : 
          5; // Default grade if not found
        
        return {
          q_no: studentAnswer.q_no,
          answer: studentAnswer.answer || "",
          grade: parseFloat(grade),
          roll: studentAnswer.roll,
          name: qpname
        };
      });
      
      // First, check if any records already exist to avoid duplicates
      const existingRecords = await prisma.studentanswers.findMany({
        where: {
          OR: enrichedData.map(data => ({
            roll: data.roll,
            q_no: data.q_no,
            name: data.name
          }))
        },
        select: {
          roll: true,
          q_no: true,
          name: true
        }
      });
      
      // Create a set of existing records for quick lookup
      const existingSet = new Set();
      existingRecords.forEach(record => {
        const key = `${record.roll}_${record.q_no}_${record.name}`;
        existingSet.add(key);
      });
      
      // Filter out records that already exist
      const newRecords = enrichedData.filter(data => {
        const key = `${data.roll}_${data.q_no}_${data.name}`;
        return !existingSet.has(key);
      });
      
      if (newRecords.length === 0) {
        return NextResponse.json({
          message: "All records already exist in the database",
          processed: 0
        });
      }
      
      // Insert new records one by one to better handle errors
      let successCount = 0;
      let failedRecords = [];
      
      for (const record of newRecords) {
        try {
          await prisma.studentanswers.create({
            data: record
          });
          successCount++;
        } catch (insertError) {
          console.error(`Failed to insert record: ${JSON.stringify(record)}`, insertError.message);
          failedRecords.push({
            record,
            error: insertError.message
          });
        }
      }
      
      return NextResponse.json({ 
        message: "Process completed",
        processed: successCount,
        failed: failedRecords.length,
        failedDetails: failedRecords.length > 0 ? failedRecords : undefined
      });
    } catch (error) {
      // Safely handle error logging
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      const errorStack = error instanceof Error && error.stack ? error.stack : "";
      
      console.error("❌ Processing Error:", errorMessage);
      if (errorStack) console.error("Error Stack:", errorStack);
      
      // Check if this is a foreign key constraint error
      if (errorMessage.includes("Foreign key constraint violated")) {
        return NextResponse.json({ 
          error: "Foreign key constraint violated. Please check that the question paper and student records exist." 
        }, { status: 400 });
      }
      
      return NextResponse.json({ error: "Operation failed: " + errorMessage }, { status: 500 });
    }
  } catch (error) {
    // Safely handle error logging
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    const errorStack = error instanceof Error && error.stack ? error.stack : "";
    
    console.error("❌ Processing Error:", errorMessage);
    if (errorStack) console.error("Error Stack:", errorStack);
    
    return NextResponse.json({ error: "Error processing file: " + errorMessage }, { status: 500 });
  }
}