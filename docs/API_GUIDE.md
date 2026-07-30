# iPS EdTech Platform — API Guide

## Overview

iPS provides two API surfaces:
1. **Server Actions**: For mutations from the frontend (form submissions, button clicks)
2. **Route Handlers**: RESTful API for external integrations, mobile clients, and third-party services

---

## Design Principles

1. **Server Actions for Mutations**: All data mutations from the UI use Server Actions with `'use server'` directives.
2. **Route Handlers for External Access**: REST endpoints for mobile apps, webhooks, and third-party integrations.
3. **Type-Safe**: All endpoints return typed responses. Input validation via Zod schemas.
4. **Consistent Response Format**: All API responses follow a standard envelope.
5. **Authentication Required**: All endpoints except public ones require authentication.
6. **Rate Limited**: API endpoints are rate-limited per user/IP.

---

## Response Format

### Success Response

```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "page": 1,
    "pageSize": 20,
    "total": 100,
    "hasMore": true
  }
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {
      "title": ["Title must be at least 3 characters"],
      "description": ["Description is required"]
    }
  }
}
```

### Standard Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `UNAUTHORIZED` | 401 | Authentication required |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `VALIDATION_ERROR` | 422 | Input validation failed |
| `CONFLICT` | 409 | Resource already exists |
| `RATE_LIMITED` | 429 | Too many requests |
| `INTERNAL_ERROR` | 500 | Server error |

---

## Server Actions

Server Actions are the primary way to mutate data from the frontend. They are called directly from Client Components.

### Pattern

```ts
'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { revalidateTag, updateTag } from 'next/cache'
import { z } from 'zod'

// 1. Define Zod schema
const ActionSchema = z.object({
  // fields
})

// 2. Export async function
export async function actionName(formData: FormData) {
  // 3. Authenticate
  const session = await auth()
  if (!session?.user) {
    return { success: false, error: { code: 'UNAUTHORIZED', message: 'Not authenticated' } }
  }
  
  // 4. Validate
  const parsed = ActionSchema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) {
    return { success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid input', details: parsed.error.flatten().fieldErrors } }
  }
  
  // 5. Execute
  const result = await db.someModel.create({ data: { ...parsed.data, userId: session.user.id } })
  
  // 6. Revalidate cache
  updateTag(`resource-${result.id}`)
  revalidateTag('resources', 'max')
  
  // 7. Return
  return { success: true, data: result }
}
```

### Available Server Actions

#### Auth Actions

| Action | Description | Input |
|--------|-------------|-------|
| `signIn` | Authenticate user | `email`, `password` |
| `signUp` | Register new user | `email`, `password`, `name` |
| `signOut` | End session | — |
| `resetPassword` | Send reset email | `email` |
| `updatePassword` | Set new password | `token`, `password` |
| `verifyEmail` | Verify email address | `token` |

#### Course Actions

| Action | Description | Input |
|--------|-------------|-------|
| `createCourse` | Create new course | `title`, `description`, `categoryId` |
| `updateCourse` | Update course details | `courseId`, `title`, `description`, etc. |
| `deleteCourse` | Delete a course | `courseId` |
| `publishCourse` | Publish course | `courseId` |
| `archiveCourse` | Archive course | `courseId` |
| `reorderModules` | Reorder modules | `courseId`, `moduleIds[]` |

#### Enrollment Actions

| Action | Description | Input |
|--------|-------------|-------|
| `enrollCourse` | Enroll in course | `courseId` |
| `unenrollCourse` | Unenroll from course | `courseId` |
| `completeLesson` | Mark lesson complete | `lessonId`, `timeSpentSec` |
| `updateProgress` | Update course progress | `courseId`, `progress` |

#### Content Actions

| Action | Description | Input |
|--------|-------------|-------|
| `createModule` | Add module to course | `courseId`, `title`, `order` |
| `updateModule` | Update module | `moduleId`, `title`, `description` |
| `deleteModule` | Delete module | `moduleId` |
| `createLesson` | Add lesson to module | `moduleId`, `title`, `type`, `content` |
| `updateLesson` | Update lesson | `lessonId`, `title`, `content` |
| `deleteLesson` | Delete lesson | `lessonId` |

#### Quiz Actions

| Action | Description | Input |
|--------|-------------|-------|
| `createQuiz` | Create quiz | `courseId`, `title`, `settings` |
| `updateQuiz` | Update quiz | `quizId`, `title`, `settings` |
| `startQuizAttempt` | Start quiz attempt | `quizId`, `enrollmentId` |
| `submitQuizAttempt` | Submit quiz answers | `attemptId`, `answers[]` |

#### Assessment Actions

| Action | Description | Input |
|--------|-------------|-------|
| `createAssignment` | Create assignment | `courseId`, `title`, `dueDate` |
| `submitAssignment` | Submit assignment | `assignmentId`, `content`, `files` |
| `gradeSubmission` | Grade submission | `submissionId`, `score`, `feedback` |

#### Review Actions

| Action | Description | Input |
|--------|-------------|-------|
| `createReview` | Add course review | `courseId`, `rating`, `content` |
| `updateReview` | Update review | `reviewId`, `rating`, `content` |
| `deleteReview` | Delete review | `reviewId` |

#### Communication Actions

| Action | Description | Input |
|--------|-------------|-------|
| `sendMessage` | Send direct message | `receiverId`, `content` |
| `createDiscussionThread` | Create discussion | `courseId`, `lessonId`, `title`, `content` |
| `postReply` | Reply to discussion | `threadId`, `content`, `parentPostId` |
| `createAnnouncement` | Create announcement | `courseId`, `title`, `content` |

---

## Route Handlers (REST API)

Route Handlers in `app/api/` provide RESTful endpoints for external access.

### Base URL

```
Development: http://localhost:3000/api
Production:  https://your-domain.com/api
```

### Authentication

Most endpoints require authentication via Bearer token:

```http
Authorization: Bearer <session_token>
```

Server-to-server endpoints use API keys:

```http
X-API-Key: <api_key>
```

### Endpoints

#### Health

```
GET /api/health
```

Response:
```json
{
  "status": "healthy",
  "timestamp": "2026-07-30T15:00:00Z",
  "version": "1.0.0"
}
```

#### Auth (handled by Auth.js)

```
GET  /api/auth/[...nextauth]  # Auth.js handler
POST /api/auth/[...nextauth]  # Auth.js handler
```

#### Courses

```
GET    /api/courses                  # List courses (paginated)
POST   /api/courses                  # Create course
GET    /api/courses/:id              # Get course details
PATCH  /api/courses/:id              # Update course
DELETE /api/courses/:id              # Delete course
GET    /api/courses/:id/curriculum   # Get course curriculum
GET    /api/courses/:id/enrollments  # Get course enrollments
```

**Query Parameters for GET /api/courses:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `page` | number | Page number (default: 1) |
| `pageSize` | number | Items per page (default: 20, max: 100) |
| `search` | string | Full-text search query |
| `categoryId` | string | Filter by category |
| `level` | string | Filter by level (BEGINNER, INTERMEDIATE, ADVANCED) |
| `status` | string | Filter by status (PUBLISHED, DRAFT) |
| `priceMin` | number | Minimum price |
| `priceMax` | number | Maximum price |
| `sortBy` | string | Sort field (title, price, createdAt, rating) |
| `sortOrder` | string | Sort order (asc, desc) |
| `educatorId` | string | Filter by educator |

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "title": "Introduction to React",
      "slug": "introduction-to-react",
      "description": "Learn React from scratch",
      "thumbnail": "https://cdn.example.com/thumb.jpg",
      "price": 49.99,
      "currency": "USD",
      "level": "BEGINNER",
      "status": "PUBLISHED",
      "duration": 480,
      "rating": 4.5,
      "enrolledCount": 1234,
      "educator": {
        "id": "uuid",
        "name": "John Doe",
        "image": "https://cdn.example.com/avatar.jpg"
      },
      "category": {
        "id": "uuid",
        "name": "Web Development"
      },
      "tags": ["react", "javascript", "frontend"],
      "createdAt": "2026-01-15T10:00:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "pageSize": 20,
    "total": 150,
    "hasMore": true
  }
}
```

#### Users

```
GET    /api/users/me               # Get current user profile
PATCH  /api/users/me               # Update current user profile
GET    /api/users/:id              # Get user by ID (admin only)
GET    /api/users                   # List users (admin only, paginated)
PATCH  /api/users/:id              # Update user (admin only)
```

#### Enrollments

```
GET    /api/enrollments            # List user's enrollments
POST   /api/enrollments            # Create enrollment
DELETE /api/enrollments/:id        # Remove enrollment
GET    /api/enrollments/:id/progress # Get enrollment progress
```

#### Uploads

```
POST   /api/uploads               # Upload file (multipart/form-data)
POST   /api/uploads/image         # Upload image with optimization
DELETE /api/uploads/:id           # Delete uploaded file
```

**Upload Request:**
```http
POST /api/uploads
Content-Type: multipart/form-data

file: <binary>
type: course_thumbnail|lesson_video|assignment|avatar
```

#### Webhooks

```
POST   /api/webhooks/stripe       # Stripe webhook events
POST   /api/webhooks/sendgrid     # Email delivery events
POST   /api/webhooks/mux          # Video processing events
```

#### Notifications

```
GET    /api/notifications          # List user's notifications
PATCH  /api/notifications/:id/read # Mark notification as read
POST   /api/notifications/read-all # Mark all as read
```

---

## WebSocket Events

For real-time features, iPS uses WebSocket connections via Socket.io.

### Connection

```typescript
import { io } from 'socket.io-client'

const socket = io(process.env.NEXT_PUBLIC_WS_URL!, {
  auth: { token: 'session_token' },
})
```

### Events

| Event | Direction | Description |
|-------|-----------|-------------|
| `notification:new` | Server → Client | New notification |
| `message:new` | Server → Client | New direct message |
| `message:read` | Client → Server | Mark message as read |
| `course:update` | Server → Client | Course content updated |
| `live:join` | Client → Server | Join live class |
| `live:leave` | Client → Server | Leave live class |
| `live:chat` | Bidirectional | Live class chat |
| `typing:start` | Client → Server | User started typing |
| `typing:stop` | Client → Server | User stopped typing |

---

## Rate Limiting

| Endpoint Type | Limit | Window |
|--------------|-------|--------|
| Public API | 100 requests | 1 minute |
| Authenticated API | 1000 requests | 1 minute |
| Server Actions | 100 actions | 1 minute |
| Uploads | 10 uploads | 1 minute |
| Auth endpoints | 10 attempts | 15 minutes |

Rate limit headers are included in all responses:

```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1620000000
```

---

## Pagination

All list endpoints use cursor-based pagination for consistency:

```json
{
  "success": true,
  "data": [...],
  "meta": {
    "page": 1,
    "pageSize": 20,
    "total": 150,
    "hasMore": true
  }
}
```

---

## API Versioning

The API is versioned via URL prefix:

```
/api/v1/courses
/api/v2/courses
```

The current version is `v1`. Breaking changes will result in a new version. Deprecated versions are supported for 6 months after the new version is released.

---

## Security

### Authentication Headers

```http
# Session-based auth (from browser)
Cookie: next-auth.session-token=...

# Bearer token auth (from mobile/third-party)
Authorization: Bearer <token>

# API key auth (server-to-server)
X-API-Key: <api_key>
```

### CORS

```json
{
  "Access-Control-Allow-Origin": "https://app.ipsplatform.com",
  "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-API-Key",
  "Access-Control-Max-Age": "86400"
}
```

### Input Validation

All inputs are validated with Zod schemas before processing. Validation errors return a 422 response with field-level error details.

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": {
      "email": ["Invalid email format"],
      "password": ["Password must be at least 8 characters"]
    }
  }
}