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

// ─── Colour tokens
const G_PRIMARY = "#1e4d2b"; // forest green (primary accent)
const G_ACCENT = "#4ade80"; // bright green (dark-mode accent / chart highlight)
const G_SOFT = "#86c986"; // mid green
const G_EMERALD = "#10b981";
const G_AMBER = "#f59e0b";

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
  { name: "Single Rooms", value: 35, color: G_PRIMARY },
  { name: "Double Rooms", value: 40, color: G_SOFT },
  { name: "Dorm Beds", value: 25, color: G_EMERALD },
];

// shared card wrapper
function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`
      rounded-2xl border p-5
      bg-[#fafdf8] dark:bg-[#111f11]
      border-[#c8ddc8] dark:border-[#1e3a1e]
      shadow-sm ${className}
    `}
    >
      {children}
    </div>
  );
}

function CardHeader({
  title,
  sub,
  right,
}: {
  title: string;
  sub?: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        <p className="text-base font-semibold text-[#1a2e1a] dark:text-[#c8ecc8]">
          {title}
        </p>
        {sub && (
          <p className="text-xs text-[#6a9a6a] dark:text-[#5a7a5a] mt-0.5">
            {sub}
          </p>
        )}
      </div>
      {right}
    </div>
  );
}

const tooltipStyle = {
  borderRadius: "12px",
  border: "1px solid #c8ddc8",
  fontSize: "12px",
  backgroundColor: "#fafdf8",
  color: "#1a2e1a",
};

export function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 px-4 lg:px-6">
      {/* Occupancy Line — 2 cols */}
      <Card className="xl:col-span-2">
        <CardHeader
          title="Occupancy Rate"
          sub="Monthly room occupancy vs availability"
          right={
            <span className="rounded-full px-3 py-1 text-xs font-semibold bg-[#d4edcc] dark:bg-[#1a3a1a] text-[#1e4d2b] dark:text-[#6ddc6d]">
              Last 7 months
            </span>
          }
        />
        <ResponsiveContainer width="100%" height={240}>
          <LineChart
            data={occupancyData}
            margin={{ top: 10, right: 10, bottom: 0, left: -20 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e4f0e4"
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              fontSize={12}
              tick={{ fill: "#7a9a7a" }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              fontSize={12}
              tickCount={5}
              unit="%"
              tick={{ fill: "#7a9a7a" }}
            />
            <Tooltip
              contentStyle={tooltipStyle}
              formatter={(
                v: string | number | ReadonlyArray<string | number> | undefined,
              ) => [`${v}%`]}
            />
            <Legend
              iconType="circle"
              iconSize={8}
              wrapperStyle={{
                fontSize: "12px",
                paddingTop: "12px",
                color: "#5a7a5a",
              }}
            />
            <Line
              type="monotone"
              dataKey="occupied"
              name="Occupied"
              stroke={G_PRIMARY}
              strokeWidth={2.5}
              dot={{ r: 4, fill: G_PRIMARY }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="available"
              name="Available"
              stroke={G_EMERALD}
              strokeWidth={2.5}
              dot={{ r: 4, fill: G_EMERALD }}
              activeDot={{ r: 6 }}
              strokeDasharray="5 3"
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Room Type Donut */}
      <Card>
        <CardHeader title="Room Types" sub="Current booking distribution" />
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
                {roomTypeData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(
                  v:
                    | string
                    | number
                    | ReadonlyArray<string | number>
                    | undefined,
                ) => [`${v}%`]}
                contentStyle={tooltipStyle}
              />
            </PieChart>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-bold text-[#1a2e1a] dark:text-[#c8ecc8]">
                87%
              </span>
              <span className="text-xs text-[#6a9a6a] dark:text-[#5a7a5a]">
                Occupied
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-2">
          {roomTypeData.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="size-2.5 rounded-full shrink-0"
                  style={{ background: item.color }}
                />
                <span className="text-xs text-[#6a9a6a] dark:text-[#5a7a5a]">
                  {item.name}
                </span>
              </div>
              <span className="text-xs font-semibold text-[#1a2e1a] dark:text-[#c8ecc8]">
                {item.value}%
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Revenue Bar — full width */}
      <Card className="xl:col-span-3">
        <CardHeader
          title="Monthly Revenue"
          sub="Total income from bookings & services"
          right={
            <div className="flex gap-2">
              {["Weekly", "Monthly", "Yearly"].map((t) => (
                <button
                  key={t}
                  className={`text-xs px-3 py-1 rounded-full font-medium transition-colors ${
                    t === "Monthly"
                      ? "bg-[#1e4d2b] dark:bg-[#2d7040] text-white"
                      : "bg-[#e4f2e4] dark:bg-[#1a3a1a] text-[#5a7a5a] dark:text-[#6a9a6a] hover:bg-[#d4ecd4] dark:hover:bg-[#1e4a1e]"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          }
        />
        <ResponsiveContainer width="100%" height={200}>
          <BarChart
            data={revenueData}
            margin={{ top: 10, right: 10, bottom: 0, left: -10 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e4f0e4"
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              fontSize={12}
              tick={{ fill: "#7a9a7a" }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              fontSize={12}
              tickCount={5}
              tick={{ fill: "#7a9a7a" }}
              tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={tooltipStyle}
              formatter={(
                v: string | number | ReadonlyArray<string | number> | undefined,
              ) => [`$${v?.toLocaleString()}`]}
            />
            <Bar
              dataKey="revenue"
              name="Revenue"
              fill={G_PRIMARY}
              radius={[6, 6, 0, 0]}
              barSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
