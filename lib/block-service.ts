import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";

export const isBlockedByUser = async (id: string) => {
    try {
        const self = await getSelf()

        const otherUser = await db.user.findUnique({
            where: { id }
        })

        if(!otherUser) {
            throw new Error('User not found')
        }

        if(otherUser.id === self.id) {
            return false
        }

        const existingBlock = await db.block.findUnique({
            where: {
                blockerId_blockedId: {
                    blockerId: otherUser.id,
                    blockedId: self.id
                }
            }
        })

        return !!existingBlock
    } catch {
        return false
    }
}

export const blockUser = async (id: string) => {
    const self = await getSelf()

    if(self.id === id) {
        throw new Error('Cannot block yourself')
    }
    // check if user is blocked
    const otherUser = await db.user.findUnique({
        where: { id }
    })

    if(!otherUser) {
        throw new Error('User not found')
    }

    // check if other user is already blocked
    const existingBlock = await db.block.findUnique({
        where: {
            blockerId_blockedId: {
                blockerId: self.id,
                blockedId: otherUser.id
            }
        }
    })

    if(existingBlock) {
        throw new Error('Already blocked')
    }

    // block other user
    const block = await db.block.create({
        data: {
            blockerId: self.id,
            blockedId: otherUser.id
        },
        include: {
            blocked: true
        }
    })

    return block
}
