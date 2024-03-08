'use client'

interface ChatProps {
    hostName: string,
    hostIdentity: string,
    viewerName: string,
    isFollowing: boolean,
    isChatEnabled: boolean,
    isChatDelayed: boolean,
    isChatFollowersOnly: boolean,
}

export const Chat = ({
    hostName,
    hostIdentity,
    viewerName,
    isFollowing,
    isChatEnabled,
    isChatDelayed,
    isChatFollowersOnly
} : ChatProps) => {
    return (
        <div>
            Chat
        </div>
    )
}