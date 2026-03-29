"use client";

import {
  Line,
  LineChart,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const userGrowthData = [
  { month: "Jan", users: 2400 },
  { month: "Feb", users: 2800 },
  { month: "Mar", users: 1900 },
  { month: "Apr", users: 2100 },
  { month: "May", users: 2200 },
  { month: "Jun", users: 2700 },
];

const monthlyReviewsData = [
  { month: "Jan", reviews: 1800 },
  { month: "Feb", reviews: 1200 },
  { month: "Mar", reviews: 4500 },
  { month: "Apr", reviews: 2900 },
  { month: "May", reviews: 2500 },
];

export function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 lg:px-6">
      {/* User Growth Chart */}
      <Card className="shadow-sm border-none bg-white">
        <CardHeader>
          <CardTitle className="text-base font-semibold">User Growth</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              users: {
                label: "Users",
                color: "#0ea5e9", // blue-500
              },
            }}
            className="h-[250px] w-full"
          >
            <LineChart
              data={userGrowthData}
              margin={{ top: 20, right: 20, bottom: 20, left: -20 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={true}
                tickMargin={10}
                fontSize={12}
                fill="#888888"
              />
              <YAxis
                tickLine={false}
                axisLine={true}
                tickMargin={10}
                fontSize={12}
                tickCount={5}
                fill="#888888"
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Line
                type="linear"
                dataKey="users"
                stroke="var(--color-users)"
                strokeWidth={2}
                dot={{ r: 4, fill: "var(--color-users)" }}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Monthly Reviews Chart */}
      <Card className="shadow-sm border-none bg-white">
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            Monthly Reviews
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              reviews: {
                label: "Reviews",
                color: "#10b981", // emerald-500
              },
            }}
            className="h-[250px] w-full"
          >
            <BarChart
              data={monthlyReviewsData}
              margin={{ top: 20, right: 20, bottom: 20, left: -20 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={true}
                tickMargin={10}
                fontSize={12}
                fill="#888888"
              />
              <YAxis
                tickLine={false}
                axisLine={true}
                tickMargin={10}
                fontSize={12}
                tickCount={5}
                fill="#888888"
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Bar
                dataKey="reviews"
                fill="var(--color-reviews)"
                radius={[4, 4, 0, 0]}
                barSize={40}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
