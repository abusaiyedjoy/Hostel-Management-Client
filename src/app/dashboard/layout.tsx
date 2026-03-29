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
      <SidebarInset className="bg-slate-50 dark:bg-slate-950 w-full flex-1 overflow-hidden">
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="flex flex-1 flex-col">
            <div className="flex flex-col">
              <div className="bg-gradient-to-br from-slate-50 via-violet-50/40 to-blue-50/30 dark:from-slate-950 dark:via-violet-950/20 dark:to-slate-900 min-h-screen p-4 sm:p-5">
                {children}
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
