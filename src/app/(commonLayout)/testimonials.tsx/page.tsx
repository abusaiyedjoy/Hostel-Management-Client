"use client";

import { useState } from "react";
import {
  StarIcon,
  QuoteIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  BedDoubleIcon,
  UtensilsCrossed,
  WifiIcon,
  ShieldCheckIcon,
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

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <StarIcon
          key={i}
          className={`size-3.5 ${i <= rating ? "text-amber-400 fill-amber-400" : "text-[#c8ddc8] dark:text-[#1e3a1e]"}`}
        />
      ))}
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const FEATURED = {
  name: "Priya Sharma",
  role: "Software Engineer, Dhaka",
  avatar: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-58.png",
  rating: 5,
  location: "Banasree Branch",
  date: "March 2026",
  review:
    "I stayed at StayNest Banasree for three months while on a work contract. I expected a basic hostel — clean bed, shared bathroom, done. What I got was a home. The staff knows your name by day two, the Wi-Fi actually works, and the canteen food is genuinely good. I've referred four colleagues since. If you're moving to Dhaka for work, look nowhere else.",
};

const REVIEWS = [
  {
    name: "Tanvir Ahmed",
    role: "Student, BUET",
    avatar: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-46.png",
    rating: 5,
    branch: "Dhanmondi",
    date: "Jan 2026",
    short:
      "Checked in for my semester exams. The silence policy after 10 PM is a lifesaver. Clean rooms, fast check-in, no nonsense.",
  },
  {
    name: "Meera Pillai",
    role: "Travel Blogger",
    avatar: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-56.png",
    rating: 5,
    branch: "Sylhet",
    date: "Feb 2026",
    short:
      "The Sylhet property had a rooftop common area with a view of the hills. Met three other solo travellers there and we spent three evenings just talking. Magical.",
  },
  {
    name: "Karim Uddin",
    role: "Sales Manager",
    avatar: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-57.png",
    rating: 4,
    branch: "Chittagong",
    date: "Dec 2025",
    short:
      "Stayed for a week on a client visit. The location in Agrabad is perfect for business. Room was a bit small but everything was immaculate.",
  },
  {
    name: "Rishita Bose",
    role: "Freelance Designer",
    avatar: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-46.png",
    rating: 5,
    branch: "Mirpur",
    date: "Feb 2026",
    short:
      "As a solo female traveller this was the safest I've felt anywhere. The all-female floor option is a thoughtful touch that I hadn't seen anywhere else.",
  },
  {
    name: "Nafis Hossain",
    role: "Medical Intern",
    avatar: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-57.png",
    rating: 5,
    branch: "Rajshahi",
    date: "Jan 2026",
    short:
      "Six months of internship. The staff helped me with laundry, nearby pharmacy, even local SIM cards. Above and beyond every time.",
  },
  {
    name: "Anika Roy",
    role: "PhD Researcher",
    avatar: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-56.png",
    rating: 4,
    branch: "Dhanmondi",
    date: "Mar 2026",
    short:
      "Exactly what you need for a long stay. Quiet, clean, reliable. The study lounge on the second floor is underrated — better than any café.",
  },
  {
    name: "Sanjay Mukherji",
    role: "IT Consultant",
    avatar: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-46.png",
    rating: 5,
    branch: "Banasree",
    date: "Mar 2026",
    short:
      "The StayNest app makes everything frictionless. Extended my stay twice in under 2 minutes. Check-out was paperless. This is how hostels should work.",
  },
  {
    name: "Lamiya Chowdhury",
    role: "Event Coordinator",
    avatar: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-58.png",
    rating: 5,
    branch: "Khulna",
    date: "Nov 2025",
    short:
      "Organised a work trip for a team of 8. The group booking experience was seamless. We had a private dining area booked within hours of asking.",
  },
  {
    name: "Rubel Islam",
    role: "Factory Manager",
    avatar: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-57.png",
    rating: 4,
    branch: "Chittagong",
    date: "Jan 2026",
    short:
      "Value for money is off the charts. I've paid double elsewhere for half the quality. Will be back next quarter without question.",
  },
];

const RATING_BREAKDOWN = [
  { label: "Cleanliness", score: 4.9 },
  { label: "Staff", score: 4.8 },
  { label: "Wi-Fi", score: 4.7 },
  { label: "Location", score: 4.6 },
  { label: "Value", score: 4.9 },
  { label: "Safety", score: 5.0 },
];

const CATEGORIES = [
  { icon: BedDoubleIcon, label: "Rooms & Beds", score: "4.9" },
  { icon: UtensilsCrossed, label: "Canteen Food", score: "4.7" },
  { icon: WifiIcon, label: "Connectivity", score: "4.8" },
  { icon: ShieldCheckIcon, label: "Safety", score: "5.0" },
];

type FilterType = "All" | "5 Stars" | "4 Stars" | "Long Stay" | "Business";

// ─── Hero ─────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-16">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1e4d2b] via-[#245c32] to-[#2d7040]" />
      <div className="pointer-events-none absolute -top-24 -right-24 size-80 rounded-full bg-white/8 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-10 size-64 rounded-full bg-black/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div className="flex flex-col gap-6">
            <SectionBadge label="Guest Reviews" />
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1]">
              Don't take our
              <br />
              <span className="text-[#86dca0]">word for it</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed max-w-lg">
              Over 12,000 guests have chosen StayNest. Here's what they said —
              unfiltered, unedited, and completely genuine.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <StarIcon
                    key={i}
                    className="size-5 text-amber-400 fill-amber-400"
                  />
                ))}
              </div>
              <div>
                <p className="text-2xl font-black text-white">
                  4.9{" "}
                  <span className="text-white/60 text-base font-normal">
                    / 5.0
                  </span>
                </p>
                <p className="text-white/50 text-xs">
                  Based on 12,400+ reviews
                </p>
              </div>
            </div>
          </div>

          {/* Right — rating breakdown */}
          <div className="rounded-2xl bg-white/10 border border-white/15 backdrop-blur-sm p-6 flex flex-col gap-4">
            <p className="text-sm font-semibold text-white/80 uppercase tracking-wide">
              Rating Breakdown
            </p>
            {RATING_BREAKDOWN.map(({ label, score }) => (
              <div key={label} className="flex items-center gap-3">
                <p className="text-xs text-white/70 w-24 shrink-0">{label}</p>
                <div className="flex-1 h-1.5 rounded-full bg-white/20 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#86dca0] transition-all"
                    style={{ width: `${(score / 5) * 100}%` }}
                  />
                </div>
                <p className="text-xs font-bold text-white w-6 text-right">
                  {score}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Category scores ──────────────────────────────────────────────────────────
function CategoryScores() {
  return (
    <div className="bg-[#fafdf8] dark:bg-[#111f11] border-b border-[#c8ddc8] dark:border-[#1e3a1e]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {CATEGORIES.map(({ icon: Icon, label, score }) => (
            <div
              key={label}
              className="flex items-center gap-3 p-3 rounded-xl bg-[#f0f7f0] dark:bg-[#0f1f0f] border border-[#c8ddc8] dark:border-[#1e3a1e]"
            >
              <div className="flex size-9 items-center justify-center rounded-lg bg-[#d4edcc] dark:bg-[#1a3a1a] shrink-0">
                <Icon className="size-4 text-[#1e4d2b] dark:text-[#6ddc6d]" />
              </div>
              <div>
                <p className="text-xs text-[#5a7a5a] dark:text-[#6a9a6a]">
                  {label}
                </p>
                <p className="text-lg font-black text-[#1a2e1a] dark:text-[#c8ecc8] leading-none mt-0.5">
                  {score}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Featured review ──────────────────────────────────────────────────────────
function FeaturedReview() {
  return (
    <section className="py-16 sm:py-20 bg-[#f0f7f0] dark:bg-[#0a150a]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <SectionBadge label="Featured Review" />
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1a2e1a] dark:text-[#c8ecc8]">
            A story worth{" "}
            <span className="text-[#1e4d2b] dark:text-[#4ade80]">sharing</span>
          </h2>
        </div>

        <div
          className="relative max-w-3xl mx-auto rounded-3xl border p-8 sm:p-10
          bg-[#fafdf8] dark:bg-[#111f11]
          border-[#c8ddc8] dark:border-[#1e3a1e]
          shadow-lg shadow-[rgba(20,60,20,0.06)] dark:shadow-[rgba(0,0,0,0.4)]"
        >
          {/* Quote icon */}
          <div className="absolute top-6 right-8 opacity-10">
            <QuoteIcon className="size-20 text-[#1e4d2b] dark:text-[#4ade80]" />
          </div>

          <div className="relative flex flex-col gap-5">
            <StarRow rating={FEATURED.rating} />
            <p className="text-[#1a2e1a] dark:text-[#c8ecc8] text-base sm:text-lg leading-relaxed font-medium">
              &ldquo;{FEATURED.review}&rdquo;
            </p>
            <div className="flex items-center gap-4 pt-2 border-t border-[#c8ddc8] dark:border-[#1e3a1e]">
              <img
                src={FEATURED.avatar}
                alt={FEATURED.name}
                className="size-12 rounded-2xl object-cover border-2 border-[#c8ddc8] dark:border-[#1e3a1e]"
              />
              <div>
                <p className="font-bold text-[#1a2e1a] dark:text-[#c8ecc8]">
                  {FEATURED.name}
                </p>
                <p className="text-xs text-[#5a7a5a] dark:text-[#6a9a6a]">
                  {FEATURED.role}
                </p>
              </div>
              <div className="ml-auto text-right hidden sm:block">
                <p className="text-xs font-semibold text-[#1e4d2b] dark:text-[#4ade80]">
                  {FEATURED.location}
                </p>
                <p className="text-xs text-[#7a9a7a] dark:text-[#567056]">
                  {FEATURED.date}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Review grid ──────────────────────────────────────────────────────────────
function ReviewGrid() {
  const [filter, setFilter] = useState<FilterType>("All");

  const filters: FilterType[] = [
    "All",
    "5 Stars",
    "4 Stars",
    "Long Stay",
    "Business",
  ];

  const displayed = REVIEWS.filter((r) => {
    if (filter === "All") return true;
    if (filter === "5 Stars") return r.rating === 5;
    if (filter === "4 Stars") return r.rating === 4;
    return true;
  });

  return (
    <section className="py-16 sm:py-20 bg-[#fafdf8] dark:bg-[#111f11]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div>
            <SectionBadge label="All Reviews" />
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a2e1a] dark:text-[#c8ecc8]">
              What guests{" "}
              <span className="text-[#1e4d2b] dark:text-[#4ade80]">
                are saying
              </span>
            </h2>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  filter === f
                    ? "bg-[#1e4d2b] text-white border-[#1e4d2b] dark:bg-[#2d7040] dark:border-[#2d7040]"
                    : "bg-transparent border-[#c8ddc8] dark:border-[#1e3a1e] text-[#5a7a5a] dark:text-[#6a9a6a] hover:border-[#6db86d] dark:hover:border-[#2d5a2d] hover:text-[#1e4d2b] dark:hover:text-[#4ade80]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayed.map((review) => (
            <div
              key={review.name + review.branch}
              className="flex flex-col gap-4 rounded-2xl border p-5 transition-all duration-200
                bg-[#fafdf8] dark:bg-[#111f11]
                border-[#c8ddc8] dark:border-[#1e3a1e]
                hover:shadow-md hover:shadow-[rgba(20,60,20,0.07)] dark:hover:shadow-[rgba(0,0,0,0.4)]
                hover:border-[#6db86d] dark:hover:border-[#2d5a2d]"
            >
              {/* Header */}
              <div className="flex items-center gap-3">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="size-10 rounded-xl object-cover border border-[#c8ddc8] dark:border-[#1e3a1e] shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-sm font-bold text-[#1a2e1a] dark:text-[#c8ecc8] truncate">
                    {review.name}
                  </p>
                  <p className="text-xs text-[#5a7a5a] dark:text-[#6a9a6a] truncate">
                    {review.role}
                  </p>
                </div>
                <div className="ml-auto shrink-0">
                  <StarRow rating={review.rating} />
                </div>
              </div>

              {/* Body */}
              <p className="text-sm text-[#3a5a3a] dark:text-[#8ab88a] leading-relaxed flex-1">
                &ldquo;{review.short}&rdquo;
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-[#e4f0e4] dark:border-[#1e3a1e]">
                <span className="inline-flex items-center gap-1 text-xs font-semibold rounded-full px-2.5 py-0.5 bg-[#d4edcc] dark:bg-[#1a3a1a] text-[#1e4d2b] dark:text-[#6ddc6d]">
                  {review.branch}
                </span>
                <div className="flex items-center gap-1.5 text-xs text-[#7a9a7a] dark:text-[#567056]">
                  <CheckCircleIcon className="size-3 text-[#1e4d2b] dark:text-[#4ade80]" />
                  Verified · {review.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Trust stats ──────────────────────────────────────────────────────────────
function TrustSection() {
  return (
    <section className="py-16 sm:py-20 bg-[#f0f7f0] dark:bg-[#0a150a]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <SectionBadge label="By the Numbers" />
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1a2e1a] dark:text-[#c8ecc8]">
            Trust built{" "}
            <span className="text-[#1e4d2b] dark:text-[#4ade80]">
              one stay at a time
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { value: "12K+", label: "Total guests", sub: "And growing daily" },
            {
              value: "4.9",
              label: "Average rating",
              sub: "Across all locations",
            },
            {
              value: "60%",
              label: "Return guests",
              sub: "Booked again within 6 months",
            },
            {
              value: "98%",
              label: "Recommend us",
              sub: "Would suggest to a friend",
            },
          ].map(({ value, label, sub }) => (
            <div
              key={label}
              className="flex flex-col items-center text-center p-6 rounded-2xl border
                bg-[#fafdf8] dark:bg-[#111f11]
                border-[#c8ddc8] dark:border-[#1e3a1e]"
            >
              <p className="text-4xl font-black text-[#1e4d2b] dark:text-[#4ade80]">
                {value}
              </p>
              <p className="text-sm font-semibold text-[#1a2e1a] dark:text-[#c8ecc8] mt-2">
                {label}
              </p>
              <p className="text-xs text-[#5a7a5a] dark:text-[#6a9a6a] mt-1">
                {sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────
function CtaSection() {
  return (
    <section className="py-16 sm:py-20 bg-[#fafdf8] dark:bg-[#111f11]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1e4d2b] via-[#245c32] to-[#2d7040] px-6 sm:px-12 py-14 text-center">
          <div className="pointer-events-none absolute -top-20 -left-20 size-72 rounded-full bg-white/8 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -right-16 size-60 rounded-full bg-white/8 blur-3xl" />
          <div className="relative flex flex-col items-center gap-5 max-w-xl mx-auto">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <StarIcon
                  key={i}
                  className="size-5 text-amber-400 fill-amber-400"
                />
              ))}
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Ready to write your own review?
            </h2>
            <p className="text-white/70 text-base">
              Join thousands of satisfied guests. Book your stay today — no
              credit card required for most locations.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="/register"
                className="inline-flex items-center gap-2 rounded-full bg-white text-[#1e4d2b] font-semibold px-6 py-3 text-sm hover:bg-white/90 transition-colors group"
              >
                Book a stay
                <ArrowRightIcon className="size-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 text-white font-semibold px-6 py-3 text-sm hover:bg-white/10 transition-colors"
              >
                Ask a question
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-[#f0f7f0] dark:bg-[#0a150a]">
      <HeroSection />
      <CategoryScores />
      <FeaturedReview />
      <ReviewGrid />
      <TrustSection />
      <CtaSection />
    </div>
  );
}
