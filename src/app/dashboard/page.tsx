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
        iconColor: "#1e4d2b",
        iconBg: "rgba(30,77,43,0.12)",
        trend: "+2%",
      },
      {
        label: "Active Guests",
        value: "214",
        sub: "vs last month",
        icon: "Users",
        iconColor: "#0d7a5a",
        iconBg: "rgba(13,122,90,0.12)",
        trend: "+12%",
      },
      {
        label: "Bookings This Month",
        value: "87",
        sub: "12 pending approval",
        icon: "CalendarCheck",
        iconColor: "#2d7040",
        iconBg: "rgba(45,112,64,0.12)",
        trend: "+8%",
      },
      {
        label: "Monthly Revenue",
        value: "$51,200",
        sub: "vs last month",
        icon: "CreditCard",
        iconColor: "#b45309",
        iconBg: "rgba(180,83,9,0.10)",
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
            <h1 className="text-xl sm:text-2xl font-bold text-[#1a2e1a] dark:text-[#c8ecc8]">
              Dashboard Overview
            </h1>
            <p className="text-sm text-[#5a7a5a] dark:text-[#6a9a6a] mt-1">
              Welcome back! Here's what's happening at your hostel.
            </p>
          </div>

          {/* Live status pill */}
          <div
            className="
            flex items-center gap-2 text-xs px-3 py-2 rounded-xl
            bg-[#fafdf8] dark:bg-[#111f11]
            border border-[#c8ddc8] dark:border-[#1e3a1e]
            text-[#5a7a5a] dark:text-[#6a9a6a]
            shadow-sm
          "
          >
            <span className="size-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            Live · Updated just now
          </div>
        </div>
      </div>

      <StatsGrid stats={hostelStats.dashboard.stats} />

      <div className="mt-4">
        <DashboardCharts />
      </div>

      <div className="mt-4">
        <DashboardActivity />
      </div>
    </>
  );
}
