import { cn } from "@/lib/utils"
import { FadeIn } from "@/components/shared/motion-wrapper"

interface SectionWrapperProps {
  children: React.ReactNode
  className?: string
  id?: string
}

export function SectionWrapper({ children, className, id }: SectionWrapperProps) {
  return (
    <section id={id} className={cn("relative py-16 md:py-24 lg:py-32", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  )
}

interface SectionHeaderProps {
  title: string
  description?: string
  eyebrow?: string
  align?: "center" | "left"
  onDark?: boolean
  className?: string
}

export function SectionHeader({
  title,
  description,
  eyebrow,
  align = "center",
  onDark = false,
  className,
}: SectionHeaderProps) {
  return (
    <FadeIn
      className={cn(
        "mb-12 max-w-2xl lg:mb-16",
        align === "center" && "mx-auto text-center",
        onDark && "text-white",
        className
      )}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-white/10 px-3.5 py-1.5 text-xs font-semibold tracking-widest text-[#ffd25e] uppercase backdrop-blur-sm dark:border-gold/30 dark:bg-gold-soft dark:text-[#a06b00]">
          <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
          {eyebrow}
        </span>
      )}
      <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-balance sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed sm:text-lg",
            onDark ? "text-white/70" : "text-muted-foreground"
          )}
        >
          {description}
        </p>
      )}
    </FadeIn>
  )
}
