"use client"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Check } from "lucide-react"
import { useState, useRef } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { FilterProps } from "../../type/FilterType"
import { JobCategory } from "@/lib/models/Categories"

export interface CategoryFilterProps extends FilterProps {
    categories: JobCategory[]
    selectedCategoryIds: string[];
    onCategoryIdsToggle: (categoryIds: string) => void
    isPending: boolean
}
export const CategoryFilter = ({ expandedSections, toggleSection, categories, onCategoryIdsToggle, selectedCategoryIds, isPending }: CategoryFilterProps) => {
    const [open, setOpen] = useState(false)

    const contentRef = useRef<HTMLDivElement>(null);


    return (
        <div>
            <Button
                variant="ghost"
                onClick={() => toggleSection("category")}
                className="w-full justify-between p-1 h-auto text-left transition-all duration-300 hover:bg-gradient-to-r hover:from-muted/50 hover:to-accent/50 hover:shadow-sm hover:text-primary group font-normal text-base"
            >
                Category
                <div className="transition-transform duration-300 ease-in-out group-hover:scale-110">
                    {expandedSections.category ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </div>
            </Button>

            <div
                className={`overflow-hidden transition-all duration-500 ease-in-out transform ${expandedSections.category ? "opacity-100 translate-y-0 mt-3" : "opacity-0 -translate-y-4 mt-0"
                    }`}
                style={{
                    height: expandedSections.category ? contentRef.current?.scrollHeight || "auto" : "0px",
                    transitionProperty: "height, opacity, transform, margin-top",
                }}
            >
                <div ref={contentRef} className="pb-2">
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className="w-full px-4 py-5 justify-between border-border hover:border-2 hover:border-primary hover:transition-all hover:duration-75 text-left font-normal transition-all duration-300 group bg-background hover:bg-background"
                            >
                                <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                                    {selectedCategoryIds.length > 0
                                        ? `${selectedCategoryIds.length} categories selected`
                                        : "Select Categories"}
                                </span>
                                <div className="transition-transform duration-300 ease-in-out group-hover:rotate-180">
                                    <ChevronDown className="h-4 w-4 shrink-0" />
                                </div>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 max-w-sm" align="start" side="bottom">
                            <Command>
                                <CommandInput placeholder="Search categories..." className="h-9 border-0 focus:ring-0" />
                                <CommandList className="max-h-64 overflow-y-auto">
                                    <CommandEmpty>No categories found.</CommandEmpty>
                                    {categories?.map((category) => (
                                        <CommandGroup key={category.id} heading={category.name}>
                                            {category.children.map((subcategory) => (
                                                <CommandItem
                                                    key={subcategory.id}
                                                    value={subcategory.name}
                                                    onSelect={() => {
                                                        onCategoryIdsToggle(subcategory.id.toString())
                                                    }}
                                                    className="flex items-center space-x-3 px-3 py-2 transition-all duration-400 hover:bg-gradient-to-r hover:from-green-500/10 hover:to-emerald-500/10 dark:hover:from-green-400/20 dark:hover:to-emerald-400/20 hover:translate-x-2 hover:shadow-sm hover:border-l-4 hover:border-green-500 dark:hover:border-green-400 cursor-pointer"
                                                >
                                                    <Checkbox
                                                        checked={selectedCategoryIds.includes(subcategory.id.toString())}
                                                        onCheckedChange={(checked) =>
                                                            onCategoryIdsToggle(subcategory.id.toString())
                                                        }
                                                        className="h-5 w-5 rounded-md border-2 border-border data-[state=checked]:bg-green-700 dark:data-[state=checked]:bg-green-600 hover:ring-4 hover:ring-green-500/20 dark:hover:ring-green-400/30 hover:border-green-500 dark:hover:border-green-400 hover:shadow-md transform transition-all duration-300 hover:scale-125 hover:rotate-3 data-[state=checked]:text-white data-[state=checked]:border-green-700 dark:data-[state=checked]:border-green-600 data-[state=checked]:scale-110 data-[state=checked]:shadow-lg data-[state=checked]:animate-pulse"
                                                    />
                                                    <span className="flex-1 transition-all duration-300 hover:text-green-700 dark:hover:text-green-400 hover:font-medium hover:translate-x-1">
                                                        {subcategory.name}
                                                    </span>
                                                    {selectedCategoryIds.includes(subcategory.id.toString()) && (
                                                        <Check className="h-4 w-4 text-green-700 dark:text-green-400 animate-in fade-in-0 zoom-in-95" />
                                                    )}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    ))}
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </div>
    )
}