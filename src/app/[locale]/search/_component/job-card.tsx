"use client"

import { Heart, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type { JobDocument } from "@/lib/models/Document/JobDocument"
import { BudgetMethod } from "@/lib/models/enum/budget-enum"
import type { JobLevel } from "@/lib/models/enum/jobLevel-enum"
import useFilters from "../hooks/useFilter"
interface JobCardProps {
    job: JobDocument
    // onSave: (jobId: string) => void
    // onApply: (jobId: string) => void
}
const budgetEnumValue = Object.values(BudgetMethod)
type budgetMethodCompProps = {
    budgetMethod: BudgetMethod
    jobLevel: JobLevel
    budgetAmountMax: number
    budgetAmountMin: number
    hourlyRateMax: number
    hourlyRateMin: number
    durationEstimate: string
    deadline: string
}
export function BudgetMethodComp({
    budgetMethod,
    jobLevel,
    budgetAmountMax,
    budgetAmountMin,
    hourlyRateMax,
    hourlyRateMin,
    durationEstimate,
    deadline,
}: budgetMethodCompProps) {
    const isHourly = budgetMethod.toString() === BudgetMethod.HOURLY.toString()

    const formatNumber = (num: number | null | undefined) => {
        if (num === null || num === undefined) return null
        return Number(num.toFixed(2)) // làm tròn 2 chữ số thập phân
    }

    const renderRange = (min?: number | null, max?: number | null) => {
        const minVal = formatNumber(min)
        const maxVal = formatNumber(max)

        if (minVal && maxVal) {
            return `$${minVal} - $${maxVal}`
        }
        if (minVal && !maxVal) {
            return `$${minVal}`
        }
        if (!minVal && maxVal) {
            return `Up to $${maxVal}`
        }
        return "Not specified"
    }

    return (
        <div className="text-sm text-gray-600 mb-4 flex items-center gap-1 flex-wrap">
            {isHourly ? (
                <>
                    <span>{BudgetMethod.HOURLY.toString()}:</span>
                    <span>{renderRange(hourlyRateMin, hourlyRateMax)}</span>
                </>
            ) : (
                <>
                    <span>{BudgetMethod.FIXED_PRICE.toString()}:</span>
                    <span>{renderRange(budgetAmountMin, budgetAmountMax)}</span>
                </>
            )}
            <span>-</span>
            <span>{jobLevel}</span>
            <span>-</span>
            <span>Est. time: {durationEstimate}</span>
        </div>
    )
}

export function JobCard({ job }: JobCardProps) {
    const { filter } = useFilters()
    const { q } = filter

    const highlightText = (text: string, query: string) => {
        if (!query || !text) return text

        const parts = text.split(new RegExp(`(${query})`, "gi"))
        return parts.map((part, index) => {
            if (part.toLowerCase() === query.toLowerCase()) {
                return (
                    <span key={index} className="bg-green-500 text-white px-1 rounded">
                        {part}
                    </span>
                )
            }
            return part
        })
    }

    const formatBudget = () => {
        if (job.budgetMethod === BudgetMethod.FIXED_PRICE) {
            return `$${job.budgetAmountMin?.toLocaleString() || "0"} - $${job.budgetAmountMax?.toLocaleString() || "0"}`
        } else {
            return `$${job.hourlyRateMin || 0} - $${job.hourlyRateMax || 0}/hr`
        }
    }

    const formatTimePosted = () => {
        if (!job.createdDateTime) return "Recently posted"

        const now = new Date()
        const posted = new Date(job.createdDateTime)
        const diffInHours = Math.floor((now.getTime() - posted.getTime()) / (1000 * 60 * 60))

        if (diffInHours < 24) {
            return `${diffInHours} hours ago`
        } else {
            const diffInDays = Math.floor(diffInHours / 24)
            return `${diffInDays} days ago`
        }
    }

    return (
        <Card className="hover:bg-primary-foreground hover:bg-opacity-40 bg-background border-0 border-b border-border rounded-none">
            <CardContent className="p-6 group">
                <div className="flex justify-between items-start">
                    <span className="text-xs text-gray-700">Posted {formatTimePosted()}</span>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" className="p-2 text-green-700 hover:text-green-600 group-hover:bg-card hover:ring-1 hover:ring-green-500">
                            <Bookmark className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => { }} className="p-2 text-green-700 hover:text-green-600 group-hover:bg-card hover:ring-1 hover:ring-green-500">
                            <Heart className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <h3 className="text-xl font-medium mb-3 text-primary">{highlightText(job.title, q ?? "")}</h3>

                <BudgetMethodComp
                    budgetAmountMax={job.budgetAmountMax}
                    budgetAmountMin={job.budgetAmountMin}
                    budgetMethod={job.budgetMethod}
                    deadline={job.deadline}
                    durationEstimate={job.durationEstimate}
                    hourlyRateMax={job.hourlyRateMax}
                    hourlyRateMin={job.hourlyRateMin}
                    jobLevel={job.jobLevel}
                    key={"budgetComp"}
                />
                <p className="text-sm mb-4 leading-relaxed">{highlightText(job.description, q ?? "")}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {job.requiredSkills?.map((skill, index) => (
                        <Badge
                            key={skill.id}
                            variant={"secondary"}
                        >
                            {skill.name}
                        </Badge>
                    )) || <span className="text-gray-500 text-sm">No skills specified</span>}
                </div>
                <div className="text-sm text-gray-600">
                    <span className="font-medium">Proposals:</span> 5 to 10
                </div>
            </CardContent>
        </Card>
    )
}
