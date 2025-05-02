"use client"
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { useProfileWizard } from '@/lib/context/ProfileWizardProvider';
import dynamic from 'next/dynamic';
import React, { memo } from 'react'

const ButtonProgressLoadingDynamic = dynamic(() => import("@/components/custom/ButtonProgressLoading"), { ssr: false });

export default function ActionProgress() {

    const { currentStep, totalSteps, goBack, submitStep, updateFormData, loading } = useProfileWizard();
    console.log(totalSteps, currentStep);
    const progressValue = totalSteps > 1 ? (currentStep / totalSteps) * 100 : 0;
    const handleSubmitStep = async () => {

    }
    return (
        <div className='sticky bottom-0 bg-background'>
            <Progress value={progressValue} className='w-full h-2'></Progress>
            <div className='w-full flex justify-between px-10 py-6'>
                <Button variant={"outlineVariant"} onClick={goBack}>
                    Back
                </Button>
                <ButtonProgressLoadingDynamic
                    state={loading}
                    text="Next step" />
            </div>
        </div>
    )
}