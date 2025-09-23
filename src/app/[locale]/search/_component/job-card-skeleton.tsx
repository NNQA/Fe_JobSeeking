import { Card, CardContent } from "@/components/ui/card"

export function JobCardSkeleton() {
    return (
        <Card className="hover:shadow-md transition-shadow border-0 border-b border-gray-200 rounded-none">
            <CardContent className="p-6 animate-pulse">
                {/* Header with time posted and action buttons */}
                <div className="flex justify-between items-start mb-2">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 bg-gray-200 rounded"></div>
                        <div className="h-8 w-8 bg-gray-200 rounded"></div>
                    </div>
                </div>

                {/* Job title skeleton */}
                <div className="mb-3">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-1"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                </div>

                {/* Client info row skeleton */}
                <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-1">
                        <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-20"></div>
                    </div>

                    <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="h-4 w-4 bg-gray-200 rounded"></div>
                        ))}
                        <div className="h-4 bg-gray-200 rounded w-6 ml-1"></div>
                    </div>

                    <div className="h-4 bg-gray-200 rounded w-16"></div>

                    <div className="flex items-center gap-1">
                        <div className="h-4 w-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded w-12"></div>
                    </div>
                </div>

                {/* Job type and duration info skeleton */}
                <div className="h-4 bg-gray-200 rounded w-80 mb-4"></div>

                {/* Job description skeleton */}
                <div className="mb-4">
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>

                {/* Skills tags skeleton */}
                <div className="flex flex-wrap gap-2 mb-4">
                    <div className="h-6 bg-green-200 rounded-full w-16"></div>
                    <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                    <div className="h-6 bg-gray-200 rounded-full w-18"></div>
                    <div className="h-6 bg-gray-200 rounded-full w-14"></div>
                </div>

                {/* Proposals count skeleton */}
                <div className="h-4 bg-gray-200 rounded w-24"></div>
            </CardContent>
        </Card>
    )
}
