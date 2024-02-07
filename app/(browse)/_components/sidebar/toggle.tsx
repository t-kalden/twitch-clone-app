'use client'

import { Button } from "@/components/ui/button"
import { useSidebar } from "@/store/use-sidebar"
import { UserButton } from "@clerk/nextjs"
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react"

export const Toggle = () => {
    const { collapsed, onExpand, onCollapse } = useSidebar((state) => state)
    const lable = collapsed ? 'Expand' : 'Collapse'
    return (
        <>
            {/* check if sidebar is collapsed 
            and render the expand button and a thin sidebar */}
            {
                collapsed &&(
                    <div className="hidden lg:flex w-full items-center justify-center pt-4 mb-4">
                        <Button 
                        variant={'ghost'}
                        className="h-auto p-2"
                        onClick={onExpand}
                        >
                            <ArrowRightFromLine className="h-4 w-4"/>
                        </Button>
                    </div>
                )
            }
            {/* check if not collapsed and render collapse button and for you content */}
            { 
                !collapsed && (
                    <div className="p-3 pl-6 mb-2 flex items-center w-full">
                        <p className="font-semibold text-primary">For you</p>
                        <Button 
                        className="h-auto p-2 ml-auto"
                        variant={'ghost'}
                        onClick={onCollapse}>
                            <ArrowLeftFromLine className="h-4 w-4"/> 
                        </Button>
                    </div>
                )
            }

        </>
    )
}