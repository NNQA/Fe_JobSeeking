"use client";
import SideBar from "@/components/SideBar";
import BreadCrumbsCustom from "@/components/custom/BreadCrumbsCustom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Bell,
  BriefcaseBusiness,
  CircleUser,
  CircleUserRound,
  CloudUpload,
  Home,
  Package2,
  Search,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { useLocale } from "next-intl";
import { Authorities, ERole, User } from "@/lib/models/User";
import { useQuery } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

export const dataSideBarSupplier: Readonly<
  Array<{
    name: string;
    href: string;
    icon?: React.ReactNode;
  }>
> = [
  {
    name: "Dashboard",
    href: "/supplier",
    icon: <Home className="h-4 w-4"></Home>,
  },
  {
    name: "Candidates Apply",
    href: "/supplier/candidatesapply",
    icon: <CloudUpload className="h-4 w-4"></CloudUpload>,
  },
  {
    name: "Apply Management",
    href: "/supplier/applymanagement",
    icon: <BriefcaseBusiness className="h-4 w-4"></BriefcaseBusiness>,
  },
  {
    name: "Profile",
    href: "/supplier/profile",
    icon: <CircleUserRound className="h-4 w-4"></CircleUserRound>,
  },
];
const fetchUserData = async () => {
  const response = await fetch("/api/user/getCurrentUser");
  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }
  return response.json();
};
export default function Layout({ children }: { children: React.ReactNode }) {
  const locale = useLocale();
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUserData,
  });
  if (
    !user ||
    !user?.authorities.some(
      (e: Authorities) => e.authority === ERole.ROLE_SUPPLIER
    )
  ) {
    redirect(`/${locale}/upgradeaccount`);
  }
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-background">
        <div className="h-fit w-fit space-y-2">
          <Skeleton className="h-[20px] w-[20rem]" />
          <Skeleton className="h-[20px] w-[25rem]" />
          <Skeleton className="h-[20rem] w-[30rem]" />
        </div>
      </div>
    );
  }

  return (
    <section>
      <div className="grid min-h-screen w-full md:grid-cols-[280px_1fr] lg:grid-cols-[300px_1fr]">
        <div className="hidden border-r bg-muted/10 md:block">
          <div className="grid grid-rows-[4rem_1fr] h-full max-h-screen flex-col gap-2">
            <div className="flex h-16 items-center border-b px-5 lg:h-[60px] lg:px-6">
              <Link href="#" className="flex items-center gap-2 font-semibold">
                <Package2 className="h-6 w-6"></Package2>
                <span>Job Seeking</span>
              </Link>
              <Button
                variant="outlineVariant"
                size="icon"
                className="ml-auto h-8 w-8"
              >
                <Bell className="h-4 w-4"></Bell>
                {/* <span>Toggle notifications</span> */}
              </Button>
            </div>
            <SideBar items={dataSideBarSupplier} className="w-full h-full" />
          </div>
        </div>
        <div className="flex-1 w-full grid grid-rows-[4rem_1fr] max-h-screen">
          <div className="lg:h-[60px] lg:px-6 px-6 items-center h-16 flex justify-between w-full border-b bg-accent">
            <form className="w-full">
              <div className="relative">
                <Search className="absolute left-2.5 top-[0.87rem] h-4 w-4 text-muted-foreground"></Search>
                <Input
                  type="search"
                  placeholder="Search feature..."
                  className="w-full appearance-none bg-background pl-8 md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-full bg-card"
                  >
                    <CircleUser className="h-5 w-5" />
                    <span className="sr-only">Toggle user menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Support</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="px-6 py-2">
            <BreadCrumbsCustom />
          </div>
          <div className="w-full h-full">{children}</div>
        </div>
      </div>
    </section>
  );
}
