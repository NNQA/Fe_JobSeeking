import { EnvelopeClosedIcon, GitHubLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons'
import React from 'react'

function LoginWithSocialMedia() {
    return (
        <div className="flex gap-4">
            <div className="border-2 border-border w-fit px-2 py-2 rounded-full hover:ring-1 hover:ring-inset hover:ring-border-hover hover:border-border-hover hover:cursor-pointer">
                <EnvelopeClosedIcon className="w-7 h-7 text-red-500"></EnvelopeClosedIcon>
            </div>
            <div className="border-2 border-border w-fit px-2 py-2 rounded-full hover:ring-1 hover:ring-inset hover:ring-border-hover hover:border-border-hover hover:cursor-pointer">
                <LinkedInLogoIcon className="w-7 h-7 text-blue-500"></LinkedInLogoIcon>
            </div>
            <div className="border-2 border-border w-fit px-2 py-2 rounded-full hover:ring-1 hover:ring-inset hover:ring-border-hover hover:border-border-hover hover:cursor-pointer">
                <GitHubLogoIcon className="w-7 h-7"></GitHubLogoIcon>
            </div>
        </div>
    )
}

export default LoginWithSocialMedia