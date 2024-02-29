'use server'

import { v4 } from 'uuid'
import { AccessToken } from 'livekit-server-sdk'
import { getSelf } from '@/lib/auth-service'
import { getUserById } from '@/lib/user-service'
import { isBlockedByUser } from '@/lib/block-service'

export const createViewerToken = async (hostIdentity: string) => {
    let self;

    try {
        self = await getSelf()
    } catch {
        //generate id for guest and assign random guest username 
        const id = v4()
        const userName = `guest#${Math.floor(Math.random()*1000)}`
        self = { id, userName }
    }

    const host = await getUserById(hostIdentity)

    if(!host) {
        throw new Error('User not found.')
    }

    const isBlocked = await isBlockedByUser(host.id) 

    if(isBlocked) {
        throw new Error('You have been blocked from viewing the stream :(')
    }

    const isHost = self.id === host.id

    const token = new AccessToken(
        process.env.LIVEKIT_API_KEY,
        process.env.LIVEKIT_API_SECRET, 
        {
            identity: isHost ? `host-${self.id}` : self.id,
            name: self.username
        }  
    )
    
    token.addGrant({
        room: host.id,
        roomJoin: true,
        canPublish: false,
        canPublishData: true
    })

    return await Promise.resolve(token.toJwt())
}