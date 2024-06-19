import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import SideBar from "@/components/SideBar";
import { Button } from "@/components/ui/button";
import {
  Bell,
  BriefcaseBusiness,
  CircleUserRound,
  CloudUpload,
  Home,
  LucideProps,
  Package2,
  Sidebar,
} from "lucide-react";
import Link from "next/link";
import React from "react";

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

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <div className="grid min-h-screen w-full md:grid-cols-[280px_1fr] lg:grid-cols-[300px_1fr]">
        <div className="hidden border-r bg-muted/20 md:block">
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
        <div>{children}</div>
      </div>
    </section>
  );
}
