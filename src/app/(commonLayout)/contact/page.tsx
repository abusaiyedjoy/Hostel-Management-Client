"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  ClockIcon,
  SendIcon,
  CheckCircleIcon,
  BuildingIcon,
  InstagramIcon,
  FacebookIcon,
  TwitterIcon,
  YoutubeIcon,
  ChevronDownIcon,
  MessageSquareIcon,
  HeadphonesIcon,
  BriefcaseIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

// ─── colour tokens
// Light: bg #f0f7f0 | surface #fafdf8 | primary #1e4d2b | border #c8ddc8
// Dark:  bg #0a150a | surface #111f11 | accent  #4ade80  | border #1e3a1e

// ── schema
const contactSchema = z.object({
  name: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

type ContactValues = z.infer<typeof contactSchema>;

// ── shared primitives
function SectionBadge({ label }: { label: string }) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold mb-4
      bg-[#d4edcc] dark:bg-[#1a3a1a]
      text-[#1e4d2b] dark:text-[#6ddc6d]"
    >
      <span className="size-1.5 rounded-full bg-[#1e4d2b] dark:bg-[#4ade80]" />
      {label}
    </span>
  );
}

function inputCls(extra = "") {
  return `h-11 rounded-xl text-sm
    bg-[#edf7ed] dark:bg-[#141f14]
    border-[#c0d8c0] dark:border-[#243424]
    text-[#1a2e1a] dark:text-[#c8ecc8]
    placeholder:text-[#8aaa8a] dark:placeholder:text-[#446044]
    focus-visible:ring-1 focus-visible:ring-[#2d7a2d] dark:focus-visible:ring-[#4ade80]
    focus-visible:ring-offset-0 ${extra}`;
}

function labelCls() {
  return "text-xs font-semibold uppercase tracking-wide text-[#5a7a5a] dark:text-[#6a9a6a]";
}

// ─── 1. Hero strip
function HeroStrip() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#1e4d2b] via-[#245c32] to-[#2d7040] py-16 sm:py-20">
      <div className="pointer-events-none absolute -top-16 -right-16 size-64 rounded-full bg-white/8 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-10 size-48 rounded-full bg-black/10 blur-2xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <SectionBadge label="Get In Touch" />
        <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
          We'd love to hear <span className="text-[#86dca0]">from you</span>
        </h1>
        <p className="mt-4 text-white/70 text-lg max-w-xl mx-auto">
          Whether you have a question, a booking inquiry, or just want to say
          hello — our team is always ready to help.
        </p>
      </div>
    </div>
  );
}

// ─── 2. Contact type cards
function ContactTypeCards() {
  const cards = [
    {
      icon: MessageSquareIcon,
      bg: "bg-[#d4edcc] dark:bg-[#1a3a1a]",
      color: "text-[#1e4d2b] dark:text-[#6ddc6d]",
      title: "General Inquiry",
      body: "Questions about our hostels, rooms, or services.",
      action: "Send a message",
      href: "#contact-form",
    },
    {
      icon: HeadphonesIcon,
      bg: "bg-emerald-100 dark:bg-emerald-900/30",
      color: "text-emerald-700 dark:text-emerald-400",
      title: "Guest Support",
      body: "Need help with an existing booking or check-in?",
      action: "Call support",
      href: "tel:+880170000000",
    },
    {
      icon: BriefcaseIcon,
      bg: "bg-amber-100 dark:bg-amber-900/30",
      color: "text-amber-700 dark:text-amber-400",
      title: "Partnerships",
      body: "Interested in listing your property or partnering with us?",
      action: "Email us",
      href: "mailto:partners@hostelhub.com",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 mb-12">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {cards.map(({ icon: Icon, bg, color, title, body, action, href }) => (
          <a
            key={title}
            href={href}
            className="flex flex-col gap-4 rounded-2xl border p-6 transition-all duration-200 group
              bg-[#fafdf8] dark:bg-[#111f11]
              border-[#c8ddc8] dark:border-[#1e3a1e]
              shadow-md hover:shadow-lg hover:shadow-[rgba(20,60,20,0.10)] dark:hover:shadow-[rgba(0,0,0,0.4)]
              hover:-translate-y-0.5 hover:border-[#6db86d] dark:hover:border-[#2d5a2d]"
          >
            <span
              className={`flex size-11 items-center justify-center rounded-xl ${bg}`}
            >
              <Icon className={`size-5 ${color}`} />
            </span>
            <div>
              <p className="font-bold text-[#1a2e1a] dark:text-[#c8ecc8]">
                {title}
              </p>
              <p className="text-sm text-[#5a7a5a] dark:text-[#6a9a6a] mt-1 leading-relaxed">
                {body}
              </p>
            </div>
            <span className="text-sm font-semibold text-[#1e4d2b] dark:text-[#4ade80] group-hover:underline">
              {action} →
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

// ─── 3. Main contact section
function ContactFormSection() {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", subject: "", message: "" },
  });

  const onSubmit = async (values: ContactValues) => {
    // TODO: wire to your API / email service
    await new Promise((r) => setTimeout(r, 1000));
    console.log(values);
    setSubmitted(true);
  };

  const contactDetails = [
    {
      icon: MapPinIcon,
      bg: "bg-[#d4edcc] dark:bg-[#1a3a1a]",
      color: "text-[#1e4d2b] dark:text-[#6ddc6d]",
      label: "Head Office",
      value: "123 Hostel Lane, Dhanmondi, Dhaka 1209, Bangladesh",
    },
    {
      icon: PhoneIcon,
      bg: "bg-emerald-100 dark:bg-emerald-900/30",
      color: "text-emerald-700 dark:text-emerald-400",
      label: "Phone / WhatsApp",
      value: "+880 1700-000000",
    },
    {
      icon: MailIcon,
      bg: "bg-blue-100 dark:bg-blue-900/30",
      color: "text-blue-700 dark:text-blue-400",
      label: "Email",
      value: "hello@hostelhub.com",
    },
    {
      icon: ClockIcon,
      bg: "bg-amber-100 dark:bg-amber-900/30",
      color: "text-amber-700 dark:text-amber-400",
      label: "Office Hours",
      value: "Sun – Thu, 9:00 AM – 6:00 PM BST",
    },
  ];

  const socials = [
    { icon: InstagramIcon, href: "#", label: "Instagram" },
    { icon: FacebookIcon, href: "#", label: "Facebook" },
    { icon: TwitterIcon, href: "#", label: "Twitter" },
    { icon: YoutubeIcon, href: "#", label: "YouTube" },
  ];

  return (
    <section
      id="contact-form"
      className="pb-20 sm:pb-28 bg-[#f0f7f0] dark:bg-[#0a150a]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
          {/* ── Left: info panel ── */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <div>
              <SectionBadge label="Contact Details" />
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1a2e1a] dark:text-[#c8ecc8]">
                All the ways to{" "}
                <span className="text-[#1e4d2b] dark:text-[#4ade80]">
                  reach us
                </span>
              </h2>
              <p className="mt-3 text-[#5a7a5a] dark:text-[#6a9a6a] text-sm leading-relaxed">
                Our support team responds within 2 hours on business days. For
                urgent matters, please call us directly.
              </p>
            </div>

            {/* contact detail list */}
            <div className="flex flex-col gap-4">
              {contactDetails.map(({ icon: Icon, bg, color, label, value }) => (
                <div
                  key={label}
                  className="flex items-start gap-4 p-4 rounded-xl border
                  bg-[#fafdf8] dark:bg-[#111f11]
                  border-[#c8ddc8] dark:border-[#1e3a1e]"
                >
                  <span
                    className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${bg}`}
                  >
                    <Icon className={`size-5 ${color}`} />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#7a9a7a] dark:text-[#567056]">
                      {label}
                    </p>
                    <p className="text-sm font-medium text-[#1a2e1a] dark:text-[#c8ecc8] mt-0.5">
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* socials */}
            <div className="pt-2 border-t border-[#c8ddc8] dark:border-[#1e3a1e]">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#7a9a7a] dark:text-[#567056] mb-3">
                Follow Us
              </p>
              <div className="flex items-center gap-2">
                {socials.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="flex size-9 items-center justify-center rounded-full border transition-colors
                      border-[#c8ddc8] dark:border-[#1e3a1e]
                      text-[#5a7a5a] dark:text-[#6a9a6a]
                      hover:text-[#1e4d2b] dark:hover:text-[#4ade80]
                      hover:border-[#6db86d] dark:hover:border-[#2d5a2d]
                      hover:bg-[#eef7ee] dark:hover:bg-[#162416]"
                  >
                    <Icon className="size-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* map placeholder */}
            <div className="rounded-2xl overflow-hidden border border-[#c8ddc8] dark:border-[#1e3a1e] h-48 relative bg-[#e4f2e4] dark:bg-[#1a3a1a] flex items-center justify-center">
              <div className="flex flex-col items-center gap-2 text-[#5a7a5a] dark:text-[#6a9a6a]">
                <MapPinIcon className="size-8 text-[#1e4d2b] dark:text-[#4ade80]" />
                <p className="text-sm font-medium">Dhanmondi, Dhaka</p>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-[#1e4d2b] dark:text-[#4ade80] hover:underline"
                >
                  Open in Google Maps →
                </a>
              </div>
            </div>
          </div>

          {/* ── Right: form ── */}
          <div className="lg:col-span-3">
            <div
              className="rounded-2xl border p-6 sm:p-8
              bg-[#fafdf8] dark:bg-[#111f11]
              border-[#c8ddc8] dark:border-[#1e3a1e]
              shadow-sm"
            >
              {submitted ? (
                // ── success state
                <div className="flex flex-col items-center justify-center gap-5 py-12 text-center">
                  <div className="flex size-16 items-center justify-center rounded-2xl bg-[#d4edcc] dark:bg-[#1a3a1a]">
                    <CheckCircleIcon className="size-8 text-[#1e4d2b] dark:text-[#4ade80]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1a2e1a] dark:text-[#c8ecc8]">
                      Message sent!
                    </h3>
                    <p className="text-sm text-[#5a7a5a] dark:text-[#6a9a6a] mt-2 max-w-sm">
                      Thanks for reaching out. We'll get back to you within 2
                      business hours.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      form.reset();
                    }}
                    className="text-sm font-semibold text-[#1e4d2b] dark:text-[#4ade80] hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-[#1a2e1a] dark:text-[#c8ecc8]">
                      Send us a message
                    </h2>
                    <p className="text-sm text-[#5a7a5a] dark:text-[#6a9a6a] mt-1">
                      Fill in the form and we'll respond promptly.
                    </p>
                  </div>

                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="flex flex-col gap-5"
                    >
                      {/* name + email row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <Label className={labelCls()}>
                                Full Name{" "}
                                <span className="text-red-500">*</span>
                              </Label>
                              <FormControl>
                                <Input
                                  placeholder="John Smith"
                                  className={inputCls()}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-xs" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <Label className={labelCls()}>
                                Email Address{" "}
                                <span className="text-red-500">*</span>
                              </Label>
                              <FormControl>
                                <Input
                                  placeholder="you@example.com"
                                  className={inputCls()}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-xs" />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* phone + subject row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <Label className={labelCls()}>
                                Phone (optional)
                              </Label>
                              <FormControl>
                                <Input
                                  placeholder="+880 1700-000000"
                                  className={inputCls()}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-xs" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="subject"
                          render={({ field }) => (
                            <FormItem>
                              <Label className={labelCls()}>
                                Subject <span className="text-red-500">*</span>
                              </Label>
                              <FormControl>
                                <div className="relative">
                                  <select
                                    {...field}
                                    className={`w-full appearance-none pr-9 ${inputCls()} px-3 cursor-pointer`}
                                  >
                                    <option value="">Select a topic…</option>
                                    <option value="booking">
                                      Room Booking
                                    </option>
                                    <option value="support">
                                      Guest Support
                                    </option>
                                    <option value="partnership">
                                      Partnership
                                    </option>
                                    <option value="feedback">Feedback</option>
                                    <option value="other">Other</option>
                                  </select>
                                  <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 size-4 text-[#7aaa7a] dark:text-[#4a7a4a]" />
                                </div>
                              </FormControl>
                              <FormMessage className="text-xs" />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* message */}
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <Label className={labelCls()}>
                              Your Message{" "}
                              <span className="text-red-500">*</span>
                            </Label>
                            <FormControl>
                              <Textarea
                                placeholder="Tell us how we can help…"
                                rows={5}
                                className={`resize-none rounded-xl text-sm
                                bg-[#edf7ed] dark:bg-[#141f14]
                                border-[#c0d8c0] dark:border-[#243424]
                                text-[#1a2e1a] dark:text-[#c8ecc8]
                                placeholder:text-[#8aaa8a] dark:placeholder:text-[#446044]
                                focus-visible:ring-1 focus-visible:ring-[#2d7a2d] dark:focus-visible:ring-[#4ade80]
                                focus-visible:ring-offset-0`}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />

                      {/* submit */}
                      <Button
                        type="submit"
                        size="lg"
                        disabled={form.formState.isSubmitting}
                        className="w-full rounded-xl font-semibold text-sm gap-2
                          bg-[#1e4d2b] hover:bg-[#245c32]
                          dark:bg-[#2d7040] dark:hover:bg-[#356a48]
                          shadow-md shadow-[rgba(20,70,30,0.25)]"
                      >
                        {form.formState.isSubmitting ? (
                          <>Sending…</>
                        ) : (
                          <>
                            <SendIcon className="size-4" /> Send Message
                          </>
                        )}
                      </Button>

                      <p className="text-xs text-center text-[#7a9a7a] dark:text-[#567056]">
                        We typically reply within{" "}
                        <span className="font-semibold text-[#1e4d2b] dark:text-[#4ade80]">
                          2 business hours
                        </span>
                        . No spam, ever.
                      </p>
                    </form>
                  </Form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── 4. Locations grid
function LocationsSection() {
  const locations = [
    { city: "Dhaka", area: "Dhanmondi", rooms: 40, phone: "+880 1700-000001" },
    { city: "Dhaka", area: "Mirpur", rooms: 30, phone: "+880 1700-000002" },
    {
      city: "Chittagong",
      area: "Agrabad",
      rooms: 25,
      phone: "+880 1700-000003",
    },
    {
      city: "Sylhet",
      area: "Zindabazar",
      rooms: 20,
      phone: "+880 1700-000004",
    },
    {
      city: "Rajshahi",
      area: "Shaheb Bazar",
      rooms: 18,
      phone: "+880 1700-000005",
    },
    {
      city: "Khulna",
      area: "KDA Avenue",
      rooms: 15,
      phone: "+880 1700-000006",
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#fafdf8] dark:bg-[#111f11]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <SectionBadge label="Our Locations" />
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1a2e1a] dark:text-[#c8ecc8]">
            Find us{" "}
            <span className="text-[#1e4d2b] dark:text-[#4ade80]">near you</span>
          </h2>
          <p className="mt-3 text-[#5a7a5a] dark:text-[#6a9a6a]">
            8 locations across Bangladesh — and growing.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {locations.map((loc) => (
            <div
              key={loc.city + loc.area}
              className="group flex items-start gap-4 p-5 rounded-2xl border transition-all
                bg-[#f0f7f0] dark:bg-[#0f1f0f]
                border-[#c8ddc8] dark:border-[#1e3a1e]
                hover:border-[#6db86d] dark:hover:border-[#2d5a2d]
                hover:bg-[#eef7ee] dark:hover:bg-[#162416]"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#d4edcc] dark:bg-[#1a3a1a] text-[#1e4d2b] dark:text-[#6ddc6d] group-hover:bg-[#1e4d2b] group-hover:text-white dark:group-hover:bg-[#2d7040] transition-colors">
                <BuildingIcon className="size-5" />
              </span>
              <div className="min-w-0">
                <p className="font-bold text-[#1a2e1a] dark:text-[#c8ecc8]">
                  {loc.city}
                </p>
                <p className="text-sm text-[#5a7a5a] dark:text-[#6a9a6a]">
                  {loc.area}
                </p>
                <div className="flex items-center gap-3 mt-2 flex-wrap">
                  <span className="inline-flex items-center gap-1 text-xs font-medium rounded-full px-2 py-0.5 bg-[#d4edcc] dark:bg-[#1a3a1a] text-[#1e4d2b] dark:text-[#6ddc6d]">
                    <BriefcaseIcon className="size-3" />
                    {loc.rooms} rooms
                  </span>
                  <a
                    href={`tel:${loc.phone}`}
                    className="text-xs text-[#5a7a5a] dark:text-[#6a9a6a] hover:text-[#1e4d2b] dark:hover:text-[#4ade80] flex items-center gap-1 transition-colors"
                  >
                    <PhoneIcon className="size-3" />
                    {loc.phone}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Page
export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#f0f7f0] dark:bg-[#0a150a]">
      <HeroStrip />
      <ContactTypeCards />
      <ContactFormSection />
      <LocationsSection />
    </div>
  );
}
