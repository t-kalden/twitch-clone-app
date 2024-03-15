'use client'

import { 
    Dialog, 
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
 } from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import { useState, useTransition, useRef, ElementRef } from "react"
import { updateUser } from "@/actions/user"
import { toast } from "sonner"

interface BioModal {
    initialValue: string | null
}

export const BioModal = ({initialValue} : BioModal) => {

    const [ value, setValue ] = useState(initialValue)
    const [ isPending, startTransition ] = useTransition()
    const closeRef = useRef<ElementRef<'button'>>(null)

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        startTransition(() => {
            updateUser({bio:value})
                .then(() => {
                    toast.success('Your bio has been updated!')
                    closeRef?.current?.click()
                })
                .catch(() => toast.success('Oops! Something went wrong :('))
        })
    }

    return (
        <Dialog>
            <DialogTrigger>
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
                    <DialogTitle>
                        Edit user bio
                    </DialogTitle>
                </DialogHeader>
                <form
                onSubmit={onSubmit}
                className="space-y-4"
                >   
                    <Textarea
                    placeholder="User bio"
                    onChange={(e) => setValue(e.target.value)}
                    value={value || ''}
                    className="resize-none"
                    disabled={isPending}
                    />
                    <div className="flex justify-between">
                        <DialogClose
                        ref={closeRef}
                        >
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