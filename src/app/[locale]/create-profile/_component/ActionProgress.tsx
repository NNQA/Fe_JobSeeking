"use client"
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { useProfileWizard } from '@/lib/context/ProfileWizardProvider';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React, { memo } from 'react'


export default function ActionProgress() {

    const { currentStep, totalSteps, prevStep, nextStep } = useProfileWizard();
    console.log(totalSteps, currentStep);
    const progressValue = totalSteps > 1 ? (currentStep / totalSteps) * 100 : 0;
    return (
        <div className='sticky bottom-0 bg-background'>
            <Progress value={progressValue} className='w-full h-2'></Progress>
            <div className='w-full flex justify-between px-10 py-6'>
                <Button variant={"outlineVariant"} onClick={prevStep}>
                    Back
                </Button>
                <Button variant={"default"} onClick={nextStep}>
                    Next step
                </Button>
            </div>
        </div>
    )
}