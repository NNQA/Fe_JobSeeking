import React from 'react'
import CardTips from './CardTips'
import FormInputSkills from './FormInputSkills'

function SkillSelection() {
    return (
        <div className='xl:grid xl:grid-cols-[3fr_1fr] xl:gap-6'  >
            <FormInputSkills />
            <div className='xl:block hidden'>
                <CardTips></CardTips>

            </div>
        </div>
    )
}

export default SkillSelection