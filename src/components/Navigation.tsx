"use client";
import React, { useEffect, useState } from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import {
  ArrowUpToLine,
  AxeIcon,
  Bell,
  Box,
  Calculator,
  ChevronRight,
  ChevronsRight,
  Folder,
  FolderInput,
  Hexagon,
  LayoutDashboard,
  Library,
  Link as IconLink,
  MessageSquare,
  Package2,
  PanelTop,
  PcCase,
  Receipt,
  SaveAll,
  Search,
  SquareArrowDown,
  SquareEqual,
  Ungroup,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { styled, keyframes } from "@stitches/react";
import { NavigationMenuViewport } from "@radix-ui/react-navigation-menu";
import { Popover } from "./ui/popover";
import { usePathname } from "next/navigation";
import { User } from "@/lib/models/User";
import { PersonIcon } from "@radix-ui/react-icons";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";
import { useLocale } from "next-intl";
interface itemsProps {
  text: string;
  trigger: {
    text: string;
    herf: string;
    icon: React.ReactNode;
  }[];
}

const items: itemsProps[] = [
  {
    text: "Work",
    trigger: [
      {
        text: "Find work",
        herf: "/",
        icon: <Search className="h-5 w-5" />,
      },
      {
        text: "Viec lam ung tuyen",
        herf: "/",
        icon: <Box className="h-5 w-5" />,
      },
      {
        text: "Viet lam ung tuyen",
        herf: "/",
        icon: <Folder className="h-5 w-5" />,
      },
      {
        text: "Viet lam It",
        herf: "/",
        icon: <SquareArrowDown className="h-5 w-5" />,
      },
    ],
  },
  {
    text: "Record & Cv",
    trigger: [
      {
        text: "Manage Cv",
        herf: "/",
        icon: <SquareEqual className="h-5 w-5" />,
      },
      {
        text: "Uploading Cv",
        herf: "/",
        icon: <ArrowUpToLine className="h-5 w-5" />,
      },
      {
        text: "Mau Cv",
        herf: "/",
        icon: <SaveAll className="h-5 w-5" />,
      },
      {
        text: "Tu van cv",
        herf: "/",
        icon: <Receipt className="h-5 w-5" />,
      },
    ],
  },
  {
    text: "Company",
    trigger: [
      {
        text: "List cong ty",
        herf: "/",
        icon: <PcCase className="h-5 w-5" />,
      },
      {
        text: "Top Cong ty",
        herf: "/",
        icon: <PanelTop className="h-5 w-5" />,
      },
    ],
  },
  {
    text: "Tools",
    trigger: [
      {
        text: "Khoa hoc",
        herf: "/",
        icon: <LayoutDashboard className="h-5 w-5" />,
      },
      {
        text: "Top cv skill",
        herf: "/",
        icon: <Hexagon className="h-5 w-5" />,
      },
      {
        text: "Tinh lai xuat kem",
        herf: "/",
        icon: <Calculator className="h-5 w-5" />,
      },
      {
        text: "Trac nghiem MI",
        herf: "/",
        icon: <FolderInput className="h-5 w-5" />,
      },
      {
        text: "Ke hoach tiep kiem",
        herf: "/",
        icon: <AxeIcon className="h-5 w-5" />,
      },
    ],
  },
  {
    text: "Brochure Career",
    trigger: [
      {
        text: "Dinh Huong nghe nghiep",
        herf: "/",
        icon: <Library className="h-5 w-5" />,
      },
      {
        text: "Hanh trang nghe nghiep",
        herf: "/",
        icon: <Ungroup className="h-5 w-5" />,
      },
      {
        text: "Find work",
        herf: "/",
        icon: <Package2 className="h-5 w-5" />,
      },
    ],
  },
];
const itemsUser = [
  {
    icon: <Bell className="h-5 w-5 text-primary"></Bell>,
  },
  {
    icon: <MessageSquare className="h-5 w-5 text-primary"></MessageSquare>,
  },
  {
    icon: <PersonIcon className="h-5 w-5"></PersonIcon>,
  },
];
function trim(input: string) {
  const temp = input.substring(3);
  let pathname = "";
  for (let i = 0; i < temp.length; i++) {
    if (temp[i] == "/") break;
    pathname += temp[i];
  }
  return pathname.length < 1 ? null : pathname;
}
interface PropsNavigation {
  user?: User;
}
function Navigation({ user }: PropsNavigation) {
  console.log(user);
  const pathname = usePathname();
  const locale = useLocale();
  const comparePath = trim(pathname);

  return (
    <MaxWidthWrapper className="sticky z-[100] m-0 max-w-screen-2xl items-center flex justify-between h-[5rem] inset-x-0 w-full top-0 border-b border-slate-50 backdrop-blur-lg transition-all">
      <NavigationMenu className="h-full flex justify-between space-x-20 w-full">
        <NavigationMenuList>
          {items.map(({ text, trigger }, index) => (
            <NavigationMenuItem
              className="hover:text-primary relative"
              key={index}
            >
              <NavigationMenuTrigger
                className={cn(
                  "hover:text-primary text-base",
                  {
                    "text-primary": comparePath === text,
                  },
                  {
                    "text-primary": comparePath === null && index === 0,
                  }
                )}
              >
                {text}
              </NavigationMenuTrigger>

              <NavigationMenuContent className="border border-border rounded-xl shadow-lg p-2">
                <ul className="grid grid-cols-3  md:w-[350px] lg:w-[500px] lg:grid-cols-[1fr_1fr] gap-2">
                  {trigger.map(({ text, herf, icon }) => (
                    <ListItem href={herf} title={text} key={text}>
                      {icon}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <NavigationMenu className="h-full flex justify-between space-x-20 w-full">
        <NavigationMenuList>
          {user ? (
            <div className="flex gap-4">
              <div className="border-r border-border pr-6">
                <h6 className="text-xs text-border-hover">
                  Ban la nha tuyen dung ?
                </h6>
                <div className="text-primary flex font-bold items-center">
                  <Link
                    href={`/${locale}/supplier`}
                    className={cn(
                      buttonVariants({ variant: "link" }),
                      "bg-transparent m-0 p-0"
                    )}
                  >
                    Đăng Tuyển ngay
                  </Link>
                  <ChevronsRight className="h-4 w-4 mt-1"></ChevronsRight>
                </div>
              </div>

              {itemsUser.map(({ icon }, index) => (
                <NavigationMenuItem
                  className="hover:text-primary relative"
                  key={index}
                >
                  <NavigationMenuTrigger className="bg-border rounded-full px-3 py-1">
                    {icon}
                  </NavigationMenuTrigger>

                  {/* <NavigationMenuContent className="border border-border rounded-xl shadow-lg p-2"></NavigationMenuContent> */}
                </NavigationMenuItem>
              ))}
            </div>
          ) : (
            <div className="flex gap-6">
              <Link
                href={`/${locale}/auth/login`}
                className={cn(
                  buttonVariants({
                    variant: "outlineVariant",
                  }),
                  "border-primary"
                )}
              >
                Đăng Nhập
              </Link>

              <Link
                href={`/${locale}/auth/signup`}
                className={buttonVariants({ variant: "default" })}
              >
                Đăng ký
              </Link>
              <Link
                href="/"
                className={cn(
                  buttonVariants({ variant: "secondary" }),
                  "bg-blue-950 text-background hover:bg-blue-900"
                )}
              >
                Đăng tuyển & tìm hồ sơ
              </Link>
            </div>
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </MaxWidthWrapper>
  );
}

export default Navigation;

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "select-none flex items-center space-x-2 w-full rounded-md p-3 leading-none no-underline outline-none transition-colors bg-accent hover:text-primary text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
          <div className="text-sm font-medium leading-none">{title}</div>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
