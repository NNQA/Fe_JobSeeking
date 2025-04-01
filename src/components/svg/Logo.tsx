import clsx from "clsx";
import Image from "next/image";

export default function Logo({ className }: { className?: string }) {
    return (
        <div className="z-20 flex items-center gap-2">
            <Image
                src="/logo.svg"
                alt="Logo"
                width={30}
                height={30}
                className={clsx("dark:text-secondary-foreground dark:bg-white dark:border dark:rounded-full", className)}
            />
            <div className="bg-secondary-foreground/90 dark:bg-secondary rounded-sm px-3 py-2 h-8 flex items-center justify-center">
                <h5 className="font-bold text-secondary dark:text-secondary-foreground drop-shadow-lg tracking-wide">
                    MTA
                </h5>
            </div>
        </div>

    );
}
