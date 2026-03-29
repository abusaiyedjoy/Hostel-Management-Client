"use client";

import {
  BedDoubleIcon,
  ShieldCheckIcon,
  WifiIcon,
  UtensilsIcon,
  HeadphonesIcon,
  KeyRoundIcon,
  ArrowRightIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: BedDoubleIcon,
    title: "Comfortable Rooms",
    description:
      "Choose from single, double, or dormitory rooms — all furnished with premium bedding and climate control.",
  },
  {
    icon: ShieldCheckIcon,
    title: "24/7 Security",
    description:
      "CCTV surveillance, keycard access, and round-the-clock security staff keep every guest safe.",
  },
  {
    icon: WifiIcon,
    title: "High-Speed Wi-Fi",
    description:
      "Blazing-fast internet throughout every floor — perfect for remote workers and travellers alike.",
  },
  {
    icon: UtensilsIcon,
    title: "In-House Dining",
    description:
      "Enjoy freshly prepared meals in our canteen, with vegetarian, vegan, and halal options daily.",
  },
  {
    icon: HeadphonesIcon,
    title: "Guest Support",
    description:
      "Our friendly front-desk team is available around the clock to handle every query and request.",
  },
  {
    icon: KeyRoundIcon,
    title: "Easy Check-In",
    description:
      "Book online and check in instantly — no paperwork, no waiting. Your key is ready when you arrive.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center mb-14">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary mb-4">
            <span className="size-1.5 rounded-full bg-primary" />
            Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight">
            Everything you need for a{" "}
            <span className="text-primary">perfect stay</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            We've built HostelHub around what guests actually need — comfort,
            safety, and zero hassle from booking to checkout.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
              >
                {/* subtle number watermark */}
                <span className="absolute top-4 right-5 text-5xl font-black text-muted-foreground/8 select-none">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <Icon className="size-5" />
                </span>

                <div>
                  <h3 className="text-base font-semibold text-foreground mb-1.5">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="mt-auto pt-2">
                  <a
                    href="#"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200"
                  >
                    Learn more <ArrowRightIcon className="size-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA strip */}
        <div className="mt-14 rounded-2xl bg-primary/5 border border-primary/10 px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="max-sm:text-center">
            <p className="text-foreground font-semibold text-lg">
              Ready to experience it yourself?
            </p>
            <p className="text-muted-foreground text-sm mt-1">
              Book a room today — no credit card required to reserve.
            </p>
          </div>
          <Button asChild size="lg" className="rounded-full shrink-0 group">
            <a href="#">
              Book a Room
              <ArrowRightIcon className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
