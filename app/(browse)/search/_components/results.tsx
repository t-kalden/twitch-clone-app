import { redirect } from "next/navigation"

interface ResultProps {
    term?: string
}

export const Results = async ({term}: ResultProps) => {
    
    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">
                Results for &quot;{term}&quot; 
            </h2>
        </div>
    )
}

export const ResultsSkeleton = () => {
    return (
        <div>

        </div>
    )
}