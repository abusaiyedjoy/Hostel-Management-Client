"use client";

import { useEffect, useRef, useState } from "react";
import { BedDoubleIcon, SmileIcon, MapPinIcon, AwardIcon } from "lucide-react";

const stats = [
  {
    icon: BedDoubleIcon,
    value: 120,
    suffix: "+",
    label: "Total Rooms",
    description: "Across all categories — singles, doubles & dorms",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: SmileIcon,
    value: 12000,
    suffix: "+",
    label: "Happy Guests",
    description: "Travellers who chose us and came back again",
    color: "text-emerald-600",
    bg: "bg-emerald-100",
  },
  {
    icon: MapPinIcon,
    value: 8,
    suffix: "",
    label: "Locations",
    description: "Spread across Dhaka and major cities",
    color: "text-amber-600",
    bg: "bg-amber-100",
  },
  {
    icon: AwardIcon,
    value: 98,
    suffix: "%",
    label: "Satisfaction Rate",
    description: "Based on 5,000+ verified guest reviews",
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
];

function useCountUp(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);

  return count;
}

function StatCard({
  stat,
  animate,
}: {
  stat: (typeof stats)[0];
  animate: boolean;
}) {
  const Icon = stat.icon;
  const count = useCountUp(stat.value, 1800, animate);

  return (
    <div className="group flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
      <span
        className={`flex size-12 items-center justify-center rounded-xl ${stat.bg} ${stat.color}`}
      >
        <Icon className="size-6" />
      </span>
      <div>
        <p className="text-4xl font-black text-foreground tabular-nums">
          {count.toLocaleString()}
          <span className={`text-2xl font-bold ml-0.5 ${stat.color}`}>
            {stat.suffix}
          </span>
        </p>
        <p className="text-base font-semibold text-foreground mt-1">
          {stat.label}
        </p>
        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
          {stat.description}
        </p>
      </div>
    </div>
  );
}

const StatsSection = () => {
  const [animate, setAnimate] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setAnimate(true);
      },
      { threshold: 0.2 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Decorative banner strip */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-violet-700 px-6 sm:px-10 py-12 sm:py-16 mb-16">
          {/* Decorative blobs */}
          <div className="pointer-events-none absolute -top-16 -right-16 size-64 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-10 left-10 size-48 rounded-full bg-white/5 blur-2xl" />

          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white mb-4">
                <span className="size-1.5 rounded-full bg-white" />
                Trusted Across Bangladesh
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
                Numbers that speak for themselves
              </h2>
              <p className="mt-3 text-white/70 text-base">
                From our first hostel in Dhaka to 8 locations nationwide, we've
                built a reputation on comfort and care.
              </p>
            </div>
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-full bg-white text-primary font-semibold px-6 py-3 text-sm hover:bg-white/90 transition-colors shrink-0 self-start lg:self-auto"
            >
              Read our story →
            </a>
          </div>
        </div>

        {/* Stats grid */}
        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat) => (
            <StatCard key={stat.label} stat={stat} animate={animate} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
