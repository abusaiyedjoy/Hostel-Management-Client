"use client";

import { useEffect, useState } from "react";
import {
  CalendarClockIcon,
  MenuIcon,
  BellIcon,
  LanguagesIcon,
  MoonIcon,
  SunIcon,
  UserIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import MenuDropdown from "@/components/shadcn-studio/blocks/menu-dropdown";
import MenuNavigation from "@/components/shadcn-studio/blocks/menu-navigation";
import type { NavigationSection } from "@/components/shadcn-studio/blocks/menu-navigation";

import { cn } from "@/lib/utils";
import StayNestLogo from "@/assets/svg/bistro-logo";

// Mocking some common components you might use for the new features
// If you don't have these specific ones, you can swap them for standard Buttons
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type HeaderProps = {
  navigationData: NavigationSection[];
  className?: string;
};

const Header = ({ navigationData, className }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 h-17.5 w-full border-b transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur shadow-sm"
          : "bg-transparent",
        className,
      )}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Left: Logo */}
        <div className="flex items-center gap-8">
          <a href="#" className="flex items-center gap-3 shrink-0">
            <StayNestLogo />
            <span className="text-primary text-[20px] font-semibold hidden md:block">
              StayNest
            </span>
          </a>
        </div>
        {/* Center: Desktop Navigation */}
        <MenuNavigation
          navigationData={navigationData}
          className="hidden lg:block [&_[data-slot=navigation-menu-list]]:gap-1"
        />

        {/* Right: Actions Section */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Utilities: Theme, Language, Notifications */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Language Switcher */}
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-9 w-9"
            >
              <LanguagesIcon className="h-5 w-5" />
              <span className="sr-only">Switch Language</span>
            </Button>

            {/* Theme Toggle (Simplified) */}
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-9 w-9"
            >
              <SunIcon className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <MoonIcon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle Theme</span>
            </Button>

            {/* Notifications */}
            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-full h-9 w-9"
            >
              <BellIcon className="h-5 w-5" />
              <span className="absolute top-2 right-2 flex h-2 w-2 rounded-full bg-destructive"></span>
              <span className="sr-only">Notifications</span>
            </Button>
          </div>

          {/* Auth Buttons: Hidden on tiny screens, icon on medium, text on large */}
          <div className="flex items-center gap-2 border-l pl-2 sm:pl-4 ml-1">
            <Button variant="ghost" className="hidden sm:flex" asChild>
              <a href="/login">Login</a>
            </Button>

            {/* "Join" or Register Button */}
            <Button className="rounded-full px-4 sm:px-6" asChild>
              <a href="/register">
                <span className="hidden sm:inline">Register</span>
                <UserIcon className="h-5 w-5 sm:hidden" />
              </a>
            </Button>
          </div>

          {/* Mobile Menu & Quick Book */}
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              className="rounded-full lg:hidden h-9 w-9"
              variant="secondary"
              asChild
            >
              <a href="#">
                <CalendarClockIcon className="h-5 w-5" />
                <span className="sr-only">Book table</span>
              </a>
            </Button>

            <MenuDropdown
              align="end"
              navigationData={navigationData}
              trigger={
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full lg:hidden h-9 w-9"
                >
                  <MenuIcon className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              }
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
