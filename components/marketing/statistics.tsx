"use client"

import { useInView } from "react-intersection-observer"
import CountUp from "react-countup"
import { motion, useReducedMotion } from "framer-motion"
import { SectionWrapper } from "@/components/shared/section-wrapper"

interface Stat {
  label: string
  value: number
  suffix: string
}

const stats: Stat[] = [
  { label: "Active Students", value: 50000, suffix: "+" },
  { label: "Courses Available", value: 500, suffix: "+" },
  { label: "Expert Instructors", value: 200, suffix: "+" },
  { label: "Hours of Content", value: 10000, suffix: "+" },
]

function StatItem({ label, value, suffix }: Stat) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  })
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="text-4xl font-bold tracking-tight sm:text-5xl">
        {inView ? (
          <CountUp
            end={value}
            duration={shouldReduceMotion ? 0 : 2}
            separator=","
          />
        ) : (
          <span>0</span>
        )}
        {suffix}
      </div>
      <p className="mt-2 text-sm font-medium text-muted-foreground">{label}</p>
    </motion.div>
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