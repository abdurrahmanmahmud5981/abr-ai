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