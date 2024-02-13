import { db } from "@/lib/db";
import { getSelf } from "./auth-service";

export const getRecommended = async () => {
    await new Promise(res => setTimeout(res, 3000))
    
    const users = await db.user.findMany({
        orderBy: {
            createdAt: "desc"
        }
    })

    return users
}