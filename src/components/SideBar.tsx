"use client";
import { cn } from "@/lib/utils";
import clsx from "clsx";
import { Divide, LogOut, Settings } from "lucide-react";
import { useLocale } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

interface ItemsProps {
  name: string;
  icon?: React.ReactNode;
  href: string;
}
interface Props {
  items: Readonly<Array<ItemsProps>>;
  className?: string;
  classNameItems?: string;
}

const sampleDataFooter: Readonly<Array<ItemsProps>> = [
  {
    name: "Setting",
    href: "/supplier/setting",
    icon: <Settings className="h-4 w-4"></Settings>,
  },
  {
    name: "LogOut",
    href: "/logout",
    icon: <LogOut className="h-4 w-4"></LogOut>,
  },
];

const trim = (input: string) => {
  let pathname = "";
  for (let i = 0; i < input.length; i++) {
    if (input[i] == "/") break;
    pathname += input[i];
  }

  return pathname.length < 1 ? input : pathname;
};
function SideBar({ items, className, classNameItems }: Props) {
  const locale = useLocale();
  const pathname = usePathname();
  console.log(trim(pathname) === "/supplier");
  const [itemsUpdate] = useState(
    items.map((r) => ({
      ...r,
      href: "/" + locale + r.href,
    }))
  );
  const [itemsFooter] = useState(
    sampleDataFooter.map((r) => ({
      ...r,
      href: "/" + locale + r.href,
    }))
  );
  return (
    <div className={cn("h-full w-full", className)}>
      <nav className="flex flex-col justify-between items-start px-2 py-2 text-sm font-medium lg:px-4 h-full">
        <div className="w-full space-y-2">
          {itemsUpdate.map(({ name, href, icon }, index) => (
            <div key={index}>
              <Link
                href={href}
                className={cn(
                  "flex items-center gap-3 w-full rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-primary hover:text-accent",
                  {
                    "bg-primary text-accent":
                      trim(pathname)?.toLowerCase() === href.toLowerCase(),
                  }
                )}
              >
                {icon ?? icon}
                {name}
              </Link>
              {index % 2 === 0 && index !== 0 ? (
                <div className="m-2">
                  <hr className="border" />
                </div>
              ) : null}
            </div>
          ))}
        </div>
        <div className="items-end w-full space-y-2">
          <hr className="border" />
          {itemsFooter.map(({ name, href, icon }, index) => (
            <Link
              href={href}
              key={index}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-primary hover:text-accent"
            >
              {icon ?? icon}
              {name}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}

export default SideBar;
