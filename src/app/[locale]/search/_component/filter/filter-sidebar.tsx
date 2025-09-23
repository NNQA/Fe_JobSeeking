import { Card, CardContent } from "@/components/ui/card";
import { CategoryFilter } from "./category-filter";
import { ExperienceFilter } from "./experience-filter";
import { JobTypeFilter } from "./job-filter";
import { useFilterState } from "../../../../../lib/hooks/useFilterState";
import { JobCategory } from "@/lib/models/Categories";
import { AllFilterStates, FilterAction } from "../../type/FilterType";
interface FilterSideBarProps {
    categories: JobCategory[];
    filter: AllFilterStates;
    dispatch: (action: FilterAction) => void;
    isPending: boolean
}
export const FilterSidebar = ({ categories, filter, dispatch, isPending }: FilterSideBarProps) => {
    const { expandedSections, toggleSection } = useFilterState();

    return (
        <div className="space-y-4">
            <Card className="border-0 bg-transparent shadow-none">
                <CardContent className="p-4 space-y-6">
                    <CategoryFilter
                        categories={categories}
                        expandedSections={expandedSections}
                        toggleSection={toggleSection}
                        selectedCategoryIds={filter.categoryIds || []}
                        onCategoryIdsToggle={(categoryIds) => dispatch({ type: "TOGGLE_CATEGORIES", payload: categoryIds })}
                        isPending={isPending}

                    />

                    <ExperienceFilter
                        expandedSections={expandedSections}
                        toggleSection={toggleSection}
                        selectedJobLevels={filter.jobLevels || []}
                        onJobLevelToggle={(level) => dispatch({ type: "TOGGLE_JOBLEVELS", payload: level })}
                        isPending={isPending}
                    />
                    <JobTypeFilter
                        expandedSections={expandedSections}
                        toggleSection={toggleSection}
                        isPending={isPending}
                        selectedBudgetMethods={filter.t || []}
                        selectedFixedPriceRange={filter.amount || ""}
                        selectedHourlyRateRange={filter.hourly_rate || ""}
                        onBudgetMethodToggle={(method) => dispatch({ type: 'TOGGLE_T', payload: method })}
                        onFixedPriceRangeChange={(range) => dispatch({ type: 'TOGGLE_AMOUNT', payload: range })}
                        onHourlyRateRangeChange={(range) => dispatch({ type: 'TOGGLE_HOURLY_RATE', payload: range })}
                        key={"jobType"}
                    />

                    {/* Number of proposals */}
                    {/* <ProposalsFilter
                        expandedSections={expandedSections}
                        toggleSection={toggleSection}
                    /> */}


                    {/* Client info */}
                    {/* <ClientInfoFilter
                        expandedSections={expandedSections}
                        toggleSection={toggleSection}
                    /> */}
                </CardContent>
            </Card>
        </div>
    );
};