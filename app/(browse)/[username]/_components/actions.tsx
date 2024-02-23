'use client'

import { Button } from "@/components/ui/button"
import { onFollow } from "@/actions/follow"
import { useTransition } from "react"
import { toast } from "sonner"

interface ActionsProps {
    isFollowing : boolean
    userId : string
}

export const Actions = ( { isFollowing, userId } : ActionsProps ) => {

    const [ isPending, startTransition ]  = useTransition()
    const onClick = () => {
        startTransition(() => {
            onFollow( userId )
                .then((data) => toast.success(`Now following ${data.following.username} :)`))
                .catch(() => toast.error('Oops! Something went wrong :('))
        })
    }
    return (
        <Button 
            variant= 'primary'
            onClick= { onClick }
            disabled= { isFollowing || isPending }
        >
            Follow
        </Button>
    )
}