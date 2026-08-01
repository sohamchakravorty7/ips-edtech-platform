import { SectionWrapper, SectionHeader } from "@/components/shared/section-wrapper"
import { StaggerContainer, StaggerItem, FadeIn } from "@/components/shared/motion-wrapper"
import { Button } from "@/components/ui/button"
import {
  BookOpenIcon,
  BriefcaseIcon,
  ArrowRightIcon,
  AwardIcon,
  Building2Icon,
  GraduationCapIcon,
  type LucideIcon,
} from "lucide-react"
import Link from "next/link"

interface Audience {
  title: string
  description: string
  icon: LucideIcon
  gradient: string
  stat: string
  statLabel: string
}

const audiences: Audience[] = [
  {
    title: "For Students",
    description:
      "Master in-demand skills with live classes, hands-on projects, and personal mentorship from industry experts.",
    icon: BookOpenIcon,
    gradient: "from-[#0f3d91] to-[#4338ca]",
    stat: "50K+",
    statLabel: "Students upskilling daily",
  },
  {
    title: "For Educators",
    description:
      "Create world-class courses, track student progress with powerful analytics, and reach millions of learners.",
    icon: GraduationCapIcon,
    gradient: "from-[#f4b400] to-[#e08e00]",
    stat: "200+",
    statLabel: "Expert instructors",
  },
  {
    title: "For Recruiters",
    description:
      "Discover job-ready talent from India's most rigorous skill programs with verified competency profiles.",
    icon: BriefcaseIcon,
    gradient: "from-[#4338ca] to-[#0f3d91]",
    stat: "1,200+",
    statLabel: "Hiring partners",
  },
  {
    title: "For Institutions",
    description:
      "Empower your campus with enterprise-grade learning infrastructure, accreditation-ready analytics, and full control.",
    icon: Building2Icon,
    gradient: "from-[#0ea5e9] to-[#0f3d91]",
    stat: "40+",
    statLabel: "Partner institutions",
  },
]

export function About() {
  return (
    <SectionWrapper id="about" className="overflow-hidden">
      {/* Decorative background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute top-20 -left-40 h-[400px] w-[400px] rounded-full bg-royal/[0.05] blur-[100px]" />
        <div className="absolute bottom-20 -right-40 h-[400px] w-[400px] rounded-full bg-gold/[0.08] blur-[100px]" />
      </div>

      <SectionHeader
        eyebrow="Who It's For"
        title="One Platform, Every Stage of Your Career"
        description="Whether you're starting out, levelling up, hiring talent, or building institutions — iPS has the tools to take you further."
      />

      <StaggerContainer className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {audiences.map((audience) => (
          <StaggerItem key={audience.title} className="h-full">
            <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card p-7 shadow-premium transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_1px_2px_rgb(11_28_63/0.04),0_16px_40px_-8px_rgb(15_61_145/0.2)]">
              {/* Hover gradient wash */}
              <div
                aria-hidden="true"
                className={`absolute inset-0 bg-gradient-to-br ${audience.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-[0.04]`}
              />

              {/* Icon tile */}
              <div
                className={`relative mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${audience.gradient} text-white shadow-[0_8px_24px_-6px_rgb(15_61_145/0.4)] transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3`}
              >
                <audience.icon className="h-6.5 w-6.5" aria-hidden="true" />
              </div>

              <h3 className="relative text-xl font-bold tracking-tight">
                {audience.title}
              </h3>
              <p className="relative mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {audience.description}
              </p>

              {/* Stat */}
              <div className="relative mt-6 flex items-center gap-3 border-t border-border pt-5">
                <span className="text-2xl font-extrabold tracking-tight text-royal dark:text-blue-400">
                  {audience.stat}
                </span>
                <span className="text-xs leading-snug font-medium text-muted-foreground">
                  {audience.statLabel}
                </span>
              </div>
            </article>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Bottom CTA row */}
      <FadeIn delay={0.2}>
        <div className="mt-14 flex flex-col items-center justify-center gap-4 rounded-3xl border border-gold/20 bg-gradient-to-r from-royal-soft via-gold-soft/40 to-royal-soft px-8 py-8 text-center sm:flex-row sm:text-left">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold text-royal-deep shadow-[0_8px_24px_-6px_rgb(244_180_0/0.5)]">
            <AwardIcon className="h-6 w-6" aria-hidden="true" />
          </span>
          <p className="text-sm leading-relaxed text-foreground sm:text-base">
            <span className="font-bold">Ranked #1 EdTech platform in India</span> for
            career outcomes by leading education analysts. Join them today.
          </p>
          <Link href="/#courses" className="shrink-0">
            <Button variant="default" size="sm" className="group gap-1.5 rounded-full">
              Explore Programs
              <ArrowRightIcon
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Button>
          </Link>
        </div>
      </FadeIn>
    </SectionWrapper>
  )
}