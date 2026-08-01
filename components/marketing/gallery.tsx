import { SectionWrapper, SectionHeader } from "@/components/shared/section-wrapper"
import { StaggerContainer, StaggerItem } from "@/components/shared/motion-wrapper"
import { MonitorIcon, VideoIcon, BookOpenIcon, LineChartIcon, UsersIcon, SmartphoneIcon, type LucideIcon } from "lucide-react"

interface GalleryItem {
  label: string
  color: string
  icon: LucideIcon
}

const galleryItems: GalleryItem[] = [
  {
    label: "Interactive Dashboard",
    color: "bg-blue-100 dark:bg-blue-950",
    icon: MonitorIcon,
  },
  {
    label: "Live Classes",
    color: "bg-green-100 dark:bg-green-950",
    icon: VideoIcon,
  },
  {
    label: "Course Content",
    color: "bg-purple-100 dark:bg-purple-950",
    icon: BookOpenIcon,
  },
  {
    label: "Student Analytics",
    color: "bg-orange-100 dark:bg-orange-950",
    icon: LineChartIcon,
  },
  {
    label: "Collaboration Tools",
    color: "bg-pink-100 dark:bg-pink-950",
    icon: UsersIcon,
  },
  {
    label: "Mobile Learning",
    color: "bg-teal-100 dark:bg-teal-950",
    icon: SmartphoneIcon,
  },
]

export function Gallery() {
  return (
    <SectionWrapper id="gallery">
      <SectionHeader
        title="Platform Highlights"
        description="See what our platform looks like in action. Here are some highlights from our learning environment."
      />
      <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {galleryItems.map((item) => (
          <StaggerItem key={item.label}>
            <div
              className={`group flex aspect-video items-center justify-center rounded-xl ${item.color} border transition-all duration-300 hover:scale-[1.02] hover:shadow-md`}
            >
              <div className="flex flex-col items-center gap-3">
                <item.icon
                  className="h-8 w-8 text-foreground/40 transition-colors duration-300 group-hover:text-foreground/70"
                  aria-hidden="true"
                />
                <span className="text-lg font-semibold text-foreground/60">
                  {item.label}
                </span>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </SectionWrapper>
  )
}