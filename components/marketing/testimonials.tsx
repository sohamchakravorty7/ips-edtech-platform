import { SectionWrapper, SectionHeader } from "@/components/shared/section-wrapper"
import { QuoteIcon } from "lucide-react"

const testimonials = [
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
      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.name}
            className="relative rounded-lg border bg-background p-6"
          >
            <QuoteIcon
              className="absolute right-4 top-4 h-8 w-8 text-muted-foreground/20"
              aria-hidden="true"
            />
            <p className="text-sm leading-relaxed text-muted-foreground">
              &ldquo;{testimonial.content}&rdquo;
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                {testimonial.avatar}
              </div>
              <div>
                <p className="text-sm font-semibold">{testimonial.name}</p>
                <p className="text-xs text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}