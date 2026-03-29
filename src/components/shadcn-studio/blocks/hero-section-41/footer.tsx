"use client";

import {
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  InstagramIcon,
  TwitterIcon,
  FacebookIcon,
  YoutubeIcon,
} from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

import BistroLogo from "@/assets/svg/bistro-logo";

type FooterLink = {
  label: string;
  href: string;
};

type FooterSection = {
  title: string;
  links: FooterLink[];
};

const footerSections: FooterSection[] = [
  {
    title: "Quick Links",
    links: [
      { label: "About Us", href: "#" },
      { label: "Testimonials", href: "#" },
      { label: "Offers & Deals", href: "#" },
      { label: "Contact Us", href: "#" },
      { label: "Careers", href: "#" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Book a Table", href: "#" },
      { label: "Room Reservation", href: "#" },
      { label: "Event Catering", href: "#" },
      { label: "Private Dining", href: "#" },
      { label: "Gift Cards", href: "#" },
    ],
  },
  {
    title: "Policies",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Refund Policy", href: "#" },
      { label: "Cookie Policy", href: "#" },
    ],
  },
];

const contactInfo = [
  {
    icon: MapPinIcon,
    label: "123 Gourmet Lane, Dhaka 1200, Bangladesh",
  },
  {
    icon: PhoneIcon,
    label: "+880 1700-000000",
  },
  {
    icon: MailIcon,
    label: "hello@bistro.com",
  },
];

const socials = [
  { icon: InstagramIcon, href: "#", label: "Instagram" },
  { icon: TwitterIcon, href: "#", label: "Twitter" },
  { icon: FacebookIcon, href: "#", label: "Facebook" },
  { icon: YoutubeIcon, href: "#", label: "YouTube" },
];

const Footer = ({ className }: { className?: string }) => {
  return (
    <footer className={cn("bg-background border-t", className)}>
      {/* Main Footer Body */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 w-fit">
              <BistroLogo />
              <span className="text-primary text-[20px] font-semibold">
                Bistro
              </span>
            </a>

            <p className="text-muted-foreground max-w-xs text-sm leading-relaxed">
              Where passion meets the plate. Crafted meals, warm rooms, and
              memories that linger — all under one roof.
            </p>

            {/* Contact Info */}
            <ul className="flex flex-col gap-3">
              {contactInfo.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-start gap-3">
                  <span className="bg-primary/10 text-primary mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full">
                    <Icon className="size-3.5" />
                  </span>
                  <span className="text-muted-foreground text-sm">{label}</span>
                </li>
              ))}
            </ul>

            {/* Socials */}
            <div className="flex items-center gap-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="border-border text-muted-foreground hover:text-primary hover:border-primary flex size-9 items-center justify-center rounded-full border transition-colors duration-200"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav Columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-3">
            {footerSections.map((section) => (
              <div key={section.title} className="flex flex-col gap-4">
                <p className="text-foreground text-sm font-semibold">
                  {section.title}
                </p>
                <ul className="flex flex-col gap-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-muted-foreground hover:text-primary text-sm transition-colors duration-200"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <Separator />
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 sm:flex-row sm:px-6 lg:px-8">
        <p className="text-muted-foreground text-xs">
          © {new Date().getFullYear()} Bistro. All rights reserved.
        </p>

        {/* Decorative pill */}
        <div className="border-border bg-primary/5 flex items-center gap-1.5 rounded-full border px-3 py-1">
          <span className="bg-primary size-1.5 rounded-full" />
          <span className="text-muted-foreground text-xs">
            Open today · 7 AM – 11 PM
          </span>
        </div>

        <p className="text-muted-foreground text-xs">
          Designed with <span className="text-primary">♥</span> in Dhaka
        </p>
      </div>
    </footer>
  );
};

export default Footer;
