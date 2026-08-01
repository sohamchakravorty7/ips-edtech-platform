import { SectionWrapper, SectionHeader } from "@/components/shared/section-wrapper"
import { StaggerContainer, StaggerItem } from "@/components/shared/motion-wrapper"
import { QuoteIcon } from "lucide-react"

interface Testimonial {
  name: string
  role: string
  content: string
  avatar: string
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    role: "Software Engineer",
    content:
      "iPS completely transformed my career. The web development course was incredibly well-structured, and the instructors were always available to help. I landed my dream job within three months of completing the program.",
    avatar: "SJ",
  },
  {
    name: "Michael Chen",
    role: "Data Scientist",
    content:
      "The data science program at iPS is top-notch. The curriculum is up-to-date with industry standards, and the hands-on projects gave me the confidence to tackle real-world problems. Highly recommended!",
    avatar: "MC",
  },
  {
    name: "Emily Rodriguez",
    role: "UX Designer",
    content:
      "As someone transitioning from a different field, iPS made the learning process seamless. The design course was comprehensive, and the portfolio projects helped me showcase my skills to potential employers.",
    avatar: "ER",
  },
]

export function Testimonials() {
  return (
    <SectionWrapper id="testimonials" className="bg-muted/30">
      <SectionHeader
        title="What Our Students Say"
        description="Hear from our community of learners who have transformed their careers with iPS."
      />
      <StaggerContainer className="grid gap-6 md:grid-cols-3">
        {testimonials.map((testimonial) => (
          <StaggerItem key={testimonial.name} className="h-full">
            <figure className="relative flex h-full flex-col rounded-xl border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <QuoteIcon
                className="absolute right-5 top-5 h-8 w-8 text-muted-foreground/10"
                aria-hidden="true"
              />
              <blockquote className="flex-1">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t pt-4">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary"
                  aria-hidden="true"
                >
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </figcaption>
            </figure>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </SectionWrapper>
  )
}