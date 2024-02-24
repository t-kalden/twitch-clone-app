'use client'

import { Button } from "@/components/ui/button"
import { onFollow, onUnfollow } from "@/actions/follow"
import { useTransition } from "react"
import { toast } from "sonner"
import { onBlock, onUnblock } from "@/actions/block"

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

    const handleBlock = () => {
        startTransition(() => {
            onBlock(userId) 
                .then((data) => toast.success(`${data.blocked.username} has been blocked. They can no longer access your page.`))
                .catch(() => toast.error('Failed to block user.'))
        })
    }

    const handleUnblock = () => {
        startTransition(() => {
            onUnblock(userId) 
                .then((data) => toast.success(`${data.blocked.username} has been unblocked. They can now access your page.`))
                .catch(() => toast.error('Failed to unblock user.'))
        })
    }
    return (
        <>
            <Button 
                variant= 'primary'
                onClick= { isFollowing ? handleUnfollow : handleFollow } //checks if following to unfollow function else has follow function
                disabled= {  isPending }
                >
                { isFollowing ? 'Unfollow' : 'Follow' }
            </Button>

            <Button
                onClick= { handleUnblock }
                disabled= { isPending }
            >
                Block
            </Button>
        </>
    )
}