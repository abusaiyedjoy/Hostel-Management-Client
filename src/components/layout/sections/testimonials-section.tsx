"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  StarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  QuoteIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    id: 1,
    name: "Riya Chowdhury",
    role: "University Student · Dhaka",
    avatar: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-56.png",
    rating: 5,
    review:
      "Staying at StayNest was genuinely the best decision I made this semester. The dorm was clean, quiet, and the Wi-Fi actually worked! The staff helped me sort out my room assignment in minutes. Highly recommend to any student.",
    tag: "Student Stay",
  },
  {
    id: 2,
    name: "James Okafor",
    role: "Business Traveller · Lagos",
    avatar: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-46.png",
    rating: 5,
    review:
      "I travel a lot for work and this hostel is in a different league. The double room was spotless, check-in was seamless, and the location is perfect. I'll be back next month — already booked.",
    tag: "Business Stay",
  },
  {
    id: 3,
    name: "Aiko Tanaka",
    role: "Solo Traveller · Tokyo",
    avatar: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-57.png",
    rating: 5,
    review:
      "As a solo female traveller, safety is everything. The ladies-only dorm gave me real peace of mind. The locker system is solid, the showers are hot and clean, and I made some great friends at breakfast!",
    tag: "Solo Travel",
  },
  {
    id: 4,
    name: "Tom Bergmann",
    role: "Backpacker · Berlin",
    avatar: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-58.png",
    rating: 4,
    review:
      "Great value for money — the $12 dorm bed is honestly better than some $50 rooms I've had elsewhere. Common area is lively, staff are helpful, and the location makes exploring the city super easy.",
    tag: "Budget Travel",
  },
  {
    id: 5,
    name: "Priya Sharma",
    role: "Medical Intern · Chittagong",
    avatar: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-57.png",
    rating: 5,
    review:
      "Living here for two months during my internship. The monthly rate is very fair, the management is responsive, and the meals at the canteen are actually good. Feels like a proper home away from home.",
    tag: "Long Stay",
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrent((index + testimonials.length) % testimonials.length);
      setTimeout(() => setIsAnimating(false), 400);
    },
    [isAnimating],
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    intervalRef.current = setInterval(next, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [next]);

  const active = testimonials[current];

  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-14">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary mb-4">
            <span className="size-1.5 rounded-full bg-primary" />
            Guest Reviews
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight">
            What our guests <span className="text-primary">say about us</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Real stories from real guests — unfiltered and unsponsored.
          </p>
        </div>

        {/* Main featured testimonial */}
        <div className="relative mx-auto max-w-3xl mb-10">
          <div
            className={cn(
              "rounded-3xl border border-border bg-card p-8 sm:p-10 transition-opacity duration-400",
              isAnimating ? "opacity-0" : "opacity-100",
            )}
          >
            {/* Quote icon */}
            <QuoteIcon className="size-10 text-primary/20 mb-4" />

            {/* Stars */}
            <div className="flex items-center gap-1 mb-5">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon
                  key={i}
                  className={cn(
                    "size-4",
                    i < active.rating
                      ? "fill-amber-400 text-amber-400"
                      : "text-muted-foreground/30",
                  )}
                />
              ))}
              <span className="ml-2 text-xs font-semibold text-muted-foreground">
                {active.rating}.0 / 5.0
              </span>
            </div>

            {/* Review text */}
            <p className="text-lg sm:text-xl text-foreground leading-relaxed font-medium">
              "{active.review}"
            </p>

            {/* Author row */}
            <div className="flex items-center justify-between mt-8 flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={active.avatar}
                  alt={active.name}
                  className="size-12 rounded-full border-2 border-primary/20 object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {active.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{active.role}</p>
                </div>
              </div>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                {active.tag}
              </span>
            </div>
          </div>

          {/* Nav arrows */}
          <div className="flex items-center justify-between absolute -bottom-6 left-1/2 -translate-x-1/2 gap-3">
            {/* dots + arrows */}
          </div>
        </div>

        {/* Dots + arrows */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={prev}
            className="flex size-9 items-center justify-center rounded-full border border-border bg-background text-muted-foreground hover:text-primary hover:border-primary transition-colors"
          >
            <ChevronLeftIcon className="size-4" />
          </button>

          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={cn(
                  "rounded-full transition-all duration-300",
                  i === current
                    ? "w-6 h-2.5 bg-primary"
                    : "w-2.5 h-2.5 bg-border hover:bg-primary/40",
                )}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="flex size-9 items-center justify-center rounded-full border border-border bg-background text-muted-foreground hover:text-primary hover:border-primary transition-colors"
          >
            <ChevronRightIcon className="size-4" />
          </button>
        </div>

        {/* Avatar strip — all guests */}
        <div className="mt-12 flex flex-col items-center gap-4">
          <div className="flex -space-x-3">
            {testimonials.map((t, i) => (
              <img
                key={t.id}
                src={t.avatar}
                alt={t.name}
                onClick={() => goTo(i)}
                className={cn(
                  "size-10 rounded-full border-2 cursor-pointer transition-all duration-200 object-cover",
                  i === current
                    ? "border-primary scale-110 z-10"
                    : "border-background opacity-70 hover:opacity-100 hover:scale-105",
                )}
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            Join <span className="font-semibold text-foreground">12,000+</span>{" "}
            happy guests
          </p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
