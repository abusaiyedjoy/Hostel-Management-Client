"use client";

import { useState } from "react";
import {
  PlusIcon,
  MinusIcon,
  CalendarCheckIcon,
  PhoneIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "How do I book a room at StayNest?",
    a: "You can book directly through our website or mobile app. Select your preferred room type, choose your dates, and complete the reservation in under 2 minutes. No credit card is required to reserve — you pay on arrival.",
  },
  {
    q: "What is your check-in and check-out time?",
    a: "Standard check-in is from 2:00 PM and check-out is by 11:00 AM. Early check-in and late check-out can be arranged subject to availability — just let our front desk know in advance.",
  },
  {
    q: "Are meals included in the room rate?",
    a: "Our room rates do not include meals by default, but our in-house canteen serves affordable breakfast, lunch, and dinner daily. Full-board packages are available on request for long-stay guests.",
  },
  {
    q: "Is the hostel safe for solo travellers?",
    a: "Absolutely. We have 24/7 CCTV surveillance, keycard-only access to floors, individual lockers in all dorm rooms, and a dedicated female-only dormitory. Our staff are trained in guest safety and available around the clock.",
  },
  {
    q: "Can I cancel or modify my booking?",
    a: "Yes. Bookings can be cancelled or modified up to 24 hours before check-in at no charge. Late cancellations may incur a one-night fee. Please refer to our refund policy for full details.",
  },
  {
    q: "Do you offer long-stay or monthly rates?",
    a: "We offer special monthly rates for students and working professionals. Contact our team directly or fill in the inquiry form on our website to get a personalised quote for stays of 30 days or more.",
  },
];

function FaqItem({ faq, index }: { faq: (typeof faqs)[0]; index: number }) {
  const [open, setOpen] = useState(index === 0);

  return (
    <div
      className={cn(
        "rounded-2xl border transition-all duration-300",
        open
          ? "border-primary/30 bg-primary/5"
          : "border-border bg-card hover:border-primary/20",
      )}
    >
      <button
        className="flex w-full items-start gap-4 px-5 py-4 text-left"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span
          className={cn(
            "mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full transition-colors duration-200",
            open
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground",
          )}
        >
          {open ? (
            <MinusIcon className="size-3.5" />
          ) : (
            <PlusIcon className="size-3.5" />
          )}
        </span>
        <span
          className={cn(
            "text-sm font-semibold leading-snug flex-1",
            open ? "text-primary" : "text-foreground",
          )}
        >
          {faq.q}
        </span>
      </button>

      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          open ? "max-h-64 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <p className="px-5 pb-5 pl-16 text-sm text-muted-foreground leading-relaxed">
          {faq.a}
        </p>
      </div>
    </div>
  );
}

const FaqCtaSection = () => {
  return (
    <>
      {/* FAQ Section */}
      <section className="py-16 sm:py-20 lg:py-28 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Left col — sticky header */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary w-fit">
                <span className="size-1.5 rounded-full bg-primary" />
                FAQ
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight">
                Common questions, <span className="text-primary">answered</span>
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed">
                Can't find what you're looking for? Our support team is
                available 24/7 to help.
              </p>

              <div className="flex flex-col gap-3 mt-2">
                <a
                  href="tel:+880170000000"
                  className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 hover:border-primary/30 hover:bg-primary/5 transition-all group"
                >
                  <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <PhoneIcon className="size-4" />
                  </span>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Call us anytime
                    </p>
                    <p className="text-sm font-semibold text-foreground">
                      +880 1700-000000
                    </p>
                  </div>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 hover:border-primary/30 hover:bg-primary/5 transition-all group"
                >
                  <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <CalendarCheckIcon className="size-4" />
                  </span>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Book in 2 minutes
                    </p>
                    <p className="text-sm font-semibold text-foreground">
                      Reserve a room online
                    </p>
                  </div>
                </a>
              </div>
            </div>

            {/* Right col — accordion */}
            <div className="lg:col-span-3 flex flex-col gap-3">
              {faqs.map((faq, i) => (
                <FaqItem key={faq.q} faq={faq} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FaqCtaSection;
