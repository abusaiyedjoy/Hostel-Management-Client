"use client";

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import {
  UserIcon,
  MailIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
  MapPinIcon,
} from "lucide-react";
import { toast } from "sonner";

// import { registerPatient } from "@/services/auth/registerPatient";
import { Button } from "./../ui/button";
import { Input } from "./../ui/input";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "./../ui/field";
// import InputFieldError from "./shared/InputFieldError";

const RegisterForm = () => {
  //   const [showPass, setShowPass] = useState(false);
  //   const [state, formAction, isPending] = useActionState(registerPatient, null);

  //   useEffect(() => {
  //     if (state && !state.success && state.message) {
  //       toast.error(state.message);
  //     }
  //   }, [state]);

  return (
    <div className="flex-1 bg-background flex flex-col justify-center p-8 sm:p-10 lg:p-12">
      <div className="flex flex-col gap-6 max-w-md w-full mx-auto">
        <div className="text-center mb-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
            Create account
          </h1>
          <p className="text-sm text-muted-foreground mt-1.5">
            Join StayNest and start managing smarter
          </p>
        </div>

        <form
        //action={formAction}
        >
          <FieldGroup>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    className="pl-9 h-11 rounded-xl"
                  />
                </div>
                {/* <InputFieldError field="name" state={state} /> */}
              </Field>

              {/* Address */}
              <Field>
                <FieldLabel htmlFor="address">Address</FieldLabel>
                <div className="relative">
                  <MapPinIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    id="address"
                    name="address"
                    placeholder="123 Main St"
                    className="pl-9 h-11 rounded-xl"
                  />
                </div>
                {/* <InputFieldError field="address" state={state} /> */}
              </Field>

              {/* Email */}
              <Field className="md:col-span-2">
                <FieldLabel htmlFor="email">Email Address</FieldLabel>
                <div className="relative">
                  <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    className="pl-9 h-11 rounded-xl"
                  />
                </div>
                {/* <InputFieldError field="email" state={state} /> */}
              </Field>

              {/* Password */}
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <div className="relative">
                  <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  {/* <Input
                    id="password"
                    name="password"
                    type={showPass ? "text" : "password"}
                    className="pl-9 pr-9 h-11 rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  >
                    {showPass ? (
                      <EyeOffIcon size={16} />
                    ) : (
                      <EyeIcon size={16} />
                    )} */}
                  {/* </button> */}
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    className="pl-9 h-11 rounded-xl"
                  />
                </div>
                {/* <InputFieldError field="password" state={state} /> */}
              </Field>

              {/* Confirm Password */}
              <Field>
                <FieldLabel htmlFor="confirmPassword">Confirm</FieldLabel>
                <div className="relative">
                  <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    className="pl-9 h-11 rounded-xl"
                  />
                </div>
                {/* <InputFieldError field="confirmPassword" state={state} /> */}
              </Field>
            </div>

            <div className="mt-6 space-y-4">
              <Button
                type="submit"
                className="w-full h-11 rounded-xl font-bold shadow-lg shadow-primary/20"
                // disabled={isPending}
              >
                {/* {isPending ? "Creating Account..." : "Create Account"} */}
                Create Account
              </Button>

              <FieldDescription className="text-center text-sm">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-primary font-bold hover:underline"
                >
                  Sign in
                </Link>
              </FieldDescription>
            </div>
          </FieldGroup>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
