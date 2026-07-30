# iPS EdTech Platform — Architecture

## Overview

iPS is built on a **server-first, component-driven architecture** using Next.js 16 App Router. The architecture prioritizes type safety, performance, scalability, and maintainability. React Server Components (RSC) are the default rendering strategy, with Client Components used only where interactivity is required.

---

## Architecture Principles

1. **Server Components by Default**: All components render on the server unless they need browser APIs, event handlers, or state. This minimizes client-side JavaScript and maximizes performance.
2. **Composition over Inheritance**: UI is built by composing small, focused components. Each component has a single responsibility.
3. **Colocation**: Files that change together live together. Routes, components, styles, and tests are colocated by feature.
4. **Data Access at the Edge**: Data fetching happens as close to the consumer as possible — in Server Components, not in useEffect hooks.
5. **Unidirectional Data Flow**: Data flows down via props. Mutations flow up via Server Actions.
6. **Defensive Design**: All inputs are validated at the boundary. All errors are caught and displayed gracefully.

---

## Layer Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        PRESENTATION LAYER                           │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  App Router (app/)                                          │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │   │
│  │  │  Pages   │  │ Layouts  │  │  Loading │  │  Error   │   │   │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  Components (components/)                                    │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │   │
│  │  │    UI    │  │  Layout  │  │  Forms   │  │  Shared  │   │   │
│  │  │ Primitives│  │  Nav/Footer│  │  Inputs  │  │  Course  │   │   │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │   │
│  └─────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        APPLICATION LAYER                            │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  Route Handlers (app/api/)                                  │   │
│  │  REST endpoints for external integrations, mobile clients    │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  Server Actions (actions/)                                  │   │
│  │  Mutations called from Client Components                    │   │
│  │  Validate → Authorize → Execute → Revalidate                │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  Proxy / Middleware (proxy.ts)                              │   │
│  │  Auth checks, redirects, headers, rate limiting             │   │
│  └─────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         SERVICE LAYER                               │
│                                                                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐            │
│  │   Services   │  │  Validators  │  │   Email      │            │
│  │  (services/) │  │  (lib/val..) │  │  (lib/email) │            │
│  └──────────────┘  └──────────────┘  └──────────────┘            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐            │
│  │  File Upload │  │    Queue     │  │  Search      │            │
│  │  (services/) │  │  (services/) │  │  (services/) │            │
│  └──────────────┘  └──────────────┘  └──────────────┘            │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                          DATA LAYER                                 │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  Prisma ORM (prisma/)                                       │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │   │
│  │  │   Schema    │  │  Migrations  │  │    Seed     │     │   │
│  │  └──────────────┘  └──────────────┘  └──────────────┘     │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌──────────────────────┐  ┌──────────────────────┐               │
│  │     PostgreSQL       │  │   Redis (Cache)      │               │
│  │  Primary data store  │  │  Sessions, rate lim. │               │
│  └──────────────────────┘  └──────────────────────┘               │
│  ┌──────────────────────┐  ┌──────────────────────┐               │
│  │   S3 / MinIO         │  │   Queue (BullMQ)     │               │
│  │  File storage        │  │  Background jobs     │               │
│  └──────────────────────┘  └──────────────────────┘               │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Component Architecture

### Server Components vs Client Components

| Aspect | Server Component | Client Component |
|--------|-----------------|------------------|
| Rendering | Server-side only | Hydrated on client |
| Data fetching | Direct (async/await) | useEffect / SWR / React Query |
| State | None (read-only) | useState, useReducer |
| Effects | None | useEffect, useLayoutEffect |
| Browser APIs | None | Full access |
| Bundle size | Zero JS | Included in bundle |
| Event handlers | None | onClick, onSubmit, etc. |
| Interactivity | Static | Dynamic |

### Decision Flow

```
Is the component interactive?
├── Yes → Does it need state, effects, or browser APIs?
│   ├── Yes → Use Client Component ("use client")
│   └── No  → Can it be a Server Component with client children?
│       ├── Yes → Server Component wrapping Client Component
│       └── No  → Use Client Component
└── No  → Use Server Component
```

### Component Composition Pattern

```tsx
// Server Component (fetches data, no JS sent to client)
async function CoursePage({ params }: PageProps<'/courses/[courseId]'>) {
  const { courseId } = await params
  const course = await getCourse(courseId)
  
  return (
    <div>
      <CourseHeader course={course} />
      <CourseContent course={course} />
      <EnrollmentSection courseId={courseId} />
    </div>
  )
}

// Client Component (interactive, minimal JS)
'use client'
function EnrollmentSection({ courseId }: { courseId: string }) {
  const [enrolled, setEnrolled] = useState(false)
  
  return (
    <Button onClick={() => enroll(courseId)}>
      {enrolled ? 'Enrolled' : 'Enroll Now'}
    </Button>
  )
}
```

---

## Data Flow

### Data Fetching (Read)

```
Page/Layout (Server Component)
    │
    ├── async function getData() in the component itself
    │       │
    │       ├── Calls service layer (services/)
    │       │       │
    │       │       ├── Prisma query (database)
    │       │       └── Cache check (Redis, cacheLife/cacheTag)
    │       │
    │       └── Returns typed data
    │
    └── Passes data as props to child components
```

### Data Mutation (Write)

```
Client Component
    │
    ├── User action (click, submit)
    │       │
    │       ├── Calls Server Action (actions/)
    │       │       │
    │       │       ├── Validates input (Zod)
    │       │       ├── Authorizes user (Auth.js session)
    │       │       ├── Executes mutation (service layer)
    │       │       └── Revalidates cache (revalidateTag / updateTag)
    │       │
    │       └── Shows result (optimistic UI, toast, redirect)
```

### Server Action Pattern

```ts
'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

const CreateCourseSchema = z.object({
  title: z.string().min(3).max(200),
  description: z.string().min(10).max(5000),
  categoryId: z.string().uuid(),
})

export async function createCourse(formData: FormData) {
  // 1. Authenticate
  const session = await auth()
  if (!session?.user) throw new Error('Unauthorized')
  
  // 2. Authorize
  if (session.user.role !== 'EDUCATOR' && session.user.role !== 'ADMIN') {
    throw new Error('Forbidden')
  }
  
  // 3. Validate
  const data = CreateCourseSchema.parse({
    title: formData.get('title'),
    description: formData.get('description'),
    categoryId: formData.get('categoryId'),
  })
  
  // 4. Execute
  const course = await db.course.create({
    data: { ...data, educatorId: session.user.id },
  })
  
  // 5. Revalidate
  revalidateTag('courses', 'max')
  revalidateTag(`user-${session.user.id}-courses`, 'max')
  
  // 6. Return
  return { success: true, courseId: course.id }
}
```

---

## Caching Strategy

Next.js 16 provides a powerful caching system with `cacheLife` and `cacheTag`. We use a layered approach:

| Layer | Technology | Purpose | Duration |
|-------|-----------|---------|----------|
| Browser Cache | HTTP Cache-Control | Static assets, images | 1 year |
| CDN Cache | Cloudflare / AWS | Static pages, images | Varies |
| Next.js Data Cache | `cacheLife` + `cacheTag` | RSC data, API responses | Configurable |
| Redis Cache | Upstash / Valkey | Sessions, rate limits, queues | 1 hour–1 day |
| Database | PostgreSQL | Source of truth | Persistent |

### Cache Tag Strategy

```
Tag Naming Convention:
  courses          → All courses
  course-{id}      → Specific course
  user-{id}        → User data
  user-{id}-courses → User's courses
  category-{id}    → Category
  lesson-{id}      → Specific lesson
  enrollment-{id}  → Enrollment
```

### Cache Life Profiles

```ts
// lib/cache-profiles.ts
export const cacheProfiles = {
  // Stable content, rarely changes
  static: { stale: 86400, revalidate: 604800 }, // 1 day stale, 7 days revalidate
  
  // Course catalog, moderate change frequency
  standard: { stale: 3600, revalidate: 86400 }, // 1 hour stale, 1 day revalidate
  
  // User-specific data, changes frequently
  user: { stale: 300, revalidate: 3600 }, // 5 min stale, 1 hour revalidate
  
  // Real-time or near-real-time
  dynamic: { stale: 0, revalidate: 60 }, // No stale, revalidate every 60s
}
```

---

## Security Architecture

### Authentication & Authorization

```
User Request
    │
    ▼
proxy.ts (Next.js 16 proxy)
    │
    ├── Rate limiting check (Redis)
    ├── Session validation (Auth.js)
    ├── Role-based route protection
    └── Security headers (CSP, HSTS, etc.)
    │
    ▼
Page / Route Handler / Server Action
    │
    ├── Auth.js session check
    ├── Role verification
    └── Input validation (Zod)
```

### Security Measures

| Measure | Implementation |
|---------|---------------|
| Authentication | Auth.js v5 with multiple providers |
| Authorization | RBAC (Student, Educator, Admin) |
| Rate Limiting | Redis + Upstash |
| CSRF Protection | Built-in Next.js Server Actions |
| XSS Prevention | React's built-in escaping |
| SQL Injection | Prisma parameterized queries |
| Input Validation | Zod schemas at every boundary |
| File Upload | Virus scanning, type validation, size limits |
| HTTPS | Enforced at proxy/CDN level |
| Security Headers | CSP, HSTS, X-Frame-Options, X-Content-Type-Options |
| Session Management | HTTP-only cookies, secure flags |
| API Security | API keys for external integrations, rate limiting |

---

## Error Handling Strategy

### Error Boundaries

```
app/
├── error.tsx              # Global error boundary
├── (marketing)/error.tsx  # Marketing section errors
├── dashboard/error.tsx    # Dashboard errors
├── courses/error.tsx      # Course errors
└── admin/error.tsx        # Admin errors
```

### Error Types

| Type | Source | Handling |
|------|--------|----------|
| Validation Errors | Zod schemas | Return error messages to form |
| Authentication Errors | Auth.js | Redirect to login |
| Authorization Errors | Role check | Show 403 page |
| Not Found Errors | Database query | Show 404 page |
| Server Errors | Prisma/API | Show error boundary, log to Sentry |
| Network Errors | Client fetch | Show retry UI |

### Server Action Error Handling

```ts
'use server'

export async function action(formData: FormData) {
  try {
    // ... validate, authorize, execute
    return { success: true, data: result }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.flatten().fieldErrors }
    }
    if (error instanceof Error) {
      return { success: false, message: error.message }
    }
    return { success: false, message: 'An unexpected error occurred' }
  }
}
```

---

## Performance Targets

| Metric | Target | Measurement |
|--------|--------|-------------|
| Time to Interactive | < 2s | Lighthouse |
| First Contentful Paint | < 1s | Lighthouse |
| Largest Contentful Paint | < 2.5s | Lighthouse |
| Cumulative Layout Shift | < 0.1 | Lighthouse |
| First Input Delay | < 100ms | Lighthouse |
| Initial JS Bundle | < 200KB | bundle-analyzer |
| Lighthouse Performance | > 90 | Lighthouse CI |
| API Response Time (p95) | < 200ms | Sentry |
| Database Query Time (p95) | < 50ms | Prisma logging |
| Concurrent Users | 100,000+ | Load testing |

---

## Monitoring & Observability

| Tool | Purpose |
|------|---------|
| Sentry | Error tracking, performance monitoring |
| OpenTelemetry | Distributed tracing |
| PostHog / Plausible | Product analytics, user behavior |
| Prisma logging | Database query performance |
| Lighthouse CI | Performance regression detection |
| GitHub Actions | CI/CD pipeline health |
| Uptime monitoring | Service availability |

---

## Directory Structure (Detailed)

```
edtech-platform/
├── .github/
│   └── workflows/
│       ├── ci.yml              # Lint, type-check, test, build
│       └── deploy.yml          # Deploy to production
├── app/
│   ├── (marketing)/
│   │   ├── page.tsx            # Landing page
│   │   ├── layout.tsx          # Marketing layout
│   │   ├── pricing/page.tsx
│   │   ├── about/page.tsx
│   │   └── contact/page.tsx
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   ├── forgot-password/page.tsx
│   │   └── verify/page.tsx
│   ├── dashboard/
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   ├── courses/page.tsx
│   │   ├── analytics/page.tsx
│   │   └── settings/page.tsx
│   ├── courses/
│   │   ├── page.tsx            # Catalog
│   │   ├── [courseId]/
│   │   │   ├── page.tsx        # Course detail
│   │   │   ├── layout.tsx
│   │   │   ├── lessons/[lessonId]/page.tsx
│   │   │   └── quizzes/[quizId]/page.tsx
│   │   └── create/page.tsx     # Course creation
│   ├── admin/
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   ├── users/page.tsx
│   │   ├── courses/page.tsx
│   │   └── settings/page.tsx
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts
│   │   ├── courses/[courseId]/route.ts
│   │   ├── users/[userId]/route.ts
│   │   ├── uploads/route.ts
│   │   ├── webhooks/stripe/route.ts
│   │   └── health/route.ts
│   ├── layout.tsx              # Root layout
│   ├── proxy.ts                # Next.js 16 middleware
│   ├── error.tsx               # Global error boundary
│   ├── loading.tsx             # Global loading state
│   └── not-found.tsx           # 404 page
├── components/
│   ├── ui/                     # shadcn/ui primitives
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   └── ...
│   ├── layout/
│   │   ├── navbar.tsx
│   │   ├── sidebar.tsx
│   │   ├── footer.tsx
│   │   └── mobile-nav.tsx
│   ├── forms/
│   │   ├── login-form.tsx
│   │   ├── register-form.tsx
│   │   ├── course-form.tsx
│   │   └── ...
│   ├── courses/
│   │   ├── course-card.tsx
│   │   ├── course-header.tsx
│   │   ├── lesson-viewer.tsx
│   │   └── curriculum-sidebar.tsx
│   ├── dashboard/
│   │   ├── stats-card.tsx
│   │   ├── progress-chart.tsx
│   │   └── activity-feed.tsx
│   ├── admin/
│   │   ├── user-table.tsx
│   │   ├── course-table.tsx
│   │   └── analytics-chart.tsx
│   └── shared/
│       ├── loading-spinner.tsx
│       ├── empty-state.tsx
│       ├── error-state.tsx
│       └── confirmation-dialog.tsx
├── lib/
│   ├── utils.ts                # cn() helper
│   ├── db.ts                   # Prisma client singleton
│   ├── auth.ts                 # Auth.js configuration
│   ├── validations.ts          # Shared Zod schemas
│   ├── constants.ts            # App-wide constants
│   ├── email.ts                # Email utilities
│   ├── upload.ts               # File upload utilities
│   └── cache-profiles.ts       # cacheLife profiles
├── hooks/
│   ├── use-debounce.ts
│   ├── use-intersection-observer.ts
│   ├── use-media-query.ts
│   └── use-local-storage.ts
├── actions/
│   ├── auth.actions.ts
│   ├── course.actions.ts
│   ├── enrollment.actions.ts
│   ├── lesson.actions.ts
│   └── quiz.actions.ts
├── services/
│   ├── course.service.ts
│   ├── enrollment.service.ts
│   ├── lesson.service.ts
│   ├── quiz.service.ts
│   ├── notification.service.ts
│   ├── email.service.ts
│   ├── search.service.ts
│   └── payment.service.ts
├── types/
│   ├── index.ts                # Shared types
│   ├── course.ts
│   ├── user.ts
│   ├── lesson.ts
│   └── quiz.ts
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
├── docker/
│   ├── Dockerfile
│   ├── docker-compose.yml
│   └── .dockerignore
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── docs/
│   ├── PROJECT.md
│   ├── ROADMAP.md
│   ├── ARCHITECTURE.md
│   ├── CODING_STANDARDS.md
│   ├── UI_GUIDE.md
│   ├── DATABASE.md
│   ├── API_GUIDE.md
│   └── CHANGELOG.md
├── .env.example
├── .env.local
├── .gitignore
├── .prettierrc
├── next.config.ts
├── tsconfig.json
├── components.json
├── tailwind.config.ts          # Tailwind CSS v4 config
├── vitest.config.ts
├── playwright.config.ts
└── package.json
```

---

## Next.js 16 Specific Considerations

Based on the Next.js 16 upgrade guide, the following patterns are used:

1. **Async Request APIs**: `params`, `searchParams`, `cookies()`, `headers()` are all async and must be awaited.
2. **Turbopack by Default**: No need for `--turbopack` flag. Webpack configs will fail by default.
3. **Proxy replaces Middleware**: Use `proxy.ts` instead of `middleware.ts`. Export `proxy` function instead of `middleware`.
4. **Cache APIs**: `cacheLife` and `cacheTag` are stable (no `unstable_` prefix). `revalidateTag` requires a second argument (cache profile).
5. **updateTag**: New API for read-your-writes semantics in Server Actions.
6. **refresh**: New API from `next/cache` to refresh client router from Server Actions.
7. **React Compiler**: Stable support. Enable with `reactCompiler: true` in `next.config.ts`.
8. **View Transitions**: React 19.2's `<ViewTransition>` component for animating UI updates.
9. **Parallel Routes**: All slots require explicit `default.js` files.
10. **ESLint Flat Config**: Default format. Legacy `.eslintrc` is deprecated.