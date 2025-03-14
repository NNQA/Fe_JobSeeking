import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  BriefcaseBusiness,
  CircleUserRound,
  CloudUpload,
  Home,
  LucideProps,
} from "lucide-react";
import { useLocale } from "next-intl";
import { ForwardRefExoticComponent, RefAttributes, useState } from "react";
export const dataSideBarSupplier: Readonly<
  Array<{
    name: string;
    href: string;
    icon?: ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
  }>
> = [
  {
    name: "Dashboard",
    href: "/supplier",
    icon: Home,
  },
  {
    name: "Candidates Apply",
    href: "/supplier/candidatesapply",
    icon: CloudUpload,
  },
  {
    name: "Apply Management",
    href: "/supplier/applymanagement",
    icon: BriefcaseBusiness,
  },
  {
    name: "Profile",
    href: "/supplier/profile",
    icon: CircleUserRound,
  },
];
export function SidebarSupplier() {
  const locale = useLocale();
  const [itemsUpdate] = useState(
    dataSideBarSupplier.map((r) => ({
      ...r,
      href: "/" + locale + r.href,
    }))
  );
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {itemsUpdate.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <a href={item.href}>
                      <item.icon />
                      <span>{item.name}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default SidebarSupplier;
