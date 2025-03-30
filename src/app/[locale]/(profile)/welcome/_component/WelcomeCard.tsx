import { Button } from "@/components/ui/button";
import { ClipboardIcon, Shield, UserIcon } from "lucide-react";
import Link from "next/link";

export default function WelcomeCard({ name }: { name?: string }) {
    return (
        <div className="text-start space-y-16 w-full">
            <h1 className="text-4xl font-semibold tracking-normal leading-[3rem] max-w-[300px] md:max-w-full mx-auto">
                Hey {name}, Ready for your next big opportunity?
            </h1>

            <div className="space-y-5 text-left w-[80%]">
                <div className="flex items-center gap-6 space-x-5 h-24 border-b-[0.2px] border-muted-foreground/60">
                    <UserIcon className="text-foreground/80 h-7 w-7" />
                    <p className="font-semibold">Answer a few questions and start building your profile</p>
                </div>

                <div className="flex items-center space-x-5 gap-6 h-24 border-b-[0.2px] border-muted-foreground/60">
                    <ClipboardIcon className="text-foreground/80 h-7 w-7" />
                    <p className="font-semibold">Apply for open roles or list services for clients to buy</p>
                </div>
                <div className="flex items-center space-x-5  gap-6 h-24 border-b-[0.2px] border-muted-foreground/60">
                    <Shield className="text-foreground/80 h-7 w-7" />
                    <p className="font-semibold">Get paid safely and know we’re there to help</p>
                </div>
            </div>
            <div className="flex items-center gap-10">
                <Button className="transition text-base px-6 bg-primary py-5 rounded-lg" asChild>
                    <Link href={"/create-profile/categories"} className="hover:no-underline">
                        Get started
                    </Link>
                </Button>

                <p className="text-muted-foreground font-bold">
                    It only takes 5-10 minutes and you can edit it later. <br />
                    We’ll save as you go.
                </p>
            </div>
        </div>
    );
}
