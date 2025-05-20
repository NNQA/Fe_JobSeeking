

import React from 'react'
import { Button } from '../ui/button'

interface ButtonIconProps {
    className?: string;
    icon: React.ReactNode;
}
function ButtonIcon({ className, icon, ...props }: ButtonIconProps) {
    return (
        <Button variant={'outlineVariant'} className='flex justify-center items-center p-1 h-[32px] aspect-square rounded-full border-[2px] border-primary hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'>
            {icon}
        </Button>
    )
}

export default ButtonIcon