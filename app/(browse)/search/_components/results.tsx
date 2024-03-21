import { getSearch } from "@/lib/search-service"
import { redirect } from "next/navigation"
import { ResultCard } from "./result-card"

interface ResultProps {
    term?: string
}

export const Results = async ({term}: ResultProps) => {
    const data = await getSearch(term)

    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">
                Results for &quot;{term}&quot; 
            </h2>
            {
                data.length === 0 && (
                    <p className="text-muted-foreground text-sm">
                        No results found. Try searching for something else.
                    </p>
                )
            }
            <div className="flex flex-col gap-y-4">
                {
                    data.map((result) => (
                        <ResultCard 
                        data={result}
                        key={result.id}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export const ResultsSkeleton = () => {
    return (
        <div>

        </div>
    )
}