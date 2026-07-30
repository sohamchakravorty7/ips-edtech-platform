# iPS EdTech Platform — Project Overview

## Vision

iPS is a next-generation educational technology platform designed to serve 100,000+ concurrent users. It provides a unified ecosystem for students, educators, and administrators to create, consume, and manage educational content at scale.

The platform supports:
- **Students**: Course enrollment, live classes, recorded lectures, assignments, quizzes, progress tracking, and peer collaboration.
- **Educators**: Course authoring, content management, student assessment, analytics, and communication tools.
- **Administrators**: User management, platform configuration, billing, reporting, and system monitoring.

---

## Current State (v0.1.0)

The repository is a **Next.js 16 bootstrapped project** with:

| Layer | Technology | Status |
|-------|-----------|--------|
| Framework | Next.js 16.2.12 (App Router) | Scaffolded |
| Language | TypeScript 5.x | Configured |
| Styling | Tailwind CSS v4 + shadcn/ui (base-nova) | Configured |
| Animations | Framer Motion 12.x | Installed |
| Icons | Lucide React | Installed |
| Theme | next-themes | Installed |
| Linting | ESLint 9 (flat config) | Configured |
| Fonts | Geist (via next/font) | Configured |
| Components | 1 shadcn/ui button | Scaffolded |
| Pages | 1 landing page (default CNA) | Scaffolded |
| Docs | 7 empty stub files | Placeholder |

**What is missing:**
- Database integration (PostgreSQL + Prisma)
- Authentication (Auth.js)
- API routes and server actions
- Middleware / proxy
- State management
- Testing (Vitest, Playwright)
- CI/CD pipeline
- Docker configuration
- Environment configuration
- Error boundaries
- Routing structure for an edtech platform
- All application components

---

## Target Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Client Layer                          │
│  Next.js App Router (RSC + Client Components)           │
│  Tailwind CSS v4 + shadcn/ui + Framer Motion           │
├─────────────────────────────────────────────────────────┤
│                    API Layer                             │
│  Route Handlers (REST) + Server Actions (Mutations)     │
│  Auth.js middleware                                     │
├─────────────────────────────────────────────────────────┤
│                    Service Layer                         │
│  Business logic, validation, email, file upload,        │
│  notifications, streaming, caching                      │
├─────────────────────────────────────────────────────────┤
│                    Data Layer                            │
│  Prisma ORM + PostgreSQL                                │
│  Redis (caching, sessions, queues)                      │
│  S3-compatible storage (files)                          │
├─────────────────────────────────────────────────────────┤
│                    Infrastructure                        │
│  Docker + Docker Compose                                │
│  GitHub Actions (CI/CD)                                 │
│  Vercel / AWS Deployment                                │
└─────────────────────────────────────────────────────────┘
```

---

## Tech Stack (Final)

| Category | Technology | Purpose |
|----------|-----------|---------|
| Framework | Next.js 16 (App Router) | Full-stack React framework |
| Language | TypeScript 5.x | Type safety |
| Styling | Tailwind CSS v4 | Utility-first CSS |
| UI Library | shadcn/ui (base-nova) | Component primitives |
| Animations | Framer Motion 12.x | Page transitions, micro-interactions |
| Icons | Lucide React | Icon set |
| Database | PostgreSQL 16 | Primary data store |
| ORM | Prisma | Type-safe database access |
| Auth | Auth.js v5 | Authentication & authorization |
| Caching | Redis (Upstash/Valkey) | Session store, rate limiting, cache |
| File Storage | S3-compatible (AWS S3 / MinIO) | Media assets |
| Queue | BullMQ / Redis | Background jobs |
| Search | PostgreSQL Full-Text / Meilisearch | Course & content search |
| Email | Resend / SendGrid | Transactional emails |
| Payments | Stripe / Razorpay | Subscriptions, billing |
| Testing | Vitest + Playwright | Unit, integration, E2E |
| CI/CD | GitHub Actions | Build, test, deploy |
| Containerization | Docker + Docker Compose | Local dev & production parity |
| Monitoring | Sentry + OpenTelemetry | Error tracking, observability |
| Analytics | PostHog / Plausible | Product analytics |

---

## Key Design Principles

1. **Server-First**: Leverage React Server Components by default. Minimize client-side JavaScript.
2. **Type Safety**: End-to-end TypeScript with shared types between client, server, and database.
3. **Composability**: Small, focused, reusable components. Composition over inheritance.
4. **Accessibility**: WCAG 2.1 AA compliance. All interactive elements must be keyboard-accessible and screen-reader-friendly.
5. **Performance**: Target < 2s Time-to-Interactive, < 100 Lighthouse Performance score, < 200KB initial JS bundle.
6. **Security**: OWASP Top 10 mitigation. CSRF protection, input sanitization, rate limiting, RBAC.
7. **Observability**: Structured logging, distributed tracing, error tracking, performance monitoring.
8. **Scalability**: Horizontal scaling capability. Stateless application servers. Caching at every layer.

---

## Route Structure

```
app/
├── (marketing)/          # Public marketing pages
│   ├── page.tsx          # Landing page
│   ├── pricing/          # Pricing page
│   ├── about/            # About us
│   └── contact/          # Contact form
├── (auth)/               # Authentication routes
│   ├── login/            # Login page
│   ├── register/         # Registration page
│   ├── forgot-password/  # Password reset
│   └── verify/           # Email verification
├── dashboard/            # Authenticated dashboard
│   ├── page.tsx          # User dashboard
│   ├── courses/          # Course list & management
│   ├── analytics/        # User analytics
│   └── settings/         # User settings
├── courses/              # Course browsing & learning
│   ├── page.tsx          # Course catalog
│   ├── [courseId]/       # Course details
│   │   ├── page.tsx      # Course overview
│   │   ├── lessons/      # Lesson content
│   │   └── quizzes/      # Quiz interface
│   └── create/           # Course creation (educators)
├── admin/                # Admin panel
│   ├── page.tsx          # Admin dashboard
│   ├── users/            # User management
│   ├── courses/          # Course moderation
│   ├── reports/          # System reports
│   └── settings/         # Platform settings
├── api/                  # API route handlers
│   ├── auth/             # Auth endpoints
│   ├── courses/          # Course CRUD
│   ├── users/            # User management
│   ├── uploads/          # File uploads
│   ├── webhooks/         # External webhooks
│   └── health/           # Health checks
├── layout.tsx            # Root layout
├── proxy.ts              # Edge middleware (Next.js 16)
├── error.tsx             # Global error boundary
├── loading.tsx           # Global loading state
└── not-found.tsx         # 404 page
```

---

## Milestones

| Milestone | Description | Target Sprints |
|-----------|-------------|---------------|
| M1: Foundation | Project setup, scaffolding, CI/CD, database, auth | 1–6 |
| M2: Core Features | Course management, content delivery, user profiles | 7–14 |
| M3: Learning Experience | Quizzes, assignments, progress tracking, analytics | 15–20 |
| M4: Collaboration | Discussions, messaging, live classes, groups | 21–26 |
| M5: Platform Maturity | Admin panel, billing, search, i18n, performance | 27–34 |
| M6: Scale & Polish | Load testing, security audit, accessibility, launch | 35–38 |

---

## Project Structure

```
edtech-platform/
├── .github/                  # GitHub Actions, templates
├── app/                      # Next.js App Router
│   ├── (marketing)/          # Public routes
│   ├── (auth)/               # Auth routes
│   ├── dashboard/            # Dashboard routes
│   ├── courses/              # Course routes
│   ├── admin/                # Admin routes
│   ├── api/                  # API route handlers
│   ├── layout.tsx            # Root layout
│   ├── proxy.ts              # Next.js 16 proxy/middleware
│   ├── error.tsx             # Error boundary
│   ├── loading.tsx           # Loading UI
│   └── not-found.tsx         # 404
├── components/               # React components
│   ├── ui/                   # shadcn/ui primitives
│   ├── layout/               # Layout components (Navbar, Sidebar, Footer)
│   ├── forms/                # Form components
│   ├── courses/              # Course-specific components
│   ├── dashboard/            # Dashboard components
│   ├── admin/                # Admin components
│   └── shared/               # Shared application components
├── lib/                      # Core utilities
│   ├── utils.ts              # cn() helper
│   ├── db.ts                 # Prisma client
│   ├── auth.ts               # Auth.js configuration
│   ├── validations.ts        # Zod schemas
│   ├── constants.ts          # App constants
│   └── email.ts              # Email utilities
├── hooks/                    # Custom React hooks
├── actions/                  # Server Actions
├── services/                 # Business logic layer
├── types/                    # Shared TypeScript types
├── prisma/                   # Prisma schema & migrations
│   ├── schema.prisma
│   └── seed.ts
├── public/                   # Static assets
├── docker/                   # Docker configuration
│   ├── Dockerfile
│   ├── docker-compose.yml
│   └── .dockerignore
├── tests/                    # Test files
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── docs/                     # Documentation
├── .env.example              # Environment variables template
├── next.config.ts            # Next.js configuration
├── tsconfig.json             # TypeScript configuration
├── tailwind.config.ts        # Tailwind CSS v4 config
├── components.json           # shadcn/ui configuration
└── package.json              # Dependencies