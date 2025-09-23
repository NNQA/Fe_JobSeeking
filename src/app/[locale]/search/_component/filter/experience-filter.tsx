"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown, ChevronUp } from "lucide-react";
import { FilterProps } from "../../type/FilterType";
import { JobLevel } from "@/lib/models/enum/jobLevel-enum";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export interface ExperienceFilterProps extends FilterProps {
    selectedJobLevels: string[];
    onJobLevelToggle: (level: string) => void;
    isPending: boolean
}
function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export const ExperienceFilter = ({ expandedSections, toggleSection, isPending, onJobLevelToggle, selectedJobLevels }: ExperienceFilterProps) => {

    const [jobLevelOptions, setJobLevelOptions] = useState<{ id: number, name: string, number: number }[]>([])

    useEffect(() => {
        const options = Object.keys(JobLevel)
            .filter(key => isNaN(Number(key)))
            .map(key => ({
                id: JobLevel[key as keyof typeof JobLevel],
                name: key,
                number: getRandomInt(0, 1000)
            }))
        setJobLevelOptions(options)
    }, [])
    const contentRef = useRef<HTMLDivElement>(null);
    return (
        <div>
            <Button
                variant="ghost"
                onClick={() => toggleSection("experience")}
                className="w-full justify-between p-1 h-auto text-left transition-all duration-300 hover:bg-gradient-to-r hover:from-muted/50 hover:to-accent/50 hover:shadow-sm hover:text-primary group font-normal text-base"
            >
                Experience level
                {expandedSections.experience ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>


            <AnimatePresence>
                {expandedSections.experience && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                            duration: 0.4,
                            ease: [0.04, 0.62, 0.23, 0.98],
                            opacity: { duration: 0.9 },
                        }}
                        className="overflow-hidden"
                    >
                        <motion.div
                            initial={{ y: -10 }}
                            animate={{ y: 0 }}
                            exit={{ y: -10 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                            className="mt-3 space-y-3 pb-2 px-1"
                        >

                            {jobLevelOptions.map((level) => (
                                <div className="flex items-center space-x-2" key={level.id.toString()}>
                                    <Checkbox
                                        id={level.name}
                                        checked={selectedJobLevels.includes(level.name)}
                                        onCheckedChange={() => onJobLevelToggle(level.name)}
                                        className="h-5 w-5 border-primary border-2 data-[state=checked]:bg-green-700 dark:data-[state=checked]:bg-green-600 hover:ring-4 hover:ring-green-500/20 dark:hover:ring-green-400/30 hover:border-green-500 dark:hover:border-green-400 hover:shadow-md transform transition-all duration-300 hover:scale-125 hover:rotate-3 data-[state=checked]:text-white data-[state=checked]:border-green-700 dark:data-[state=checked]:border-green-600 data-[state=checked]:scale-110 data-[state=checked]:shadow-lg data-[state=checked]:animate-pulse"
                                    />
                                    <label htmlFor={level.name} className="text-sm">
                                        {level.name} <span className="">({level.number})</span>
                                    </label>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};