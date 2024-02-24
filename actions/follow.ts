'use server'

import { followUser, unfollowUser } from "@/lib/follow-service"
import { revalidatePath } from "next/cache"
import { Tenali_Ramakrishna } from "next/font/google"

export const onFollow = async (id:string) => {

    try {
        const followedUser = await followUser(id)

        revalidatePath('/')
        
        if(followedUser) {
            revalidatePath(`/${followedUser.following.username}`)
        }
        console.log(followedUser)
        return followedUser
    } catch (error) {
        throw new Error("Internal Error")
    }
}

export const onUnfollow = async (id: string) => {
    try {
        const unfollowedUser = await unfollowUser(id)

        revalidatePath('/')

        if(unfollowedUser) {
            revalidatePath(`/${unfollowedUser.following.username}`)
        }

        return unfollowedUser
    } catch (error) {
        throw new Error('Internal Error')
    }
}