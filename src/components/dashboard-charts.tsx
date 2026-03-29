"use client";

import {
  Line,
  LineChart,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const occupancyData = [
  { month: "Jan", occupied: 72, available: 28 },
  { month: "Feb", occupied: 85, available: 15 },
  { month: "Mar", occupied: 78, available: 22 },
  { month: "Apr", occupied: 91, available: 9 },
  { month: "May", occupied: 88, available: 12 },
  { month: "Jun", occupied: 95, available: 5 },
  { month: "Jul", occupied: 82, available: 18 },
];

const revenueData = [
  { month: "Apr", revenue: 42000 },
  { month: "May", revenue: 38000 },
  { month: "Jun", revenue: 51000 },
  { month: "Jul", revenue: 47000 },
  { month: "Aug", revenue: 59000 },
];

const roomTypeData = [
  { name: "Single Rooms", value: 35, color: "#7c3aed" },
  { name: "Double Rooms", value: 40, color: "#3b82f6" },
  { name: "Dorm Beds",    value: 25, color: "#10b981" },
];

const RADIAN = Math.PI / 180;

export function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 px-4 lg:px-6">
      {/* Occupancy Rate – Line Chart (spans 2 cols) */}
      <Card className="xl:col-span-2 shadow-sm border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-base font-semibold">Occupancy Rate</CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">Monthly room occupancy vs availability</p>
          </div>
          <Badge variant="secondary" className="text-xs font-medium bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 border-none">
            Last 7 months
          </Badge>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={occupancyData} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
              <defs>
                <linearGradient id="occupiedGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#7c3aed" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
              <YAxis tickLine={false} axisLine={false} tickMargin={8} fontSize={12} unit="%" tickCount={5} />
              <Tooltip
                contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", fontSize: "12px" }}
                formatter={(v: number) => [`${v}%`]}
              />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }} />
              <Line type="monotone" dataKey="occupied"  name="Occupied"  stroke="#7c3aed" strokeWidth={2.5} dot={{ r: 4, fill: "#7c3aed" }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="available" name="Available" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4, fill: "#10b981" }} activeDot={{ r: 6 }} strokeDasharray="5 3" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Room Type Breakdown – Donut */}
      <Card className="shadow-sm border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Room Types</CardTitle>
          <p className="text-xs text-muted-foreground mt-0.5">Current booking distribution</p>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center">
            <div className="relative">
              <PieChart width={200} height={200}>
                <Pie
                  data={roomTypeData}
                  cx={100}
                  cy={100}
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                  stroke="none"
                >
                  {roomTypeData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: number) => [`${v}%`]} contentStyle={{ borderRadius: "10px", fontSize: "12px" }} />
              </PieChart>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-bold text-slate-800 dark:text-slate-100">87%</span>
                <span className="text-xs text-muted-foreground">Occupied</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-2">
            {roomTypeData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full shrink-0" style={{ background: item.color }} />
                  <span className="text-xs text-muted-foreground">{item.name}</span>
                </div>
                <span className="text-xs font-semibold text-foreground">{item.value}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Revenue – Bar Chart (full width) */}
      <Card className="xl:col-span-3 shadow-sm border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-base font-semibold">Monthly Revenue</CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">Total income from bookings & services</p>
          </div>
          <div className="flex gap-2">
            {["Weekly", "Monthly", "Yearly"].map((t) => (
              <button
                key={t}
                className={`text-xs px-3 py-1 rounded-full font-medium transition-colors ${
                  t === "Monthly"
                    ? "bg-violet-600 text-white"
                    : "bg-slate-100 dark:bg-slate-800 text-muted-foreground hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={revenueData} margin={{ top: 10, right: 10, bottom: 0, left: -10 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
              <YAxis tickLine={false} axisLine={false} tickMargin={8} fontSize={12} tickCount={5} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
              <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", fontSize: "12px" }} formatter={(v: number) => [`$${v.toLocaleString()}`]} />
              <Bar dataKey="revenue" name="Revenue" fill="#7c3aed" radius={[6, 6, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}