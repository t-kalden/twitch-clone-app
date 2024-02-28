'use client'

import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"
import { useTransition } from "react"
import { updateStream } from "@/actions/stream"
import { Skeleton } from "@/components/ui/skeleton"

type FieldTypes = 'isChatEnabled' | 'isChatDelayed' | 'isChatFollowersOnly'

interface ToggleCardProps {
    label: string
    value: boolean
    field: FieldTypes
}

export const ToggleCard = ({ label, value, field }: ToggleCardProps) => {
    
    const [ isPending, startTransition ] = useTransition()

    const onChange = () => {
        startTransition(() => {
            updateStream({ [field]: !value })
            .then(() => toast.success('Chat settings updated!'))
            .catch(() => toast.error("Oops! Something went wrong :("))
        })
    }
    
    return (
        <div className="rounded-xl bg-muted px-6 py-4">
            <div className="flex items-center justify-between">
                <p className="font-semi-bold shrink-0">
                    {label}
                </p>
                <div className="space-y-2">
                    <Switch 
                    disabled={isPending}
                    onCheckedChange={onChange}
                    checked={value}
                    >
                        {value ? 'On' : 'Off'}
                    </Switch>
                </div>
            </div>
        </div>
    )
}

export const ToggleCardSkeleton = () => {
    return (
        <Skeleton className="rounded-xl px-10 py-6 w-full" /> 
    )
}