# iPS EdTech Platform — UI Guide

## Design System Overview

The iPS platform uses **shadcn/ui (base-nova style)** built on top of **Tailwind CSS v4**. The design follows a clean, accessible, and responsive approach optimized for learning experiences.

---

## Design Principles

1. **Clarity**: Information is presented clearly. Every UI element has a purpose.
2. **Consistency**: Reusable patterns and components throughout the platform.
3. **Focus**: Minimize distractions during learning. Content is the hero.
4. **Accessibility**: WCAG 2.1 AA compliant. Usable by everyone.
5. **Responsiveness**: Mobile-first. Works on all screen sizes.
6. **Performance**: Minimal UI jank. Smooth animations. Fast load times.

---

## Typography

### Font Stack

| Usage | Font | Fallback |
|-------|------|----------|
| Body | Geist (Sans) | system-ui, sans-serif |
| Code | Geist Mono | monospace |
| Headings | Geist (Sans) | system-ui, sans-serif |

### Type Scale

```css
/* Applied via Tailwind classes */
.text-xs     /* 0.75rem (12px)  - Caption, metadata */
.text-sm     /* 0.875rem (14px) - Small text, labels */
.text-base   /* 1rem (16px)     - Body text */
.text-lg     /* 1.125rem (18px) - Large body */
.text-xl     /* 1.25rem (20px)  - Sub-headings */
.text-2xl    /* 1.5rem (24px)   - Section headings */
.text-3xl    /* 1.875rem (30px) - Page headings */
.text-4xl    /* 2.25rem (36px)  - Hero headings */
```

### Line Heights

- Body: `leading-relaxed` (1.625) for readability
- Headings: `leading-tight` (1.25) for compactness
- Small text: `leading-normal` (1.5)

---

## Color System

### Light Theme

| Token | Value | Usage |
|-------|-------|-------|
| `--background` | `oklch(1 0 0)` | Page background |
| `--foreground` | `oklch(0.145 0 0)` | Primary text |
| `--primary` | `oklch(0.205 0 0)` | Primary actions, links |
| `--primary-foreground` | `oklch(0.985 0 0)` | Text on primary |
| `--secondary` | `oklch(0.97 0 0)` | Secondary surfaces |
| `--muted` | `oklch(0.97 0 0)` | Muted backgrounds |
| `--muted-foreground` | `oklch(0.556 0 0)` | Muted text |
| `--accent` | `oklch(0.97 0 0)` | Accent surfaces |
| `--destructive` | `oklch(0.577 0.245 27.325)` | Errors, destructive actions |
| `--border` | `oklch(0.922 0 0)` | Borders, dividers |
| `--input` | `oklch(0.922 0 0)` | Input borders |
| `--ring` | `oklch(0.708 0 0)` | Focus rings |
| `--radius` | `0.625rem` | Border radius base |

### Dark Theme

| Token | Value | Usage |
|-------|-------|-------|
| `--background` | `oklch(0.145 0 0)` | Page background |
| `--foreground` | `oklch(0.985 0 0)` | Primary text |
| `--primary` | `oklch(0.922 0 0)` | Primary actions |
| `--border` | `oklch(1 0 0 / 10%)` | Subtle borders |
| `--input` | `oklch(1 0 0 / 15%)` | Input borders |

### Semantic Colors

| Color | Token | Usage |
|-------|-------|-------|
| Success | `emerald-500` | Completion, success messages |
| Warning | `amber-500` | Warnings, pending states |
| Error | `--destructive` | Errors, failures |
| Info | `blue-500` | Information, tips |

---

## Spacing

Uses Tailwind's default spacing scale based on `0.25rem` increments:

```
p-0    → 0px
p-1    → 4px
p-2    → 8px
p-3    → 12px
p-4    → 16px
p-5    → 20px
p-6    → 24px
p-8    → 32px
p-10   → 40px
p-12   → 48px
p-16   → 64px
```

### Layout Spacing

- Page container: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- Section spacing: `py-12 md:py-16 lg:py-24`
- Card padding: `p-4 sm:p-6`
- Content gap: `gap-4 sm:gap-6`
- Stack spacing: `space-y-4 sm:space-y-6`

---

## Component Patterns

### Cards

```tsx
// Course card in catalog
<Card className="group hover:shadow-lg transition-shadow">
  <CardHeader>
    <Image src={thumbnail} alt={title} className="rounded-t-lg" />
  </CardHeader>
  <CardContent>
    <Badge>{category}</Badge>
    <h3 className="text-lg font-semibold mt-2">{title}</h3>
    <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
  </CardContent>
  <CardFooter className="flex items-center justify-between">
    <span className="text-sm font-medium">{price}</span>
    <span className="text-sm text-muted-foreground">{enrolledCount} students</span>
  </CardFooter>
</Card>
```

### Buttons

| Variant | Usage |
|---------|-------|
| `default` | Primary actions (Enroll, Save, Submit) |
| `secondary` | Secondary actions (Cancel, Skip) |
| `outline` | Tertiary actions (Preview, View Details) |
| `ghost` | Toolbar actions, icon buttons |
| `destructive` | Delete, Remove, Unenroll |
| `link` | Inline navigation, text links |

### Forms

```tsx
// Consistent form layout
<form className="space-y-6">
  <div className="space-y-2">
    <Label htmlFor="title">Course Title</Label>
    <Input id="title" placeholder="Enter course title" />
    <p className="text-sm text-muted-foreground">A descriptive title for your course</p>
  </div>
  
  <div className="space-y-2">
    <Label htmlFor="description">Description</Label>
    <Textarea id="description" rows={4} />
  </div>
  
  <div className="flex items-center gap-4 justify-end">
    <Button variant="outline">Cancel</Button>
    <Button type="submit">Save Course</Button>
  </div>
</form>
```

### Navigation

- **Top Navbar**: Logo, search, user menu, notification bell, theme toggle
- **Sidebar**: Course navigation, dashboard links, admin links (role-based)
- **Breadcrumbs**: Page hierarchy, current location
- **Tabs**: Section navigation within pages (Overview, Curriculum, Reviews)

### Feedback

- **Toast**: Non-blocking notifications (success, error, info)
- **Alert**: Blocking messages for important information
- **Loading Skeleton**: Placeholder loading states
- **Progress Bar**: Course progress, quiz progress, upload progress
- **Empty State**: Illustration + message + CTA when no data

---

## Page Layouts

### Marketing Layout

```
┌──────────────────────────────────────┐
│  Navbar (Logo, Links, CTA)           │
├──────────────────────────────────────┤
│                                      │
│  Hero Section                        │
│                                      │
├──────────────────────────────────────┤
│  Features / Benefits                 │
│                                      │
├──────────────────────────────────────┤
│  Course Catalog Preview              │
│                                      │
├──────────────────────────────────────┤
│  Testimonials                        │
│                                      │
├──────────────────────────────────────┤
│  Pricing / CTA                       │
│                                      │
├──────────────────────────────────────┤
│  Footer                              │
└──────────────────────────────────────┘
```

### Dashboard Layout

```
┌──────────────────────────────────────┐
│ Navbar (Logo, Search, User Menu)     │
├──────────┬───────────────────────────┤
│          │                           │
│ Sidebar  │  Main Content Area        │
│          │                           │
│ Dashboard│  Stats Cards              │
│ My Courses│  Course List             │
│ Analytics│  Activity Feed            │
│ Settings │  Progress Charts          │
│          │                           │
└──────────┴───────────────────────────┘
```

### Course Learning Layout

```
┌──────────────────────────────────────┐
│ Navbar (Course Title, Progress)      │
├──────────┬───────────────────────────┤
│          │                           │
│ Curriculum│  Lesson Content          │
│ Sidebar  │  Video / Text / Code     │
│          │                           │
│ Module 1 │  Mark Complete Button    │
│  Lesson 1│  Next Lesson Button      │
│  Lesson 2│                           │
│  Lesson 3│  Notes Panel             │
│ Module 2 │                           │
│  Lesson 4│                           │
│          │                           │
└──────────┴───────────────────────────┘
```

---

## Responsive Breakpoints

| Breakpoint | Width | Layout |
|------------|-------|--------|
| `sm` | 640px | Mobile landscape |
| `md` | 768px | Tablet |
| `lg` | 1024px | Desktop |
| `xl` | 1280px | Wide desktop |
| `2xl` | 1536px | Ultra-wide |

### Mobile Considerations

- Sidebar becomes a bottom sheet or slide-over drawer
- Course curriculum sidebar becomes a collapsible panel
- Tables become card lists
- Multi-column grids become single column
- Buttons are full-width on mobile
- Touch targets are minimum 44x44px

---

## Animation Guidelines

### Framer Motion Usage

```tsx
// Page transitions
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

// Stagger children
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}
```

### Animation Rules

1. **Duration**: 200-300ms for micro-interactions, 300-500ms for page transitions
2. **Easing**: `ease-out` for enter, `ease-in` for exit
3. **Reduce Motion**: Respect `prefers-reduced-motion` OS setting
4. **Purpose**: Animations should serve a purpose (guide attention, provide feedback)
5. **Performance**: Use `transform` and `opacity` only (GPU-accelerated)

---

## Loading States

### Skeleton Pattern

```tsx
// Loading skeleton for course card
<div className="animate-pulse space-y-4">
  <div className="aspect-video bg-muted rounded-lg" />
  <div className="h-4 bg-muted rounded w-3/4" />
  <div className="h-3 bg-muted rounded w-1/2" />
  <div className="h-3 bg-muted rounded w-full" />
</div>
```

### Loading Hierarchy

1. **Instant**: Show skeleton immediately (no delay)
2. **< 1s**: Skeleton remains
3. **1-3s**: Skeleton + "Loading..." text
4. **> 3s**: Show error state with retry option

---

## Empty States

```tsx
// Empty state pattern
<div className="flex flex-col items-center justify-center py-12 text-center">
  <InboxIcon className="h-12 w-12 text-muted-foreground mb-4" />
  <h3 className="text-lg font-semibold">No courses yet</h3>
  <p className="text-sm text-muted-foreground mt-2 max-w-sm">
    Get started by creating your first course.
  </p>
  <Button className="mt-6">Create Course</Button>
</div>
```

---

## Error States

```tsx
// Error state pattern
<div className="flex flex-col items-center justify-center py-12 text-center">
  <AlertCircleIcon className="h-12 w-12 text-destructive mb-4" />
  <h3 className="text-lg font-semibold">Something went wrong</h3>
  <p className="text-sm text-muted-foreground mt-2 max-w-sm">
    {error.message ?? "An unexpected error occurred. Please try again."}
  </p>
  <Button variant="outline" className="mt-6" onClick={onRetry}>
    Try Again
  </Button>
</div>
```

---

## Icon Usage

- Use **Lucide React** icons consistently
- Icon size: `h-4 w-4` (16px) for inline icons, `h-5 w-5` for standalone
- Buttons with icons: icon on left for actions, icon on right for external links
- Decorative icons should use `text-muted-foreground`
- Always add `aria-hidden="true"` for decorative icons

---

## Dark Mode

- Supported via `next-themes` with `class` strategy
- Toggle in navbar (sun/moon icon)
- Respects OS preference by default
- All colors defined as CSS variables with `.dark` overrides
- Images may need `dark:invert` or dark variants

---

## Accessibility Requirements

### Color Contrast

| Text Size | Contrast Ratio | Example |
|-----------|---------------|---------|
| Normal text (< 18px) | 4.5:1 | Body text |
| Large text (≥ 18px) | 3:1 | Headings |
| UI components | 3:1 | Borders, icons |

### Focus Indicators

```css
/* Custom focus ring */
*:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}
```

### Touch Targets

- Minimum 44x44px for all interactive elements on mobile
- Minimum 8px spacing between touch targets