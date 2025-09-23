"use client"

import { useRef, useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { FilterProps } from "../../type/FilterType"
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs"

export interface JobTypeFilterProps extends FilterProps {
    isPending: boolean;

    selectedBudgetMethods: string[];
    selectedFixedPriceRange: string;
    selectedHourlyRateRange: string;

    onBudgetMethodToggle: (method: string) => void;
    onFixedPriceRangeChange: (range: string | null) => void;
    onHourlyRateRangeChange: (range: string | null) => void;
}

export function JobTypeFilter({ expandedSections,
    toggleSection,
    isPending,
    selectedBudgetMethods,
    selectedFixedPriceRange,
    selectedHourlyRateRange,
    onBudgetMethodToggle,
    onFixedPriceRangeChange,
    onHourlyRateRangeChange, }: JobTypeFilterProps) {


    const [customHourlyMin, setCustomHourlyMin] = useState("")
    const [customHourlyMax, setCustomHourlyMax] = useState("")
    const [customFixedMin, setCustomFixedMin] = useState("")
    const [customFixedMax, setCustomFixedMax] = useState("")
    const [isCustomHourlyEnabled, setIsCustomHourlyEnabled] = useState(false);
    const [isCustomFixedEnabled, setIsCustomFixedEnabled] = useState(false);

    const contentRef = useRef<HTMLDivElement>(null);
    const priceRanges = [
        { id: "less-than-100", label: "Less than $100", value: "0-99", count: 3 },
        { id: "100-to-500", label: "$100 to $500", value: "100-500", count: 9 },
        { id: "500-to-1k", label: "$500 - $1K", value: "500-1000", count: 7 },
        { id: "1k-to-5k", label: "$1K - $5K", value: "1000-5000", count: 4 },
        { id: "5k-plus", label: "$5K+", value: "5000-999999", count: 0 },
    ]

    const handleToggleCustomHourly = (enabled: boolean) => {
        setIsCustomHourlyEnabled(enabled);
        if (!enabled) {
            onHourlyRateRangeChange(null);
            setCustomHourlyMin("");
            setCustomHourlyMax("");
        }
    };

    const handleToggleCustomFixed = (enabled: boolean) => {
        setIsCustomFixedEnabled(enabled);
        if (!enabled) {
            onFixedPriceRangeChange(null);
            setCustomFixedMin("");
            setCustomFixedMax("");
        }
    };

    const handleCustomHourlyRangeBlur = () => {
        if (customHourlyMin && customHourlyMax) {
            onHourlyRateRangeChange(`${customHourlyMin}-${customHourlyMax}`);
        }
    };

    const handleCustomFixedRangeBlur = () => {
        if (customFixedMin && customFixedMax) {
            onFixedPriceRangeChange(`${customFixedMin}-${customFixedMax}`);
        }
    };


    const handlePresetFixedRangeChange = (rangeValue: string, checked: boolean) => {
        if (checked) {
            onFixedPriceRangeChange(rangeValue);
        } else {
            onFixedPriceRangeChange(null);
        }
    };

    return (
        <div>
            <Button
                variant="ghost"
                onClick={() => toggleSection("jobType")}
                className="w-full justify-between p-1 h-auto text-left transition-all duration-300 hover:bg-gradient-to-r hover:from-muted/50 hover:to-accent/50 hover:shadow-sm hover:text-primary group font-normal text-base"
            >
                Job Type
                {expandedSections.jobType ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>

            <div
                className={`transition-all duration-500 ease-in-out transform ${expandedSections.jobType ? "opacity-100 translate-y-0 mt-3" : "opacity-0 -translate-y-4 mt-0"
                    }`}
                style={{
                    height: expandedSections.jobType ? contentRef.current?.scrollHeight || "auto" : "0px",
                    transitionProperty: "height, opacity, transform, margin-top",
                }}
            >
                <div ref={contentRef} className="mt-3 space-y-4 pb-3">
                    <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="hourly"
                                checked={selectedBudgetMethods.includes("0")}
                                className="h-5 w-5 border-primary border-2 data-[state=checked]:bg-green-700 dark:data-[state=checked]:bg-green-600 hover:ring-4 hover:ring-green-500/20 dark:hover:ring-green-400/30 hover:border-green-500 dark:hover:border-green-400 hover:shadow-md transform transition-all duration-300 hover:scale-125 hover:rotate-3 data-[state=checked]:text-white data-[state=checked]:border-green-700 dark:data-[state=checked]:border-green-600 data-[state=checked]:scale-110 data-[state=checked]:shadow-lg data-[state=checked]:animate-pulse"
                                onCheckedChange={() => onBudgetMethodToggle('0')}
                            />
                            <label htmlFor="hourly" className="text-sm cursor-pointer">
                                Hourly <span className="text-muted-foreground">(49)</span>
                            </label>
                        </div>

                        <div className="flex items-center gap-2 ml-6">
                            <Checkbox
                                id="hourly-range"
                                checked={isCustomHourlyEnabled}
                                disabled={isPending}
                                onCheckedChange={(checked) => handleToggleCustomHourly(checked as boolean)}
                                className="h-5 w-5 border-border border-2 data-[state=checked]:bg-green-700 dark:data-[state=checked]:bg-green-600 hover:ring-4 hover:ring-green-500/20 dark:hover:ring-green-400/30 hover:border-green-500 dark:hover:border-green-400 hover:shadow-md transform transition-all duration-300 hover:scale-125 hover:rotate-3 data-[state=checked]:text-white data-[state=checked]:border-green-700 dark:data-[state=checked]:border-green-600 data-[state=checked]:scale-110 data-[state=checked]:shadow-lg data-[state=checked]:animate-pulse"
                            />
                            <div className="flex items-center gap-1">
                                <span className="text-sm">$</span>
                                <Input
                                    type="number"
                                    placeholder="Min"
                                    value={customHourlyMin}
                                    onChange={(e) => setCustomHourlyMin(e.target.value)}
                                    onBlur={handleCustomHourlyRangeBlur}
                                    disabled={!isCustomHourlyEnabled}
                                    className="w-20 h-8 text-sm disabled:opacity-50"
                                />
                            </div>
                            <span className="text-sm text-muted-foreground">-</span>
                            <div className="flex items-center gap-1">
                                <span className="text-sm">$</span>
                                <Input
                                    type="number"
                                    placeholder="Max"
                                    value={customHourlyMax}
                                    onChange={(e) => setCustomHourlyMax(e.target.value)}
                                    onBlur={handleCustomHourlyRangeBlur}
                                    disabled={!isCustomHourlyEnabled}
                                    className="w-20 h-8 text-sm disabled:opacity-50"
                                />
                            </div>
                            <span className="text-sm text-muted-foreground">/hr</span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="fixed-price"
                                checked={selectedBudgetMethods.includes("1")}
                                onCheckedChange={() => onBudgetMethodToggle("1")}
                                className={"h-5 w-5 border-primary border-2 data-[state=checked]:bg-green-700 dark:data-[state=checked]:bg-green-600 hover:ring-4 hover:ring-green-500/20 dark:hover:ring-green-400/30 hover:border-green-500 dark:hover:border-green-400 hover:shadow-md transform transition-all duration-300 hover:scale-125 hover:rotate-3 data-[state=checked]:text-white data-[state=checked]:border-green-700 dark:data-[state=checked]:border-green-600 data-[state=checked]:scale-110 data-[state=checked]:shadow-lg data-[state=checked]:animate-pulse"}
                            />
                            <label htmlFor="fixed-price" className="text-sm cursor-pointer">
                                Fixed-Price <span className="text-muted-foreground">(23)</span>
                            </label>
                        </div>


                        <div className="ml-6 space-y-2">
                            {priceRanges.map((range) => (
                                <div key={range.id} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={range.id}
                                        checked={selectedFixedPriceRange === range.value}
                                        className="h-5 w-5 border-border border-2 data-[state=checked]:bg-green-700 dark:data-[state=checked]:bg-green-600 hover:ring-4 hover:ring-green-500/20 dark:hover:ring-green-400/30 hover:border-green-500 dark:hover:border-green-400 hover:shadow-md transform transition-all duration-300 hover:scale-125 hover:rotate-3 data-[state=checked]:text-white data-[state=checked]:border-green-700 dark:data-[state=checked]:border-green-600 data-[state=checked]:scale-110 data-[state=checked]:shadow-lg data-[state=checked]:animate-pulse"
                                        onCheckedChange={(checked) => handlePresetFixedRangeChange(range.value, !!checked)}
                                    />
                                    <label htmlFor={range.id} className="text-sm cursor-pointer">
                                        {range.label} <span className="text-muted-foreground">({range.count})</span>
                                    </label>
                                </div>
                            ))}
                            <div className="flex items-center gap-2 pt-2">
                                <Checkbox
                                    id="custom-fixed-range"
                                    checked={isCustomFixedEnabled}
                                    onCheckedChange={(checked) => handleToggleCustomFixed(checked as boolean)}
                                    className="h-5 w-5 border-border border-2 data-[state=checked]:bg-green-700 dark:data-[state=checked]:bg-green-600 hover:ring-4 hover:ring-green-500/20 dark:hover:ring-green-400/30 hover:border-green-500 dark:hover:border-green-400 hover:shadow-md transform transition-all duration-300 hover:scale-125 hover:rotate-3 data-[state=checked]:text-white data-[state=checked]:border-green-700 dark:data-[state=checked]:border-green-600 data-[state=checked]:scale-110 data-[state=checked]:shadow-lg data-[state=checked]:animate-pulse"
                                />
                                <div className="flex items-center gap-1">
                                    <span className="text-sm">$</span>
                                    <Input
                                        type="number"
                                        placeholder="Min"
                                        value={customFixedMin}
                                        onChange={(e) => setCustomFixedMin(e.target.value)}
                                        onBlur={handleCustomFixedRangeBlur}
                                        disabled={!isCustomFixedEnabled}
                                        className="w-20 h-8 text-sm disabled:opacity-50"
                                    />
                                </div>
                                <span className="text-sm text-muted-foreground">-</span>
                                <div className="flex items-center gap-1">
                                    <span className="text-sm">$</span>
                                    <Input
                                        type="number"
                                        placeholder="Max"
                                        value={customFixedMax}
                                        onChange={(e) => setCustomFixedMax(e.target.value)}
                                        onBlur={handleCustomFixedRangeBlur}
                                        disabled={!isCustomFixedEnabled}
                                        className="w-20 h-8 text-sm disabled:opacity-50"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div >
    )
}
