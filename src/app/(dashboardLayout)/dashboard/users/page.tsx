"use client";

import * as React from "react";
import { StatsGrid } from "@/components/section-cards";
import { DataTable } from "@/components/data-table";
import { X, Star } from "lucide-react";
import data from "../data.json";

const BRAND = "#6E56FF";

type UserStatus = "Active" | "Suspended" | "Pending";
interface UserRow {
  id: number;
  name: string;
  email: string;
  avatar: string;
  status: UserStatus;
  joinDate: string;
  reviews: number;
  role: string;
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { bg: string; text: string }> = {
    Active: { bg: "#dcfce7", text: "#16a34a" },
    Suspended: { bg: "#fee2e2", text: "#dc2626" },
    Pending: { bg: "#fef9c3", text: "#b45309" },
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
          className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-muted transition-colors"
        >
          <X className="size-4 text-muted-foreground" />
        </button>
        <div className="flex items-center gap-4 mb-6">
          <AvatarCircle initials={user.avatar} seed={user.id} />
          <div>
            <p className="font-semibold text-foreground">{user.name}</p>
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
            { label: "User ID", value: `#${String(user.id).padStart(5, "0")}` },
          ].map((f) => (
            <div key={f.label} className="bg-muted/50 rounded-lg p-3">
              <p className="text-xs text-muted-foreground mb-1">{f.label}</p>
              <p className="text-sm font-medium flex items-center gap-1">
                {f.star && <Star className="size-3 text-yellow-500" />}
                {f.value}
              </p>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors"
          >
            Close
          </button>
          {user.status === "Active" ? (
            <button className="flex-1 py-2 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm font-medium hover:bg-red-100 transition-colors">
              Suspend User
            </button>
          ) : (
            <button
              className="flex-1 py-2 rounded-lg text-sm font-medium text-white"
              style={{ background: BRAND }}
            >
              Reactivate
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function UsersPage() {
  const [selectedUser, setSelectedUser] = React.useState<UserRow | null>(null);

  return (
    <div className="p-6">
      {selectedUser && (
        <UserModal user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">User Management</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Welcome back! What's happening with your platform
        </p>
      </div>
      <StatsGrid stats={data.users.stats} />
      <DataTable
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        config={data.users.tableConfig as any}
        rows={data.users.rows}
        onAction={(action, row) => {
          if (action === "view") setSelectedUser(row as UserRow);
          if (action === "suspend") alert(`Suspend: ${row.name}`);
          if (action === "activate") alert(`Activate: ${row.name}`);
        }}
      />
    </div>
  );
}
