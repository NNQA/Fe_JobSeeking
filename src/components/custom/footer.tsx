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
    <div className='text-primary'>
      <HoverCard >
        <HoverCardTrigger asChild>
          <Button asChild variant={'link'} className='outline-none p-0'>
            <Link href="https://github.com/">Github</Link>
          </Button>
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
    </div>
  )
}


function Footer() {
  return (
    <footer className="w-screen h-[3rem] pb-3 pt-1 px-20 bg-background border-t flex justify-between">
      <div>
        <div className='font-semibold flex items-center gap-1'>Built by <span className='text-xs text-primary'>WuokAnk
        </span>. The service contained in my website is available on <HoverCardDemo />.</div>
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