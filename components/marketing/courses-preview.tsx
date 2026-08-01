import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SectionWrapper, SectionHeader } from "@/components/shared/section-wrapper"
import { StaggerContainer, StaggerItem, FadeIn } from "@/components/shared/motion-wrapper"
import {
  ClockIcon,
  UsersIcon,
  BarChart3Icon,
  ArrowRightIcon,
  StarIcon,
  BookOpenIcon,
  CheckCircle2Icon,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Course {
  title: string
  description: string
  category: string
  duration: string
  students: string
  level: string
  rating: string
  gradient: string
  tags: string[]
}

const courses: Course[] = [
  {
    title: "Full-Stack Web Development",
    description:
      "Master React, Node.js, and cloud deployment. Build production-grade applications and graduate job-ready.",
    category: "Development",
    duration: "16 weeks",
    students: "12,500+",
    level: "Beginner → Advanced",
    rating: "4.9",
    gradient: "from-[#0f3d91] to-[#4338ca]",
    tags: ["React", "Node.js", "AWS"],
  },
  {
    title: "Data Science & AI",
    description:
      "Python, machine learning, and deep learning with real industry datasets. Build AI models that matter.",
    category: "Data Science",
    duration: "20 weeks",
    students: "9,800+",
    level: "Intermediate",
    rating: "4.8",
    gradient: "from-[#4338ca] to-[#0f3d91]",
    tags: ["Python", "ML", "Deep Learning"],
  },
  {
    title: "Product Design & UI/UX",
    description:
      "Design thinking, Figma mastery, and portfolio-building. Create products users love — and get hired for it.",
    category: "Design",
    duration: "12 weeks",
    students: "7,200+",
    level: "All Levels",
    rating: "4.9",
    gradient: "from-[#f4b400] to-[#e08e00]",
    tags: ["Figma", "Design Systems", "Research"],
  },
  {
    title: "Cloud Architecture (AWS)",
    description:
      "Architect scalable cloud infrastructure, prepare for AWS certification, and ship enterprise-grade solutions.",
    category: "Cloud",
    duration: "14 weeks",
    students: "5,400+",
    level: "Intermediate",
    rating: "4.7",
    gradient: "from-[#0ea5e9] to-[#0f3d91]",
    tags: ["AWS", "DevOps", "Kubernetes"],
  },
]

export function CoursesPreview() {
  return (
    <SectionWrapper id="courses" className="overflow-hidden">
      {/* Premium dark background panel */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#0d2f6e] via-[#0f3d91] to-[#08224f] px-6 py-16 sm:px-10 md:py-24 lg:px-16">
        {/* Decorative background */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 -right-32 h-[400px] w-[400px] rounded-full bg-indigo-brand/40 blur-[120px]" />
          <div className="absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full bg-gold/15 blur-[120px]" />
          <div className="absolute inset-0 opacity-[0.05] [background:linear-gradient(to_right,rgb(255_255_255/0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.5)_1px,transparent_1px)] [background-size:3rem_3rem]" />
        </div>

        <div className="relative">
          <SectionHeader
            onDark
            eyebrow="Flagship Programs"
            title="Programs Engineered for Career Outcomes"
            description="Every course is built with industry leaders, reviewed by experts, and designed to get you hired."
          />

          <StaggerContainer className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {courses.map((course) => (
              <StaggerItem key={course.title} className="h-full">
                <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-white/30 hover:bg-white/[0.15]">
                  {/* Hover glow */}
                  <div
                    aria-hidden="true"
                    className={cn(
                      "absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-gradient-to-br opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-40",
                      course.gradient
                    )}
                  />

                  {/* Category badge */}
                  <div className="relative mb-5 flex items-center justify-between">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r px-3 py-1 text-xs font-bold text-white shadow-lg",
                        course.gradient
                      )}
                    >
                      <BookOpenIcon className="h-3 w-3" aria-hidden="true" />
                      {course.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-semibold text-[#ffd25e]">
                      <StarIcon className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                      {course.rating}
                    </span>
                  </div>

                  <h3 className="relative text-lg leading-snug font-bold text-white">
                    {course.title}
                  </h3>
                  <p className="relative mt-2.5 flex-1 text-sm leading-relaxed text-white/70">
                    {course.description}
                  </p>

                  {/* Tags */}
                  <div className="relative mt-4 flex flex-wrap gap-1.5">
                    {course.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 text-[0.65rem] font-semibold text-white/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Meta */}
                  <div className="relative mt-5 flex flex-wrap gap-x-4 gap-y-2 border-t border-white/10 pt-4 text-xs text-white/60">
                    <span className="flex items-center gap-1.5">
                      <ClockIcon className="h-3.5 w-3.5 text-[#ffd25e]" aria-hidden="true" />
                      {course.duration}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <UsersIcon className="h-3.5 w-3.5 text-[#ffd25e]" aria-hidden="true" />
                      {course.students}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <BarChart3Icon className="h-3.5 w-3.5 text-[#ffd25e]" aria-hidden="true" />
                      {course.level}
                    </span>
                  </div>

                  {/* CTA link */}
                  <div className="relative mt-5">
                    <span className="inline-flex items-center gap-1.5 text-sm font-bold text-white transition-colors group-hover:text-[#ffd25e]">
                      View Details
                      <ArrowRightIcon
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Bottom row */}
          <FadeIn delay={0.2}>
            <div className="mt-12 flex flex-col items-center justify-between gap-6 rounded-2xl border border-white/15 bg-white/5 px-6 py-6 backdrop-blur-md sm:flex-row">
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold text-royal-deep">
                  <CheckCircle2Icon className="h-5.5 w-5.5" aria-hidden="true" />
                </span>
                <p className="text-sm leading-snug text-white/80">
                  <span className="font-bold text-white">340+ additional courses</span> in
                  marketing, finance, cybersecurity, and more.
                </p>
              </div>
              <Link href="/#contact" className="shrink-0">
                <Button variant="gold" size="lg" className="group gap-2 rounded-full">
                  View All Programs
                  <ArrowRightIcon
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </SectionWrapper>
  )
}