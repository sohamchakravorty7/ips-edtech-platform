# iPS EdTech Platform — Coding Standards

## Overview

This document defines the coding standards, conventions, and best practices for the iPS EdTech Platform. All code must adhere to these standards to ensure consistency, maintainability, and quality.

---

## TypeScript Standards

### Configuration

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "exactOptionalPropertyTypes": false,
    "forceConsistentCasingInFileNames": true
  }
}
```

### Naming Conventions

| Construct | Convention | Example |
|-----------|-----------|---------|
| Interfaces | PascalCase, `I` prefix optional | `UserProfile`, `ICourse` |
| Types | PascalCase | `CourseStatus`, `UserRole` |
| Enums | PascalCase, singular | `UserRole`, `LessonType` |
| Functions | camelCase | `getUserById()` |
| Variables | camelCase | `courseList`, `isEnrolled` |
| Constants | UPPER_SNAKE_CASE | `MAX_FILE_SIZE`, `API_VERSION` |
| Files | kebab-case | `course-card.tsx`, `api-guide.md` |
| Components | PascalCase | `CourseCard`, `LessonViewer` |
| Directories | kebab-case | `course-detail/`, `shared/` |
| Server Actions | camelCase, `.actions.ts` | `createCourseAction` |
| Services | camelCase, `.service.ts` | `courseService` |

### Type Definitions

```ts
// Prefer interfaces for objects that can be extended
interface User {
  id: string
  email: string
  name: string | null
  role: UserRole
}

// Prefer type aliases for unions, intersections, and primitives
type UserRole = 'STUDENT' | 'EDUCATOR' | 'ADMIN'
type CourseStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
type ApiResponse<T> = { success: true; data: T } | { success: false; error: string }

// Use generics for reusable types
interface PaginatedResult<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}
```

### Strict Null Checks

```ts
// ❌ Bad
function getName(user: User) {
  return user.name.toUpperCase() // Might crash if name is null
}

// ✅ Good
function getName(user: User): string {
  return user.name?.toUpperCase() ?? 'Anonymous'
}
```

---

## React & Next.js Standards

### Component Structure

```tsx
// Server Component (default)
import { type PageProps } from 'next'
import { getCourse } from '@/services/course.service'

interface CoursePageProps {
  courseId: string
}

export default async function CoursePage({ params }: PageProps<'/courses/[courseId]'>) {
  const { courseId } = await params
  const course = await getCourse(courseId)
  
  return (
    <section>
      <CourseHeader course={course} />
      <CourseContent course={course} />
    </section>
  )
}
```

```tsx
// Client Component (when interactivity is needed)
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { enrollCourse } from '@/actions/enrollment.actions'

interface EnrollButtonProps {
  courseId: string
  isEnrolled: boolean
}

export function EnrollButton({ courseId, isEnrolled: initial }: EnrollButtonProps) {
  const [isEnrolled, setIsEnrolled] = useState(initial)
  const [isPending, setIsPending] = useState(false)
  
  async function handleEnroll() {
    setIsPending(true)
    const result = await enrollCourse(courseId)
    if (result.success) {
      setIsEnrolled(true)
    }
    setIsPending(false)
  }
  
  return (
    <Button onClick={handleEnroll} disabled={isPending}>
      {isEnrolled ? 'Enrolled' : 'Enroll Now'}
    </Button>
  )
}
```

### Component Rules

1. **Default to Server Components**: Only add `'use client'` when you need browser APIs, event handlers, state, or effects.
2. **One component per file**: Except for small, tightly coupled components (e.g., `Label` + `Input`).
3. **Named exports for non-page components**: Use `export function` not `export default function` for reusable components.
4. **Props interface**: Define an interface above the component. Use `interface` over `type` for props.
5. **No inline styles**: Use Tailwind CSS classes. For dynamic styles, use `cn()` utility.
6. **No `useEffect` for data fetching**: Use Server Components or React Query/SWR on the client.

### Server Actions

```ts
'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

// 1. Define schema at the top
const CreateCourseSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10).max(5000),
})

// 2. Export named function
export async function createCourse(formData: FormData) {
  // 3. Authenticate first
  const session = await auth()
  if (!session?.user) throw new Error('Unauthorized')
  
  // 4. Validate input
  const parsed = CreateCourseSchema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors }
  }
  
  // 5. Execute mutation
  const course = await db.course.create({
    data: { ...parsed.data, educatorId: session.user.id },
  })
  
  // 6. Revalidate cache
  revalidateTag('courses', 'max')
  
  // 7. Return result
  return { success: true, data: course }
}
```

---

## Styling Standards

### Tailwind CSS v4

- Use Tailwind utility classes exclusively. No CSS-in-JS or inline styles.
- Use the `cn()` utility for conditional classes.
- Follow the shadcn/ui theming system for colors and design tokens.
- Use `@apply` only in rare cases, prefer utility classes directly in JSX.

```tsx
// ✅ Good
<div className={cn(
  "flex items-center gap-4 rounded-lg border p-4",
  isActive && "bg-primary/10 border-primary"
)}>

// ❌ Bad
<div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
```

### CSS Custom Properties

```css
/* Use CSS variables for dynamic theming */
:root {
  --color-primary: oklch(0.205 0 0);
  --color-primary-foreground: oklch(0.985 0 0);
}
```

---

## File Organization

### Feature-Based Colocation

```
components/
├── courses/
│   ├── course-card.tsx
│   ├── course-card.test.tsx    # Test file colocated with component
│   ├── course-header.tsx
│   └── course-list.tsx
```

### Import Order

```ts
// 1. External libraries (alphabetical)
import { auth } from '@/lib/auth'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

// 2. Internal modules (alphabetical by path)
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { createCourse } from '@/actions/course.actions'

// 3. Types
import type { Course, CourseStatus } from '@/types/course'
```

### Directory Naming

```
✅ kebab-case:  course-detail, lesson-viewer, auth-provider
❌ camelCase:   courseDetail, lessonViewer
❌ PascalCase:  CourseDetail, LessonViewer
❌ snake_case:  course_detail, lesson_viewer
```

---

## Testing Standards

### Unit Tests (Vitest)

```ts
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CourseCard } from './course-card'

describe('CourseCard', () => {
  it('renders course title', () => {
    render(<CourseCard title="React 101" />)
    expect(screen.getByText('React 101')).toBeDefined()
  })
  
  it('shows enrollment count', () => {
    render(<CourseCard title="React 101" enrolledCount={42} />)
    expect(screen.getByText('42 students')).toBeDefined()
  })
})
```

### E2E Tests (Playwright)

```ts
import { test, expect } from '@playwright/test'

test('user can enroll in a course', async ({ page }) => {
  await page.goto('/courses/react-101')
  await page.click('text=Enroll Now')
  await expect(page.locator('text=You are enrolled')).toBeVisible()
})
```

### Coverage Requirements

- Unit tests: 80%+ coverage for utilities, services, hooks
- Integration tests: Every API route and Server Action
- E2E tests: All critical user flows (auth, enrollment, learning)

---

## Git & Commit Standards

### Branch Naming

```
feature/description     → feature/course-enrollment
fix/description         → fix/login-error-handling
refactor/description    → refactor/authentication-flow
docs/description        → docs/api-documentation
chore/description       → chore/update-dependencies
```

### Commit Messages

```
type(scope): description

Types:
  feat:     New feature
  fix:      Bug fix
  refactor: Code restructuring
  docs:     Documentation changes
  test:     Test additions/changes
  chore:    Build, CI, dependencies
  style:    Formatting, styling

Examples:
  feat(courses): add course creation wizard
  fix(auth): handle expired tokens gracefully
  refactor(api): extract validation middleware
  docs(api): document course endpoints
```

### Pull Request Standards

- PR title must follow conventional commit format
- Description must include: what, why, how to test
- Must pass CI (lint, type-check, test, build)
- Must have at least one reviewer
- Must include screenshots for UI changes

---

## Accessibility Standards

### WCAG 2.1 AA Compliance

```tsx
// ✅ Accessible button
<Button
  aria-label="Enroll in course"
  aria-describedby="course-price"
  disabled={isEnrolled}
>
  {isEnrolled ? 'Enrolled' : 'Enroll Now'}
</Button>

// ✅ Accessible form
<form onSubmit={handleSubmit} aria-label="Course creation form">
  <label htmlFor="title">Course Title</label>
  <Input id="title" name="title" aria-required="true" />
  {errors.title && <p role="alert">{errors.title}</p>}
</form>
```

### Requirements

- All images must have `alt` text
- All interactive elements must be keyboard accessible
- Use semantic HTML (`<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`)
- Color contrast ratio must be at least 4.5:1 for normal text
- Focus indicators must be visible
- Error messages must be connected to inputs via `aria-describedby` or `aria-errormessage`
- Live regions (`aria-live`) for dynamic content updates

---

## Error Handling Patterns

### Server Components

```tsx
export default async function CoursePage({ params }: PageProps<'/courses/[courseId]'>) {
  const { courseId } = await params
  
  try {
    const course = await getCourse(courseId)
    return <CourseDetail course={course} />
  } catch (error) {
    if (error instanceof NotFoundError) {
      notFound()
    }
    throw error // Caught by error.tsx
  }
}
```

### Client Components

```tsx
'use client'

function EnrollButton({ courseId }: { courseId: string }) {
  const [error, setError] = useState<string | null>(null)
  
  async function handleEnroll() {
    try {
      setError(null)
      const result = await enrollCourse(courseId)
      if (!result.success) {
        setError(result.error ?? 'Something went wrong')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    }
  }
  
  return (
    <div>
      {error && <p className="text-destructive text-sm" role="alert">{error}</p>}
      <Button onClick={handleEnroll}>Enroll</Button>
    </div>
  )
}
```

---

## Performance Standards

### Bundle Size

- No component should import more than 50KB (gzipped) of JS
- Use dynamic imports for heavy components
- Lazy load images below the fold
- Avoid importing entire libraries (import specific functions)

### Data Fetching

```ts
// ✅ Good: Deduplicated requests with cache
async function getCourse(id: string) {
  'use cache'
  return db.course.findUnique({ where: { id } })
}

// ❌ Bad: Separate requests in different components
```

### Image Optimization

```tsx
// ✅ Always use next/image with explicit dimensions
<Image
  src={course.thumbnail}
  alt={course.title}
  width={640}
  height={360}
  priority={isAboveFold}
  loading={isAboveFold ? undefined : 'lazy'}
/>
```

---

## Documentation Standards

### JSDoc for Public APIs

```ts
/**
 * Fetches a course by its ID, including lessons and educator info.
 * 
 * @param id - The course UUID
 * @returns The course with nested relations
 * @throws {NotFoundError} If course doesn't exist
 * @throws {UnauthorizedError} If user doesn't have access
 * 
 * @example
 * const course = await getCourse('uuid-here')
 */
export async function getCourse(id: string): Promise<CourseWithRelations> {
  // ...
}
```

### Component Documentation

```tsx
/**
 * CourseCard displays a preview of a course in the catalog.
 * 
 * @example
 * <CourseCard
 *   course={course}
 *   variant="compact"
 *   onEnroll={() => handleEnroll(course.id)}
 * />
 */
interface CourseCardProps {
  course: CoursePreview
  variant?: 'compact' | 'detailed'
  onEnroll?: (courseId: string) => void
}
```

---

## Environment Variables

```bash
# .env.example

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/ips_edtech

# Auth.js
AUTH_SECRET=your-secret-key
AUTH_URL=http://localhost:3000
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=

# Redis
REDIS_URL=redis://localhost:6379

# S3 / MinIO
S3_ENDPOINT=http://localhost:9000
S3_REGION=us-east-1
S3_ACCESS_KEY_ID=minioadmin
S3_SECRET_ACCESS_KEY=minioadmin
S3_BUCKET_NAME=ips-media

# Email
RESEND_API_KEY=

# Payments
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# Monitoring
SENTRY_DSN=
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=