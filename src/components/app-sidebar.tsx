"use client";

import * as React from "react";
import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  LayoutDashboardIcon,
  UsersIcon,
  BedDoubleIcon,
  CalendarCheckIcon,
  WrenchIcon,
  CreditCardIcon,
  ClipboardListIcon,
  MessageSquareIcon,
  LogOutIcon,
  BuildingIcon,
} from "lucide-react";

const data = {
  navMain: [
    { title: "Dashboard", url: "/dashboard", icon: <LayoutDashboardIcon /> },
    {
      title: "Room Management",
      url: "/dashboard/rooms",
      icon: <BedDoubleIcon />,
    },
    {
      title: "Bookings",
      url: "/dashboard/bookings",
      icon: <CalendarCheckIcon />,
    },
    { title: "Guests", url: "/dashboard/guests", icon: <UsersIcon /> },
    { title: "Payments", url: "/dashboard/payments", icon: <CreditCardIcon /> },
    {
      title: "Maintenance",
      url: "/dashboard/maintenance",
      icon: <WrenchIcon />,
    },
    {
      title: "Reports",
      url: "/dashboard/reports",
      icon: <ClipboardListIcon />,
    },
    {
      title: "Messages",
      url: "/dashboard/messages",
      icon: <MessageSquareIcon />,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      className="shadow-[6px_0_20px_rgba(0,0,0,0.08)] dark:shadow-[6px_0_20px_rgba(0,0,0,0.3)]"
      collapsible="offcanvas"
      {...props}
    >
      <SidebarHeader className="border-b border-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <a href="/dashboard" className="flex items-center gap-3 px-2 py-3">
              <div className="flex size-9 items-center justify-center rounded-xl bg-violet-600 shadow-md shadow-violet-200 dark:shadow-violet-900/40">
                <BuildingIcon className="size-5 text-white" />
              </div>
              <div>
                <p className="text-base font-bold text-foreground leading-none">
                  HostelHub
                </p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  Management System
                </p>
              </div>
            </a>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="px-2 mt-2">
        <NavMain items={data.navMain} />
      </SidebarContent>

      {/* Promo card at bottom – mirrors the image's "Share your recipe" card */}
      <div className="mx-3 mb-3 rounded-2xl bg-gradient-to-br from-violet-600 to-violet-800 p-4 text-white shadow-lg shadow-violet-200 dark:shadow-violet-900/40">
        <p className="text-xs font-semibold opacity-80 uppercase tracking-wider mb-1">
          Pro Tip
        </p>
        <p className="text-sm font-semibold leading-snug mb-3">
          Generate your monthly occupancy report
        </p>
        <a
          href="/dashboard/reports"
          className="inline-flex items-center gap-1.5 text-xs font-semibold bg-white/20 hover:bg-white/30 transition-colors rounded-lg px-3 py-1.5"
        >
          View Reports →
        </a>
      </div>

      <SidebarFooter className="p-4">
        <a
          href="#"
          className="flex items-center gap-2 w-fit px-4 py-2 rounded-lg border border-border text-muted-foreground font-medium hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-foreground transition-colors text-sm"
        >
          <LogOutIcon className="size-4" />
          <span>Log out</span>
        </a>
      </SidebarFooter>
    </Sidebar>
  );
}
