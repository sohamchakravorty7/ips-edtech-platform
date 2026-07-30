import { SectionWrapper, SectionHeader } from "@/components/shared/section-wrapper"
import { BookOpenIcon, UsersIcon, GlobeIcon, ShieldIcon } from "lucide-react"

const features = [
  {
    title: "For Students",
    description:
      "Enroll in courses, attend live classes, complete assignments, track your progress, and collaborate with peers.",
    icon: BookOpenIcon,
  },
  {
    title: "For Educators",
    description:
      "Create and manage courses, assess students, communicate with your class, and gain insights with analytics.",
    icon: UsersIcon,
  },
  {
    title: "For Administrators",
    description:
      "Manage users, configure platform settings, view reports, and monitor system health from a single dashboard.",
    icon: GlobeIcon,
  },
  {
    title: "Enterprise-Grade",
    description:
      "Built for scale with robust security, high availability, and performance to serve 100,000+ concurrent users.",
    icon: ShieldIcon,
  },
]

export function About() {
  return (
    <SectionWrapper id="about">
      <SectionHeader
        title="Built for Everyone"
        description="Whether you're a student, educator, or administrator, iPS provides the tools you need to succeed."
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="group rounded-lg border p-6 transition-colors hover:bg-muted/50"
          >
            <feature.icon className="mb-4 h-8 w-8 text-foreground" aria-hidden="true" />
            <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}