import { Briefcase, Search } from "lucide-react"

interface EmptyStateProps {
    title?: string
    description?: string
    showIcon?: boolean
}

export function EmptyState({
    title = "There are no results that match your search.",
    description = "Please try adjusting your search keywords or filters.",
    showIcon = true,
}: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            {showIcon && (
                <div className="relative mb-8">
                    {/* Briefcase Icon */}
                    <div className="relative">
                        <Briefcase className="w-20 h-20 text-amber-700 fill-amber-600" strokeWidth={1.5} />
                        {/* Magnifying Glass Overlay */}
                        <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-lg">
                            <div className="bg-transparent rounded-full p-2">
                                <Search className="w-4 h-4 text-green-700" strokeWidth={3} />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="max-w-md space-y-3">
                <h3 className="text-lg font-medium text-gray-700">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
            </div>
        </div>
    )
}
