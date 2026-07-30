# iPS EdTech Platform — Database Design

## Overview

iPS uses **PostgreSQL 16** as the primary database, accessed via **Prisma ORM**. The schema is designed for 100,000+ users with performance, data integrity, and scalability in mind.

---

## Database Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      PostgreSQL 16                              │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Core Schema (public)                                   │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐ │   │
│  │  │  Users   │  │ Courses  │  │ Lessons  │  │ Quizzes│ │   │
│  │  └──────────┘  └──────────┘  └──────────┘  └────────┘ │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐ │   │
│  │  │Enrollments│  │ Progress │  │ Messages │  │ Payments│ │   │
│  │  └──────────┘  └──────────┘  └──────────┘  └────────┘ │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Supporting Features                                    │   │
│  │  Indexes, Views, Full-Text Search, Triggers, Functions │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Entity Relationship Diagram (Text)

```
User 1──N Account
User 1──N Session
User 1──1 Profile
User 1──N Course (as educator)
User 1──N Enrollment
User 1──N Review
User 1──N Notification
User 1──N Message
User 1──N QuizAttempt
User 1──N AssignmentSubmission
User 1──N Certificate
User 1──N Payment
User 1──N ActivityLog
User 1──N DiscussionPost
User 1──N Bookmark
User 1──N Note

Course N──1 Category
Course 1──N Module
Course 1──N Enrollment
Course 1──N Review
Course 1──N DiscussionThread
Course 1──N Announcement
Course N──N Tag (via CourseTag)

Module 1──N Lesson
Lesson 1──N LessonCompletion
Lesson 1──N Note
Lesson 1──N DiscussionThread
Lesson 1──N Bookmark
Lesson 1──N Quiz

Quiz 1──N Question
Quiz 1──N QuizAttempt
Question 1──N QuestionOption
QuizAttempt 1──N QuizAnswer

Enrollment 1──N LessonCompletion
Enrollment 1──N QuizAttempt
Enrollment 1──N AssignmentSubmission
Enrollment 1──N Progress

Assignment 1──N AssignmentSubmission
AssignmentSubmission 1──N Grade

Category 1──N Course

Message 1──1 Message (reply chain)

DiscussionThread 1──N DiscussionPost
```

---

## Prisma Schema

```prisma
generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["fullTextSearch"]
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

### User & Auth Models

```prisma
enum UserRole {
  STUDENT
  EDUCATOR
  ADMIN
}

model User {
  id            String   @id @default(uuid()) @db.Uuid
  email         String   @unique
  emailVerified DateTime?
  name          String?
  image         String?
  passwordHash  String?
  role          UserRole @default(STUDENT)
  isActive      Boolean  @default(true)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  // Relations
  accounts          Account[]
  sessions          Session[]
  profile           Profile?
  courses           Course[]          @relation("EducatorCourses")
  enrollments       Enrollment[]
  reviews           Review[]
  notifications     Notification[]
  sentMessages      Message[]         @relation("SentMessages")
  receivedMessages  Message[]         @relation("ReceivedMessages")
  quizAttempts      QuizAttempt[]
  assignmentSubmissions AssignmentSubmission[]
  certificates      Certificate[]
  payments          Payment[]
  activityLogs      ActivityLog[]
  discussionPosts   DiscussionPost[]
  bookmarks         Bookmark[]
  notes             Note[]
  announcements     Announcement[]

  @@index([email])
  @@index([role])
  @@map("users")
}

model Account {
  id                String  @id @default(uuid()) @db.Uuid
  userId            String  @db.Uuid
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@index([userId])
  @@map("accounts")
}

model Session {
  id           String   @id @default(uuid()) @db.Uuid
  sessionToken String   @unique
  userId       String   @db.Uuid
  expires      DateTime
  createdAt    DateTime @default(now())

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@map("sessions")
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
  @@map("verification_tokens")
}
```

### Profile Model

```prisma
model Profile {
  id          String   @id @default(uuid()) @db.Uuid
  userId      String   @unique @db.Uuid
  bio         String?  @db.Text
  headline    String?  @db.VarChar(200)
  website     String?
  location    String?
  timezone    String?
  language    String   @default("en")
  isOnboarded Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("profiles")
}
```

### Course Models

```prisma
enum CourseLevel {
  BEGINNER
  INTERMEDIATE
  ADVANCED
  ALL_LEVELS
}

enum CourseStatus {
  DRAFT
  PUBLISHED
  ARCHIVED
}

model Category {
  id          String   @id @default(uuid()) @db.Uuid
  name        String   @unique @db.VarChar(100)
  slug        String   @unique @db.VarChar(120)
  description String?  @db.Text
  parentId    String?  @db.Uuid
  order       Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  parent   Category?  @relation("CategoryHierarchy", fields: [parentId], references: [id])
  children Category[] @relation("CategoryHierarchy")
  courses  Course[]

  @@index([parentId])
  @@index([slug])
  @@map("categories")
}

model Course {
  id            String       @id @default(uuid()) @db.Uuid
  title         String       @db.VarChar(200)
  slug          String       @unique @db.VarChar(250)
  description   String?      @db.Text
  thumbnail     String?
  previewVideo  String?
  price         Decimal      @default(0) @db.Decimal(10, 2)
  currency      String       @default("USD") @db.VarChar(3)
  level         CourseLevel  @default(ALL_LEVELS)
  status        CourseStatus @default(DRAFT)
  duration      Int?         @default(0) // Total minutes
  publishedAt   DateTime?
  educatorId    String       @db.Uuid
  categoryId    String       @db.Uuid
  createdAt     DateTime     @default(now())
  updatedAt     DateTime     @updatedAt

  educator  User         @relation("EducatorCourses", fields: [educatorId], references: [id])
  category  Category     @relation(fields: [categoryId], references: [id])
  tags      CourseTag[]
  modules   Module[]
  enrollments Enrollment[]
  reviews   Review[]
  discussionThreads DiscussionThread[]
  announcements Announcement[]
  assignments Assignment[]
  quizzes   Quiz[]

  @@index([slug])
  @@index([educatorId])
  @@index([categoryId])
  @@index([status])
  @@index([price])
  @@map("courses")
}

model Tag {
  id        String      @id @default(uuid()) @db.Uuid
  name      String      @unique @db.VarChar(50)
  slug      String      @unique @db.VarChar(60)
  createdAt DateTime    @default(now())

  courses CourseTag[]

  @@index([slug])
  @@map("tags")
}

model CourseTag {
  courseId String @db.Uuid
  tagId    String @db.Uuid

  course Course @relation(fields: [courseId], references: [id], onDelete: Cascade)
  tag    Tag    @relation(fields: [tagId], references: [id], onDelete: Cascade)

  @@id([courseId, tagId])
  @@map("course_tags")
}
```

### Module & Lesson Models

```prisma
model Module {
  id        String   @id @default(uuid()) @db.Uuid
  courseId   String   @db.Uuid
  title     String   @db.VarChar(200)
  description String? @db.Text
  order     Int      @default(0)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  course  Course   @relation(fields: [courseId], references: [id], onDelete: Cascade)
  lessons  Lesson[]

  @@index([courseId])
  @@index([courseId, order])
  @@map("modules")
}

enum LessonType {
  VIDEO
  TEXT
  QUIZ
  ASSIGNMENT
  CODE
  EMBED
  PDF
}

model Lesson {
  id          String     @id @default(uuid()) @db.Uuid
  moduleId    String     @db.Uuid
  title       String     @db.VarChar(200)
  type        LessonType @default(TEXT)
  content     String?    @db.Text // Rich text / markdown content
  videoUrl    String?
  videoDuration Int?
  embedUrl    String?
  pdfUrl      String?
  codeContent String?    @db.Text
  codeLanguage String?   @db.VarChar(50)
  order       Int        @default(0)
  isFree      Boolean    @default(false)
  durationMin Int?       @default(0)
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt

  module     Module           @relation(fields: [moduleId], references: [id], onDelete: Cascade)
  completions LessonCompletion[]
  notes      Note[]
  bookmarks  Bookmark[]
  discussionThreads DiscussionThread[]

  @@index([moduleId])
  @@index([moduleId, order])
  @@map("lessons")
}
```

### Enrollment & Progress

```prisma
enum EnrollmentStatus {
  ACTIVE
  COMPLETED
  DROPPED
}

model Enrollment {
  id        String           @id @default(uuid()) @db.Uuid
  userId    String           @db.Uuid
  courseId   String           @db.Uuid
  status    EnrollmentStatus @default(ACTIVE)
  progress  Float            @default(0) // 0-100 percentage
  enrolledAt DateTime        @default(now())
  completedAt DateTime?
  expiresAt DateTime?

  user     User   @relation(fields: [userId], references: [id], onDelete: Cascade)
  course    Course @relation(fields: [courseId], references: [id], onDelete: Cascade)
  completions LessonCompletion[]
  quizAttempts QuizAttempt[]
  assignmentSubmissions AssignmentSubmission[]

  @@unique([userId, courseId])
  @@index([userId])
  @@index([courseId])
  @@index([status])
  @@map("enrollments")
}

model LessonCompletion {
  id           String   @id @default(uuid()) @db.Uuid
  enrollmentId String   @db.Uuid
  lessonId     String   @db.Uuid
  completedAt  DateTime @default(now())
  timeSpentSec Int?     @default(0)

  enrollment Enrollment @relation(fields: [enrollmentId], references: [id], onDelete: Cascade)
  lesson     Lesson     @relation(fields: [lessonId], references: [id], onDelete: Cascade)

  @@unique([enrollmentId, lessonId])
  @@index([enrollmentId])
  @@index([lessonId])
  @@map("lesson_completions")
}
```

### Quiz Models

```prisma
model Quiz {
  id          String   @id @default(uuid()) @db.Uuid
  courseId     String   @db.Uuid
  title       String   @db.VarChar(200)
  description String?  @db.Text
  timeLimitMin Int?    @default(0) // 0 = no limit
  passingScore Int     @default(60) // Percentage
  maxAttempts Int      @default(3) // 0 = unlimited
  shuffleQuestions Boolean @default(false)
  showResults  Boolean @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  course   Course       @relation(fields: [courseId], references: [id], onDelete: Cascade)
  questions Question[]
  attempts QuizAttempt[]

  @@index([courseId])
  @@map("quizzes")
}

enum QuestionType {
  MULTIPLE_CHOICE
  TRUE_FALSE
  SHORT_ANSWER
  CODING
}

model Question {
  id          String       @id @default(uuid()) @db.Uuid
  quizId      String       @db.Uuid
  type        QuestionType @default(MULTIPLE_CHOICE)
  text        String       @db.Text
  points      Int          @default(1)
  order       Int          @default(0)
  explanation String?      @db.Text
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt

  quiz    Quiz            @relation(fields: [quizId], references: [id], onDelete: Cascade)
  options QuestionOption[]
  answers QuizAnswer[]

  @@index([quizId])
  @@map("questions")
}

model QuestionOption {
  id         String  @id @default(uuid()) @db.Uuid
  questionId String  @db.Uuid
  text       String  @db.Text
  isCorrect  Boolean @default(false)
  order      Int     @default(0)

  question Question @relation(fields: [questionId], references: [id], onDelete: Cascade)

  @@index([questionId])
  @@map("question_options")
}

model QuizAttempt {
  id         String         @id @default(uuid()) @db.Uuid
  quizId     String         @db.Uuid
  enrollmentId String       @db.Uuid
  userId     String         @db.Uuid
  score      Int?           @default(0)
  maxScore   Int            @default(0)
  percentage Float?         @default(0)
  passed     Boolean?
  startedAt  DateTime       @default(now())
  completedAt DateTime?
  timeSpentSec Int?         @default(0)

  quiz       Quiz           @relation(fields: [quizId], references: [id], onDelete: Cascade)
  enrollment Enrollment     @relation(fields: [enrollmentId], references: [id], onDelete: Cascade)
  user       User           @relation(fields: [userId], references: [id], onDelete: Cascade)
  answers    QuizAnswer[]

  @@index([quizId])
  @@index([userId])
  @@index([enrollmentId])
  @@map("quiz_attempts")
}

model QuizAnswer {
  id         String   @id @default(uuid()) @db.Uuid
  attemptId  String   @db.Uuid
  questionId String   @db.Uuid
  optionId   String?  @db.Uuid
  textAnswer String?  @db.Text
  codeAnswer String?  @db.Text
  isCorrect  Boolean?
  pointsEarned Int    @default(0)

  attempt  QuizAttempt @relation(fields: [attemptId], references: [id], onDelete: Cascade)
  question Question    @relation(fields: [questionId], references: [id], onDelete: Cascade)
  option   QuestionOption? @relation(fields: [optionId], references: [id])

  @@index([attemptId])
  @@map("quiz_answers")
}
```

### Assignment Models

```prisma
model Assignment {
  id          String   @id @default(uuid()) @db.Uuid
  courseId     String   @db.Uuid
  title       String   @db.VarChar(200)
  description String   @db.Text
  dueDate     DateTime?
  maxPoints   Int      @default(100)
  allowLateSubmission Boolean @default(false)
  latePenalty Int?     @default(0) // Percentage deduction
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  course      Course               @relation(fields: [courseId], references: [id], onDelete: Cascade)
  submissions AssignmentSubmission[]

  @@index([courseId])
  @@map("assignments")
}

enum SubmissionStatus {
  SUBMITTED
  GRADED
  LATE
  RESUBMITTED
}

model AssignmentSubmission {
  id           String           @id @default(uuid()) @db.Uuid
  assignmentId String           @db.Uuid
  enrollmentId String           @db.Uuid
  userId       String           @db.Uuid
  content      String?          @db.Text
  fileUrls     String[]         // Array of S3 URLs
  status       SubmissionStatus @default(SUBMITTED)
  submittedAt  DateTime         @default(now())
  updatedAt    DateTime         @updatedAt

  assignment Assignment @relation(fields: [assignmentId], references: [id], onDelete: Cascade)
  enrollment Enrollment @relation(fields: [enrollmentId], references: [id], onDelete: Cascade)
  user       User       @relation(fields: [userId], references: [id], onDelete: Cascade)
  grade      Grade?

  @@unique([assignmentId, userId])
  @@index([assignmentId])
  @@index([userId])
  @@map("assignment_submissions")
}

model Grade {
  id           String   @id @default(uuid()) @db.Uuid
  submissionId String   @unique @db.Uuid
  graderId     String   @db.Uuid
  score        Int      @default(0)
  maxScore     Int      @default(100)
  feedback     String?  @db.Text
  rubric       Json?    // Rubric breakdown
  gradedAt     DateTime @default(now())

  submission AssignmentSubmission @relation(fields: [submissionId], references: [id], onDelete: Cascade)
  grader     User                 @relation(fields: [graderId], references: [id])

  @@map("grades")
}
```

### Review & Rating

```prisma
model Review {
  id        String   @id @default(uuid()) @db.Uuid
  userId    String   @db.Uuid
  courseId   String   @db.Uuid
  rating    Int      @default(5) // 1-5
  content   String?  @db.Text
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  user  User   @relation(fields: [userId], references: [id], onDelete: Cascade)
  course Course @relation(fields: [courseId], references: [id], onDelete: Cascade)

  @@unique([userId, courseId])
  @@index([courseId])
  @@index([rating])
  @@map("reviews")
}
```

### Discussion & Communication

```prisma
model DiscussionThread {
  id        String   @id @default(uuid()) @db.Uuid
  title     String   @db.VarChar(200)
  courseId   String?  @db.Uuid
  lessonId  String?  @db.Uuid
  userId    String   @db.Uuid
  isPinned  Boolean  @default(false)
  isLocked  Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  course  Course?          @relation(fields: [courseId], references: [id], onDelete: Cascade)
  lesson  Lesson?          @relation(fields: [lessonId], references: [id], onDelete: Cascade)
  user    User             @relation(fields: [userId], references: [id])
  posts   DiscussionPost[]

  @@index([courseId])
  @@index([lessonId])
  @@index([userId])
  @@map("discussion_threads")
}

model DiscussionPost {
  id        String   @id @default(uuid()) @db.Uuid
  threadId  String   @db.Uuid
  userId    String   @db.Uuid
  parentId  String?  @db.Uuid
  content   String   @db.Text
  isEdited  Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  thread   DiscussionThread @relation(fields: [threadId], references: [id], onDelete: Cascade)
  user     User             @relation(fields: [userId], references: [id])
  parent   DiscussionPost?  @relation("PostReplies", fields: [parentId], references: [id])
  replies  DiscussionPost[] @relation("PostReplies")

  @@index([threadId])
  @@index([userId])
  @@index([parentId])
  @@map("discussion_posts")
}

model Message {
  id        String   @id @default(uuid()) @db.Uuid
  senderId  String   @db.Uuid
  receiverId String  @db.Uuid
  content   String   @db.Text
  isRead    Boolean  @default(false)
  parentId  String?  @db.Uuid
  createdAt DateTime @default(now())

  sender   User     @relation("SentMessages", fields: [senderId], references: [id])
  receiver User     @relation("ReceivedMessages", fields: [receiverId], references: [id])
  parent   Message? @relation("MessageReplies", fields: [parentId], references: [id])
  replies  Message[] @relation("MessageReplies")

  @@index([senderId])
  @@index([receiverId])
  @@index([parentId])
  @@map("messages")
}

model Announcement {
  id        String   @id @default(uuid()) @db.Uuid
  courseId   String   @db.Uuid
  authorId  String   @db.Uuid
  title     String   @db.VarChar(200)
  content   String   @db.Text
  isUrgent  Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  course Course @relation(fields: [courseId], references: [id], onDelete: Cascade)
  author User   @relation(fields: [authorId], references: [id])

  @@index([courseId])
  @@map("announcements")
}
```

### Notification & Activity

```prisma
enum NotificationType {
  COURSE_UPDATE
  ENROLLMENT
  GRADE
  MESSAGE
  DISCUSSION_REPLY
  ACHIEVEMENT
  QUIZ_RESULT
  ANNOUNCEMENT
}

model Notification {
  id        String           @id @default(uuid()) @db.Uuid
  userId    String           @db.Uuid
  type      NotificationType
  title     String           @db.VarChar(200)
  body      String?          @db.Text
  link      String?          // Deep link URL
  isRead    Boolean          @default(false)
  createdAt DateTime         @default(now())

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId, isRead])
  @@index([userId, createdAt])
  @@map("notifications")
}

model ActivityLog {
  id        String   @id @default(uuid()) @db.Uuid
  userId    String   @db.Uuid
  action    String   @db.VarChar(100) // e.g., "course.enrolled", "lesson.completed"
  entityType String  @db.VarChar(50)  // e.g., "course", "lesson", "quiz"
  entityId  String   @db.Uuid
  metadata  Json?    // Flexible data
  createdAt DateTime @default(now())

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId, createdAt])
  @@index([action])
  @@map("activity_logs")
}
```

### Payment & Certificate

```prisma
enum PaymentStatus {
  PENDING
  COMPLETED
  FAILED
  REFUNDED
}

model Payment {
  id            String        @id @default(uuid()) @db.Uuid
  userId        String        @db.Uuid
  courseId       String?       @db.Uuid
  amount        Decimal       @db.Decimal(10, 2)
  currency      String        @default("USD") @db.VarChar(3)
  status        PaymentStatus @default(PENDING)
  provider      String        @default("stripe") // stripe, razorpay
  providerId    String?       // Provider's transaction ID
  invoiceUrl    String?
  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt

  user   User    @relation(fields: [userId], references: [id])
  course  Course? @relation(fields: [courseId], references: [id])

  @@index([userId])
  @@index([status])
  @@map("payments")
}

model Certificate {
  id           String   @id @default(uuid()) @db.Uuid
  userId       String   @db.Uuid
  courseId      String   @db.Uuid
  enrollmentId String   @db.Uuid
  certificateId String  @unique // Public-facing ID for verification
  title        String   @db.VarChar(200)
  issuedAt     DateTime @default(now())
  expiresAt    DateTime?
  metadata     Json?

  user       User       @relation(fields: [userId], references: [id])
  course      Course     @relation(fields: [courseId], references: [id])
  enrollment  Enrollment @relation(fields: [enrollmentId], references: [id])

  @@unique([userId, courseId])
  @@index([certificateId])
  @@index([userId])
  @@map("certificates")
}
```

### Bookmark & Note

```prisma
model Bookmark {
  id        String   @id @default(uuid()) @db.Uuid
  userId    String   @db.Uuid
  lessonId  String   @db.Uuid
  createdAt DateTime @default(now())

  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)
  lesson Lesson @relation(fields: [lessonId], references: [id], onDelete: Cascade)

  @@unique([userId, lessonId])
  @@map("bookmarks")
}

model Note {
  id        String   @id @default(uuid()) @db.Uuid
  userId    String   @db.Uuid
  lessonId  String   @db.Uuid
  content   String   @db.Text
  timestamp Int?     @default(0) // Video timestamp in seconds
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)
  lesson Lesson @relation(fields: [lessonId], references: [id], onDelete: Cascade)

  @@index([userId, lessonId])
  @@map("notes")
}
```

---

## Indexing Strategy

| Table | Index | Type | Purpose |
|-------|-------|------|---------|
| users | `email` | Unique | Fast login lookups |
| users | `role` | B-tree | Role-based queries |
| courses | `slug` | Unique | URL resolution |
| courses | `educatorId` | B-tree | Educator's courses |
| courses | `status, categoryId` | Composite | Catalog filtering |
| courses | `price` | B-tree | Price filtering |
| enrollments | `userId, courseId` | Unique | Enrollment check |
| enrollments | `status` | B-tree | Active/completed queries |
| lessons | `moduleId, order` | Composite | Ordered lesson loading |
| quiz_attempts | `userId, quizId` | Composite | Attempt history |
| notifications | `userId, isRead` | Composite | Unread count |
| activity_logs | `userId, createdAt` | Composite | Activity feed |
| messages | `receiverId, isRead` | Composite | Unread messages |
| reviews | `courseId, rating` | Composite | Average rating calc |

---

## Full-Text Search

```sql
-- Enable full-text search on courses
CREATE INDEX idx_courses_search ON courses USING GIN(
  to_tsvector('english', coalesce(title, '') || ' ' || coalesce(description, ''))
);

-- Search query
SELECT * FROM courses
WHERE to_tsvector('english', title || ' ' || coalesce(description, ''))
  @@ to_tsquery('english', 'react & javascript');
```

---

## Migration Strategy

- All schema changes via Prisma migrations (`prisma migrate dev`)
- Backward-compatible changes only (add columns, not remove)
- Large table migrations use zero-downtime strategies (create new table, backfill, swap)
- Seed data for development and testing environments
- Production migrations reviewed and tested in staging first

---

## Performance Considerations

1. **Connection Pooling**: Use Prisma with connection pooling (PgBouncer or serverless driver)
2. **Query Optimization**: Use `select` to fetch only needed fields, `include` sparingly
3. **Pagination**: Always use cursor-based pagination for large result sets
4. **Batch Operations**: Use `createMany` and `updateMany` for bulk operations
5. **N+1 Prevention**: Use Prisma's `include` or `select` with relations
6. **Soft Deletes**: Prefer `isActive` boolean over hard deletes for audit trails
7. **JSON Fields**: Use `Json` type for flexible metadata (Prisma + PostgreSQL)