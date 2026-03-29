import {
  BedDoubleIcon,
  WrenchIcon,
  CreditCardIcon,
  UserPlusIcon,
  CheckCircleIcon,
  BellIcon,
  FileTextIcon,
} from "lucide-react";

// ─── shared card
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

// ─── badge colour variants
const badgeMap: Record<string, string> = {
  "Check-in":
    "bg-[#d4edcc] text-[#1e4d2b] dark:bg-[#1a3a1a] dark:text-[#6ddc6d]",
  Urgent: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  Paid: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  "Check-out":
    "bg-[#e8f5e8] text-[#3a6a3a] dark:bg-[#162416] dark:text-[#86c986]",
};

const recentActivities = [
  {
    icon: UserPlusIcon,
    iconCls:
      "bg-[#d4edcc] dark:bg-[#1a3a1a] text-[#1e4d2b] dark:text-[#6ddc6d]",
    title: "New Guest Check-in",
    desc: "Room 204 – Sarah Mitchell arrived",
    time: "5 min ago",
    badge: "Check-in",
  },
  {
    icon: WrenchIcon,
    iconCls:
      "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",
    title: "Maintenance Request",
    desc: "Room 112 – Air conditioner fault",
    time: "18 min ago",
    badge: "Urgent",
  },
  {
    icon: CreditCardIcon,
    iconCls:
      "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400",
    title: "Payment Received",
    desc: "Booking #3847 – $240 settled",
    time: "42 min ago",
    badge: "Paid",
  },
  {
    icon: BedDoubleIcon,
    iconCls:
      "bg-[#e8f5e8] dark:bg-[#162416] text-[#3a6a3a] dark:text-[#86c986]",
    title: "Room Checkout",
    desc: "Room 305 – James Okafor checked out",
    time: "1 hr ago",
    badge: "Check-out",
  },
];

const quickActions = [
  {
    icon: BedDoubleIcon,
    iconCls:
      "bg-[#d4edcc] dark:bg-[#1a3a1a] text-[#1e4d2b] dark:text-[#6ddc6d]",
    title: "Assign Room",
    desc: "Allocate a room to a new guest",
  },
  {
    icon: CheckCircleIcon,
    iconCls:
      "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400",
    title: "Approve Booking",
    desc: "Review pending reservations",
  },
  {
    icon: BellIcon,
    iconCls:
      "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",
    title: "Send Notification",
    desc: "Alert guests or staff",
  },
  {
    icon: FileTextIcon,
    iconCls: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
    title: "Generate Report",
    desc: "Export occupancy & revenue",
  },
];

const roomStatusData = [
  { label: "Total Rooms", value: 120, bar: "bg-[#c8ddc8] dark:bg-[#2a4a2a]" },
  { label: "Occupied", value: 97, bar: "bg-[#1e4d2b] dark:bg-[#2d7040]" },
  { label: "Available", value: 15, bar: "bg-emerald-500" },
  { label: "Under Maintenance", value: 8, bar: "bg-amber-500" },
];

const checkouts = [
  { room: "Room 204", guest: "Sarah Mitchell", time: "11:00 AM" },
  { room: "Room 118", guest: "Tom Bergmann", time: "12:30 PM" },
  { room: "Room 310", guest: "Aiko Tanaka", time: "2:00 PM" },
];

export function DashboardActivity() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 px-4 lg:px-6 mt-4 mb-8">
      {/* Recent Activity */}
      <Card>
        <div className="mb-4">
          <p className="text-base font-semibold text-[#1a2e1a] dark:text-[#c8ecc8]">
            Recent Activity
          </p>
          <p className="text-xs text-[#6a9a6a] dark:text-[#5a7a5a] mt-0.5">
            Latest hostel events & alerts
          </p>
        </div>
        <div className="flex flex-col gap-3">
          {recentActivities.map((a, i) => {
            const Icon = a.icon;
            return (
              <div
                key={i}
                className="flex items-start gap-3 p-3 rounded-xl bg-[#f0f7f0] dark:bg-[#162416] hover:bg-[#e8f5e8] dark:hover:bg-[#1a3a1a] transition-colors"
              >
                <span
                  className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${a.iconCls}`}
                >
                  <Icon className="size-4" />
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <p className="text-sm font-semibold truncate text-[#1a2e1a] dark:text-[#c8ecc8]">
                      {a.title}
                    </p>
                    <span
                      className={`text-[10px] font-medium rounded-full px-2 py-0.5 shrink-0 ${badgeMap[a.badge] ?? ""}`}
                    >
                      {a.badge}
                    </span>
                  </div>
                  <p className="text-xs text-[#6a9a6a] dark:text-[#5a7a5a] mt-0.5 truncate">
                    {a.desc}
                  </p>
                  <p className="text-[10px] text-[#8aaa8a] dark:text-[#446044] mt-0.5">
                    {a.time}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Quick Actions */}
      <Card>
        <div className="mb-4">
          <p className="text-base font-semibold text-[#1a2e1a] dark:text-[#c8ecc8]">
            Quick Actions
          </p>
          <p className="text-xs text-[#6a9a6a] dark:text-[#5a7a5a] mt-0.5">
            Common management tasks
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3">
          {quickActions.map((a, i) => {
            const Icon = a.icon;
            return (
              <button
                key={i}
                className="
                  flex items-start gap-3 text-left p-3 rounded-xl transition-all group
                  border border-[#c8ddc8] dark:border-[#1e3a1e]
                  hover:border-[#6db86d] dark:hover:border-[#2d6a2d]
                  hover:bg-[#eef7ee] dark:hover:bg-[#162416]
                "
              >
                <span
                  className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${a.iconCls} group-hover:scale-110 transition-transform`}
                >
                  <Icon className="size-4" />
                </span>
                <div>
                  <span className="text-sm font-semibold block text-[#1a2e1a] dark:text-[#c8ecc8]">
                    {a.title}
                  </span>
                  <span className="text-xs block mt-0.5 text-[#6a9a6a] dark:text-[#5a7a5a]">
                    {a.desc}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </Card>

      {/* Room Status */}
      <Card>
        <div className="mb-4">
          <p className="text-base font-semibold text-[#1a2e1a] dark:text-[#c8ecc8]">
            Room Status
          </p>
          <p className="text-xs text-[#6a9a6a] dark:text-[#5a7a5a] mt-0.5">
            Live snapshot · today
          </p>
        </div>

        {/* stacked bar */}
        <div className="flex h-3 w-full rounded-full overflow-hidden gap-0.5 mb-4">
          <div
            className="bg-[#1e4d2b] dark:bg-[#2d7040] rounded-l-full"
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
            <div key={item.label} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className={`size-2.5 rounded-full shrink-0 ${item.bar}`}
                />
                <span className="text-sm text-[#5a7a5a] dark:text-[#7a9a7a]">
                  {item.label}
                </span>
              </div>
              <span className="text-sm font-bold text-[#1a2e1a] dark:text-[#c8ecc8]">
                {item.value}
              </span>
            </div>
          ))}
        </div>

        {/* performance bar */}
        <div className="mt-4 pt-4 border-t border-[#c8ddc8] dark:border-[#1e3a1e]">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-[#1a2e1a] dark:text-[#c8ecc8]">
              Overall Performance
            </p>
            <span className="text-sm font-bold text-[#1e4d2b] dark:text-[#4ade80]">
              81%
            </span>
          </div>
          <div className="h-2.5 w-full bg-[#e0f0e0] dark:bg-[#1a3a1a] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-linear-to-r from-[#1e4d2b] to-[#4ade80]"
              style={{ width: "81%" }}
            />
          </div>
          <p className="text-xs text-[#7a9a7a] dark:text-[#567056] mt-2">
            Based on occupancy, revenue & satisfaction
          </p>
        </div>

        {/* today's checkouts */}
        <div className="mt-4 pt-4 border-t border-[#c8ddc8] dark:border-[#1e3a1e]">
          <p className="text-sm font-semibold mb-3 text-[#1a2e1a] dark:text-[#c8ecc8]">
            Today's Checkouts
          </p>
          {checkouts.map((c) => (
            <div
              key={c.room}
              className="flex items-center justify-between py-2 border-b border-[#e4f0e4] dark:border-[#1e3a1e] last:border-0"
            >
              <div>
                <p className="text-xs font-semibold text-[#1a2e1a] dark:text-[#c8ecc8]">
                  {c.room}
                </p>
                <p className="text-[11px] text-[#6a9a6a] dark:text-[#5a7a5a]">
                  {c.guest}
                </p>
              </div>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#e4f2e4] dark:bg-[#1a3a1a] text-[#3a6a3a] dark:text-[#6ddc6d]">
                {c.time}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
