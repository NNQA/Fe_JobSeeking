import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

function AvataUser({ className }: { className?: string }) {
    return (
        <Avatar className={cn("h-[90px] w-[90px] rounded-md", className)}>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    );
}

export default AvataUser;
