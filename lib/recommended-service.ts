import { db } from "@/lib/db";
import { getSelf } from "./auth-service";

export const getRecommended = async () => {
    // await new Promise(res => setTimeout(res, 3000))

    let userId

    try {
        // get self id if available (logged in)
        const self = await getSelf()
        userId = self.id
    } catch {
        userId = null
    }

    let users = []
    if( userId ) {
        // Check if userId is available (if logged in)
        users = await db.user.findMany({
            // if logged in done show self 
            where: {
                AND: [
                    {
                        NOT: {
                            id: userId
                        }
                    }, 
                    {
                        NOT: {
                            followedBy:{
                                some:{
                                    followerId: userId
                                }
                            }
                        },
                    }, 
                    {
                        NOT: {
                            blocking: {
                                some: {
                                    blockedId: userId
                                }
                            }
                        }
                    }
                ],
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
    } else {
        // display all users if logged out
         users = await db.user.findMany({
            orderBy: {
                createdAt: "desc"
            }
        })
    }

    return users
}