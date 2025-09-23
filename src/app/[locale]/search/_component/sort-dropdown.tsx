"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { parseAsString, useQueryState } from "nuqs"

interface SortDropdownProps { }

export function SortDropdown({ }: SortDropdownProps) {
    const [sortBy, setSortBy] = useQueryState("sortBy", parseAsString.withDefault("newest").withOptions({
        shallow: false
    }))
    return (
        <div className="flex justify-end">
            <div className="flex items-center text-end gap-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <Select value={sortBy} onValueChange={(e) => {
                    setSortBy(e)
                }}>
                    <SelectTrigger className="w-32">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent defaultValue={"newest"}>
                        <SelectItem value="newest">Newest</SelectItem>
                        <SelectItem value="relevance">Relevance</SelectItem>
                        <SelectItem value="client-rating">Client rating</SelectItem>
                        <SelectItem value="client-spend">Client spend</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}
