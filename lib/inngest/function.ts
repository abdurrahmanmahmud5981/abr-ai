import { GoogleGenerativeAI } from "@google/generative-ai";
import { db } from "../prisma";
import { inngest } from "./client";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
export const generateIndustryInsights = inngest.createFunction(
  { id: "generate-industry-insights", name: "generate-industry-insights" },
  {cron: "0 0 * * *"}, // Runs daily at midnight
  async({step})=>{
    const industries = await step.run("Fetch Industry Date", async ()=>{
      return await db.industryInsight.findMany({
        select:{
          industry: true,
        }
      });
    });

    for ( const {industry} of industries) {
      // Generate insights for each industry
        const prompt = `
          Analyze the current state of the ${industry} industry and provide insights in ONLY the following JSON format without any additional notes or explanations:
          {
            "salaryRange": [
              { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
            ],
            "growthRate": number,
            "demandLevel": "HIGH" | "MEDIUM" | "LOW",
            "topSkills": ["skill1", "skill2"],
            "marketOutlook": "POSITIVE" | "NEUTRAL" | "NEGATIVE",
            "keyTrends": ["trend1", "trend2"],
            "recommendedSkills": ["skill1", "skill2"]
          }
          
          IMPORTANT: Return ONLY the JSON. No additional text, notes, or markdown formatting.
          Include at least 5 common roles for salary ranges.
          Growth rate should be a percentage.
          Include at least 5 skills and trends.
        `;
        const res = await step.ai.wrap("gemini",async (p)=>{
          return await model.generateContent(p)
        },prompt);
        
        const candidate = res.response?.candidates?.[0];
        const part = candidate?.content?.parts?.[0];
        const text = part && 'text' in part ? part.text : "";
        const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();
        const insights = JSON.parse(cleanedText);
        await step.run(`Update ${industry} Insights`, async ()=>{
         await db.industryInsight.update({
            where: { industry },
            data: {
                ...insights,
                lastUpdated: new Date(),
                nextUpdate: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours later
            }
        })
        });
    }
  }
)
