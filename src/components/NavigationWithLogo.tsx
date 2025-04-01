"use client";
import React from "react";
import Logo from "./svg/Logo";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { CircleUser, LogOutIcon } from "lucide-react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { cn } from "@/lib/utils";
import { GearIcon } from "@radix-ui/react-icons";

interface NavigationWithLogoProps {
    displayName?: string;
    email?: string
}
function NavigationWithLogo({ displayName, email }: NavigationWithLogoProps) {
    const menuItems = [
        {
            label: "Close Account",
            icon: <GearIcon className="h-5 w-5" />, // Assuming GearIcon is the settings icon
            handler: () => console.log("Close Account clicked"),
        },
        {
            label: "Log out",
            icon: <LogOutIcon className="h-5 w-5" />, // Assuming LogOutIcon is the logout icon
            handler: () => console.log("Log out clicked"),
        },
    ];
    return (
        <MaxWidthWrapper
            className={cn(
                "sticky z-[100] max-w-screen-2xl h-fit py-4 w-full top-0 border-b bg-card backdrop-blur-lg transition-all"
            )}
        >
            <NavigationMenu className="max-w-full flex justify-between">
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <Logo />
                    </NavigationMenuItem>
                </NavigationMenuList>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger className="p-2 rounded-full">
                            <CircleUser className="h-8 w-8" />
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className="-left-36">
                            <div className="flex flex-col items-center gap-4 p-4">
                                <CircleUser className="h-28 w-28 stroke-1" />
                                <div>
                                    <p>
                                        <strong>{displayName ?? email}</strong>
                                    </p>
                                </div>
                            </div>
                            <ul className="flex flex-col gap-2 md:w-[200px] lg:w-[250px]">
                                {menuItems.map((item, index) => (
                                    <li key={index}>
                                        <button
                                            onClick={item.handler}
                                            className="flex items-center gap-2 px-2 py-3 hover:bg-gray-100 rounded-md w-full text-left"
                                        >
                                            {item.icon}
                                            <span>{item.label}</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </MaxWidthWrapper>
    );
}

export default NavigationWithLogo;