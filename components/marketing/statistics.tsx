"use client"

import { useInView } from "react-intersection-observer"
import CountUp from "react-countup"
import { motion, useReducedMotion } from "framer-motion"
import {
  GraduationCapIcon,
  BookOpenIcon,
  UsersIcon,
  ClapperboardIcon,
  type LucideIcon,
} from "lucide-react"

interface Stat {
  label: string
  value: number
  suffix: string
  icon: LucideIcon
}

const stats: Stat[] = [
  { label: "Active Students", value: 50000, suffix: "+", icon: GraduationCapIcon },
  { label: "Courses Available", value: 500, suffix: "+", icon: BookOpenIcon },
  { label: "Expert Instructors", value: 200, suffix: "+", icon: UsersIcon },
  { label: "Hours of Content", value: 10000, suffix: "+", icon: ClapperboardIcon },
]

function StatItem({ label, value, suffix, icon: Icon }: Stat) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  })
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className="group relative text-center"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="relative mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-[#ffd25e] ring-1 ring-white/20 backdrop-blur-md transition-all duration-500 group-hover:scale-110 group-hover:bg-gold group-hover:text-royal-deep">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <div className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
        {inView ? (
          <CountUp
            end={value}
            duration={shouldReduceMotion ? 0 : 2.5}
            separator=","
          />
        ) : (
          <span>0</span>
        )}
        <span className="text-gradient-gold">{suffix}</span>
      </div>
      <p className="mt-2.5 text-sm font-semibold tracking-wide text-white/65 uppercase">
        {label}
      </p>
    </motion.div>
  )
}

export function Statistics() {
  return (
    <section aria-label="Platform statistics" className="relative overflow-hidden py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#0d2f6e] via-[#0f3d91] to-[#08224f] px-6 py-14 shadow-[0_32px_80px_-24px_rgb(15_61_145/0.5)] sm:px-10 md:py-20">
          {/* Decorative elements */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute -top-24 -left-24 h-[300px] w-[300px] rounded-full bg-indigo-brand/40 blur-[100px]" />
            <div className="absolute -right-24 -bottom-24 h-[300px] w-[300px] rounded-full bg-gold/20 blur-[100px]" />
            <div className="absolute inset-0 opacity-[0.06] [background:linear-gradient(to_right,rgb(255_255_255/0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.5)_1px,transparent_1px)] [background-size:2.5rem_2.5rem]" />
          </div>

          <div className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <StatItem key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}