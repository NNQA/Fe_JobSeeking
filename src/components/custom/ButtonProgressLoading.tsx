import React from 'react'
import { Button } from '../ui/button'
import { Transition } from '@headlessui/react'
import ProgressCircle from '../svg/ProgressCircle'
import clsx from 'clsx'
import { cn } from '@/lib/utils'

interface ButtonProgressLoadingProps {
    type?: "button" | "submit" | "reset",
    state: boolean,
    text: string,
    className?: string;
}
function ButtonProgressLoading({ type, state, text, className, ...props }: ButtonProgressLoadingProps) {
    return (
        <Button
            type={type ?? "button"}
            className={cn("rounded-sm relative", className)}
            disabled={state}
            {...props}
        >
            <span
                className={clsx("block transition ease-in-out font-bold", {
                    "opacity-0": state,
                    "scale-0": state,
                })}
            >
                {text}
            </span>

            <Transition
                show={state}
                enter="transition ease-in-out"
                enterFrom="opacity-0 scale-0"
                leave="transition ease-in-out duration-300"
                leaveTo="opacity-0 scale-0"
            >
                <div className="w-[50%] h-[50%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <ProgressCircle
                        className="w-full h-full text-primary-500"
                        aria-label="signing in"
                    />
                </div>
            </Transition>
        </Button>
    )
}

export default ButtonProgressLoading