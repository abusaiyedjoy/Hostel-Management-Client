"use client";

import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BellIcon,
  SearchIcon,
  UserCircleIcon,
  Settings2Icon,
  ChevronRightIcon,
  SunIcon,
  MoonIcon,
} from "lucide-react";
import { NotificationDropdown } from "./layout/notifications";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";

function ProfileDropdown() {
  return (
    <div
      className="absolute right-0 top-[calc(100%+10px)] z-50 w-[260px] rounded-2xl overflow-hidden
        bg-[#fafdf8] dark:bg-[#111f11]
        border border-[#c8ddc8] dark:border-[#1e3a1e]
        shadow-[0_8px_32px_rgba(20,60,20,0.14)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="px-4 pt-4 pb-3 border-b border-[#c8ddc8] dark:border-[#1e3a1e]">
        <div className="flex items-center gap-3">
          <Avatar className="size-10">
            <AvatarImage src="/avatars/shadcn.jpg" alt="Alice Johnson" />
            <AvatarFallback className="bg-[#d4edcc] text-[#1e4d2b] font-semibold dark:bg-[#1a3a1a] dark:text-[#6ddc6d]">
              AJ
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold text-[#1a2e1a] dark:text-[#c8ecc8]">
              Alice Johnson
            </p>
            <p className="text-xs text-[#5a7a5a] dark:text-[#6a9a6a]">
              alice@admin.com
            </p>
            <span className="mt-1 inline-flex items-center gap-1 text-[10px] font-medium text-[#2d6b2d] dark:text-[#6ddc6d] border border-[#b8d8b8] dark:border-[#264026] rounded-full px-2 py-0.5">
              <span className="size-1.5 rounded-full bg-emerald-400 inline-block" />
              Super Admin
            </span>
          </div>
        </div>
      </div>
      <div className="py-1.5">
        {[
          {
            Icon: UserCircleIcon,
            label: "Profile settings",
            sub: "Manage Your Account",
          },
          {
            Icon: Settings2Icon,
            label: "Platform Settings",
            sub: "Configure platform settings",
          },
        ].map(({ Icon, label, sub }) => (
          <button
            key={label}
            className="flex w-full items-center gap-3 px-4 py-2.5 text-sm transition-colors group hover:bg-[#eef7ee] dark:hover:bg-[#162416]"
          >
            <span className="flex size-7 items-center justify-center rounded-lg bg-[#e4f2e4] dark:bg-[#1a3a1a] group-hover:bg-[#d4ecd4] dark:group-hover:bg-[#1e4a1e] transition-colors">
              <Icon className="size-3.5 text-[#4a8a4a] dark:text-[#5aaa5a] group-hover:text-[#1e6b1e] dark:group-hover:text-[#4ade80] transition-colors" />
            </span>
            <div className="text-left">
              <p className="font-medium leading-none text-[#1a2e1a] dark:text-[#c8ecc8]">
                {label}
              </p>
              <p className="text-[11px] mt-0.5 text-[#5a7a5a] dark:text-[#6a9a6a]">
                {sub}
              </p>
            </div>
            <ChevronRightIcon className="ml-auto size-3.5 text-[#8aaa8a] dark:text-[#4a6a4a]" />
          </button>
        ))}
      </div>
    </div>
  );
}

export function SiteHeader() {
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  function toggleTheme() {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }
  // Must wait for mount before reading theme to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const closeAll = () => {
    setNotifOpen(false);
    setProfileOpen(false);
  };
  const toggleNotif = () => {
    setNotifOpen((v) => !v);
    setProfileOpen(false);
  };
  const toggleProfile = () => {
    setProfileOpen((v) => !v);
    setNotifOpen(false);
  };

  return (
    <>
      {(notifOpen || profileOpen) && (
        <div className="fixed inset-0 z-40" onClick={closeAll} />
      )}

      <header
        className="
        flex h-(--header-height) shrink-0 items-center gap-2 py-6
        bg-[#fafdf8] dark:bg-[#0d1a0d]
        border-b border-[#c8ddc8] dark:border-[#1a3a1a]
        shadow-[0_4px_20px_rgba(20,60,20,0.07)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.45)]
        transition-[width,height] ease-linear
        group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)
      "
      >
        <div className="flex w-full items-center justify-between gap-4 px-4 lg:gap-6 lg:px-6">
          {/* left */}
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1 text-[#3a6a3a] dark:text-[#6ddc6d]" />
            <Separator
              orientation="vertical"
              className="mx-2 data-[orientation=vertical]:h-4 hidden md:block bg-[#c0d8c0] dark:bg-[#243424]"
            />
            <div className="hidden md:flex flex-col">
              <h1 className="text-base font-semibold whitespace-nowrap leading-none text-[#1a2e1a] dark:text-[#c8ecc8]">
                Good Morning, Admin 👋
              </h1>
              <p className="text-xs mt-0.5 text-[#5a7a5a] dark:text-[#6a9a6a]">
                Here's what's happening at your hostel today
              </p>
            </div>
          </div>

          {/* search */}
          <div className="flex-1 max-w-md hidden lg:block">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#7aaa7a] dark:text-[#4a7a4a]" />
              <Input
                type="search"
                placeholder="Search rooms, guests, bookings..."
                className="
                  w-full pl-9 h-10 rounded-xl text-sm
                  bg-[#edf7ed] dark:bg-[#141f14]
                  border-[#c0d8c0] dark:border-[#243424]
                  text-[#1a2e1a] dark:text-[#c8ecc8]
                  placeholder:text-[#8aaa8a] dark:placeholder:text-[#446044]
                  focus-visible:ring-1 focus-visible:ring-[#2d7a2d] dark:focus-visible:ring-[#4ade80]
                  focus-visible:ring-offset-0
                "
              />
            </div>
          </div>

          {/* right actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {/* Render nothing until mounted to avoid hydration mismatch */}
              {mounted ? (
                resolvedTheme === "dark" ? (
                  <SunIcon className="h-4 w-4" />
                ) : (
                  <MoonIcon className="h-4 w-4" />
                )
              ) : (
                <span className="h-4 w-4" />
              )}
            </Button>

            {/* bell */}
            <div className="relative">
              <button
                onClick={toggleNotif}
                className="relative flex size-9 items-center justify-center rounded-full transition-colors text-[#4a7a4a] dark:text-[#6ddc6d] hover:bg-[#dff0df] dark:hover:bg-[#162416]"
              >
                <BellIcon className="size-5" />
                <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-red-500 border-2 border-[#fafdf8] dark:border-[#0d1a0d]" />
              </button>
              {notifOpen && (
                <NotificationDropdown onClose={() => setNotifOpen(false)} />
              )}
            </div>

            {/* profile */}
            <div className="relative">
              <button
                onClick={toggleProfile}
                className="flex items-center gap-2.5 rounded-full pl-1 pr-3 py-1 transition-colors hover:bg-[#dff0df] dark:hover:bg-[#162416]"
              >
                <Avatar className="size-8 ring-2 ring-[#90c890] dark:ring-[#264026]">
                  <AvatarImage src="/avatars/shadcn.jpg" alt="Johan Smith" />
                  <AvatarFallback className="bg-[#d4edcc] text-[#1e4d2b] text-xs font-bold dark:bg-[#1a3a1a] dark:text-[#6ddc6d]">
                    JS
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:flex flex-col items-start">
                  <span className="text-sm font-semibold leading-none text-[#1a2e1a] dark:text-[#c8ecc8]">
                    Johan Smith
                  </span>
                  <span className="text-[11px] mt-0.5 text-[#5a7a5a] dark:text-[#6a9a6a]">
                    Admin
                  </span>
                </div>
              </button>
              {profileOpen && <ProfileDropdown />}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
