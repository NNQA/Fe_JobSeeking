import React from 'react'
import CardTitleWithAvatarAndViewPort from './CardTitleWithAvatarAndViewPort'
import { Card } from '@/components/ui/card'
import ProfileMain from './ProfileMain'

function DeskTopUi() {
    return (
        <Card>
            <CardTitleWithAvatarAndViewPort />
            <div className='w-full border-t grid grid-cols-[1fr_2fr]'>
                <div className='border-r'>
                    right
                </div>
                <div>
                    <ProfileMain />
                </div>
            </div>
        </Card>
    )
}

export default DeskTopUi