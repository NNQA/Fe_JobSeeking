

import ButtonIcon from '@/components/custom/ButtonIcon'
import { Pencil } from 'lucide-react'
import React from 'react'

function ProfileMain() {
    return (
        <div>
            <ButtonIcon
                icon={<Pencil className='h-4 w-4 text-primary' strokeWidth={2.5} />}
            />
        </div>
    )
}

export default ProfileMain