"use client"
import { JobCategory } from '@/lib/models/Categories'
import React, { useState } from 'react'

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useProfileWizard } from '@/lib/context/ProfileWizardProvider';
import { Info } from 'lucide-react';
import { Form } from '@/components/ui/form';
import { categoriesSchema, categorySchema } from './zod.type.form.category';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

interface IndustrySpecializationStepProps {
    data: JobCategory[];
}

function IndustrySpecializationStep({ data }: IndustrySpecializationStepProps) {
    const defaultValue = data[0].category;

    const { formData, error, setSubmitStep } = useProfileWizard();

    const form = useForm<categoriesSchema>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            category: formData.category.category,
            fields: formData.category.fields,
        }
    });



    return (
        <div className='w-full h-full grid grid-rows-[1fr_auto] gap-6'>
            <div className='max-w-xl grid grid-cols-[1fr_1fr] place-items-center'>
                <div className='w-full p-1 md:ml-0 mx-auto inline-flex justify-start ml-8'>
                    <p className="px-3 py-1.5">Select category</p>
                </div>
                <div className='w-full md:ml-0 ml-1'>
                    <p className="text-sm text-muted-foreground">Now, select 1 to 3 specialties </p>
                </div>
            </div>
            <Form {...form}>
                <form action="">
                    <Tabs className="max-w-xl w-full grid md:grid-cols-[1fr_3fr] grid-cols-[1fr_1fr]" defaultValue={defaultValue}>
                        <TabsList className="grid h-full w-full bg-background border-r rounded-none md:pr-10 pr-5">
                            {data.map((category) => (
                                <TabsTrigger key={category.category} value={category.category} className="items-start justify-start bg-background border-background ring-0 data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm">
                                    {category.category}
                                </TabsTrigger>
                            ))}
                        </TabsList>

                        {data.map((category) => (
                            <TabsContent key={category.category} value={category.category} className='md:ml-10 ml-5 max-w-full'>
                                <ul className='space-y-4'>
                                    {category.fields.map((field) => (
                                        <li key={field.name} className="flex items-center gap-2">
                                            <Checkbox id={field.name} className='h-5 w-5' />
                                            <Label htmlFor={field.name} className="text-sm text-muted-foreground">
                                                {field.name}
                                            </Label>
                                        </li>
                                    ))}
                                </ul>
                                <div className='flex text-end mt-4 w-full'>
                                    {error &&
                                        <div className='flex items-center gap-2'>
                                            <Info className='text-destructive w-5 h-5' />
                                            <Label className='text-destructive font-medium'>
                                                {error}
                                            </Label>
                                        </div>
                                    }
                                </div>
                            </TabsContent>
                        ))}
                    </Tabs>
                </form>
            </Form>
        </div>
    );
}

export default IndustrySpecializationStep;
