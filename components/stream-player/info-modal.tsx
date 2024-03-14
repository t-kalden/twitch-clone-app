"use client"

import { 
    Dialog, 
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
 } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useState, useTransition, useRef, ElementRef } from "react"
import { updateStream } from "@/actions/stream"
import { toast } from "sonner"

interface InfoModalProps {
    initialName: string
    initialThumbnailUrl: string | null
}

export default function InfoModal({initialName, initialThumbnailUrl}: InfoModalProps) {
    const [ name, setName ]= useState(initialName)
    const [ isPending, startTransition ] = useTransition()
    const closeRef = useRef<ElementRef<'button'>>(null)
    
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const onSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        e.stopPropagation()

        startTransition(() => {
            updateStream({ name: name })
                .then(() => {
                    toast.success('Stream name has been updated!')
                    closeRef?.current?.click()
                })
                .catch(() => toast.error('Oops! Something went wrong :('))
        })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button 
                variant={'link'}
                size={'sm'}
                className="ml-auto"
                >
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogHeader>
                        Edit stream info
                    </DialogHeader>
                </DialogHeader>
                <form onSubmit={onSubmit} className="space-y-14">
                    <div className="space-y-2">
                        <Label>
                            Name
                        </Label>
                        <Input 
                        placeholder="Stream name"
                        onChange={onChange}
                        value={name}
                        disabled={isPending}
                        />
                    </div>
                    <div className="flex justify-between">
                        <DialogClose 
                        asChild
                        ref={closeRef}>
                            <Button
                            type="button"
                            variant={'ghost'}
                            >
                                Close
                            </Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            variant={'primary'}
                            disabled={isPending}
                            >
                                Save
                            </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
