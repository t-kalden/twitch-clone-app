'use client'

import { Switch } from "@/components/ui/switch"

type FieldTypes = 'isChatEnabled' | 'isChatDelayed' | 'isChatFollowersOnly'

interface ToggleCardProps {
    label: string
    value: boolean
    field: FieldTypes
}

export const ToggleCard = ({ label, value, field }: ToggleCardProps) => {
    


    return (
        <div className="rounded-xl bg-muted px-6 py-4">
            <div className="flex items-center justify-between">
                <p className="font-semi-bold shrink-0">
                    {label}
                </p>
                <div className="space-y-2">
                    <Switch 
                    checked={value}
                    >
                        {value ? 'On' : 'Off'}
                    </Switch>
                </div>
            </div>
        </div>
    )
}