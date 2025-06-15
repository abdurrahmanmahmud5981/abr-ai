"use server"

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server"
import { GoogleGenerativeAI } from "@google/generative-ai";

const geminiApiKey = process.env.GEMINI_API_KEY;
if (!geminiApiKey) {
    throw new Error("GEMINI_API_KEY environment variable is not set");
}
const genAI = new GoogleGenerativeAI(geminiApiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function generateQuiz() {
    const { userId } = await auth()

    if (!userId) throw new Error("unauthorized");

    const user = await db.user.findUnique({
        where: {
            clerkUserId: userId,
        }
    });

    if (!user) throw new Error("user not found");

    try {
        // prompt for quiz
        const prompt = `
    Generate 10 technical interview questions for a ${user.industry
            } professional${user.skills?.length ? ` with expertise in ${user.skills.join(", ")}` : ""
            }.
    
    Each question should be multiple choice with 4 options.
    
    Return the response in this JSON format only, no additional text:
    {
      "questions": [
        {
          "question": "string",
          "options": ["string", "string", "string", "string"],
          "correctAnswer": "string",
          "explanation": "string"
        }
      ]
    }
  `;

        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();

        const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();
        const quiz = JSON.parse(cleanedText);


        return quiz.questions;

    } catch (error) {
        console.error("error generating quiz:",error)
        throw new Error("failed to generate quiz questions")
    }



}




// seve it in the database
export async function saveQuizResult(
    questions: { question: string; options?: string[]; correctAnswer?: string; explanation?: string }[],
    answers: string[],
    score: number
) {
       const { userId } = await auth()

    if (!userId) throw new Error("unauthorized");

    const user = await db.user.findUnique({
        where: {
            clerkUserId: userId,
        }
    });

    if (!user) throw new Error("user not found");


    // structur
    const questionResults = questions.map((q,ind)=>({
        question:q.question,
        answer:q.correctAnswer,
        userAnswer:answers[ind],
        isCorrect:q.correctAnswer === answers[ind],
        explanation:q.explanation
    }))

    const wrongAnswer = questionResults.filter((q, ind) => !q.isCorrect)

// improvementTip

    let improvementTip = null;

    if(wrongAnswer.length> 0){
        const wrongQuestionsText = wrongAnswer.map(
        (q) =>
          `Question: "${q.question}"\nCorrect Answer: "${q.answer}"\nUser Answer: "${q.userAnswer}"`
      )
      .join("\n\n");
       const improvementPrompt = `
      The user got the following ${user.industry} technical interview questions wrong:

      ${wrongQuestionsText}

      Based on these mistakes, provide a concise, specific improvement tip.
      Focus on the knowledge gaps revealed by these wrong answers.
      Keep the response under 2 sentences and make it encouraging.
      Don't explicitly mention the mistakes, instead focus on what to learn/practice.
    `;

    try {
        const result = await model.generateContent(improvementPrompt);
        const response = result.response;
        improvementTip = response.text().trim();

    } catch (error) {
        console.error("Error Generating Improvement Tip:",error)
    }
    }

    try {
        const assessment = await db.assessment.create({
            data:{
                userId:user.id,
                quizScore:score,
                questions:questionResults,
                category:"Technical",
                improvementTip,
            },
        });

        return assessment;
    } catch (error) {
        console.error("Error Saving Quiz Result:",error);
        throw new Error("Failed to save quiz result")
    }
}