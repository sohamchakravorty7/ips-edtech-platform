import { Button } from "@/components/ui/button"
import { SectionWrapper } from "@/components/shared/section-wrapper"
import { FadeIn } from "@/components/shared/motion-wrapper"
import {
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  SendIcon,
  UserIcon,
  ClockIcon,
  MessageSquareIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from "lucide-react"
import { COMPANY_INFO } from "@/lib/constants"

const inputClasses =
  "flex h-12 w-full rounded-xl border border-input bg-background px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:border-royal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal/20 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"

export function Contact() {
  return (
    <SectionWrapper id="contact" className="overflow-hidden">
      {/* Decorative background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-royal/[0.06] blur-[120px]" />
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-gold/[0.08] blur-[120px]" />
      </div>

      <div className="mx-auto max-w-6xl">
        <FadeIn className="overflow-hidden rounded-[2.5rem] border border-border bg-card shadow-premium">
          <div className="grid lg:grid-cols-[1fr_1.2fr]">
            {/* Left panel - Royal gradient */}
            <div className="relative overflow-hidden bg-gradient-to-br from-[#0d2f6e] via-[#0f3d91] to-[#08224f] p-8 sm:p-10 lg:p-12">
              {/* Decorative elements */}
              <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                <div className="absolute -top-24 -left-24 h-[300px] w-[300px] rounded-full bg-indigo-brand/40 blur-[100px]" />
                <div className="absolute -right-24 -bottom-24 h-[300px] w-[300px] rounded-full bg-gold/20 blur-[100px]" />
                <div className="absolute inset-0 opacity-[0.05] [background:linear-gradient(to_right,rgb(255_255_255/0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.5)_1px,transparent_1px)] [background-size:2.5rem_2.5rem]" />
              </div>

              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1.5 text-xs font-semibold tracking-widest text-[#ffd25e] uppercase">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
                  Get In Touch
                </span>

                <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-balance text-white sm:text-4xl">
                  Ready to Transform Your Career?
                </h2>
                <p className="mt-4 text-base leading-relaxed text-white/70">
                  Book a free 1:1 career counselling session. Our advisors will
                  help you find the perfect program for your goals.
                </p>

                {/* Contact info */}
                <div className="mt-10 space-y-6">
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="group flex items-center gap-4"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#ffd25e] ring-1 ring-white/20 backdrop-blur-md transition-all duration-300 group-hover:bg-gold group-hover:text-royal-deep">
                      <MailIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold tracking-wider text-white/50 uppercase">
                        Email us
                      </p>
                      <p className="text-sm font-semibold text-white group-hover:text-[#ffd25e]">
                        {COMPANY_INFO.email}
                      </p>
                    </div>
                  </a>

                  <a href="tel:+919999999999" className="group flex items-center gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#ffd25e] ring-1 ring-white/20 backdrop-blur-md transition-all duration-300 group-hover:bg-gold group-hover:text-royal-deep">
                      <PhoneIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold tracking-wider text-white/50 uppercase">
                        Call us
                      </p>
                      <p className="text-sm font-semibold text-white group-hover:text-[#ffd25e]">
                        +91 99999 99999
                      </p>
                    </div>
                  </a>

                  <div className="flex items-center gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#ffd25e] ring-1 ring-white/20 backdrop-blur-md">
                      <MapPinIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold tracking-wider text-white/50 uppercase">
                        Visit us
                      </p>
                      <p className="text-sm font-semibold text-white">
                        Koramangala, Bengaluru, India
                      </p>
                    </div>
                  </div>
                </div>

                {/* Trust badges */}
                <div className="mt-10 flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/70 backdrop-blur-sm">
                    <ShieldCheckIcon className="h-3.5 w-3.5 text-[#ffd25e]" aria-hidden="true" />
                    Free counselling
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/70 backdrop-blur-sm">
                    <ClockIcon className="h-3.5 w-3.5 text-[#ffd25e]" aria-hidden="true" />
                    Response within 1 hour
                  </span>
                </div>
              </div>
            </div>

            {/* Right panel - Contact form */}
            <div className="bg-card p-8 sm:p-10 lg:p-12">
              <form className="space-y-5" aria-label="Contact form">
                <div className="space-y-2">
                  <label htmlFor="full-name" className="text-sm font-semibold">
                    Full Name
                  </label>
                  <div className="relative">
                    <UserIcon
                      className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                      aria-hidden="true"
                    />
                    <input
                      id="full-name"
                      name="fullName"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Enter your full name"
                      className={`${inputClasses} pl-10`}
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-semibold">
                      Phone Number
                    </label>
                    <div className="relative">
                      <PhoneIcon
                        className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                        aria-hidden="true"
                      />
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        autoComplete="tel"
                        placeholder="+91 98765 43210"
                        className={`${inputClasses} pl-10`}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="course" className="text-sm font-semibold">
                      Course Interested In
                    </label>
                    <select
                      id="course"
                      name="course"
                      required
                      defaultValue=""
                      className={inputClasses}
                    >
                      <option value="" disabled>
                        Select a course
                      </option>
                      <option value="web-development">
                        Full-Stack Web Development
                      </option>
                      <option value="data-science">Data Science & AI</option>
                      <option value="ui-ux">Product Design & UI/UX</option>
                      <option value="cloud-aws">Cloud Architecture (AWS)</option>
                      <option value="other">Other / Not sure</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-semibold">
                    Message
                  </label>
                  <div className="relative">
                    <MessageSquareIcon
                      className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground"
                      aria-hidden="true"
                    />
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      placeholder="Tell us about your career goals..."
                      className={`${inputClasses} resize-none pl-10 pt-3`}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  variant="gold"
                  className="group w-full gap-2 rounded-xl"
                >
                  Schedule Free Counselling
                  <SendIcon
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </Button>

                <p className="flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
                  <SparklesIcon className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
                  {"No spam, ever. We\u2019ll only reach out about your enquiry."}
                </p>
              </form>
            </div>
          </div>
        </FadeIn>
      </div>
    </SectionWrapper>
  )
}