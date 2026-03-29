import { StatsGrid } from "@/components/section-cards";
import { DashboardCharts } from "@/components/dashboard-charts";
import { DashboardActivity } from "@/components/dashboard-activity";

const hostelStats = {
  dashboard: {
    stats: [
      {
        label: "Total Rooms",
        value: "120",
        sub: "8 under maintenance",
        icon: "BedDouble",
        iconColor: "#7c3aed",
        iconBg: "rgba(124,58,237,0.1)",
        trend: "+2%",
      },
      {
        label: "Active Guests",
        value: "214",
        sub: "vs last month",
        icon: "Users",
        iconColor: "#3b82f6",
        iconBg: "rgba(59,130,246,0.1)",
        trend: "+12%",
      },
      {
        label: "Bookings This Month",
        value: "87",
        sub: "12 pending approval",
        icon: "CalendarCheck",
        iconColor: "#10b981",
        iconBg: "rgba(16,185,129,0.1)",
        trend: "+8%",
      },
      {
        label: "Monthly Revenue",
        value: "$51,200",
        sub: "vs last month",
        icon: "CreditCard",
        iconColor: "#f59e0b",
        iconBg: "rgba(245,158,11,0.1)",
        trend: "+18%",
      },
    ],
  },
};

export default function Page() {
  return (
    <>
      {/* Page header */}
      <div className="px-4 lg:px-6 mb-6 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100">
              Dashboard Overview
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Welcome back! Here's what's happening at your hostel.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 px-3 py-2 rounded-xl shadow-sm">
            <span className="size-2 rounded-full bg-emerald-400 shrink-0" />
            Live · Updated just now
          </div>
        </div>
      </div>

      {/* Stats */}
      <StatsGrid stats={hostelStats.dashboard.stats} />

      {/* Charts */}
      <div className="mt-4">
        <DashboardCharts />
      </div>

      {/* Activity + Quick Actions + Room Status */}
      <div className="mt-4">
        <DashboardActivity />
      </div>
    </>
  );
}
