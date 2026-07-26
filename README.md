# Credit Counseling AI — Course Management Frontend

A modern, production-ready **Course Management System** built with **Next.js 16**, **TypeScript**, **Tailwind CSS**, **shadcn/ui**, and **TanStack Query**. Designed for online education platforms with dedicated dashboards for **Admins**, **Instructors**, and **Students**, providing a seamless learning experience.

---

# 🚀 Overview

**Credit Counseling AI** is a comprehensive Learning Management System (LMS) that enables educational institutions, organizations, and instructors to create, manage, and deliver online courses. The platform offers secure authentication, course enrollment, lesson management, student progress tracking, payment integration, and role-based dashboards.

---

# ✨ Features

## 🌐 General

* Modern responsive UI
* Dark / Light theme support
* Protected routes using Next.js 16
* Role-based dashboard
* Toast notifications with Sonner
* Form validation using Zod
* Fast data fetching with TanStack Query
* Optimized performance with Next.js App Router

---

## 🔐 Authentication

* Secure Login & Registration
* JWT Authentication
* Forgot Password
* Reset Password
* Email Verification
* Protected Routes
* Session Management

---

## 👨‍💼 Admin Dashboard

* Dashboard analytics
* User management
* Instructor management
* Student management
* Course approval & moderation
* Category management
* Revenue overview
* Enrollment statistics
* Platform settings
* Payment monitoring

---

## 👨‍🏫 Instructor Dashboard

* Create new courses
* Edit existing courses
* Upload course thumbnails
* Manage lessons
* Organize modules
* View enrolled students
* Course analytics
* Earnings overview
* Publish / Unpublish courses

---

## 🎓 Student Dashboard

* Browse available courses
* Course enrollment
* Continue learning
* Lesson progress tracking
* Completed courses
* Wishlist (optional)
* Certificates (if available)
* Payment history
* Profile management

---

## 📚 Course Management

* Create courses
* Update course information
* Delete courses
* Course categories
* Course search
* Course filtering
* Featured courses
* Popular courses
* Course ratings & reviews

---

## 🎥 Lesson Management

* Video lessons
* Course modules
* Learning resources
* Downloadable materials
* Lesson ordering
* Free preview lessons

---

## 📈 Learning Progress

* Lesson completion
* Progress percentage
* Continue where you left off
* Learning history
* Course completion tracking

---

## 💳 Payment System

* Secure checkout
* Payment history
* Transaction tracking
* Enrollment after payment
* Invoice support

---

## 🔔 Notifications

* Enrollment notifications
* Course updates
* New lesson alerts
* Payment confirmations

---

# 📁 Project Structure

```text
course-management-frontend/
├── src/
│
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   ├── forgot-password/page.tsx
│   │   └── reset-password/page.tsx
│   │
│   ├── (admin)/
│   │   └── admin/
│   │       ├── dashboard/
│   │       ├── users/
│   │       ├── instructors/
│   │       ├── students/
│   │       ├── courses/
│   │       ├── categories/
│   │       ├── enrollments/
│   │       ├── payments/
│   │       └── settings/
│   │
│   ├── (instructor)/
│   │   └── instructor/
│   │       ├── dashboard/
│   │       ├── my-courses/
│   │       ├── create-course/
│   │       ├── lessons/
│   │       ├── students/
│   │       └── earnings/
│   │
│   ├── (student)/
│   │   └── student/
│   │       ├── dashboard/
│   │       ├── my-courses/
│   │       ├── course-progress/
│   │       ├── certificates/
│   │       ├── payments/
│   │       └── profile/
│   │
│   ├── courses/
│   ├── categories/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── components/
│   ├── ui/
│   ├── layout/
│   ├── dashboard/
│   ├── course/
│   ├── lesson/
│   ├── forms/
│   └── shared/
│
├── hooks/
├── lib/
│   ├── axios.ts
│   ├── auth.ts
│   ├── queryClient.ts
│   └── utils.ts
│
├── providers/
│   └── QueryProvider.tsx
│
├── schemas/
├── services/
├── store/
├── types/
├── public/
├── proxy.ts
├── next.config.ts
├── tsconfig.json
└── package.json
```

---

# 🛠 Tech Stack

* **Framework:** Next.js 16
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **UI Components:** shadcn/ui
* **State Management:** Zustand
* **Data Fetching:** TanStack Query
* **HTTP Client:** Axios
* **Validation:** Zod
* **Authentication:** JWT / Better Auth / NextAuth
* **Charts:** Recharts
* **Icons:** Lucide React

---

# ⚙️ Installation

```bash
# Clone Repository
git clone https://github.com/abusaiyedjoy/Credit-Counseling-AI.git

cd Credit-Counseling-AI

# Install Dependencies
npm install

# Copy Environment Variables
cp .env.example .env.local

# Run Development Server
npm run dev
```

Open:

```text
http://localhost:3000
```

---

# 🌐 Live Website

**https://creditcounselingai.org/**

---

# 📦 Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1

NEXTAUTH_URL=http://localhost:3000

NEXTAUTH_SECRET=your_secret

JWT_SECRET=your_secret
```

---

# 📊 Main Modules

* Authentication
* Dashboard
* Users
* Instructors
* Students
* Courses
* Lessons
* Categories
* Enrollments
* Payments
* Certificates
* Settings

---

# 🚀 Deployment

Deploy easily on:

* Vercel
* Netlify
* Railway
* Render
* AWS
* Docker

---

# 👨‍💻 Author

**Abu Saiyed Joy**

* GitHub: https://github.com/abusaiyedjoy
* Portfolio: https://abusaiyedjoy.vercel.app
* Live Website: https://creditcounselingai.org/

---

<div align="center">

Built with ❤️ using **Next.js 16**, **TypeScript**, **Tailwind CSS**, **shadcn/ui**, **TanStack Query**, and **Axios**

</div>
