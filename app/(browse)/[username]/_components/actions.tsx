'use client'

import { Button } from "@/components/ui/button"
import { onFollow, onUnfollow } from "@/actions/follow"
import { useTransition } from "react"
import { toast } from "sonner"

interface ActionsProps {
    isFollowing : boolean
    userId : string
}

export const Actions = ( { isFollowing, userId } : ActionsProps ) => {

    const [ isPending, startTransition ]  = useTransition()

    // handles follow function
    const handleFollow = () => {
        startTransition(() => {
            onFollow( userId )
                .then((data) => toast.success(`Now following ${data.following.username} :)`))
                .catch(() => toast.error('Oops! Something went wrong :('))
        })
    }

    // handles unfollow function
    const handleUnfollow = () => {
        startTransition(() => {
            onUnfollow( userId )
                .then((data) => toast.success(`Unfollowed ${data.following.username} :(`))
                .catch(() => toast.error('Oops! Something went wrong :('))
        })
    }
    return (
        <Button 
            variant= 'primary'
            onClick= { isFollowing ? handleUnfollow : handleFollow } //checks if following to unfollow function else has follow function
            disabled= {  isPending }
        >
            { isFollowing ? 'Unfollow' : 'Follow' }
        </Button>
    )
}