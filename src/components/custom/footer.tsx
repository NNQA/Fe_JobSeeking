import React from 'react'

import { CalendarIcon } from "@radix-ui/react-icons"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import Link from 'next/link'

export function HoverCardDemo() {
  return (
    <HoverCard >
      <HoverCardTrigger asChild>
        <Link href="https://github.com/NNQAs" className='text-primary underline-offset-4 hover:underline'>Github</Link>
      </HoverCardTrigger>
      <HoverCardContent className="w-60">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src="https://github.com/vercel.png" />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">QuocAnh</h4>
            <p className="text-sm">
              The developer Website
            </p>
            <div className="flex items-center pt-2">
              <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                Joined December 2021
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}


function Footer() {
  return (
    <footer className="w-screen md:h-[3rem] h-5 pb-3 md:pt-1 md:px-20 px-10 bg-background border-t md:flex md:justify-between md:items-center grid grid-flow-row">
      <div>
        <div className='font-semibold text-sm flex md:items-center gap-1'>
          <p>
            Built by <span className='text-primary'>WuokAnk</span>
          </p>
          <p className='space-x-2'>
            The service contained in my website is available on <HoverCardDemo />
          </p>
        </div>
      </div>
      <div className="flex gap-6">
        <Button asChild variant={'link'} className='outline-none p-0'>
          <Link href="https://github.com/">Privacy Policy</Link>
        </Button>
        <Button asChild variant={'link'} className='outline-none p-0'>
          <Link href="https://github.com/">Terms of Service</Link>
        </Button>
        <Button asChild variant={'link'} className='outline-none p-0'>
          <Link href="https://github.com/">Cookies Settings</Link>
        </Button>
      </div>
    </footer>
  )
}

export default Footer