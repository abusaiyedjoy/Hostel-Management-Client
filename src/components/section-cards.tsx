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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
  const isPositive = stat.trend ? !stat.trend.startsWith("-") : true;
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;
  const trendColor = isPositive ? "text-emerald-500" : "text-red-500";

  return (
    <Card className="shadow-sm border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-md transition-shadow duration-200">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {stat.label}
        </CardTitle>
        <div
          className="p-2 rounded-xl shrink-0"
          style={{ background: stat.iconBg }}
        >
          <Icon className="size-5" style={{ color: stat.iconColor }} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-slate-800 dark:text-slate-100">
          {stat.value}
        </div>
        <div className="flex items-center gap-2 mt-2 text-xs">
          {stat.trend ? (
            <>
              <div className={`flex items-center font-semibold ${trendColor}`}>
                <TrendIcon className="size-3 mr-1" />
                {stat.trend}
              </div>
              <span className="text-muted-foreground">{stat.sub}</span>
            </>
          ) : (
            <span className="text-muted-foreground">{stat.sub}</span>
          )}
        </div>
      </CardContent>
    </Card>
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
