"use client";

import Image from "next/image";
import { LoginForm } from "@/components/Forms/Login-Form";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl shadow-primary/15 flex flex-col lg:flex-row min-h-[600px]">
        {/* ── LEFT PANEL — Form ── */}
        <LoginForm />

        {/* ── RIGHT PANEL — Branded visual ── */}
        {/* <div className="hidden lg:flex relative flex-1 bg-linear-to-br from-primary via-primary/90 to-primary/10 flex-col justify-end p-10 overflow-hidden">
          <Image
            src="/login.png"
            alt="Login Right Panel"
            fill
            className="object-cover"
          />
        </div> */}
      </div>
    </div>
  );
}
