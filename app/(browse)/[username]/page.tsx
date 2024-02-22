interface UserPgeProps {
    params: {
        username: string
    }
}

const UserPage = ({ params } : UserPgeProps) => {
    return (
        <>
            User: {params.username}
        </>
    )
}

export default UserPage