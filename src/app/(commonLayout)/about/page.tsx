"use client";

import {
  BuildingIcon,
  UsersIcon,
  ShieldCheckIcon,
  HeartIcon,
  LeafIcon,
  StarIcon,
  ArrowRightIcon,
  BedDoubleIcon,
  MapPinIcon,
  CalendarIcon,
  TrophyIcon,
  LinkedinIcon,
  TwitterIcon,
} from "lucide-react";

function SectionBadge({ label }: { label: string }) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold mb-4
      bg-[#d4edcc] dark:bg-[#1a3a1a] text-[#1e4d2b] dark:text-[#6ddc6d]"
    >
      <span className="size-1.5 rounded-full bg-[#1e4d2b] dark:bg-[#4ade80]" />
      {label}
    </span>
  );
}

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border p-6
      bg-[#fafdf8] dark:bg-[#111f11]
      border-[#c8ddc8] dark:border-[#1e3a1e]
      shadow-sm hover:shadow-md hover:shadow-[rgba(20,60,20,0.08)] dark:hover:shadow-[rgba(0,0,0,0.4)]
      transition-shadow duration-200 ${className}`}
    >
      {children}
    </div>
  );
}

// ─── 1. Hero — pt-16 pushes content below the fixed 64px navbar ───────────────
function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-16">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1e4d2b] via-[#245c32] to-[#2d7040]" />
      <div className="pointer-events-none absolute -top-24 -right-24 size-80 rounded-full bg-white/8 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-10 size-64 rounded-full bg-black/10 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 right-1/4 size-40 rounded-full bg-white/5 blur-2xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="flex flex-col gap-6">
            <SectionBadge label="Our Story" />
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1]">
              More than just a<br />
              <span className="text-[#86dca0]">place to stay</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed max-w-lg">
              StayNest was built on a simple belief — every traveller, student,
              and professional deserves a safe, clean, and welcoming place to
              call home, even if just for a night.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#mission"
                className="inline-flex items-center gap-2 rounded-full bg-white text-[#1e4d2b] font-semibold px-6 py-3 text-sm hover:bg-white/90 transition-colors group"
              >
                Our Mission
                <ArrowRightIcon className="size-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href="#team"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 text-white font-semibold px-6 py-3 text-sm hover:bg-white/10 transition-colors"
              >
                Meet the Team
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              {
                icon: BedDoubleIcon,
                value: "120+",
                label: "Total Rooms",
                sub: "Across all categories",
              },
              {
                icon: UsersIcon,
                value: "12K+",
                label: "Happy Guests",
                sub: "And counting every day",
              },
              {
                icon: MapPinIcon,
                value: "8",
                label: "Locations",
                sub: "Across Bangladesh",
              },
              {
                icon: TrophyIcon,
                value: "98%",
                label: "Satisfaction",
                sub: "Based on verified reviews",
              },
            ].map(({ icon: Icon, value, label, sub }) => (
              <div
                key={label}
                className="rounded-2xl p-5 border border-white/15 bg-white/10 backdrop-blur-sm flex flex-col gap-2"
              >
                <Icon className="size-5 text-[#86dca0]" />
                <p className="text-3xl font-black text-white">{value}</p>
                <div>
                  <p className="text-sm font-semibold text-white">{label}</p>
                  <p className="text-xs text-white/55 mt-0.5">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── 2. Mission & Vision ──────────────────────────────────────────────────────
function MissionSection() {
  return (
    <section
      id="mission"
      className="py-16 sm:py-20 lg:py-28 bg-[#f0f7f0] dark:bg-[#0a150a]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <SectionBadge label="What Drives Us" />
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1a2e1a] dark:text-[#c8ecc8] leading-tight">
            Our mission, vision{" "}
            <span className="text-[#1e4d2b] dark:text-[#4ade80]">
              &amp; values
            </span>
          </h2>
          <p className="mt-4 text-[#5a7a5a] dark:text-[#6a9a6a] text-lg">
            Every decision we make starts with the guest experience and ends
            with the promise of feeling at home.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: HeartIcon,
              color: "text-[#1e4d2b] dark:text-[#4ade80]",
              bg: "bg-[#d4edcc] dark:bg-[#1a3a1a]",
              title: "Our Mission",
              body: "To provide affordable, safe, and comfortable accommodation for every kind of traveller — from budget backpackers to long-staying professionals.",
            },
            {
              icon: BuildingIcon,
              color: "text-emerald-600 dark:text-emerald-400",
              bg: "bg-emerald-100 dark:bg-emerald-900/30",
              title: "Our Vision",
              body: "To become Bangladesh's most trusted hostel network — known not for our rooms, but for the warmth, care, and community we create inside them.",
            },
            {
              icon: LeafIcon,
              color: "text-amber-600 dark:text-amber-400",
              bg: "bg-amber-100 dark:bg-amber-900/30",
              title: "Sustainability",
              body: "We're committed to running eco-conscious hostels — solar energy, zero single-use plastics, and community-first sourcing for our canteen.",
            },
          ].map(({ icon: Icon, color, bg, title, body }) => (
            <Card
              key={title}
              className="flex flex-col gap-5 text-center items-center"
            >
              <span
                className={`flex size-14 items-center justify-center rounded-2xl ${bg}`}
              >
                <Icon className={`size-7 ${color}`} />
              </span>
              <div>
                <h3 className="text-lg font-bold text-[#1a2e1a] dark:text-[#c8ecc8] mb-2">
                  {title}
                </h3>
                <p className="text-sm text-[#5a7a5a] dark:text-[#6a9a6a] leading-relaxed">
                  {body}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 3. Timeline ──────────────────────────────────────────────────────────────
function TimelineSection() {
  const milestones = [
    {
      year: "2016",
      title: "The Idea",
      body: "Two college friends couldn't find a decent, affordable hostel in Dhaka during exam season. They decided to fix that.",
    },
    {
      year: "2017",
      title: "First Location",
      body: "StayNest opened its very first 20-room property in Dhanmondi, Dhaka, with a waitlist on day one.",
    },
    {
      year: "2019",
      title: "Going Digital",
      body: "Launched our in-house booking platform, eliminating phone-only reservations and cutting check-in time by 80%.",
    },
    {
      year: "2021",
      title: "5 Cities",
      body: "Expanded to Chittagong, Sylhet, and Rajshahi — welcoming guests from across the country and beyond.",
    },
    {
      year: "2023",
      title: "10,000 Guests",
      body: "Celebrated 10,000 check-ins. By this point, 60% of guests were returning visitors or referrals.",
    },
    {
      year: "2025",
      title: "StayNest Pro",
      body: "Launched our full management dashboard — giving property owners the tools to run hostels with confidence.",
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-[#fafdf8] dark:bg-[#111f11]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <SectionBadge label="Our Journey" />
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1a2e1a] dark:text-[#c8ecc8]">
            How we got{" "}
            <span className="text-[#1e4d2b] dark:text-[#4ade80]">here</span>
          </h2>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute left-1/2 -translate-x-px top-0 bottom-0 w-0.5 bg-[#c8ddc8] dark:bg-[#1e3a1e]" />
          <div className="flex flex-col gap-8 lg:gap-0">
            {milestones.map((m, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={m.year}
                  className={`relative flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-0 ${isLeft ? "lg:flex-row" : "lg:flex-row-reverse"}`}
                >
                  <div
                    className={`lg:w-[calc(50%-2rem)] ${isLeft ? "lg:pr-10 lg:text-right" : "lg:pl-10"}`}
                  >
                    <Card className="inline-block w-full text-left">
                      <p className="text-xs font-bold text-[#1e4d2b] dark:text-[#4ade80] mb-1">
                        {m.year}
                      </p>
                      <h3 className="text-base font-bold text-[#1a2e1a] dark:text-[#c8ecc8] mb-2">
                        {m.title}
                      </h3>
                      <p className="text-sm text-[#5a7a5a] dark:text-[#6a9a6a] leading-relaxed">
                        {m.body}
                      </p>
                    </Card>
                  </div>
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 size-10 rounded-full items-center justify-center bg-[#1e4d2b] dark:bg-[#2d7040] border-4 border-[#fafdf8] dark:border-[#111f11] shadow-lg z-10">
                    <CalendarIcon className="size-4 text-white" />
                  </div>
                  <div className="hidden lg:block lg:w-[calc(50%-2rem)]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── 4. Team ──────────────────────────────────────────────────────────────────
function TeamSection() {
  const team = [
    {
      name: "Arif Rahman",
      role: "Co-Founder & CEO",
      avatar: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-46.png",
      bio: "Hospitality veteran with 10 years in budget accommodation. Passionate about making travel accessible for everyone.",
      twitter: "#",
      linkedin: "#",
    },
    {
      name: "Nadia Hossain",
      role: "Co-Founder & CTO",
      avatar: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-56.png",
      bio: "Built the StayNest booking engine from scratch. Previously engineered platforms for 2 major travel startups.",
      twitter: "#",
      linkedin: "#",
    },
    {
      name: "Karim Chowdhury",
      role: "Head of Operations",
      avatar: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-57.png",
      bio: "Oversees all 8 locations and a team of 60+. Known for showing up unannounced to personally check room quality.",
      twitter: "#",
      linkedin: "#",
    },
    {
      name: "Sadia Islam",
      role: "Guest Experience Lead",
      avatar: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-58.png",
      bio: "Former airline hospitality trainer. Single-handedly redesigned our check-in process reducing wait time to under 2 min.",
      twitter: "#",
      linkedin: "#",
    },
  ];

  return (
    <section
      id="team"
      className="py-16 sm:py-20 lg:py-28 bg-[#f0f7f0] dark:bg-[#0a150a]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <SectionBadge label="The People" />
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1a2e1a] dark:text-[#c8ecc8]">
            Meet the team behind{" "}
            <span className="text-[#1e4d2b] dark:text-[#4ade80]">StayNest</span>
          </h2>
          <p className="mt-4 text-[#5a7a5a] dark:text-[#6a9a6a]">
            Small team, big hearts. Every person here is obsessed with one thing
            — your experience.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member) => (
            <Card
              key={member.name}
              className="flex flex-col items-center text-center gap-4"
            >
              <div className="relative">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="size-20 rounded-2xl object-cover border-2 border-[#c8ddc8] dark:border-[#1e3a1e]"
                />
                <span className="absolute -bottom-2 -right-2 size-6 rounded-full bg-emerald-400 border-2 border-[#fafdf8] dark:border-[#111f11]" />
              </div>
              <div>
                <p className="font-bold text-[#1a2e1a] dark:text-[#c8ecc8]">
                  {member.name}
                </p>
                <p className="text-xs text-[#1e4d2b] dark:text-[#4ade80] font-semibold mt-0.5">
                  {member.role}
                </p>
              </div>
              <p className="text-xs text-[#5a7a5a] dark:text-[#6a9a6a] leading-relaxed">
                {member.bio}
              </p>
              <div className="flex items-center gap-2 mt-auto pt-2 border-t border-[#e4f0e4] dark:border-[#1e3a1e] w-full justify-center">
                {[
                  { Icon: TwitterIcon, href: member.twitter },
                  { Icon: LinkedinIcon, href: member.linkedin },
                ].map(({ Icon, href }, i) => (
                  <a
                    key={i}
                    href={href}
                    className="flex size-8 items-center justify-center rounded-full border border-[#c8ddc8] dark:border-[#1e3a1e] text-[#5a7a5a] dark:text-[#6a9a6a] hover:text-[#1e4d2b] dark:hover:text-[#4ade80] hover:border-[#6db86d] dark:hover:border-[#2d6a2d] transition-colors"
                  >
                    <Icon className="size-3.5" />
                  </a>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 5. Values ────────────────────────────────────────────────────────────────
function ValuesSection() {
  const values = [
    {
      icon: ShieldCheckIcon,
      label: "Safety First",
      body: "Every property is inspected weekly. No compromise.",
    },
    {
      icon: HeartIcon,
      label: "Guest-Centred",
      body: "Every policy, feature, and hire starts with the guest in mind.",
    },
    {
      icon: StarIcon,
      label: "Quality Always",
      body: "Clean sheets, hot water, and working Wi-Fi — every single time.",
    },
    {
      icon: UsersIcon,
      label: "Community",
      body: "We build spaces that bring people together, not just rent beds.",
    },
    {
      icon: LeafIcon,
      label: "Sustainability",
      body: "Eco-first operations across all 8 locations.",
    },
    {
      icon: BuildingIcon,
      label: "Transparency",
      body: "No hidden fees, no fine print surprises. Ever.",
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-[#fafdf8] dark:bg-[#111f11]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <SectionBadge label="Core Values" />
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a2e1a] dark:text-[#c8ecc8] mb-4">
              The principles we{" "}
              <span className="text-[#1e4d2b] dark:text-[#4ade80]">
                never compromise
              </span>
            </h2>
            <p className="text-[#5a7a5a] dark:text-[#6a9a6a] leading-relaxed mb-8">
              These aren't words on a wall. They're the checklist we use every
              morning before we open our doors.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-[#1e4d2b] dark:bg-[#2d7040] text-white font-semibold px-6 py-3 text-sm hover:bg-[#245c32] dark:hover:bg-[#356a48] transition-colors group"
            >
              Work with us
              <ArrowRightIcon className="size-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {values.map(({ icon: Icon, label, body }) => (
              <div
                key={label}
                className="flex items-start gap-3 p-4 rounded-xl border border-[#c8ddc8] dark:border-[#1e3a1e] bg-[#f0f7f0] dark:bg-[#0f1f0f] hover:border-[#6db86d] dark:hover:border-[#2d5a2d] transition-colors group"
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#d4edcc] dark:bg-[#1a3a1a] text-[#1e4d2b] dark:text-[#6ddc6d] group-hover:bg-[#1e4d2b] group-hover:text-white dark:group-hover:bg-[#2d7040] transition-colors">
                  <Icon className="size-4" />
                </span>
                <div>
                  <p className="text-sm font-bold text-[#1a2e1a] dark:text-[#c8ecc8]">
                    {label}
                  </p>
                  <p className="text-xs text-[#5a7a5a] dark:text-[#6a9a6a] mt-0.5 leading-relaxed">
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── 6. CTA ───────────────────────────────────────────────────────────────────
function CtaSection() {
  return (
    <section className="py-16 sm:py-20 bg-[#f0f7f0] dark:bg-[#0a150a]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1e4d2b] via-[#245c32] to-[#2d7040] px-6 sm:px-12 py-14 sm:py-16 text-center">
          <div className="pointer-events-none absolute -top-20 -left-20 size-72 rounded-full bg-white/8 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -right-16 size-60 rounded-full bg-white/8 blur-3xl" />
          <div className="relative flex flex-col items-center gap-6 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 border border-white/20 px-4 py-1.5 text-xs font-semibold text-white">
              <span className="size-1.5 rounded-full bg-white animate-pulse" />
              We're always hiring great people
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Want to be part of the story?
            </h2>
            <p className="text-white/70 text-base sm:text-lg max-w-lg">
              Whether you're a guest, a partner, or someone who wants to join
              our team — we'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-white text-[#1e4d2b] font-semibold px-6 py-3 text-sm hover:bg-white/90 transition-colors group"
              >
                Get in touch
                <ArrowRightIcon className="size-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href="/testimonials"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 text-white font-semibold px-6 py-3 text-sm hover:bg-white/10 transition-colors"
              >
                Read testimonials
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f0f7f0] dark:bg-[#0a150a]">
      <HeroSection />
      <MissionSection />
      <TimelineSection />
      <TeamSection />
      <ValuesSection />
      <CtaSection />
    </div>
  );
}
