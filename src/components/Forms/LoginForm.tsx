"use client";

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { MailIcon, LockIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import { toast } from "sonner";

// import { loginUser } from "@/services/auth/loginUser";
import { Button } from "./../ui/button";
import { Input } from "./../ui/input";
import { Field, FieldGroup, FieldLabel } from "./../ui/field";
// import InputFieldError from "./shared/InputFieldError";

const LoginForm = ({ redirect }: { redirect?: string }) => {
  const [showPass, setShowPass] = useState(false);
  //   const [state, formAction, isPending] = useActionState(loginUser, null);

  //   useEffect(() => {
  //     if (state && !state.success && state.message) {
  //       toast.error(state.message);
  //     }
  //   }, [state]);

  return (
    <div className="flex-1 bg-background flex flex-col justify-center p-8 sm:p-10 lg:p-12">
      <div className="flex flex-col gap-6 max-w-sm w-full mx-auto">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground mt-1.5">
            Sign in to your StayNest account
          </p>
        </div>

        {/* Social buttons in one line */}
        <div className="grid grid-cols-3 gap-3">
          {/* Google */}
          <button className="flex items-center justify-center rounded-xl border border-border bg-background hover:bg-muted/50 transition-colors h-11">
            <svg className="size-5" viewBox="0 0 24 24">
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
            <span className="sr-only">Google</span>
          </button>

          {/* Facebook */}
          <button className="flex items-center justify-center rounded-xl border border-border bg-background hover:bg-muted/50 transition-colors h-11">
            <svg className="size-6" viewBox="0 0 24 24" fill="#1877F2">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            <span className="sr-only">Facebook</span>
          </button>

          {/* Apple */}
          <button className="flex items-center justify-center rounded-xl border border-border bg-background hover:bg-muted/50 transition-colors h-11 text-foreground">
            <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            <span className="sr-only">Apple</span>
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-border" />
          <span className="text-[10px] text-muted-foreground font-bold tracking-widest uppercase">
            OR
          </span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Login Form */}
        <form
        // action={formAction}
        >
          {redirect && <input type="hidden" name="redirect" value={redirect} />}

          <FieldGroup className="gap-4">
            {/* Email Field */}
            <Field>
              <FieldLabel htmlFor="email">Email Address</FieldLabel>
              <div className="relative">
                <MailIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="pl-10 h-11 rounded-xl bg-muted/20 border-border"
                />
              </div>
              {/* <InputFieldError field="email" state={state} /> */}
            </Field>

            {/* Password Field */}
            <Field>
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Link
                  href="/forgot-password"
                  //   size="sm"
                  className="text-xs text-primary font-semibold hover:underline"
                >
                  Forgot?
                </Link>
              </div>

              <div className="relative">
                <LockIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10 pr-10 h-11 rounded-xl bg-muted/20 border-border"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPass ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
                </button>
              </div>
              {/* <InputFieldError field="password" state={state} /> */}
            </Field>

            {/* Action Buttons */}
            <div className="mt-2 space-y-4">
              <Button
                type="submit"
                className="w-full h-11 rounded-xl font-bold shadow-lg shadow-primary/20"
                // disabled={isPending}
              >
                {/* {isPending ? "Signing in..." : "Sign In"} */}
                Sign In
              </Button>

              <div className="text-center space-y-1">
                <p className="text-sm text-muted-foreground">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/register"
                    className="text-primary font-bold hover:underline"
                  >
                    Create account
                  </Link>
                </p>
              </div>
            </div>
          </FieldGroup>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
