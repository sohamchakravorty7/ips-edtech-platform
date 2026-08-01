import Link from "next/link"
import { Button } from "@/components/ui/button"
import { APP_TAGLINE } from "@/lib/constants"
import { FadeIn } from "@/components/shared/motion-wrapper"

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28 lg:py-36">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/[0.04] via-background to-background" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      
      {/* Glow orbs */}
      <div className="absolute -top-24 left-1/2 -z-10 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full border bg-background px-4 py-1.5 text-xs font-medium text-muted-foreground">
            Next-generation learning platform
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            {APP_TAGLINE}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
            A unified ecosystem for students, educators, and administrators to create, consume, and
            manage educational content at scale. Learn, teach, and grow with iPS.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link href="/#courses" className="w-full sm:w-auto">
              <Button size="lg" className="w-full rounded-full sm:w-auto">
                Explore Courses
              </Button>
            </Link>
            <Link href="/#about" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full rounded-full sm:w-auto">
                Learn More
              </Button>
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}