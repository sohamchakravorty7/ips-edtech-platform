import { SectionWrapper, SectionHeader } from "@/components/shared/section-wrapper"
import { StaggerContainer, StaggerItem } from "@/components/shared/motion-wrapper"
import {
  MonitorIcon,
  VideoIcon,
  BookOpenIcon,
  LineChartIcon,
  UsersIcon,
  SmartphoneIcon,
  ArrowUpRightIcon,
  type LucideIcon,
} from "lucide-react"

interface GalleryItem {
  label: string
  description: string
  gradient: string
  icon: LucideIcon
}

const galleryItems: GalleryItem[] = [
  {
    label: "Interactive Dashboard",
    description: "Your learning command center",
    gradient: "from-[#0f3d91] to-[#4338ca]",
    icon: MonitorIcon,
  },
  {
    label: "Live Classes",
    description: "Real-time with industry mentors",
    gradient: "from-[#4338ca] to-[#0f3d91]",
    icon: VideoIcon,
  },
  {
    label: "Course Content",
    description: "Premium, project-based curriculum",
    gradient: "from-[#f4b400] to-[#e08e00]",
    icon: BookOpenIcon,
  },
  {
    label: "Career Analytics",
    description: "Track your placement readiness",
    gradient: "from-[#0ea5e9] to-[#0f3d91]",
    icon: LineChartIcon,
  },
  {
    label: "Collaboration Hub",
    description: "Learn together, grow together",
    gradient: "from-[#8b5cf6] to-[#4338ca]",
    icon: UsersIcon,
  },
  {
    label: "Mobile Learning",
    description: "Your classroom, everywhere",
    gradient: "from-[#f59e0b] to-[#f4b400]",
    icon: SmartphoneIcon,
  },
]

export function Gallery() {
  return (
    <SectionWrapper id="gallery" className="overflow-hidden">
      {/* Decorative background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/3 -left-40 h-[400px] w-[400px] rounded-full bg-royal/[0.05] blur-[100px]" />
        <div className="absolute bottom-0 -right-40 h-[400px] w-[400px] rounded-full bg-gold/[0.07] blur-[100px]" />
      </div>

      <SectionHeader
        eyebrow="Inside the Platform"
        title="Experience the iPS Learning Ecosystem"
        description="A beautifully crafted platform designed for focus, flow, and measurable progress — on every device."
      />

      <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {galleryItems.map((item) => (
          <StaggerItem key={item.label} className="h-full">
            <div className="group relative overflow-hidden rounded-3xl border border-border bg-card shadow-premium transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_1px_2px_rgb(11_28_63/0.04),0_20px_48px_-12px_rgb(15_61_145/0.2)]">
              {/* Placeholder image area */}
              <div
                className={`relative aspect-[16/10] overflow-hidden bg-gradient-to-br ${item.gradient}`}
              >
                {/* Decorative pattern */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-20 [background:linear-gradient(to_right,rgb(255_255_255/0.3)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.3)_1px,transparent_1px)] [background-size:1.75rem_1.75rem]"
                />
                {/* Glow */}
                <div
                  aria-hidden="true"
                  className="absolute -top-16 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-white/25 blur-3xl"
                />

                {/* Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 text-white ring-1 ring-white/25 backdrop-blur-md transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6">
                    <item.icon className="h-7 w-7" aria-hidden="true" />
                  </div>
                </div>

                {/* Hover shimmer */}
                <div
                  aria-hidden="true"
                  className="absolute inset-y-0 -left-1/2 w-1/3 animate-shimmer bg-gradient-to-r from-transparent via-white/15 to-transparent transition-opacity duration-500 group-hover:opacity-100"
                />
              </div>

              {/* Content */}
              <div className="flex items-center justify-between gap-3 p-5">
                <div>
                  <h3 className="text-base font-bold tracking-tight">{item.label}</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {item.description}
                  </p>
                </div>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-royal-soft text-royal transition-all duration-300 group-hover:bg-royal group-hover:text-white dark:bg-white/10 dark:text-white">
                  <ArrowUpRightIcon className="h-4 w-4" aria-hidden="true" />
                </span>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </SectionWrapper>
  )
}