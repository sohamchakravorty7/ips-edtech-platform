import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/shared/motion-wrapper"
import {
  ArrowRightIcon,
  PlayIcon,
  ShieldCheckIcon,
  StarIcon,
  SparklesIcon,
  TrendingUpIcon,
  UsersIcon,
  AwardIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

const heroStats = [
  { value: "50K+", label: "Active Learners" },
  { value: "500+", label: "Expert Courses" },
  { value: "92%", label: "Placement Rate" },
]

const trustedBy = ["IIM", "NIT", "IIT", "AICTE", "UGC", "NAAC"]

function HeroImagePlaceholder() {
  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] shadow-[0_32px_80px_-16px_rgb(0_0_0/0.45)] ring-1 ring-white/25">
      {/* Placeholder gradient image */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1e5ac2] via-[#0f3d91] to-[#08224f]" />
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-20 [background:linear-gradient(to_right,rgb(255_255_255/0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.2)_1px,transparent_1px)] [background-size:2.5rem_2.5rem]" />

      {/* Sun glow */}
      <div className="absolute -top-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-gold/25 blur-3xl" />

      {/* Student silhouette placeholder */}
      <div className="absolute inset-x-0 bottom-0 flex h-[72%] items-end justify-center overflow-hidden">
        <div className="relative h-full w-full">
          {/* Head */}
          <div className="absolute left-1/2 top-[12%] h-24 w-24 -translate-x-1/2 rounded-full bg-gradient-to-b from-white/30 to-white/10 ring-1 ring-white/30" />
          {/* Body */}
          <div className="absolute inset-x-[18%] bottom-0 top-[30%] rounded-t-[10rem] bg-gradient-to-b from-white/25 to-white/10 ring-1 ring-white/25" />
          {/* Laptop */}
          <div className="absolute bottom-[18%] left-1/2 h-10 w-48 -translate-x-1/2 rounded-xl border-4 border-white/30 bg-white/10" />
        </div>
      </div>

      {/* Floating badge - top */}
      <div className="absolute right-4 top-6 animate-float rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/25 backdrop-blur-xl">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold text-royal-deep">
            <AwardIcon className="h-4.5 w-4.5" aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-bold text-white">#1 Ranked</p>
            <p className="text-xs text-white/70">EdTech in India</p>
          </div>
        </div>
      </div>

      {/* Floating badge - bottom left */}
      <div className="absolute bottom-6 left-4 animate-float-slow rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/25 backdrop-blur-xl">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20">
            <TrendingUpIcon className="h-4.5 w-4.5 text-[#ffd25e]" aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-bold text-white">92% Placements</p>
            <p className="text-xs text-white/70">1,200+ Companies</p>
          </div>
        </div>
      </div>

      {/* Rating pill */}
      <div className="absolute bottom-24 right-5 flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-2 ring-1 ring-white/25 backdrop-blur-xl">
        <span className="flex" aria-hidden="true">
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon key={i} className="h-3.5 w-3.5 fill-gold text-gold" />
          ))}
        </span>
        <span className="text-xs font-semibold text-white">4.9/5</span>
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0d2f6e] via-royal to-royal-deep pt-32 pb-20 md:pt-40 md:pb-28 lg:pt-44 lg:pb-32">
      {/* Decorative elements */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {/* Glow orbs */}
        <div className="absolute -top-32 -left-32 h-[480px] w-[480px] rounded-full bg-indigo-brand/40 blur-[120px]" />
        <div className="absolute top-1/3 -right-40 h-[520px] w-[520px] rounded-full bg-[#1e5ac2]/60 blur-[140px]" />
        <div className="absolute -bottom-40 left-1/3 h-[420px] w-[420px] rounded-full bg-gold/15 blur-[120px]" />

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.07] [background:linear-gradient(to_right,rgb(255_255_255/0.6)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.6)_1px,transparent_1px)] [background-size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,#000_50%,transparent_100%)]" />

        {/* Bottom wave divider */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-12">
          {/* Left content */}
          <div className="text-center lg:text-left">
            <FadeIn>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 py-1.5 pr-4 pl-1.5 text-xs font-semibold tracking-wide text-white backdrop-blur-md">
                <span className="rounded-full bg-gold px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-widest text-royal-deep">
                  New
                </span>
                {"India\u2019s Premier Career-Focused Learning Platform"}
              </span>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="mt-7 text-4xl leading-[1.08] font-extrabold tracking-tight text-balance text-white sm:text-5xl md:text-6xl lg:text-7xl">
                Build a Career That{" "}
                <span className="text-gradient-gold">Commands Attention</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.18}>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/75 sm:text-xl lg:mx-0">
                {"World-class education, industry mentors, and guaranteed career outcomes \u2014 all in one powerful platform built for India\u2019s next generation of leaders."}
              </p>
            </FadeIn>

            <FadeIn delay={0.26}>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
                <Link href="/#courses" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="gold"
                    className="group w-full gap-2 rounded-full px-8 sm:w-auto"
                  >
                    Start Learning Today
                    <ArrowRightIcon
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Button>
                </Link>
                <Link href="/#about" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="outline"
                    className="group w-full gap-2 rounded-full border-white/25 bg-white/10 px-8 text-white backdrop-blur-md hover:border-white/40 hover:bg-white/20 hover:text-white sm:w-auto"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 transition-colors group-hover:bg-white/30">
                      <PlayIcon className="h-3 w-3 fill-current" aria-hidden="true" />
                    </span>
                    Watch Platform Tour
                  </Button>
                </Link>
              </div>
            </FadeIn>

            {/* Trust indicators */}
            <FadeIn delay={0.34}>
              <div className="mt-10">
                <p className="text-xs font-semibold tracking-widest text-white/50 uppercase">
                  Trusted by learners from
                </p>
                <div className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 lg:justify-start">
                  {trustedBy.map((org) => (
                    <span
                      key={org}
                      className="text-sm font-extrabold tracking-wide text-white/40 uppercase transition-colors hover:text-white/70"
                    >
                      {org}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right image */}
          <FadeIn delay={0.2} y={40}>
            <HeroImagePlaceholder />
          </FadeIn>
        </div>

        {/* Animated statistics */}
        <FadeIn delay={0.3} y={30}>
          <div className="mt-20 grid gap-6 rounded-3xl border border-white/15 bg-white/10 px-6 py-10 backdrop-blur-xl sm:grid-cols-3 sm:py-8 lg:mt-28">
            {heroStats.map((stat, i) => (
              <div
                key={stat.label}
                className={cn(
                  "text-center",
                  i > 0 && "sm:border-l sm:border-white/15"
                )}
              >
                <div className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                  {stat.value}
                </div>
                <div className="mt-2 flex items-center justify-center gap-1.5 text-sm font-medium text-white/65">
                  <SparklesIcon className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Bottom trust strip */}
        <div className="mt-8 flex flex-col items-center justify-center gap-2 text-center text-xs text-white/50 sm:flex-row sm:gap-3">
          <span className="flex items-center gap-1.5">
            <ShieldCheckIcon className="h-4 w-4 text-gold" aria-hidden="true" />
            ISO 27001 Certified
          </span>
          <span className="hidden sm:inline" aria-hidden="true">•</span>
          <span className="flex items-center gap-1.5">
            <UsersIcon className="h-4 w-4 text-gold" aria-hidden="true" />
            50,000+ Students Enrolled
          </span>
          <span className="hidden sm:inline" aria-hidden="true">•</span>
          <span className="flex items-center gap-1.5">
            <AwardIcon className="h-4 w-4 text-gold" aria-hidden="true" />
            Recognised by Govt. of India
          </span>
        </div>
      </div>
    </section>
  )
}