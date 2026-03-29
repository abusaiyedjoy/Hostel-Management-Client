import { StatsGrid } from "@/components/section-cards";
import { DashboardCharts } from "@/components/dashboard-charts";
import { DashboardActivity } from "@/components/dashboard-activity";
import data from "./data.json";

export default function Page() {
  return (
    <>
      <div className="px-4 lg:px-6 mb-6 p-6">
        <h1 className="text-2xl font-bold text-slate-800">
          Dashboard Overview
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Welcome back! What's happening with your platform
        </p>
      </div>
      <StatsGrid stats={data.dashboard.stats} />
      <div className="mt-4">
        <DashboardCharts />
      </div>
      <div className="mt-4">
        <DashboardActivity />
      </div>
    </>
  );
}
