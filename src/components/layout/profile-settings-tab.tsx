"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SettingsField } from "./settings-field";
import { SaveButton } from "./save-button";
import { ShieldCheckIcon, BookmarkIcon } from "lucide-react";

const accounts = [
  {
    name: "Alice Johnson",
    email: "alice@admin.com",
    role: "Super Admin",
    roleIcon: <ShieldCheckIcon className="size-3" />,
    avatar: "/avatars/alice1.jpg",
    active: true,
  },
  {
    name: "Alice Johnson",
    email: "alice@admin.com",
    role: "Content Moderator",
    roleIcon: <BookmarkIcon className="size-3" />,
    avatar: "/avatars/alice2.jpg",
    active: false,
  },
];

export function ProfileSettingsTab() {
  const { register } = useForm({
    defaultValues: { fullName: "REVIEW HUB", email: "REVIEW HUB" },
  });

  return (
    <div className="bg-white rounded-2xl border border-border p-6 space-y-6">
      {/* ── Profile Settings heading ── */}
      <h2 className="text-lg font-semibold text-foreground">
        Profile Settings
      </h2>

      {/* ── Account cards ── */}
      <div className="space-y-3">
        {accounts.map((acc, i) => (
          <div
            key={i}
            className={`flex items-center gap-4 p-3 rounded-xl border transition-colors ${
              acc.active
                ? "bg-[#ECEAFA] border-[#C4B5FD]"
                : "bg-[#F8F8F8] border-[#EBEBEB]"
            }`}
          >
            <Avatar className="size-14 shrink-0 rounded-xl">
              <AvatarImage src={acc.avatar} className="object-cover" />
              <AvatarFallback className="rounded-xl bg-violet-200 text-violet-700 font-bold text-base">
                {acc.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-0.5">
              <p className="text-sm font-semibold text-foreground">
                {acc.name}
              </p>
              <p className="text-xs text-muted-foreground">{acc.email}</p>
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 border border-slate-300 rounded-full px-2 py-0.5 bg-white/70">
                {acc.roleIcon}
                {acc.role}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Divider ── */}
      <hr className="border-border" />

      {/* ── Account Information ── */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-foreground">
          Account Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SettingsField label="Full Name" htmlFor="fullName">
            <Input
              id="fullName"
              {...register("fullName")}
              className="bg-[#F5F5F5] border-[#EBEBEB] focus-visible:ring-1 focus-visible:ring-violet-400"
            />
          </SettingsField>
          <SettingsField label="Email Address" htmlFor="email">
            <Input
              id="email"
              {...register("email")}
              className="bg-[#F5F5F5] border-[#EBEBEB] focus-visible:ring-1 focus-visible:ring-violet-400"
            />
          </SettingsField>
        </div>
      </div>

      {/* ── Divider ── */}
      <hr className="border-border" />

      {/* ── Security Settings ── */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-foreground">
          Security Settings
        </h3>
        <SettingsField label="Current Password" htmlFor="currentPassword">
          <Input
            id="currentPassword"
            type="password"
            placeholder="Enter current password"
            className="bg-[#F5F5F5] border-[#EBEBEB] focus-visible:ring-1 focus-visible:ring-violet-400"
          />
        </SettingsField>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SettingsField label="New Password" htmlFor="newPassword">
            <Input
              id="newPassword"
              type="password"
              placeholder="Enter new password"
              className="bg-[#F5F5F5] border-[#EBEBEB] focus-visible:ring-1 focus-visible:ring-violet-400"
            />
          </SettingsField>
          <SettingsField label="Confirm Password" htmlFor="confirmPassword">
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm new password"
              className="bg-[#F5F5F5] border-[#EBEBEB] focus-visible:ring-1 focus-visible:ring-violet-400"
            />
          </SettingsField>
        </div>
      </div>

      {/* ── Save ── */}
      <SaveButton />
    </div>
  );
}
