import { SectionWrapper, SectionHeader } from "@/components/shared/section-wrapper"
import { StaggerContainer, StaggerItem } from "@/components/shared/motion-wrapper"
import { BookOpenIcon, UsersIcon, GlobeIcon, ShieldIcon, type LucideIcon } from "lucide-react"

interface Feature {
  title: string
  description: string
  icon: LucideIcon
}

const features: Feature[] = [
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
      <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <StaggerItem key={feature.title}>
            <div className="group relative overflow-hidden rounded-xl border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                <feature.icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </SectionWrapper>
  )
}