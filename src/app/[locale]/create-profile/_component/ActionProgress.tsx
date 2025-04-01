"use client"
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React, { memo } from 'react'

function trim(input: string): string {
    const parts = input.split("/").filter(Boolean);
    return parts[2] || "";
}
function ActionProgress({ steps }: { steps: string[] }) {
    const pathname = usePathname();
    const trimPathname = trim(pathname);
    const currentIndex = steps.findIndex((step) => step === trimPathname);

    const prevStep = currentIndex > 0 ? steps[currentIndex - 1] : "/";
    const nextStep = currentIndex < steps.length - 1 ? steps[currentIndex + 1] : "/";

    const progressValue = steps.length > 1 ? (currentIndex / (steps.length - 1)) * 100 : 0;
    return (
        <div className='sticky bottom-0 bg-background'>
            <Progress value={progressValue} className='w-full h-2'></Progress>
            <div className='w-full flex justify-between px-10 py-6'>
                <Button variant={"outlineVariant"} asChild>
                    <Link href={prevStep} className='hover:no-underline' prefetch={true}>
                        Back
                    </Link>
                </Button>
                <Button asChild variant={"default"}>
                    <Link href={nextStep} className='hover:no-underline' prefetch={true}>
                        Next step
                    </Link>
                </Button>
            </div>
        </div>
    )
}

export default memo(ActionProgress, (prevProps, nextProps) => {
    return prevProps.steps === nextProps.steps
})