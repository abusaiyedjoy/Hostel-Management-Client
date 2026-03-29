"use client";

import * as React from "react";

import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  LayoutDashboardIcon,
  UsersIcon,
  CameraIcon,
  BriefcaseIcon,
  Settings,
  CrownIcon,
  LogOutIcon,
} from "lucide-react";
import Image from "next/image";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <LayoutDashboardIcon />,
    },
    {
      title: "User Management",
      url: "/dashboard/users",
      icon: <UsersIcon />,
    },
    {
      title: "Business Management",
      url: "/dashboard/business",
      icon: <BriefcaseIcon />,
    },
    {
      title: "Content Moderation",
      url: "/dashboard/content",
      icon: <CameraIcon />,
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: <Settings />,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      className="shadow-[6px_0_20px_rgba(0,0,0,0.08)]"
      collapsible="offcanvas"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <a href="/dashboard">
              <Image
                src="/logo.png"
                alt="Logo"
                width={250}
                height={250}
                className="w-full h-auto"
              />
            </a>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="px-2 mt-1">
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter className="p-4 mb-4">
        <a
          href="#"
          className="flex items-center gap-2 w-fit px-4 py-2 rounded-lg border border-sidebar-primary text-sidebar-primary font-semibold hover:bg-sidebar-primary/50 transition-colors"
        >
          <LogOutIcon className="size-4" />
          <span>Log out</span>
        </a>
      </SidebarFooter>
    </Sidebar>
  );
}
