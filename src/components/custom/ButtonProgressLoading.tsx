import React from 'react'
import { Button } from '../ui/button'
import { Transition } from '@headlessui/react'
import ProgressCircle from '../svg/ProgressCircle'
import clsx from 'clsx'
import { cn } from '@/lib/utils/utils'
interface ButtonProgressLoadingProps extends React.ComponentPropsWithoutRef<typeof Button> {
    text?: string;
    state?: boolean;
    className?: string;
}
function ButtonProgressLoading({ state, text, className, ...props }: ButtonProgressLoadingProps) {
    return (
        <Button
            className={cn("relative", className)}
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
                    {/* <ProgressCircle
                        className="w-full h-full text-primary-500"
                        aria-label="signing in"
                    /> */}
                    <div className="flex items-center justify-center gap-2">
                        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10S1.486 17.514 1 12 5.486 2 12 2zm0 18c4.411 0 8-3.589 8-8s-3.589-8-8-8-8 3.589-8 8 3.589 8 8 8zm1-11h-2v4h2v-4zm-2 5h2v2h-2v-2z"
                            />
                        </svg>
                        Creating account...
                    </div>
                </div>
            </Transition>
        </Button>
    )
}

export default ButtonProgressLoading