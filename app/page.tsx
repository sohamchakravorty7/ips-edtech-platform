import { Hero } from "@/components/marketing/hero"
import { About } from "@/components/marketing/about"
import { CoursesPreview } from "@/components/marketing/courses-preview"
import { WhyChooseUs } from "@/components/marketing/why-choose-us"
import { Statistics } from "@/components/marketing/statistics"
import { Testimonials } from "@/components/marketing/testimonials"
import { Gallery } from "@/components/marketing/gallery"
import { Contact } from "@/components/marketing/contact"

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <CoursesPreview />
      <WhyChooseUs />
      <Statistics />
      <Testimonials />
      <Gallery />
      <Contact />
    </>
  )
}