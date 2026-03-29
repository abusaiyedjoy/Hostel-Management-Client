import { TrendingUp, TrendingDown, LucideIcon } from "lucide-react";
import {
  BedDoubleIcon,
  UsersIcon,
  CalendarCheckIcon,
  CreditCardIcon,
  WrenchIcon,
  ClipboardListIcon,
  UserXIcon,
  BadgeCheckIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  BedDouble: BedDoubleIcon,
  Users: UsersIcon,
  CalendarCheck: CalendarCheckIcon,
  CreditCard: CreditCardIcon,
  Wrench: WrenchIcon,
  ClipboardList: ClipboardListIcon,
  UserX: UserXIcon,
  BadgeCheck: BadgeCheckIcon,
};

export interface StatItem {
  label: string;
  value: string;
  sub: string;
  icon: string;
  iconColor: string;
  iconBg: string;
  trend?: string;
}

export function StatsCard({ stat }: { stat: StatItem }) {
  const Icon = ICON_MAP[stat.icon] ?? BedDoubleIcon;
  const isPos = stat.trend ? !stat.trend.startsWith("-") : true;
  const TrendIcon = isPos ? TrendingUp : TrendingDown;
  const trendCls = isPos
    ? "text-emerald-600 dark:text-emerald-400"
    : "text-red-500";

  return (
    <div
      className="
      rounded-2xl p-5 transition-shadow duration-200
      bg-[#fafdf8] dark:bg-[#111f11]
      border border-[#c8ddc8] dark:border-[#1e3a1e]
      shadow-sm hover:shadow-md hover:shadow-[rgba(20,60,20,0.08)] dark:hover:shadow-[rgba(0,0,0,0.4)]
    "
    >
      <div className="flex items-center justify-between pb-3">
        <p className="text-sm font-medium text-[#5a7a5a] dark:text-[#6a9a6a]">
          {stat.label}
        </p>
        <div
          className="p-2 rounded-xl shrink-0"
          style={{ background: stat.iconBg }}
        >
          <Icon className="size-5" style={{ color: stat.iconColor }} />
        </div>
      </div>

      <p className="text-3xl font-bold text-[#1a2e1a] dark:text-[#c8ecc8]">
        {stat.value}
      </p>

      <div className="flex items-center gap-2 mt-2 text-xs">
        {stat.trend ? (
          <>
            <span className={`flex items-center font-semibold ${trendCls}`}>
              <TrendIcon className="size-3 mr-1" />
              {stat.trend}
            </span>
            <span className="text-[#7a9a7a] dark:text-[#567056]">
              {stat.sub}
            </span>
          </>
        ) : (
          <span className="text-[#7a9a7a] dark:text-[#567056]">{stat.sub}</span>
        )}
      </div>
    </div>
  );
}

export function StatsGrid({ stats }: { stats: StatItem[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 px-4 lg:px-6">
      {stats.map((s) => (
        <StatsCard key={s.label} stat={s} />
      ))}
    </div>
  );
}
