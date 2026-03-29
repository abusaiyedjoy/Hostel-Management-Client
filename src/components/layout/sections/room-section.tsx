"use client";

import { useState } from "react";
import {
  BedDoubleIcon,
  BedSingleIcon,
  UsersIcon,
  WifiIcon,
  AirVentIcon,
  TvIcon,
  ArrowRightIcon,
  StarIcon,
  CheckIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const tabs = ["All Rooms", "Single", "Double", "Dormitory"] as const;
type Tab = (typeof tabs)[number];

const rooms = [
  {
    id: 1,
    type: "Single" as Tab,
    name: "Standard Single",
    price: 25,
    rating: 4.7,
    reviews: 128,
    tag: "Best Value",
    tagColor: "bg-emerald-100 text-emerald-700",
    img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80",
    amenities: ["Wi-Fi", "AC", "TV"],
    capacity: 1,
    size: "14 m²",
    available: 8,
  },
  {
    id: 2,
    type: "Double" as Tab,
    name: "Deluxe Double",
    price: 45,
    rating: 4.9,
    reviews: 94,
    tag: "Most Popular",
    tagColor: "bg-primary/10 text-primary",
    img: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&q=80",
    amenities: ["Wi-Fi", "AC", "TV"],
    capacity: 2,
    size: "22 m²",
    available: 4,
  },
  {
    id: 3,
    type: "Dormitory" as Tab,
    name: "Mixed Dorm (6-Bed)",
    price: 12,
    rating: 4.5,
    reviews: 211,
    tag: "Budget Pick",
    tagColor: "bg-amber-100 text-amber-700",
    img: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&q=80",
    amenities: ["Wi-Fi", "AC", "Locker"],
    capacity: 6,
    size: "40 m²",
    available: 12,
  },
  {
    id: 4,
    type: "Single" as Tab,
    name: "Premium Single",
    price: 35,
    rating: 4.8,
    reviews: 76,
    tag: "",
    tagColor: "",
    img: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600&q=80",
    amenities: ["Wi-Fi", "AC", "TV"],
    capacity: 1,
    size: "18 m²",
    available: 3,
  },
  {
    id: 5,
    type: "Double" as Tab,
    name: "Twin Room",
    price: 40,
    rating: 4.6,
    reviews: 58,
    tag: "New",
    tagColor: "bg-blue-100 text-blue-700",
    img: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600&q=80",
    amenities: ["Wi-Fi", "AC", "TV"],
    capacity: 2,
    size: "20 m²",
    available: 6,
  },
  {
    id: 6,
    type: "Dormitory" as Tab,
    name: "Female Dorm (4-Bed)",
    price: 14,
    rating: 4.8,
    reviews: 163,
    tag: "Ladies Only",
    tagColor: "bg-pink-100 text-pink-700",
    img: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600&q=80",
    amenities: ["Wi-Fi", "AC", "Locker"],
    capacity: 4,
    size: "32 m²",
    available: 5,
  },
];

const amenityIcons: Record<string, React.ElementType> = {
  "Wi-Fi": WifiIcon,
  AC: AirVentIcon,
  TV: TvIcon,
  Locker: CheckIcon,
};

const RoomsSection = () => {
  const [active, setActive] = useState<Tab>("All Rooms");

  const filtered =
    active === "All Rooms" ? rooms : rooms.filter((r) => r.type === active);

  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary mb-4">
              <span className="size-1.5 rounded-full bg-primary" />
              Our Rooms
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight">
              Find your perfect <span className="text-primary">room type</span>
            </h2>
            <p className="mt-3 text-muted-foreground">
              From budget-friendly dorms to private doubles — every room comes
              with clean linen, free Wi-Fi, and our signature hospitality.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-2 flex-wrap">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
                  active === tab
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-background border border-border text-muted-foreground hover:text-foreground hover:border-primary/40",
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Room Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((room) => (
            <div
              key={room.id}
              className="group relative flex flex-col rounded-2xl border border-border bg-card overflow-hidden hover:shadow-xl hover:shadow-primary/8 hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={room.img}
                  alt={room.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Availability pill */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-foreground">
                  <span className="size-1.5 rounded-full bg-emerald-500" />
                  {room.available} available
                </div>
                {/* Tag */}
                {room.tag && (
                  <span
                    className={cn(
                      "absolute top-3 right-3 rounded-full px-3 py-1 text-xs font-semibold",
                      room.tagColor,
                    )}
                  >
                    {room.tag}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-5 gap-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-foreground text-base leading-tight">
                    {room.name}
                  </h3>
                  <div className="flex items-center gap-1 shrink-0">
                    <StarIcon className="size-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-semibold text-foreground">
                      {room.rating}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      ({room.reviews})
                    </span>
                  </div>
                </div>

                {/* Meta row */}
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    {room.capacity === 1 ? (
                      <BedSingleIcon className="size-3.5" />
                    ) : room.capacity <= 2 ? (
                      <BedDoubleIcon className="size-3.5" />
                    ) : (
                      <UsersIcon className="size-3.5" />
                    )}
                    {room.capacity === 1
                      ? "Single occupancy"
                      : room.capacity === 2
                        ? "Double occupancy"
                        : `${room.capacity} guests`}
                  </span>
                  <span className="w-px h-3 bg-border" />
                  <span>{room.size}</span>
                </div>

                {/* Amenity chips */}
                <div className="flex items-center gap-2 flex-wrap">
                  {room.amenities.map((a) => {
                    const Icon = amenityIcons[a] ?? CheckIcon;
                    return (
                      <span
                        key={a}
                        className="flex items-center gap-1.5 rounded-full border border-border bg-muted/40 px-2.5 py-1 text-xs text-muted-foreground"
                      >
                        <Icon className="size-3" />
                        {a}
                      </span>
                    );
                  })}
                </div>

                {/* Price + CTA */}
                <div className="mt-auto flex items-center justify-between pt-3 border-t border-border">
                  <div>
                    <span className="text-xl font-bold text-foreground">
                      ${room.price}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {" "}
                      / night
                    </span>
                  </div>
                  <Button size="sm" className="rounded-full group/btn" asChild>
                    <a href="#">
                      Book now
                      <ArrowRightIcon className="size-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View all */}
        <div className="mt-10 flex justify-center">
          <Button variant="outline" size="lg" className="rounded-full" asChild>
            <a href="#">View all rooms</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RoomsSection;
