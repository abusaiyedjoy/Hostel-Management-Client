# StayNest — Hostel & Mess Management Frontend

A production-grade, full-featured hostel and mess management system built with **Next.js 16**, **TypeScript**, **shadcn/ui**, and **Tailwind CSS**. Supports real-time updates via **Socket.io** and integrated **bKash** payment processing.

---

## Overview

StayNest is a multi-role hostel management platform that handles the full lifecycle of a shared hostel/mess — from member onboarding and daily meal tracking to monthly billing and bKash payment collection. The system supports four distinct user roles, each with a dedicated dashboard and access controls enforced at both the route and UI level.

---

## Features

### General

- System default theme (auto dark/light) with manual toggle
- Fully responsive layout with collapsible sidebar
- Real-time notifications via Socket.io
- Role-based route protection via Next.js 16 `proxy.ts`
- Toast notifications (Sonner) for all user actions
- Live connection status indicator (Socket.io)

### Admin

- Full member management — add, edit, deactivate, view profiles
- Assign and remove mess/meal manager roles
- View and manage all meal entries across all members
- Update meal rate (per-meal pricing)
- View all payments — filter by status, export CSV
- Monthly revenue dashboard with charts
- System settings — hostel info, meal times, bKash credentials

### Mess Manager

- Overview dashboard with today's meal breakdown
- Manage and monitor meal managers under their supervision
- View all meal entries with filter by manager
- Update meal rate
- Generate monthly reports with per-member cost breakdown

### Meal Manager

- Quick-action dashboard with pending member alerts
- Add meal entries per member with toggle UI (Breakfast / Lunch / Dinner)
- Edit and delete meal entries
- View all members with today's meal status

### Member

- Personal dashboard with due amount alert
- Monthly meal history — daily B/L/D breakdown with cost
- Month navigator to view past months
- bKash payment modal — full 4-step flow (confirm → processing → redirect → success)
- Full payment history with transaction IDs

---

## Project Structure

```
hostel-management-frontend/
├── src/
│   ├── app/
│   │   ├── (auth)/                     # Public auth pages (no sidebar)
│   │   │   ├── layout.tsx              # Centered card layout with background
│   │   │   ├── login/page.tsx          # Login with role hints
│   │   │   └── register/page.tsx       # Register with password strength meter
│   │   │
│   │   ├── (admin)/                    # Route group — layout only
│   │   │   └── admin/                  # Actual URL prefix /admin/*
│   │   │       ├── layout.tsx          # Admin layout (auth guard + sidebar)
│   │   │       ├── dashboard/page.tsx  # Stats, chart, activity, top members
│   │   │       ├── members/page.tsx    # Member table with search + filter
│   │   │       ├── managers/page.tsx   # Assign/manage mess & meal managers
│   │   │       ├── meals/page.tsx      # All meals + rate management
│   │   │       ├── payments/page.tsx   # All payments + summary cards
│   │   │       └── settings/page.tsx   # Hostel, meal, bKash settings
│   │   │
│   │   ├── (mess-manager)/
│   │   │   └── mess/                   # URL prefix /mess/*
│   │   │       ├── layout.tsx
│   │   │       ├── dashboard/page.tsx  # Stats + today's breakdown + manager table
│   │   │       ├── meal-managers/page.tsx
│   │   │       ├── meals/page.tsx      # Filter by manager
│   │   │       └── reports/page.tsx    # Monthly per-member report
│   │   │
│   │   ├── (meal-manager)/
│   │   │   └── meal/                   # URL prefix /meal/*
│   │   │       ├── layout.tsx
│   │   │       ├── dashboard/page.tsx  # CTA banner + pending count
│   │   │       ├── meals/
│   │   │       │   ├── page.tsx        # Meal list with edit/delete
│   │   │       │   └── add/page.tsx    # Meal toggle form
│   │   │       └── members/page.tsx    # Members with today's status
│   │   │
│   │   ├── (member)/
│   │   │   └── member/                 # URL prefix /member/*
│   │   │       ├── layout.tsx
│   │   │       ├── dashboard/page.tsx  # Due alert + stats + history
│   │   │       ├── my-meals/page.tsx   # Full meal history + month navigator
│   │   │       └── payments/page.tsx   # bKash payment modal + history
│   │   │
│   │   ├── api/auth/[...nextauth]/
│   │   │   └── route.ts                # NextAuth route handler
│   │   ├── globals.css                 # CSS variables, fonts, utilities
│   │   ├── layout.tsx                  # Root layout — providers, Sonner
│   │   └── page.tsx                    # Root redirect based on role
│   │
│   ├── components/
│   │   ├── ui/                         # shadcn/ui auto-generated components
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx             # Collapsible, role-aware nav
│   │   │   └── Navbar.tsx              # Socket status, notifications, theme
│   │   └── dashboard/
│   │       ├── StatsCard.tsx           # Metric card with trend arrows
│   │       └── MealCostChart.tsx       # Recharts dual-axis bar chart
│   │
│   ├── hooks/                          # (add custom hooks here)
│   │
│   ├── lib/
│   │   ├── auth.ts                     # NextAuth v5 config + callbacks
│   │   ├── axios.ts                    # Axios instance + JWT interceptor
│   │   ├── socket.ts                   # Socket.io singleton + event constants
│   │   ├── queryClient.ts              # TanStack Query client config
│   │   └── utils.ts                    # cn(), formatCurrency, getRolePath, etc.
│   │
│   ├── providers/
│   │   ├── QueryProvider.tsx           # TanStack Query provider wrapper
│   │   └── SocketProvider.tsx          # Socket.io context + event handlers
│   │
│   ├── schemas/
│   │   ├── auth.schema.ts              # Zod: loginSchema, registerSchema
│   │   └── meal.schema.ts              # Zod: addMealSchema, mealRateSchema
│   │
│   ├── services/
│   │   └── auth.service.ts             # Axios-based auth API calls
│   │
│   ├── store/
│   │   ├── authStore.ts                # Zustand: user, token, role (persisted)
│   │   └── notificationStore.ts        # Zustand: notification queue
│   │
│   ├── types/
│   │   ├── auth.types.ts               # User, Role, Session, AuthResponse
│   │   ├── meal.types.ts               # Meal, MealRate, MealSummary
│   │   ├── member.types.ts             # Member, MemberStats
│   │   └── payment.types.ts            # Payment, BkashInitResponse
│   │
│   └── proxy.ts                        # Next.js 16 route guard (replaces middleware.ts)
│
├── public/
├── .env.local.example
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/abusaiyedjoy/StayNest.git
cd StayNest

# 2. Install dependencies
npm install

# 3. Install shadcn/ui components
npx shadcn@latest init
npx shadcn@latest add button input label card table badge dialog sheet \
  tabs select form dropdown-menu avatar separator skeleton toast sonner

# 4. Set up environment variables
cp .env.local.example .env.local
# Fill in your values (see Environment Variables section)

# 5. Start development server (Turbopack)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

<div align="center">
  Built with Next.js 16 · TypeScript · shadcn/ui · TanStack Query · Socket.io · bKash
</div>
