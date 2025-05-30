import {
    EnvelopeClosedIcon,
    GitHubLogoIcon,
    LinkedInLogoIcon,
} from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import TooltipIconLogo from "./ToolTipIconLogo";
import { cn } from "@/lib/utils";

interface LoginposterProps {
    textGoogle: string;
    textLinkin: string;
    textGithub: string;
    className?: string;
}
function LoginWithSocialMedia({ textGithub, textGoogle, textLinkin, className }: LoginposterProps) {
    const linkGGLogin = `${process.env.NEXT_PUBLIC_API_GG}/${"vi"}${process.env.NEXT_PUBLIC_GOOGLE_CLIENT}`;
    return (
        <div className={cn("flex gap-5 justify-center", className)}>
            <TooltipIconLogo icon={
                <GitHubLogoIcon className="w-5 h-5"></GitHubLogoIcon>
            }
                text={textGithub}
            />
            <TooltipIconLogo icon={
                <EnvelopeClosedIcon className="w-5 h-5 text-red-500"></EnvelopeClosedIcon>
            }
                text={textGoogle}
            />
            <TooltipIconLogo icon={
                <LinkedInLogoIcon className="w-5 h-5 text-blue-500"></LinkedInLogoIcon>
            }
                text={textLinkin}
            />
        </div>
    );
}

export default LoginWithSocialMedia;