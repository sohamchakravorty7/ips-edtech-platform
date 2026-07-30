import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SectionWrapper, SectionHeader } from "@/components/shared/section-wrapper"
import { ClockIcon, UsersIcon, BarChart3Icon } from "lucide-react"

const courses = [
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
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {courses.map((course) => (
          <div
            key={course.title}
            className="group rounded-lg border bg-background p-6 transition-all hover:shadow-lg"
          >
            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              {course.category}
            </span>
            <h3 className="mt-4 text-lg font-semibold">{course.title}</h3>
            <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
              {course.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <ClockIcon className="h-3 w-3" aria-hidden="true" />
                {course.duration}
              </span>
              <span className="flex items-center gap-1">
                <UsersIcon className="h-3 w-3" aria-hidden="true" />
                {course.students}
              </span>
              <span className="flex items-center gap-1">
                <BarChart3Icon className="h-3 w-3" aria-hidden="true" />
                {course.level}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link href="/#contact">
          <Button variant="outline" size="lg">
            View All Courses
          </Button>
        </Link>
      </div>
    </SectionWrapper>
  )
}