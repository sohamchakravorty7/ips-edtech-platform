import Link from "next/link"
import { Button } from "@/components/ui/button"
import { APP_TAGLINE } from "@/lib/constants"

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-muted/50 to-background" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            {APP_TAGLINE}
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            A unified ecosystem for students, educators, and administrators to create, consume, and
            manage educational content at scale. Learn, teach, and grow with iPS.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link href="/#courses">
              <Button size="lg">Explore Courses</Button>
            </Link>
            <Link href="/#about">
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}