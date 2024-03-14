"use client"

import { 
    Dialog, 
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
 } from "@/components/ui/dialog"
 import { useState, useTransition, useRef, ElementRef } from "react"
 import { useRouter } from "next/navigation"
 import { updateStream } from "@/actions/stream"
 import { toast } from "sonner"
 import { Button } from "@/components/ui/button"
 import { Label } from "@/components/ui/label"
 import { Input } from "@/components/ui/input"
import { UploadDropzone } from "@/lib/uploadthing"
import { Hint } from "../hint"
import { Trash } from "lucide-react"
import Image from "next/image"

interface InfoModalProps {
    initialName: string
    initialThumbnailUrl: string | null
}

export default function InfoModal({initialName, initialThumbnailUrl}: InfoModalProps) {
    const [ name, setName ]= useState(initialName)
    const [ thumbnailUrl, setThumbnailUrl ]= useState(initialThumbnailUrl)
    const [ isPending, startTransition ] = useTransition()

    const router = useRouter()
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

    const onRemove = (() => {
        startTransition(() => {
            updateStream({ thumbnailUrl: null })
            .then(() => {
                toast.success("Thumbnail has been removed!"),
                closeRef?.current?.click()
            })
            .catch(() => toast.error('Oops! Something went wrong :('))
        })
    })

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
                <DialogTitle>
                    <DialogHeader>
                        <DialogHeader>
                            Edit stream info
                        </DialogHeader>
                    </DialogHeader>
                </DialogTitle>
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
                    <div className="space-y-2">
                        <Label>
                            Thumbnail
                        </Label>
                        {
                        (thumbnailUrl) 
                        ? <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
                            <div className="absolute top-2 right-2 z-[10]">
                                <Hint
                                label="Remove thumbnail"
                                asChild
                                side="left"
                                >
                                    <Button 
                                        type="button"
                                        disabled={isPending}
                                        onClick={onRemove}
                                        className="h-auto w-auto p-1.5"
                                    >
                                        <Trash className="h-4 w-4"/>
                                    </Button>
                                </Hint>
                            </div>
                            <Image 
                            src={thumbnailUrl}
                            alt="Thumbnail"
                            className="object-cover"
                            fill
                            />
                        </div>
                        :(
                        <div className="rounded-xl border outline-dashed outline-muted">
                            <UploadDropzone 
                            className="p-4"
                                endpoint="thumbnailUploader"
                                appearance={{
                                    label: { 
                                        color: '#f1f1f1'
                                    }, 
                                    allowedContent: '#f1f1f1',
                                    
                                }}
                                onClientUploadComplete={(res) => {
                                    setThumbnailUrl(res?.[0]?.url)
                                    router.refresh()
                                    closeRef?.current?.click()
                                }}
                            />
                        </div>
                        )}
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
