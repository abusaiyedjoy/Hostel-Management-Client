import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 68)",
          "--header-height": "calc(var(--spacing) * 16)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" className="z-10" />

      <SidebarInset
        className="
        w-full flex-1 overflow-hidden
        bg-[#f2f7f2] dark:bg-[#0a150a]
      "
      >
        <SiteHeader />

        <div className="flex flex-1 flex-col">
          {/* page canvas — warm cream (light) / deep forest (dark) */}
          <div
            className="
            min-h-screen p-4 sm:p-5
            bg-[#f0f7f0] dark:bg-[#0a150a]
          "
          >
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
