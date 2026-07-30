"use client"

import { useInView } from "react-intersection-observer"
import CountUp from "react-countup"
import { SectionWrapper } from "@/components/shared/section-wrapper"

const stats = [
  { label: "Active Students", value: 50000, suffix: "+" },
  { label: "Courses Available", value: 500, suffix: "+" },
  { label: "Expert Instructors", value: 200, suffix: "+" },
  { label: "Hours of Content", value: 10000, suffix: "+" },
]

function StatItem({ label, value, suffix }: { label: string; value: number; suffix: string }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  })

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl font-bold tracking-tight sm:text-5xl">
        {inView ? (
          <CountUp end={value} duration={2.5} separator="," />
        ) : (
          <span>0</span>
        )}
        {suffix}
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{label}</p>
    </div>
  )
}

export function Statistics() {
  return (
    <SectionWrapper className="bg-muted/30">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatItem key={stat.label} {...stat} />
        ))}
      </div>
    </SectionWrapper>
  )
}