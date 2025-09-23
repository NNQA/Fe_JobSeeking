import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown, ChevronUp } from "lucide-react";
import { FilterProps } from "../../type/FilterType";

export const ClientInfoFilter = ({ expandedSections, toggleSection }: FilterProps) => {
    return (
        <div>
            <Button
                variant="ghost"
                onClick={() => toggleSection("clientInfo")}
                className="w-full justify-between p-0 h-auto font-semibold text-left"
            >
                Client info
                {expandedSections.clientInfo ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
            {expandedSections.clientInfo && (
                <div className="mt-3 space-y-3">
                    <div className="flex items-center space-x-2">
                        <Checkbox id="my-previous-clients" />
                        <label htmlFor="my-previous-clients" className="text-sm">
                            My previous clients <span className="text-gray-500">(0)</span>
                        </label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="payment-verified" />
                        <label htmlFor="payment-verified" className="text-sm">
                            Payment verified <span className="text-gray-500">(60)</span>
                        </label>
                    </div>
                </div>
            )}
        </div>
    );
};