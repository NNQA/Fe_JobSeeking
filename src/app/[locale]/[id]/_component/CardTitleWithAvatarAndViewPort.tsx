import AvataUser from '@/components/AvatarUset'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { MapPinIcon, ShareIcon } from 'lucide-react'
import React from 'react'

function CardTitleWithAvatarAndViewPort() {
    return (
        <div className='flex p-8 justify-between'>
            <div>
                <div className='grid grid-cols-[1fr_auto] gap-6'>
                    <AvataUser className='rounded-full' />
                    <div>
                        <p className='font-medium text-5xl'>Ngo Nguyen Quoc Anh</p>
                        <div className='grid grid-cols-[auto_1fr] gap-2'>
                            <MapPinIcon></MapPinIcon>
                            <p>VietName,Ho chi minh city</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='space-y-10'>
                <div className='space-x-6'>
                    <Button className='border-primary border-2 text-base text-primary tracking-wider p-5 rounded-lg' variant={'outlineVariant'}>See public view</Button>
                    <Button variant={'default'} className='font-medium tracking-wider p-5 rounded-lg'>Profile settings</Button>
                </div>
                <div className='flex justify-end items-center space-x-2'>
                    <p className='text-base text-primary font-medium'>
                        Share
                    </p>
                    <ShareIcon className='h-5 w-5 text-primary'></ShareIcon>
                </div>
            </div>
        </div>
    )
}

export default CardTitleWithAvatarAndViewPort