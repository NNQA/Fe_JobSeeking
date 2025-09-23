"use client"
import React, { ReactNode, useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { cn } from '@/lib/utils/utils';
import { Check, CheckCircle, CircleAlert } from 'lucide-react';
type TypeToast = "success" | "error" | "loading" | "warning"
type Props = {
    duration?: number;
    title: string;
    description?: string;
    type?: TypeToast;
}
function ToastCustom(
    {
        duration = 50000,
        type = "error",
        description,
        title
    }: Props
) {
    const [percent, setPercent] = useState(0);
    console.log("asdasjd")
    useEffect(() => {
        let lastTime = performance.now();
        let frame: number = 0;
        const render = ((now: number) => {
            setPercent(a => {
                if (a >= 1) {
                    return 1;
                }
                return Math.min(a + ((now - lastTime) / duration), 1)
            }
            );
            frame = requestAnimationFrame(render);
            lastTime = now;

        })
        frame = requestAnimationFrame(render)

        return () => {
            cancelAnimationFrame(frame);
        }

    }, [setPercent, duration]);

    let a: ReactNode;
    switch (type) {
        case "success":
            a = <div className='bg-green-700 rounded-full'>
                <Check className='h-5 w-5 p-1 text-primary-foreground' />
            </div>
            break;
        case "error":
            a = <div className='bg-destructive rounded-full'>
                <CircleAlert className='h-5 w-5 text-primary-foreground dark:text-primary dark:border-primary' />
            </div>
            break;
        default:
            break;
    }

    return (
        <Card className={cn('relative w-[var(--width)] overflow-hidden p-4 rounded-md',
            { "bg-green-50 border-green-200 text-green-700": type === 'success' },
            { "bg-red-50 border-red-200 text-destructive dark:text-destructive/80": type === 'error' },
            { "bg-background border-border": type === 'loading' }
        )}
        >
            <div className='flex items-center gap-2'>
                {a}
                <div>
                    <CardHeader className='p-0'>
                        <CardTitle className='text-xs font-bold'>
                            {title}
                        </CardTitle>
                    </CardHeader>

                    <CardContent className='p-0 text-xs font-normal'>
                        {description}
                    </CardContent>
                </div>
            </div>
            <div className={cn('absolute inset-x-0 h-px bg-destructive bottom-0',
                { "bg-green-200": type === 'success' },
                { "bg-red-400": type === 'error' },
                { "bg-foreground/20": type === 'loading' }
            )} style={{
                transform: `translateX(${(-1 + percent) * 100}%)`,
            }}>
            </div>
        </Card>
    )
}

export default ToastCustom