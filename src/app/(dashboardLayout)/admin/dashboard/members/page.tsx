"use client";

import * as React from "react";
import { StatsGrid } from "@/components/section-cards";
import { DataTable } from "@/components/data-table";
import { X, Star, Loader2 } from "lucide-react";
import { useAllUsersQuery } from "@/redux/features/auth/authApi";
import { format } from "date-fns";

const BRAND = "#6E56FF";

type UserStatus = "Active" | "Suspended";

interface UserRow {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: UserStatus;
  joinDate: string;
  reviews: number;
  role: string;
  phone: string;
  mess: string;
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { bg: string; text: string }> = {
    Active: { bg: "#dcfce7", text: "#16a34a" },
    Suspended: { bg: "#fee2e2", text: "#dc2626" },
  };
  const s = map[status] ?? { bg: "#f3f4f6", text: "#6b7280" };

  return (
    <span
      style={{ background: s.bg, color: s.text }}
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold"
    >
      {status}
    </span>
  );
}

function AvatarCircle({ initials, seed }: { initials: string; seed: number }) {
  const hues = [265, 220, 160, 35, 10, 300, 190];
  const hue = hues[seed % hues.length];

  return (
    <div
      style={{
        background: `hsl(${hue} 60% 88%)`,
        color: `hsl(${hue} 50% 35%)`,
      }}
      className="size-10 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
    >
      {initials}
    </div>
  );
}

function UserModal({ user, onClose }: { user: UserRow; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.45)" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-muted"
        >
          <X className="size-4 text-muted-foreground" />
        </button>

        <div className="flex items-center gap-4 mb-6">
          <AvatarCircle initials={user.avatar} seed={1} />
          <div>
            <p className="font-semibold">{user.name}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          <div className="ml-auto">
            <StatusBadge status={user.status} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {[
            { label: "Role", value: user.role },
            { label: "Join Date", value: user.joinDate },
            { label: "Reviews", value: String(user.reviews), star: true },
            { label: "User ID", value: user.id },
          ].map((f) => (
            <div key={f.label} className="bg-muted/50 rounded-lg p-3">
              <p className="text-xs text-muted-foreground">{f.label}</p>
              <p className="text-sm font-medium flex items-center gap-1">
                {f.star && <Star className="size-3 text-yellow-500" />}
                {f.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function UsersPage() {
  const [selectedUser, setSelectedUser] = React.useState<UserRow | null>(null);

  const { data, isLoading } = useAllUsersQuery();

  // 🔥 Transform API → UI
  const rows: UserRow[] =
    data?.data?.map((user) => {
      const messName =
        user.member?.mess?.name ||
        user.mealManager?.mess?.name ||
        user.messManager?.name ||
        "—";

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .slice(0, 2),

        status: user.isActive ? "Active" : "Suspended",

        joinDate: format(new Date(user.createdAt as string), "dd MMM yyyy"),

        reviews: 0,
        role: user.role,

        phone: user.phone || "—",
        mess: messName,
      };
    }) || [];

  // 🔥 Stats calculation
  const totalUsers = data?.data?.length || 0;
  const activeUsers = data?.data?.filter((u) => u.isActive).length || 0;
  const admins =
    data?.data?.filter((u) =>
      ["ADMIN", "MESS_MANAGER", "MEAL_MANAGER"].includes(u.role),
    ).length || 0;

  const stats = [
    {
      label: "Total Users",
      value: String(totalUsers),
      sub: "from database",
      trend: "+0%",
      icon: "Users",
      iconColor: "#6E56FF",
      iconBg: "#ede9ff",
    },
    {
      label: "Active Users",
      value: String(activeUsers),
      sub: "isActive users",
      trend: "+0%",
      icon: "UserCheck",
      iconColor: "#16a34a",
      iconBg: "#dcfce7",
    },
    {
      label: "Admins / Managers",
      value: String(admins),
      sub: "system roles",
      trend: "+0%",
      icon: "UserCog",
      iconColor: "#f59e0b",
      iconBg: "#fef3c7",
    },
  ];

  const tableConfig = {
    title: "Users",
    subtitle: "All registered users",
    searchPlaceholder: "Search Users...",
    columns: [
      { key: "user", label: "USER", type: "userCell" },
      { key: "phone", label: "PHONE", type: "text" }, // ✅ NEW
      { key: "mess", label: "MESS", type: "text" }, // ✅ NEW
      { key: "role", label: "ROLE", type: "badge" },
      { key: "status", label: "STATUS", type: "badge" },
      { key: "joinDate", label: "JOIN DATE", type: "text" },
      { key: "actions", label: "ACTIONS", type: "userActions" },
    ],
  };

  if (isLoading) {
    return (
      <div className="p-6 flex justify-center items-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6">
      {selectedUser && (
        <UserModal user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}

      <div className="mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <p className="text-sm text-muted-foreground">
          Manage all users from your system
        </p>
      </div>

      <StatsGrid stats={stats} />

      <DataTable
        config={tableConfig as any}
        rows={rows}
        onAction={(action, row) => {
          if (action === "view") setSelectedUser(row as UserRow);
        }}
      />
    </div>
  );
}
