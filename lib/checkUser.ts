import { currentUser } from "@clerk/nextjs/server"

export const checkUser = async () => {
    const user = await currentUser();
    if (!user) {
        throw new Error("User not authenticated");
    }
}
