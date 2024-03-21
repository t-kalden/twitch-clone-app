'use client'

import { onUnblock } from "@/actions/block"
import { Button } from "@/components/ui/button"
import { useTransition } from "react"
import { toast } from "sonner"

interface UnblockButtonProps {
    userId: string
}

export const UnblockButton = ({userId} : UnblockButtonProps) => {
    const [ isPending, startTransition ] = useTransition()

    const onClick = () => {
        startTransition(() => {
            onUnblock(userId)
                .then((res) => toast.success(`You have unblocked ${res.blocked.username}!`))
                .catch(() => toast.error('Oops! Something went wrong!'))
        })
    }

    return (
        <Button
        onClick={onClick}
        disabled={isPending}
        variant={'link'}
        size={'sm'}
        className="text-blue-500 w-full"
        >
            Unblock
        </Button>
    )
}