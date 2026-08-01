import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SectionWrapper, SectionHeader } from "@/components/shared/section-wrapper"
import { StaggerContainer, StaggerItem } from "@/components/shared/motion-wrapper"
import { ClockIcon, UsersIcon, BarChart3Icon, ArrowRightIcon } from "lucide-react"

interface Course {
  title: string
  description: string
  category: string
  duration: string
  students: string
  level: string
}

const courses: Course[] = [
  {
    title: "Web Development Fundamentals",
    description: "Learn HTML, CSS, and JavaScript from scratch. Build responsive websites and interactive web applications.",
    category: "Development",
    duration: "8 weeks",
    students: "2,500+",
    level: "Beginner",
  },
  {
    title: "Data Science & Machine Learning",
    description: "Master Python, statistics, and machine learning algorithms. Work with real-world datasets and build predictive models.",
    category: "Data Science",
    duration: "12 weeks",
    students: "1,800+",
    level: "Intermediate",
  },
  {
    title: "UI/UX Design Masterclass",
    description: "Learn design thinking, wireframing, prototyping, and user research. Create beautiful, user-centered digital products.",
    category: "Design",
    duration: "6 weeks",
    students: "1,200+",
    level: "All Levels",
  },
  {
    title: "Cloud Computing with AWS",
    description: "Understand cloud architecture, deployment, and management. Prepare for AWS certification exams.",
    category: "Cloud",
    duration: "10 weeks",
    students: "950+",
    level: "Intermediate",
  },
]

export function CoursesPreview() {
  return (
    <SectionWrapper id="courses" className="bg-muted/30">
      <SectionHeader
        title="Popular Courses"
        description="Explore our most popular courses and start your learning journey today."
      />
      <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {courses.map((course) => (
          <StaggerItem key={course.title} className="h-full">
            <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              {/* Category badge */}
              <div className="p-6 pb-0">
                <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {course.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-semibold leading-snug">{course.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                  {course.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <ClockIcon className="h-3.5 w-3.5" aria-hidden="true" />
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <UsersIcon className="h-3.5 w-3.5" aria-hidden="true" />
                    {course.students}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <BarChart3Icon className="h-3.5 w-3.5" aria-hidden="true" />
                    {course.level}
                  </span>
                </div>
              </div>
              <div className="border-t px-6 py-4">
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors group-hover:text-primary">
                  View Details
                  <ArrowRightIcon
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </article>
          </StaggerItem>
        ))}
      </StaggerContainer>
      <div className="mt-12 text-center">
        <Link href="/#contact">
          <Button variant="outline" size="lg" className="rounded-full">
            View All Courses
          </Button>
        </Link>
      </div>
    </SectionWrapper>
  )
}