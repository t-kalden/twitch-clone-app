'use client'

import { Participant, Track } from "livekit-client"
import { useRef } from "react"
import { useTracks } from "@livekit/components-react"

interface LiveVideoProps {
    participant: Participant
}

export const LiveVideo = ({participant} : LiveVideoProps) => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const wrapperRef = useRef<HTMLDivElement>(null)

    useTracks([ Track.Source.Camera, Track.Source.Microphone ])
    .filter(
        (track) => track.participant.identity === participant.identity
    )
    .forEach((track) => {
        track.publication.track?.attach(videoRef.current)
    })
        

    return (
        <div 
        className="relative h-full flex"
        ref={wrapperRef}
        >
            <video 
            ref={videoRef}
            width='100%'
            />
        </div>
    )
}