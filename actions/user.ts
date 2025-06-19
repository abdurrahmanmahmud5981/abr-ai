"use server";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { generateAIInsight } from "./dashboard";




export async function updateUser(data) {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("User not authenticated");
    }

    // check if the user exists in the database
    const user = await db.user.findUnique({
        where: {
            clerkUserId: userId
        }
    })
    if (!user) {
        throw new Error("User not found");
    }

    // update the user in the database
    try {
        const result = await db.$transaction(async (tx) => {
            // find if the industry exists
            let industryInsight = await tx.industryInsight.findUnique({
                where: {
                    industry: data.industry
                }
            })

            // if not than create it with the defalut values - will replace it with ai later
            if (!industryInsight) {
                const insights = await generateAIInsight(data.industry);
                    industryInsight = await db.industryInsight.create({
                            data: {
                                industry: data.industry,
                                ...insights,
                                nextUpdate: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours later
                            }
                        })
            }

            // update the user with the industry
            const updatedUser = await tx.user.update({
                where: {
                    id: user.id
                },
                data: {
                    industry: data.industry,// add other fields to update as needed
                    experience: data.experience,
                    bio: data.bio,
                    skills: data.skills,

                }
            })
            return { updatedUser, industryInsight };
        }, {
            timeout: 10000 // 10 seconds timeout
        })
        return {success: true, ...result };
    } catch (error) {
        console.error("Error updating user:", error);
        throw new Error("Failed to update user");
    }
}

export async function getUserOnboardingStatus() {
    const { userId } = await auth();
    if (!userId) throw new Error("User not authenticated");
    const user = await db.user.findUnique({
        where: {
            clerkUserId: userId,
        }
    })

    if (!user) throw new Error("User not found");
        // Redirect to onboarding if user not found (handle this in the client)
        
 

    try {
        const user = await db.user.findUnique({
            where: {
                clerkUserId: userId
            },
            select: {
                industry: true,
            }
        })
        return {
            isOnboarded: !!(user && user.industry), // true if industry is set, false otherwise
        }

    } catch (error) {
        console.error("Error fetching user onboarding status:", error);
        throw new Error("Failed to fetch user onboarding status");
    }
}