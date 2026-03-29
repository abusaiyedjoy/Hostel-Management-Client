"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import {
  MailIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
  BuildingIcon,
  BedDoubleIcon,
  StarIcon,
  TrendingUpIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

// ── schema
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  remember: z.boolean().optional(),
});

type LoginValues = z.infer<typeof loginSchema>;

// ── floating info card (top-right of right panel)
function RoomCard() {
  return (
    <div className="absolute top-8 right-6 sm:right-10 flex items-center gap-3 rounded-2xl bg-white/95 backdrop-blur-sm shadow-xl px-4 py-3 w-56 border border-white/60">
      <div className="size-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
        <BedDoubleIcon className="size-4 text-primary" />
      </div>
      <div>
        <p className="text-xs font-bold text-slate-800 leading-none">
          Room 204
        </p>
        <p className="text-[11px] text-slate-500 mt-0.5">
          Just checked in · 2:09 PM
        </p>
      </div>
    </div>
  );
}

// ── occupancy mini-chart card (bottom-left of right panel)
function OccupancyCard() {
  return (
    <div className="absolute bottom-24 left-6 sm:left-10 rounded-2xl bg-white/95 backdrop-blur-sm shadow-xl p-4 w-44 border border-white/60">
      <div className="flex items-center justify-between mb-2">
        <p className="text-[11px] font-semibold text-slate-700">Occupancy</p>
        <TrendingUpIcon className="size-3.5 text-emerald-500" />
      </div>
      {/* mini bar chart */}
      <div className="flex items-end gap-1 h-10">
        {[40, 65, 50, 80, 70, 90, 75].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm"
            style={{
              height: `${h}%`,
              background:
                i === 5
                  ? "var(--color-primary, #7c3aed)"
                  : `rgba(124,58,237,${0.2 + i * 0.05})`,
            }}
          />
        ))}
      </div>
      <p className="text-xs font-bold text-primary mt-2">87% this week</p>
    </div>
  );
}

// ── star rating card
function RatingCard() {
  return (
    <div className="absolute bottom-8 right-6 sm:right-10 flex items-center gap-2 rounded-2xl bg-white/95 backdrop-blur-sm shadow-xl px-4 py-3 border border-white/60">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((i) => (
          <StarIcon
            key={i}
            className="size-3.5 fill-amber-400 text-amber-400"
          />
        ))}
      </div>
      <span className="text-xs font-bold text-slate-800">4.9</span>
      <span className="text-[11px] text-slate-500">· 2,400+ reviews</span>
    </div>
  );
}

export default function LoginPage() {
  const [showPass, setShowPass] = useState(false);

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", remember: false },
  });

  const onSubmit = async (values: LoginValues) => {
    // TODO: wire up to your auth provider
    console.log(values);
  };

  return (
    <div className="min-h-screen bg-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl shadow-primary/15 flex flex-col lg:flex-row min-h-[600px]">
        {/* ── LEFT PANEL — Form ── */}
        <div className="flex-1 bg-background flex flex-col justify-between p-8 sm:p-10 lg:p-12">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-xl bg-primary shadow-md shadow-primary/30">
              <BuildingIcon className="size-4.5 text-white" />
            </div>
            <span className="text-base font-bold text-foreground">
              HostelHub
            </span>
          </div>

          {/* Form body */}
          <div className="mt-10 lg:mt-0 flex flex-col gap-6 max-w-sm w-full mx-auto">
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                Welcome back
              </h1>
              <p className="text-sm text-muted-foreground mt-1.5">
                Sign in to your HostelHub account
              </p>
            </div>

            {/* Social buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2.5 rounded-xl border border-border bg-background hover:bg-muted/50 transition-colors h-11 text-sm font-medium text-foreground">
                {/* Google "G" SVG */}
                <svg className="size-4.5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Google
              </button>
              <button className="flex items-center justify-center gap-2.5 rounded-xl border border-border bg-background hover:bg-muted/50 transition-colors h-11 text-sm font-medium text-foreground">
                {/* Apple logo */}
                <svg
                  className="size-4.5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                Apple
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground font-medium">
                OR
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Form */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
              >
                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }: any) => (
                    <FormItem>
                      <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        Email Address
                      </Label>
                      <FormControl>
                        <div className="relative">
                          <MailIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                          <Input
                            placeholder="you@example.com"
                            className="pl-10 h-11 rounded-xl border-border bg-muted/30 focus-visible:ring-primary focus-visible:ring-1 text-sm"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                {/* Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }: any) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                          Password
                        </Label>
                        <Link
                          href="/forgot-password"
                          className="text-xs text-primary font-semibold hover:underline"
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <FormControl>
                        <div className="relative">
                          <LockIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                          <Input
                            type={showPass ? "text" : "password"}
                            placeholder="••••••••••"
                            className="pl-10 pr-10 h-11 rounded-xl border-border bg-muted/30 focus-visible:ring-primary focus-visible:ring-1 text-sm"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPass((v) => !v)}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {showPass ? (
                              <EyeOffIcon className="size-4" />
                            ) : (
                              <EyeIcon className="size-4" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                {/* Remember me */}
                <FormField
                  control={form.control}
                  name="remember"
                  render={({ field }: any) => (
                    <FormItem className="flex items-center gap-2.5 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                      </FormControl>
                      <Label className="text-sm text-muted-foreground font-normal cursor-pointer">
                        Remember me for 30 days
                      </Label>
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  size="lg"
                  className="w-full rounded-xl h-11 font-semibold text-sm shadow-md shadow-primary/20 mt-1"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? "Signing in…" : "Sign In"}
                </Button>
              </form>
            </Form>

            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="text-primary font-semibold hover:underline"
              >
                Create account
              </Link>
            </p>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-10 lg:mt-0">
            <Link
              href="/privacy"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} HostelHub
            </p>
          </div>
        </div>

        {/* ── RIGHT PANEL — Branded visual ── */}
        <div className="hidden lg:flex relative flex-1 bg-gradient-to-br from-primary via-primary/90 to-violet-700 flex-col justify-end p-10 overflow-hidden">
          {/* Decorative blobs */}
          <div className="pointer-events-none absolute -top-24 -right-24 size-80 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute top-1/3 -left-10 size-48 rounded-full bg-white/8 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-20 right-10 size-64 rounded-full bg-violet-400/20 blur-3xl" />

          {/* Geometric decorative squares */}
          <div className="pointer-events-none absolute top-16 left-1/2 -translate-x-1/2 size-20 rounded-2xl border-2 border-white/15 rotate-12" />
          <div className="pointer-events-none absolute top-24 left-1/2 size-12 rounded-xl border border-white/10 -rotate-6" />

          {/* Floating cards */}
          <RoomCard />
          <OccupancyCard />
          <RatingCard />

          {/* Central room image */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%]">
            <div className="size-52 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl shadow-black/30">
              <img
                src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80"
                alt="Hostel room"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Bottom text */}
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug">
              Manage Your Hostel <br /> With Confidence
            </h2>
            <p className="text-white/65 text-sm mt-2 max-w-xs leading-relaxed">
              HostelHub gives you real-time visibility across all your rooms,
              guests, and bookings — in one beautiful dashboard.
            </p>
            {/* dots */}
            <div className="flex items-center gap-2 mt-5">
              <span className="size-2 rounded-full bg-white" />
              <span className="size-2 rounded-full bg-white/40" />
              <span className="size-2 rounded-full bg-white/40" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
