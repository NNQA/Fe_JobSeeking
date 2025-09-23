"use client"

import { Search, X, Bell, HelpCircle, Settings, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import Logo from "./svg/Logo"

export function Navbar() {
  const [searchValue, setSearchValue] = useState("java")

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-background border-b border-gray-200">
      <Logo
        size="md"
      />
      <div className="hidden md:flex items-center space-x-8">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="text-primary hover:text-opacity-60">
              Find work
              <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Browse Jobs</DropdownMenuItem>
            <DropdownMenuItem>Saved Jobs</DropdownMenuItem>
            <DropdownMenuItem>Proposals</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="text-primary hover:text-opacity-60">

              Deliver work
              <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>My Jobs</DropdownMenuItem>
            <DropdownMenuItem>All Contracts</DropdownMenuItem>
            <DropdownMenuItem>Work Diary</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="text-primary hover:text-opacity-60">

              Manage finances
              <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Reports</DropdownMenuItem>
            <DropdownMenuItem>Billings & Earnings</DropdownMenuItem>
            <DropdownMenuItem>Transaction History</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" className="text-primary hover:text-opacity-60">
          Messages
        </Button>
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="pl-10 pr-10 py-2 w-full rounded-full border-border focus:border-primary focus:ring-primary"
            placeholder="Search for jobs..."
          />
          {searchValue && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSearchValue("")}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-secondary text-primary rounded-full"
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>
      </div>

      {/* Right Side Icons */}
      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="text-primary hover:text-opacity-60">

              Jobs
              <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Job Feed</DropdownMenuItem>
            <DropdownMenuItem>Saved Jobs</DropdownMenuItem>
            <DropdownMenuItem>Proposals</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="sm" className="p-2">
          <HelpCircle className="h-5 w-5 text-primary" />
        </Button>

        <div className="relative">
          <Button variant="ghost" size="sm" className="p-2">
            <Bell className="h-5 w-5 text-primary" />
          </Button>
          <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center p-0">
            1
          </Badge>
        </div>

        <Button variant="ghost" size="sm" className="p-2">
          <Settings className="h-5 w-5 text-primary" />
        </Button>

        <Avatar className="h-8 w-8">
          <AvatarImage src="/professional-headshot.png" alt="User" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  )
}
