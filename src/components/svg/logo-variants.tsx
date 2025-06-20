"use client"

import { GalleryVerticalEnd } from "lucide-react"
import { cn } from "@/lib/utils"

interface LogoVariantProps {
    className?: string
    variant?: "default" | "minimal" | "badge" | "stacked"
}

export function LogoMinimal({ className }: { className?: string }) {
    return (
        <div
            className={cn(
                "flex items-center gap-2 self-center font-bold text-lg tracking-tight text-foreground transition-colors duration-200 hover:text-primary cursor-pointer",
                className,
            )}
        >
            NNQA<span className="text-primary">.</span>
        </div>
    )
}

export function LogoBadge({ className }: { className?: string }) {
    return (
        <div
            className={cn(
                "inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/10 font-medium text-sm text-foreground transition-all duration-200 hover:bg-primary/10 hover:border-primary/20 cursor-pointer group",
                className,
            )}
        >
            <div className="flex h-5 w-5 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <GalleryVerticalEnd className="size-3" />
            </div>
            <span className="font-semibold">
                NNQA<span className="text-primary">.</span>
            </span>
        </div>
    )
}

export function LogoStacked({ className }: { className?: string }) {
    return (
        <div
            className={cn(
                "flex flex-col items-center gap-2 self-center transition-all duration-200 hover:scale-105 cursor-pointer group",
                className,
            )}
        >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-200 group-hover:shadow-xl group-hover:shadow-primary/30">
                <GalleryVerticalEnd className="size-6" />
            </div>
            <span className="font-bold text-sm tracking-tight text-foreground transition-colors duration-200 group-hover:text-primary">
                NNQA<span className="text-primary">.</span>
            </span>
        </div>
    )
}
