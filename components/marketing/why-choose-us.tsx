import { SectionWrapper, SectionHeader } from "@/components/shared/section-wrapper"
import { StaggerContainer, StaggerItem } from "@/components/shared/motion-wrapper"
import { SparklesIcon, ZapIcon, HeadphonesIcon, GraduationCapIcon, type LucideIcon } from "lucide-react"

interface Reason {
  title: string
  description: string
  icon: LucideIcon
}

const reasons: Reason[] = [
  {
    title: "Expert Instructors",
    description:
      "Learn from industry professionals with years of real-world experience in their respective fields.",
    icon: GraduationCapIcon,
  },
  {
    title: "Hands-On Learning",
    description:
      "Apply your knowledge with practical projects, quizzes, and interactive exercises designed to reinforce learning.",
    icon: ZapIcon,
  },
  {
    title: "Flexible Schedule",
    description:
      "Learn at your own pace with on-demand video lectures, downloadable resources, and mobile-friendly content.",
    icon: SparklesIcon,
  },
  {
    title: "Dedicated Support",
    description:
      "Get help when you need it with 24/7 support, active community forums, and direct messaging with instructors.",
    icon: HeadphonesIcon,
  },
]

export function WhyChooseUs() {
  return (
    <SectionWrapper id="why-choose-us">
      <SectionHeader
        title="Why Choose iPS?"
        description="We're committed to providing the best learning experience possible. Here's what sets us apart."
      />
      <StaggerContainer className="grid gap-6 sm:grid-cols-2">
        {reasons.map((reason) => (
          <StaggerItem key={reason.title}>
            <div className="group flex items-start gap-4 rounded-xl border bg-card p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                <reason.icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{reason.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {reason.description}
                </p>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </SectionWrapper>
  )
}