"use client";

import RegisterForm from "@/components/Forms/RegisterForm";
import Image from "next/image";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl shadow-primary/15 flex flex-col lg:flex-row min-h-[680px]">
        {/* ── LEFT PANEL — Form ── */}
        <RegisterForm />

        {/* ── RIGHT PANEL — Branded visual ── */}
        <div className="hidden lg:flex relative flex-1 bg-linear-to-br from-primary via-primary/90 to-violet-700 flex-col justify-between p-10 overflow-hidden">
          <Image
            src="/login.png"
            alt="Register Left Panel"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
