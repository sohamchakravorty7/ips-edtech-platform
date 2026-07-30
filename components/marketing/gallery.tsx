import { SectionWrapper, SectionHeader } from "@/components/shared/section-wrapper"

const galleryItems = [
  { label: "Interactive Dashboard", color: "bg-blue-100 dark:bg-blue-950" },
  { label: "Live Classes", color: "bg-green-100 dark:bg-green-950" },
  { label: "Course Content", color: "bg-purple-100 dark:bg-purple-950" },
  { label: "Student Analytics", color: "bg-orange-100 dark:bg-orange-950" },
  { label: "Collaboration Tools", color: "bg-pink-100 dark:bg-pink-950" },
  { label: "Mobile Learning", color: "bg-teal-100 dark:bg-teal-950" },
]

export function Gallery() {
  return (
    <SectionWrapper id="gallery">
      <SectionHeader
        title="Platform Highlights"
        description="See what our platform looks like in action. Here are some highlights from our learning environment."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {galleryItems.map((item) => (
          <div
            key={item.label}
            className={`flex aspect-video items-center justify-center rounded-lg ${item.color} border transition-transform hover:scale-[1.02]`}
          >
            <span className="text-lg font-semibold text-foreground/60">{item.label}</span>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}