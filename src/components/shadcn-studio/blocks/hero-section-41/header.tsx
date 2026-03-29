"use client";

import { useEffect, useState } from "react";
import {
  MenuIcon,
  BellIcon,
  LanguagesIcon,
  MoonIcon,
  SunIcon,
  UserIcon,
} from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import MenuDropdown from "@/components/shadcn-studio/blocks/menu-dropdown";
import MenuNavigation from "@/components/shadcn-studio/blocks/menu-navigation";
import type { NavigationSection } from "@/components/shadcn-studio/blocks/menu-navigation";
import { cn } from "@/lib/utils";
import StayNestLogo from "@/assets/svg/bistro-logo";

type HeaderProps = {
  navigationData: NavigationSection[];
  className?: string;
};

export default function Header({ navigationData, className }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // Must wait for mount before reading theme to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function toggleTheme() {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }

  return (
    <header
      className={cn(
        "fixed top-0 z-50 h-[70px] w-full border-b transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-sm shadow-sm"
          : "bg-transparent border-transparent",
        className,
      )}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3">
          <StayNestLogo />
          <span className="hidden text-[20px] font-semibold text-primary md:block">
            StayNest
          </span>
        </a>

        {/* Desktop Navigation */}
        <MenuNavigation
          navigationData={navigationData}
          className="hidden lg:block **:data-[slot=navigation-menu-list]:gap-1"
        />

        {/* Right Actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Language */}
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
            <LanguagesIcon className="h-4 w-4" />
            <span className="sr-only">Change language</span>
          </Button>

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

          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="relative h-9 w-9 rounded-full"
          >
            <BellIcon className="h-4 w-4" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive ring-2 ring-background" />
            <span className="sr-only">Notifications</span>
          </Button>

          {/* Login */}
          <Button variant="ghost" className="hidden sm:flex" asChild>
            <a href="/login">Login</a>
          </Button>

          {/* Register */}
          <Button className="rounded-full px-4 sm:px-6" asChild>
            <a href="/register">
              <span className="hidden sm:inline">Register</span>
              <UserIcon className="h-4 w-4 sm:hidden" />
            </a>
          </Button>

          {/* Mobile Menu */}
          <MenuDropdown
            align="end"
            navigationData={navigationData}
            trigger={
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 rounded-full lg:hidden"
              >
                <MenuIcon className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            }
          />
        </div>
      </div>
    </header>
  );
}
