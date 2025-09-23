import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown, ChevronUp } from "lucide-react";
import { FilterProps } from "../../type/FilterType";

export const ProposalsFilter = ({ expandedSections, toggleSection }: FilterProps) => {
    return (
        <div>
            <Button
                variant="ghost"
                onClick={() => toggleSection("proposals")}
                className="w-full justify-between p-0 h-auto font-semibold text-left"
            >
                Number of proposals
                {expandedSections.proposals ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
            {expandedSections.proposals && (
                <div className="mt-3 space-y-3">
                    <div className="flex items-center space-x-2">
                        <Checkbox id="less-than-5" />
                        <label htmlFor="less-than-5" className="text-sm">
                            Less than 5 <span className="text-gray-500">(12)</span>
                        </label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="5-to-10" />
                        <label htmlFor="5-to-10" className="text-sm">
                            5 to 10 <span className="text-gray-500">(14)</span>
                        </label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="10-to-15" />
                        <label htmlFor="10-to-15" className="text-sm">
                            10 to 15 <span className="text-gray-500">(11)</span>
                        </label>
                    </div>
                </div>
            )}
        </div>
    );
};