import AvataUser from '@/components/AvatarUset'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import React from 'react'

function CardTips() {
    return (
        <Card className='bg-muted shadow-md'>
            <CardHeader>
                <AvataUser className='rounded-full' />
            </CardHeader>
            <CardContent className=''>
                <p className='font-medium'>
                    "MTA's algorihm will recommend specific job posts to you based on your skills. So choose them carefully to get the best match!"
                </p>
            </CardContent>
            <CardFooter>
                <p className='text-sm font-medium'>
                    MTA ProTips.
                </p>
            </CardFooter>
        </Card>
    )
}

export default CardTips