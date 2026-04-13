"use client";

import * as React from "react";
import { StatsGrid } from "@/components/section-cards";
import { DataTable } from "@/components/data-table";
import {
  X,
  Loader2,
  Building2,
  Mail,
  Phone,
  MapPin,
  Users2,
  UtensilsCrossed,
  Layers,
  BadgeCheck,
  BadgeX,
} from "lucide-react";
import {
  useGetAllMessQuery,
  useGetMessStatsQuery,
  type Mess,
} from "@/redux/features/mess/messApi";
import { format } from "date-fns";

// ─── Types ────────────────────────────────────────────────────────────────────
type MessStatus = "Active" | "Inactive";

interface MessRow {
  id: string;
  name: string;
  email: string;
  avatar: string; // initials for AvatarCircle
  avatarSeed: string;
  status: MessStatus;
  joinDate: string;
  city: string;
  state: string;
  capacity: string;
  ratePerMeal: string;
  manager: string;
  members: string;
  meals: string;
  _raw: Mess;
}

// ─── Mess Detail Modal ────────────────────────────────────────────────────────
function MessModal({ mess, onClose }: { mess: MessRow; onClose: () => void }) {
  // Fetch stats for the selected mess
  const { data: statsData, isLoading: statsLoading } = useGetMessStatsQuery(
    mess.id,
  );
  const stats = statsData?.data;

  const infoFields = [
    { icon: Mail, label: "Email", value: mess.email },
    { icon: Phone, label: "Phone", value: mess.email },
    { icon: MapPin, label: "City", value: `${mess.city}, ${mess.state}` },
    { icon: Users2, label: "Capacity", value: mess.capacity },
    { icon: Building2, label: "Manager", value: mess.manager },
    { icon: BadgeCheck, label: "Rate/meal", value: mess.ratePerMeal },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.45)" }}
      onClick={onClose}
    >
      <div
        className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-md p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-muted transition-colors"
        >
          <X className="size-4 text-muted-foreground" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 mb-5">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <Building2 className="size-6 text-primary" />
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-foreground leading-tight">
              {mess.name}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">{mess.email}</p>
          </div>
          <div className="ml-auto shrink-0">
            {mess.status === "Active" ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700">
                <BadgeCheck size={11} /> Active
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 border border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700">
                <BadgeX size={11} /> Inactive
              </span>
            )}
          </div>
        </div>

        {/* Info grid */}
        <div className="grid grid-cols-2 gap-2.5 mb-5">
          {infoFields.map(({ icon: Icon, label, value }) => (
            <div key={label} className="bg-muted/50 rounded-lg p-3">
              <div className="flex items-center gap-1.5 mb-1">
                <Icon size={11} className="text-muted-foreground" />
                <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
                  {label}
                </p>
              </div>
              <p className="text-sm font-medium text-foreground truncate">
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* Live stats from /mess/:id/stats */}
        <div className="border-t border-border pt-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            Live stats
          </p>
          {statsLoading ? (
            <div className="flex justify-center py-4">
              <Loader2 className="animate-spin size-5 text-muted-foreground" />
            </div>
          ) : stats ? (
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { icon: Users2, label: "Members", value: stats.totalMembers },
                {
                  icon: UtensilsCrossed,
                  label: "Meals",
                  value: stats.totalMeals,
                },
                {
                  icon: Layers,
                  label: "Meal entries",
                  value: stats.totalMealEntries,
                },
              ].map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="bg-primary/5 border border-primary/10 rounded-xl p-3 text-center"
                >
                  <Icon size={16} className="text-primary mx-auto mb-1" />
                  <p className="text-xl font-bold text-foreground">{value}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          ) : null}
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-5">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors text-foreground"
          >
            Close
          </button>
          {mess.status === "Active" ? (
            <button className="flex-1 py-2.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-medium hover:bg-red-100 transition-colors dark:bg-red-900/20 dark:border-red-800 dark:text-red-400">
              Deactivate
            </button>
          ) : (
            <button className="flex-1 py-2.5 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm font-medium hover:bg-green-100 transition-colors dark:bg-green-900/20 dark:border-green-800 dark:text-green-400">
              Reactivate
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
const MessPage = () => {
  const [selectedMess, setSelectedMess] = React.useState<MessRow | null>(null);

  // ── RTK Query ──────────────────────────────────────────────────────────
  const { data, isLoading, isError } = useGetAllMessQuery({});

  // Backend: { success, message, meta: { page,limit,total,totalPages }, data: Mess[] }
  const apiMesses: Mess[] = (data as any)?.data ?? [];
  const meta = (data as any)?.meta;

  // ── Map API → MessRow ───────────────────────────────────────────────────
  const rows: MessRow[] = apiMesses.map((mess) => ({
    id: mess.id,
    name: mess.name,
    email: mess.email,
    avatar: mess.name
      .split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2),
    avatarSeed: mess.id,
    status: mess.isActive ? "Active" : "Inactive",
    joinDate: mess.createdAt
      ? format(new Date(mess.createdAt), "dd MMM yyyy")
      : "—",
    city: mess.city,
    state: mess.state,
    capacity: `${mess.capacity} members`,
    ratePerMeal: `৳${mess.ratePerMeal} / meal`,
    manager: mess.manager?.name ?? "—",
    members: String(mess._count?.members ?? 0),
    meals: String(mess._count?.meals ?? 0),
    _raw: mess,
  }));

  // ── Stats derived from live data ────────────────────────────────────────
  const totalMess = meta?.total ?? apiMesses.length;
  const activeMess = apiMesses.filter((m) => m.isActive).length;
  const totalMembers = apiMesses.reduce(
    (s, m) => s + (m._count?.members ?? 0),
    0,
  );
  const totalMeals = apiMesses.reduce((s, m) => s + (m._count?.meals ?? 0), 0);

  const stats = [
    {
      label: "Total Messes",
      value: String(totalMess),
      sub: `${totalMess} in database`,
      trend: "+0%",
      icon: "Building2",
      iconColor: "#6E56FF",
      iconBg: "#ede9ff",
    },
    {
      label: "Active Messes",
      value: String(activeMess),
      sub: "currently active",
      trend: "+0%",
      icon: "CheckCircle",
      iconColor: "#16a34a",
      iconBg: "#dcfce7",
    },
    {
      label: "Total Members",
      value: String(totalMembers),
      sub: "across all messes",
      trend: "+0%",
      icon: "Users",
      iconColor: "#f59e0b",
      iconBg: "#fef3c7",
    },
    {
      label: "Total Meals",
      value: String(totalMeals),
      sub: "meal sessions",
      trend: "+0%",
      icon: "Utensils",
      iconColor: "#0ea5e9",
      iconBg: "#e0f2fe",
    },
  ];

  // ── Table config ────────────────────────────────────────────────────────
  const tableConfig = {
    title: "All Messes",
    subtitle: "Every registered mess on the platform",
    searchPlaceholder: "Search by name, city or manager…",
    columns: [
      { key: "user", label: "MESS", type: "userCell" },
      { key: "city", label: "CITY", type: "text" },
      { key: "capacity", label: "CAPACITY", type: "text" },
      { key: "ratePerMeal", label: "RATE", type: "text" },
      { key: "manager", label: "MANAGER", type: "text" },
      { key: "members", label: "MEMBERS", type: "text" },
      { key: "meals", label: "MEALS", type: "text" },
      { key: "status", label: "STATUS", type: "badge" },
      { key: "joinDate", label: "CREATED", type: "text" },
      { key: "actions", label: "ACTIONS", type: "userActions" },
    ],
  };

  // ── States ──────────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="p-6 flex justify-center items-center min-h-[400px]">
        <Loader2 className="animate-spin text-muted-foreground" size={28} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 flex justify-center items-center min-h-[400px]">
        <p className="text-sm text-destructive font-medium">
          Failed to load messes. Please refresh.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Detail modal — fetches /mess/:id/stats on open */}
      {selectedMess && (
        <MessModal mess={selectedMess} onClose={() => setSelectedMess(null)} />
      )}

      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Mess Management</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Welcome back! Here&apos;s what&apos;s happening across your messes
        </p>
      </div>

      {/* Stats */}
      <StatsGrid stats={stats} />

      {/* Table */}
      <DataTable
        config={tableConfig as any}
        rows={rows}
        onAction={(action, row) => {
          if (action === "view") setSelectedMess(row as MessRow);
          if (action === "suspend")
            alert(`Deactivate: ${(row as MessRow).name}`);
          if (action === "activate")
            alert(`Activate: ${(row as MessRow).name}`);
        }}
      />
    </div>
  );
};

export default MessPage;
