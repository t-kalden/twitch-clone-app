import { isFollowingUser } from "@/lib/follow-service"
import { getUserByUsername } from "@/lib/user-service"
import { notFound } from "next/navigation"
import { Actions } from "./_components/actions"
import { isBlockedByUser } from "@/lib/block-service"

interface UserPageProps {
    params: {
        username: string
    }
}

const UserPage = async ({ params } : UserPageProps) => {
    const user = await getUserByUsername(params.username)

    if(!user) {
        notFound();
    }

    const isFollowing = await isFollowingUser(user.id)
    const isBlocked = await isBlockedByUser(user.id)

    // if(isBlocked) {
    //     notFound()
    // }

    return (
        <div className="flex flex-col gap-y-4">
            <p>User: {user.username}</p>
            <p>User ID: {user.id}</p>
            <p>Following: {`${isFollowing}`} </p>
            <p>Blocked : {`${isBlocked}`}</p>
            <Actions 
            userId={ user.id } 
            isFollowing= { isFollowing }
            isBlocked={ isBlocked }/>
        </div>
    )
}

export default UserPage