"use client";

import type { ReactNode } from "react";
import {
  ChevronRightIcon,
  CircleSmallIcon,
  SettingsIcon,
  LogOutIcon,
} from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";

export type NavigationItem = {
  title: string;
  href: string;
  shortcut?: string; // Added for professional feel
};

export type NavigationSection = {
  title: string;
  icon?: ReactNode;
  badge?: string; // Added for "New" or "Pro" labels
} & (
  | { items: NavigationItem[]; href?: never }
  | { items?: never; href: string }
);

type Props = {
  trigger: ReactNode;
  navigationData: NavigationSection[];
  align?: "center" | "end" | "start";
  showQuickActions?: boolean;
};

const MenuDropdown = ({
  trigger,
  navigationData,
  align = "end",
  showQuickActions = true,
}: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-64 p-2 shadow-xl border-muted-foreground/20 animate-in fade-in-0 zoom-in-95"
        align={align}
      >
        {/* Optional Header Label */}
        <DropdownMenuLabel className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
          Navigation
        </DropdownMenuLabel>

        <DropdownMenuGroup>
          {navigationData.map((navItem) => {
            if (navItem.href) {
              return (
                <DropdownMenuItem
                  key={navItem.title}
                  asChild
                  className="cursor-pointer focus:bg-accent focus:text-accent-foreground rounded-md"
                >
                  <a
                    href={navItem.href}
                    className="flex w-full items-center gap-2"
                  >
                    <span className="text-muted-foreground">
                      {navItem.icon}
                    </span>
                    <span className="flex-1 font-medium">{navItem.title}</span>
                    {navItem.badge && (
                      <span className="ml-auto text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                        {navItem.badge}
                      </span>
                    )}
                  </a>
                </DropdownMenuItem>
              );
            }

            return (
              <Collapsible key={navItem.title} asChild>
                <div className="flex flex-col">
                  <CollapsibleTrigger asChild>
                    <DropdownMenuItem
                      onSelect={(e) => e.preventDefault()}
                      className="justify-between cursor-pointer rounded-md"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">
                          {navItem.icon}
                        </span>
                        <span className="font-medium">{navItem.title}</span>
                      </div>
                      <ChevronRightIcon className="h-4 w-4 shrink-0 transition-transform duration-200 [[data-state=open]>&]:rotate-90 text-muted-foreground" />
                    </DropdownMenuItem>
                  </CollapsibleTrigger>

                  <CollapsibleContent className="overflow-hidden transition-all data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                    <div className="ml-4 my-1 border-l pl-2 space-y-1 border-muted">
                      {navItem.items?.map((item) => (
                        <DropdownMenuItem
                          key={item.title}
                          asChild
                          className="rounded-sm"
                        >
                          <a
                            href={item.href}
                            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <CircleSmallIcon className="h-4 w-4" />
                            <span className="text-sm">{item.title}</span>
                            {item.shortcut && (
                              <DropdownMenuShortcut>
                                {item.shortcut}
                              </DropdownMenuShortcut>
                            )}
                          </a>
                        </DropdownMenuItem>
                      ))}
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            );
          })}
        </DropdownMenuGroup>

        {showQuickActions && (
          <>
            <DropdownMenuSeparator className="my-2" />
            <DropdownMenuGroup>
              <DropdownMenuItem className="cursor-pointer">
                <SettingsIcon className="mr-2 h-4 w-4" />
                <span>Account Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive">
                <LogOutIcon className="mr-2 h-4 w-4" />
                <span>Log out</span>
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MenuDropdown;
