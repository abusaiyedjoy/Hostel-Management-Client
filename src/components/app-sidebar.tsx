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
  CreditCardIcon,
  LogOutIcon,
  BuildingIcon,
  SettingsIcon,
  UtensilsCrossedIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout, useLogoutApiMutation } from "@/redux";
import Image from "next/image";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: <LayoutDashboardIcon />,
    },
    {
      title: "Members",
      url: "/admin/dashboard/members",
      icon: <UsersIcon />,
    },
    {
      title: "Messes",
      url: "/admin/dashboard/messes",
      icon: <BuildingIcon />,
    },
    {
      title: "Meals",
      url: "/admin/dashboard/meals",
      icon: <UtensilsCrossedIcon />,
    },
    {
      title: "Payments",
      url: "/admin/dashboard/payments",
      icon: <CreditCardIcon />,
    },
    {
      title: "Settings",
      url: "/admin/dashboard/settings",
      icon: <SettingsIcon />,
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
    shadow-[0_4px_20px_rgba(20,60,20,0.07)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.45)]
  "
      {...props}
    >
      {/* ── Logo ── */}
      <SidebarHeader className="h-(--header-height) border-b border-[#c8ddc8] dark:border-[#1a3a1a]">
        <SidebarMenu>
          <SidebarMenuItem>
            <a href="/" className="flex items-center gap-1 px-3 py-3.5">
              <Image src="/Logo.png" alt="Logo" width={44} height={44} />
              <span className="hidden text-[20px] font-semibold text-primary md:block">
                StayNest
              </span>
            </a>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* ── Nav ── */}
      <SidebarContent className="px-2 mt-2">
        <NavMain items={data.navMain} />
      </SidebarContent>

      {/* ── Logout ── */}
      <SidebarFooter className="p-4">
        <button
          onClick={handleLogout}
          disabled={isLoading}
          className="
    flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border
    border-[#c8ddc8] dark:border-[#1a3a1a]
    text-[#1a2e1a] dark:text-[#c8ecc8]
    hover:bg-[#dff0df] dark:hover:bg-[#162416]
    transition-colors
  "
        >
          <LogOutIcon className="size-4" />
          {isLoading ? "Logging out..." : "Log out"}
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
