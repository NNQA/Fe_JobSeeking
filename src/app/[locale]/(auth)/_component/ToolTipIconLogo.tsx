import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

export function TooltipIconLogo(
    { icon, text }: { icon: React.ReactNode, text: string } = { icon: <></>, text: "" }
) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="outlineVariant" className="w-fit rounded-full px-3 py-5">
                        {icon}
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{text}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
export default TooltipIconLogo
