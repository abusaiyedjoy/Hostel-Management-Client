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
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout, useLogoutApiMutation } from "@/redux";

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
  const router = useRouter();
  const dispatch = useDispatch();
  const [logoutApi, { isLoading }] = useLogoutApiMutation();

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();

      // ✅ clear redux auth state
      dispatch(logout());

      // ✅ redirect
      router.push("/login");
    } catch (error) {
      console.error("Logout failed", error);

      // fallback (still logout locally)
      dispatch(logout());
      router.push("/login");
    }
  };
  return (
    <Sidebar
      collapsible="offcanvas"
      className="
        border-r border-[#c8ddc8] dark:border-[#1a3a1a]
        bg-[#fafdf8] dark:bg-[#0d1a0d]
        shadow-[4px_0_20px_rgba(20,60,20,0.08)] dark:shadow-[4px_0_20px_rgba(0,0,0,0.4)]
      "
      {...props}
    >
      {/* ── Logo ── */}
      <SidebarHeader className="border-b border-[#c8ddc8] dark:border-[#1a3a1a] px-1">
        <SidebarMenu>
          <SidebarMenuItem>
            <a
              href="/dashboard"
              className="flex items-center gap-3 px-3 py-3.5"
            >
              <div
                className="
                flex size-9 items-center justify-center rounded-xl
                bg-[#1e4d2b] dark:bg-[#2a6e3a]
                shadow-md shadow-[rgba(20,70,30,0.35)] dark:shadow-[rgba(0,0,0,0.4)]
              "
              >
                <BuildingIcon className="size-5 text-white" />
              </div>
              <div>
                <p className="text-base font-bold leading-none text-[#1a2e1a] dark:text-[#c8ecc8]">
                  StayNest
                </p>
                <p className="text-[11px] mt-0.5 text-[#5a7a5a] dark:text-[#6a9a6a]">
                  Management System
                </p>
              </div>
            </a>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* ── Nav ── */}
      <SidebarContent className="px-2 mt-2">
        <NavMain items={data.navMain} />
      </SidebarContent>

      {/* ── Promo card ── */}
      <div
        className="mx-3 mb-3 rounded-2xl p-4 text-white overflow-hidden relative
        bg-linear-to-br from-[#1e4d2b] via-[#245c32] to-[#2d7040]
        shadow-lg shadow-[rgba(20,70,30,0.30)] dark:shadow-[rgba(0,0,0,0.4)]
      "
      >
        {/* decorative blob */}
        <div className="pointer-events-none absolute -top-6 -right-6 size-20 rounded-full bg-white/10 blur-xl" />
        <p className="text-[10px] font-semibold opacity-70 uppercase tracking-wider mb-1">
          Pro Tip
        </p>
        <p className="text-sm font-semibold leading-snug mb-3">
          Generate your monthly occupancy report
        </p>
        <a
          href="/dashboard/reports"
          className="inline-flex items-center gap-1.5 text-xs font-semibold bg-white/15 hover:bg-white/25 transition-colors rounded-lg px-3 py-1.5"
        >
          View Reports →
        </a>
      </div>

      {/* ── Logout ── */}
      <SidebarFooter className="p-4">
        <button
          onClick={handleLogout}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border
          hover:bg-[#e4f2e4] dark:hover:bg-[#162416]"
        >
          <LogOutIcon className="size-4" />
          {isLoading ? "Logging out..." : "Log out"}
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
