"use client";

import { useState } from "react";
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
} from "lucide-react";
import { NotificationDropdown } from "./layout/notifications";

function ProfileDropdown({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="absolute right-0 top-[calc(100%+10px)] z-50 w-[260px] rounded-2xl border border-border bg-white shadow-xl overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      {/* user info */}
      <div className="px-4 pt-4 pb-3 border-b border-border">
        <div className="flex items-center gap-3">
          <Avatar className="size-10">
            <AvatarImage src="/avatars/shadcn.jpg" alt="Alice Johnson" />
            <AvatarFallback className="bg-violet-100 text-violet-600 font-semibold">
              AJ
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold leading-tight">Alice Johnson</p>
            <p className="text-xs text-muted-foreground">alice@admin.com</p>
            <span className="mt-1 inline-flex items-center gap-1 text-[10px] font-medium text-slate-500 border border-slate-200 rounded-full px-2 py-0.5">
              <span className="size-1.5 rounded-full bg-emerald-400 inline-block" />
              Super Admin
            </span>
          </div>
        </div>
      </div>

      {/* menu items */}
      <div className="py-1.5">
        <button className="flex w-full items-center gap-3 px-4 py-2.5 text-sm hover:bg-slate-50 transition-colors group">
          <span className="flex size-7 items-center justify-center rounded-lg bg-slate-100 group-hover:bg-violet-100 transition-colors">
            <UserCircleIcon className="size-3.5 text-slate-500 group-hover:text-violet-600 transition-colors" />
          </span>
          <div className="text-left">
            <p className="font-medium text-foreground leading-none">
              Profile settings
            </p>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              Manage Your Account
            </p>
          </div>
          <ChevronRightIcon className="ml-auto size-3.5 text-muted-foreground" />
        </button>

        <button className="flex w-full items-center gap-3 px-4 py-2.5 text-sm hover:bg-slate-50 transition-colors group">
          <span className="flex size-7 items-center justify-center rounded-lg bg-slate-100 group-hover:bg-violet-100 transition-colors">
            <Settings2Icon className="size-3.5 text-slate-500 group-hover:text-violet-600 transition-colors" />
          </span>
          <div className="text-left">
            <p className="font-medium text-foreground leading-none">
              Platform Settings
            </p>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              Configure platform settings
            </p>
          </div>
          <ChevronRightIcon className="ml-auto size-3.5 text-muted-foreground" />
        </button>
      </div>
    </div>
  );
}

// ── main component

export function SiteHeader() {
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

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
      {/* backdrop – click anywhere outside to close */}
      {(notifOpen || profileOpen) && (
        <div className="fixed inset-0 z-40" onClick={closeAll} />
      )}

      <header className="flex h-(--header-height) shadow-[0_6px_12px_rgba(0,0,0,0.1)]  shrink-0 items-center gap-2 py-6 border-b bg-white transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
        <div className="flex w-full items-center justify-between gap-4 px-4 lg:gap-6 lg:px-6">
          {/* left */}
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mx-2 data-[orientation=vertical]:h-4 hidden md:block"
            />
            <h1 className="text-base font-semibold whitespace-nowrap hidden md:block text-foreground">
              Good Morning Mario
            </h1>
          </div>

          {/* centre search */}
          <div className="flex-1 max-w-md md:hidden lg:block">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search Users / Businesses..."
                className="w-full bg-slate-50 pl-9 h-10 rounded-xl border-slate-200 focus-visible:ring-1 focus-visible:ring-violet-400 text-sm"
              />
            </div>
          </div>

          {/* right actions */}
          <div className="flex items-center gap-3">
            {/* notification bell */}
            <div className="relative">
              <button
                onClick={toggleNotif}
                className="relative flex size-9 items-center justify-center rounded-full hover:bg-slate-100 transition-colors text-muted-foreground hover:text-foreground"
              >
                <BellIcon className="size-5" />
                <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-red-500 border-2 border-white" />
              </button>
              {notifOpen && (
                <NotificationDropdown onClose={() => setNotifOpen(false)} />
              )}
            </div>

            {/* profile avatar button */}
            <div className="relative">
              <button
                onClick={toggleProfile}
                className="flex items-center gap-2.5 rounded-full pl-1 pr-3 py-1 hover:bg-slate-100 transition-colors"
              >
                <Avatar className="size-8 ring-2 ring-violet-200">
                  <AvatarImage src="/avatars/shadcn.jpg" alt="Johan Smith" />
                  <AvatarFallback className="bg-violet-100 text-violet-600 text-xs font-bold">
                    JS
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:flex flex-col items-start">
                  <span className="text-sm font-semibold leading-none text-foreground">
                    Johan Smith
                  </span>
                  <span className="text-[11px] text-muted-foreground mt-0.5">
                    Admin
                  </span>
                </div>
              </button>
              {profileOpen && (
                <ProfileDropdown onClose={() => setProfileOpen(false)} />
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
