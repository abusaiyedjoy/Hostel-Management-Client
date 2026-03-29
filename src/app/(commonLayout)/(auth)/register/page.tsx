"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import {
  UserIcon,
  MailIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
  BuildingIcon,
  UsersIcon,
  CalendarCheckIcon,
  ShieldCheckIcon,
  CheckIcon,
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
const registerSchema = z
  .object({
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain an uppercase letter")
      .regex(/[0-9]/, "Must contain a number"),
    confirmPassword: z.string(),
    terms: z.literal(true, {
      errorMap: () => ({ message: "You must accept the terms to continue" }),
    }),
  })
  .refine((d) => d.password === d.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type RegisterValues = z.infer<typeof registerSchema>;

// ── password strength meter
function PasswordStrength({ value }: { value: string }) {
  const checks = [
    { label: "8+ characters", pass: value.length >= 8 },
    { label: "Uppercase letter", pass: /[A-Z]/.test(value) },
    { label: "Number", pass: /[0-9]/.test(value) },
  ];
  const score = checks.filter((c) => c.pass).length;

  const barColor =
    score === 0
      ? "bg-border"
      : score === 1
        ? "bg-red-400"
        : score === 2
          ? "bg-amber-400"
          : "bg-emerald-500";

  if (!value) return null;

  return (
    <div className="flex flex-col gap-2 mt-1">
      <div className="flex gap-1.5">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
              i <= score ? barColor : "bg-border"
            }`}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1">
        {checks.map((c) => (
          <span
            key={c.label}
            className={`flex items-center gap-1 text-[11px] transition-colors ${
              c.pass ? "text-emerald-600" : "text-muted-foreground"
            }`}
          >
            <CheckIcon
              className={`size-3 ${c.pass ? "opacity-100" : "opacity-30"}`}
            />
            {c.label}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── floating feature pills for right panel
const features = [
  {
    icon: UsersIcon,
    label: "12,000+ Guests Managed",
    sub: "Across all properties",
  },
  {
    icon: CalendarCheckIcon,
    label: "Smart Booking System",
    sub: "Real-time availability",
  },
  {
    icon: ShieldCheckIcon,
    label: "24/7 Security & Support",
    sub: "Always watching over you",
  },
];

function FeatureCard({
  icon: Icon,
  label,
  sub,
}: {
  icon: React.ElementType;
  label: string;
  sub: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white/12 backdrop-blur-sm border border-white/15 px-4 py-3">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white/20">
        <Icon className="size-4 text-white" />
      </span>
      <div>
        <p className="text-sm font-semibold text-white leading-none">{label}</p>
        <p className="text-[11px] text-white/60 mt-0.5">{sub}</p>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: undefined,
    },
  });

  const passwordValue = form.watch("password");

  const onSubmit = async (values: RegisterValues) => {
    // TODO: wire up to your auth provider
    console.log(values);
  };

  return (
    <div className="min-h-screen bg-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl shadow-primary/15 flex flex-col lg:flex-row min-h-[680px]">
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
          <div className="mt-10 lg:mt-0 flex flex-col gap-5 max-w-sm w-full mx-auto">
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                Create your account
              </h1>
              <p className="text-sm text-muted-foreground mt-1.5">
                Join HostelHub and start managing smarter
              </p>
            </div>

            {/* Social buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2.5 rounded-xl border border-border bg-background hover:bg-muted/50 transition-colors h-11 text-sm font-medium text-foreground">
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
                {/* Full name */}
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        Full Name
                      </Label>
                      <FormControl>
                        <div className="relative">
                          <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                          <Input
                            placeholder="John Smith"
                            className="pl-10 h-11 rounded-xl border-border bg-muted/30 focus-visible:ring-primary focus-visible:ring-1 text-sm"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
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
                  render={({ field }) => (
                    <FormItem>
                      <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        Password
                      </Label>
                      <FormControl>
                        <div className="relative">
                          <LockIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                          <Input
                            type={showPass ? "text" : "password"}
                            placeholder="Min. 8 characters"
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
                      <PasswordStrength value={passwordValue} />
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                {/* Confirm password */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        Confirm Password
                      </Label>
                      <FormControl>
                        <div className="relative">
                          <LockIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                          <Input
                            type={showConfirm ? "text" : "password"}
                            placeholder="Repeat your password"
                            className="pl-10 pr-10 h-11 rounded-xl border-border bg-muted/30 focus-visible:ring-primary focus-visible:ring-1 text-sm"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirm((v) => !v)}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {showConfirm ? (
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

                {/* Terms */}
                <FormField
                  control={form.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem className="flex items-start gap-2.5 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="mt-0.5 border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                      </FormControl>
                      <div>
                        <Label className="text-sm text-muted-foreground font-normal cursor-pointer leading-relaxed">
                          I agree to the{" "}
                          <Link
                            href="/terms"
                            className="text-primary font-semibold hover:underline"
                          >
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link
                            href="/privacy"
                            className="text-primary font-semibold hover:underline"
                          >
                            Privacy Policy
                          </Link>
                        </Label>
                        <FormMessage className="text-xs mt-0.5" />
                      </div>
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  size="lg"
                  className="w-full rounded-xl h-11 font-semibold text-sm shadow-md shadow-primary/20 mt-1"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting
                    ? "Creating account…"
                    : "Create Account"}
                </Button>
              </form>
            </Form>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-primary font-semibold hover:underline"
              >
                Sign in
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
        <div className="hidden lg:flex relative flex-1 bg-gradient-to-br from-primary via-primary/90 to-violet-700 flex-col justify-between p-10 overflow-hidden">
          {/* Decorative blobs */}
          <div className="pointer-events-none absolute -top-24 -right-24 size-80 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute top-1/2 -left-16 size-56 rounded-full bg-white/8 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-20 right-0 size-64 rounded-full bg-violet-400/20 blur-3xl" />

          {/* Geometric decorative squares */}
          <div className="pointer-events-none absolute top-14 right-16 size-16 rounded-2xl border-2 border-white/15 rotate-12" />
          <div className="pointer-events-none absolute top-28 right-28 size-8 rounded-xl border border-white/10 -rotate-6" />

          {/* Top: logo area */}
          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 border border-white/20 px-3 py-1.5 text-xs font-semibold text-white">
              <span className="size-1.5 rounded-full bg-white animate-pulse" />
              New members get 10% off first booking
            </span>
          </div>

          {/* Centre: room photo */}
          <div className="relative flex justify-center">
            <div className="size-52 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl shadow-black/30">
              <img
                src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=400&q=80"
                alt="Hostel double room"
                className="w-full h-full object-cover"
              />
            </div>
            {/* small avatar stack overlay */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center">
              <div className="flex -space-x-2.5 border-2 border-primary rounded-full p-0.5 bg-primary">
                {[
                  "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-56.png",
                  "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-46.png",
                  "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-57.png",
                ].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt="guest"
                    className="size-7 rounded-full border-2 border-primary object-cover"
                  />
                ))}
              </div>
              <span className="ml-2 text-xs font-semibold text-white/80">
                +12k guests
              </span>
            </div>
          </div>

          {/* Feature cards */}
          <div className="relative z-10 flex flex-col gap-3">
            {features.map((f) => (
              <FeatureCard key={f.label} {...f} />
            ))}
          </div>

          {/* Bottom text */}
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-white leading-snug">
              Start Your Hostel <br /> Management Journey
            </h2>
            <p className="text-white/60 text-sm mt-2 max-w-xs leading-relaxed">
              Join thousands of hostel owners who trust HostelHub to manage
              rooms, guests, and revenue effortlessly.
            </p>
            <div className="flex items-center gap-2 mt-4">
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
