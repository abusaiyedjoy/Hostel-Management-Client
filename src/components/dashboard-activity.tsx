import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BedDoubleIcon,
  WrenchIcon,
  CreditCardIcon,
  UserPlusIcon,
  CheckCircleIcon,
  ClipboardListIcon,
  BellIcon,
  FileTextIcon,
} from "lucide-react";

const recentActivities = [
  {
    icon: UserPlusIcon,
    iconColor: "text-violet-600",
    iconBg: "bg-violet-100 dark:bg-violet-900/40",
    title: "New Guest Check-in",
    description: "Room 204 – Sarah Mitchell arrived",
    time: "5 min ago",
    badge: "Check-in",
    badgeColor:
      "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300",
  },
  {
    icon: WrenchIcon,
    iconColor: "text-amber-600",
    iconBg: "bg-amber-100 dark:bg-amber-900/40",
    title: "Maintenance Request",
    description: "Room 112 – Air conditioner fault",
    time: "18 min ago",
    badge: "Urgent",
    badgeColor: "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300",
  },
  {
    icon: CreditCardIcon,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-100 dark:bg-emerald-900/40",
    title: "Payment Received",
    description: "Booking #3847 – $240 settled",
    time: "42 min ago",
    badge: "Paid",
    badgeColor:
      "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300",
  },
  {
    icon: BedDoubleIcon,
    iconColor: "text-slate-600",
    iconBg: "bg-slate-100 dark:bg-slate-800",
    title: "Room Checkout",
    description: "Room 305 – James Okafor checked out",
    time: "1 hr ago",
    badge: "Check-out",
    badgeColor:
      "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300",
  },
];

const quickActions = [
  {
    icon: BedDoubleIcon,
    iconColor: "text-violet-600",
    iconBg: "bg-violet-100 dark:bg-violet-900/40",
    title: "Assign Room",
    description: "Allocate a room to a new guest",
  },
  {
    icon: CheckCircleIcon,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-100 dark:bg-emerald-900/40",
    title: "Approve Booking",
    description: "Review pending reservations",
  },
  {
    icon: BellIcon,
    iconColor: "text-amber-600",
    iconBg: "bg-amber-100 dark:bg-amber-900/40",
    title: "Send Notification",
    description: "Alert guests or staff",
  },
  {
    icon: FileTextIcon,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100 dark:bg-blue-900/40",
    title: "Generate Report",
    description: "Export occupancy & revenue",
  },
];

// Right-column: today's room status snapshot
const roomStatusData = [
  { label: "Total Rooms", value: 120, color: "bg-slate-200 dark:bg-slate-700" },
  { label: "Occupied", value: 97, color: "bg-violet-500" },
  { label: "Available", value: 15, color: "bg-emerald-500" },
  { label: "Under Maintenance", value: 8, color: "bg-amber-500" },
];

export function DashboardActivity() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 px-4 lg:px-6 mt-4 mb-8">
      {/* Recent Activity */}
      <Card className="lg:col-span-1 shadow-sm border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            Recent Activity
          </CardTitle>
          <p className="text-xs text-muted-foreground mt-0.5">
            Latest hostel events & alerts
          </p>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {recentActivities.map((activity, index) => {
            const Icon = activity.icon;
            return (
              <div
                key={index}
                className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <span
                  className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${activity.iconBg}`}
                >
                  <Icon className={`size-4 ${activity.iconColor}`} />
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <p className="text-sm font-semibold truncate">
                      {activity.title}
                    </p>
                    <Badge
                      className={`text-[10px] font-medium border-none px-2 py-0.5 shrink-0 ${activity.badgeColor}`}
                    >
                      {activity.badge}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">
                    {activity.description}
                  </p>
                  <p className="text-[10px] text-muted-foreground/70 mt-0.5">
                    {activity.time}
                  </p>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="lg:col-span-1 shadow-sm border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            Quick Actions
          </CardTitle>
          <p className="text-xs text-muted-foreground mt-0.5">
            Common management tasks
          </p>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                className="flex items-start gap-3 text-left border border-slate-100 dark:border-slate-700 rounded-xl p-3 hover:border-violet-300 dark:hover:border-violet-700 hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-all group"
              >
                <span
                  className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${action.iconBg} group-hover:scale-110 transition-transform`}
                >
                  <Icon className={`size-4 ${action.iconColor}`} />
                </span>
                <div>
                  <span className="text-sm font-semibold block">
                    {action.title}
                  </span>
                  <span className="text-xs text-muted-foreground mt-0.5 block">
                    {action.description}
                  </span>
                </div>
              </button>
            );
          })}
        </CardContent>
      </Card>

      {/* Room Status Snapshot – mirrors the right panel in the image */}
      <Card className="lg:col-span-1 shadow-sm border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Room Status</CardTitle>
          <p className="text-xs text-muted-foreground mt-0.5">
            Live snapshot · today
          </p>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {/* Visual stacked bar */}
          <div className="flex h-3 w-full rounded-full overflow-hidden gap-0.5">
            <div
              className="bg-violet-500 rounded-l-full"
              style={{ width: `${(97 / 120) * 100}%` }}
            />
            <div
              className="bg-emerald-500"
              style={{ width: `${(15 / 120) * 100}%` }}
            />
            <div
              className="bg-amber-500 rounded-r-full"
              style={{ width: `${(8 / 120) * 100}%` }}
            />
          </div>
          <div className="flex flex-col gap-3">
            {roomStatusData.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`size-2.5 rounded-full shrink-0 ${item.color}`}
                  />
                  <span className="text-sm text-muted-foreground">
                    {item.label}
                  </span>
                </div>
                <span className="text-sm font-bold text-foreground">
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          {/* Performance meter – mirrors the image's bottom-right "Performance" gauge */}
          <div className="mt-2 border-t border-border pt-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold">Overall Performance</p>
              <span className="text-sm font-bold text-violet-600">81%</span>
            </div>
            <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-violet-500 to-blue-500 rounded-full"
                style={{ width: "81%" }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Based on occupancy, revenue & guest satisfaction
            </p>
          </div>

          {/* Upcoming checkouts */}
          <div className="border-t border-border pt-4">
            <p className="text-sm font-semibold mb-3">Today's Checkouts</p>
            {[
              { room: "Room 204", guest: "Sarah Mitchell", time: "11:00 AM" },
              { room: "Room 118", guest: "Tom Bergmann", time: "12:30 PM" },
              { room: "Room 310", guest: "Aiko Tanaka", time: "2:00 PM" },
            ].map((checkout) => (
              <div
                key={checkout.room}
                className="flex items-center justify-between py-2 border-b border-border/50 last:border-0"
              >
                <div>
                  <p className="text-xs font-semibold">{checkout.room}</p>
                  <p className="text-[11px] text-muted-foreground">
                    {checkout.guest}
                  </p>
                </div>
                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                  {checkout.time}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
