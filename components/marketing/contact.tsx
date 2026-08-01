import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SectionWrapper, SectionHeader } from "@/components/shared/section-wrapper"
import { MailIcon, MapPinIcon, PhoneIcon, SendIcon, UserIcon } from "lucide-react"
import { COMPANY_INFO } from "@/lib/constants"
import { FadeIn } from "@/components/shared/motion-wrapper"

export function Contact() {
  return (
    <SectionWrapper id="contact" className="bg-muted/30">
      <SectionHeader
        title="Get in Touch"
        description="Have questions or want to learn more? We'd love to hear from you."
      />
      <FadeIn className="mx-auto grid max-w-4xl gap-8 lg:grid-cols-2">
        {/* Contact Form */}
        <form className="space-y-5" aria-label="Contact form">
          <div className="space-y-2">
            <label htmlFor="full-name" className="text-sm font-medium">
              Full Name
            </label>
            <div className="relative">
              <UserIcon
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <input
                id="full-name"
                name="fullName"
                type="text"
                required
                autoComplete="name"
                placeholder="Enter your full name"
                className="flex h-11 w-full rounded-lg border border-input bg-background pl-9 pr-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium">
              Phone Number
            </label>
            <div className="relative">
              <PhoneIcon
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                placeholder="+1 (555) 123-4567"
                className="flex h-11 w-full rounded-lg border border-input bg-background pl-9 pr-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="course" className="text-sm font-medium">
              Course Interested In
            </label>
            <select
              id="course"
              name="course"
              required
              defaultValue=""
              className="flex h-11 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="" disabled>
                Select a course
              </option>
              <option value="web-development">Web Development Fundamentals</option>
              <option value="data-science">Data Science & Machine Learning</option>
              <option value="ui-ux">UI/UX Design Masterclass</option>
              <option value="cloud-aws">Cloud Computing with AWS</option>
              <option value="other">Other / Not sure</option>
            </select>
          </div>
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              placeholder="Tell us how we can help..."
              className="flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <Button type="submit" size="lg" className="w-full rounded-full sm:w-auto">
            <SendIcon className="mr-2 h-4 w-4" aria-hidden="true" />
            Send Message
          </Button>
        </form>

        {/* Contact Info */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Contact Information</h3>
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <MailIcon className="h-5 w-5 text-primary" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-medium">Email</p>
                <Link
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {COMPANY_INFO.email}
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <PhoneIcon className="h-5 w-5 text-primary" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-medium">Phone</p>
                <p className="text-sm text-muted-foreground">{COMPANY_INFO.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <MapPinIcon className="h-5 w-5 text-primary" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-medium">Address</p>
                <p className="text-sm text-muted-foreground">{COMPANY_INFO.address}</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border bg-background p-6">
            <p className="text-sm font-medium">Business Hours</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Monday - Friday: 9:00 AM - 6:00 PM
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Saturday: 10:00 AM - 4:00 PM
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Sunday: Closed
            </p>
          </div>
        </div>
      </FadeIn>
    </SectionWrapper>
  )
}