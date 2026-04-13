"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: React.ReactNode;
  }[];
}) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => {
            const normalize = (path: string) => path.replace(/\/$/, "");
            const currentPath = normalize(pathname);
            console.log("item", item.url);
            const itemPath = normalize(item.url);
            console.log("itemPath", itemPath);
            const isActive =
              itemPath === "/dashboard"
                ? currentPath === "/dashboard"
                : currentPath === itemPath ||
                  currentPath.startsWith(itemPath + "/");

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  tooltip={item.title}
                  className={`
    py-5 rounded-lg text-sm font-medium transition-all duration-200
    ${
      isActive
        ? "bg-[#dff0df] text-[#1e6b1e] dark:bg-[#162416] dark:text-[#4ade80]"
        : "text-[#5a7a5a] dark:text-[#6a9a6a] hover:bg-[#eef7ee] dark:hover:bg-[#162416] hover:text-[#1a2e1a] dark:hover:text-[#c8ecc8]"
    }
  `}
                >
                  <Link href={item.url} className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
