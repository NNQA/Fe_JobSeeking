"use client"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import React, { useState } from "react"
import { FilterTags } from "./filter/filter-tags"
import { JobCategory } from "@/lib/models/Categories"
import { AllFilterStates, FilterAction } from "../type/FilterType"
interface SearchHeaderProps {
    categories?: JobCategory[];
    isPending: boolean;
    filters: AllFilterStates;
    dispatch: (action: FilterAction) => void;
}

export function SearchHeader({ categories, dispatch, filters, isPending }: SearchHeaderProps) {


    const { q, categoryIds, jobLevels, amount, hourly_rate, t } = filters
    const [text, setText] = useState(q || "")

    const getSelectedCategories = () => {
        if (!categories || categoryIds?.length === 0) return []
        return categories.flatMap(e => e.children).filter(e => categoryIds?.includes(e.id.toString()))
    }

    const getJobLevelDisplayName = (level: string) => {
        const levelNames: Record<string, string> = {
            'ENTRY_LEVEL': 'Entry Level',
            'INTERMEDIATE': 'Intermediate',
            'EXPERT': 'Expert'
        }
        return levelNames[level] || level
    }



    const getBudgetMethodDisplayName = (method: string) => {
        return method === '0' ? 'Hourly' : method === '1' ? 'Fixed Price' : method
    }



    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            dispatch({ type: 'SET_QUERY', payload: text });
        }
    }

    const handleClearSearch = () => {
        setText("");
        dispatch({ type: 'SET_QUERY', payload: null });
    };

    const hasActiveFilters =
        (filters.q && filters.q.length > 0) ||
        (filters.categoryIds && filters.categoryIds.length > 0) ||
        (filters.jobLevels && filters.jobLevels.length > 0) ||
        (filters.t && filters.t.length > 0) ||
        filters.amount ||
        filters.hourly_rate;

    const activeFilterCount =
        (filters.q ? 1 : 0) +
        (filters.categoryIds?.length || 0) +
        (filters.jobLevels?.length || 0) +
        (filters.t?.length || 0) +
        (filters.amount ? 1 : 0) +
        (filters.hourly_rate ? 1 : 0);
    return (
        <div className="bg-transparent mt-5">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center gap-4 mb-4">
                    <div className="relative flex-1 max-w-2xl">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Input
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Search for skills, services, or freelancers"
                            className="pl-10 pr-10 h-12 text-lg rounded-full border-2"
                            onKeyDown={handleKeyDown}
                        />

                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={handleClearSearch}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full h-8 w-8 p-0"
                        >
                            <X className="h-4 w-4" />
                        </Button>

                    </div>
                    <Button variant="ghost" className="text-green-700 dark:text-green-500 hover:bg-transparent hover:text-green-700">
                        Advanced search
                    </Button>
                </div>

                {hasActiveFilters && (
                    <div className="flex items-center gap-2 flex-wrap">

                        {getSelectedCategories().map((category) => (
                            <FilterTags
                                key={`cat-${category.id}`}
                                label={category.name}
                                onRemove={() => dispatch({ type: 'TOGGLE_CATEGORIES', payload: category.id.toString() })}
                            />
                        ))}

                        {jobLevels?.map((level) => (
                            <FilterTags
                                key={`level-${level}`}
                                label={getJobLevelDisplayName(level)}
                                onRemove={() => dispatch({ type: 'TOGGLE_JOBLEVELS', payload: level })}
                            />
                        ))}

                        {t?.map((method) => (
                            <FilterTags
                                key={`budget-${method}`}
                                label={getBudgetMethodDisplayName(method)}
                                onRemove={() => dispatch({ type: 'TOGGLE_T', payload: "" })}
                            />
                        ))}

                        {amount && (
                            <FilterTags
                                label={`Fixed: $${amount.replace('-', ' - $')}`}
                                onRemove={() => dispatch({ type: 'TOGGLE_AMOUNT', payload: null })}
                            />
                        )}

                        {hourly_rate && (
                            <FilterTags
                                label={`Hourly: $${hourly_rate.replace('-', ' - $')}/hr`}
                                onRemove={() => dispatch({ type: 'TOGGLE_HOURLY_RATE', payload: null })}
                            />
                        )}

                        <Button
                            variant="link"
                            className="text-green-700 dark:text-green-500 text-sm p-0 h-auto hover:text-green-700"
                            onClick={() => dispatch({ type: 'CLEAR_ALL_FILTERS' })}
                        >
                            Clear all filters ({activeFilterCount})
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
