import Link from "next/link"
import {
  APP_NAME,
  COMPANY_INFO,
  SOCIAL_LINKS,
} from "@/lib/constants"
import {
  GraduationCapIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  ArrowUpRightIcon,
} from "lucide-react"

const socialLinks = [
  { label: "Twitter", href: SOCIAL_LINKS.twitter },
  { label: "LinkedIn", href: SOCIAL_LINKS.linkedin },
  { label: "GitHub", href: SOCIAL_LINKS.github },
]

const footerLinks = [
  {
    title: "Platform",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/#about" },
      { label: "Courses", href: "/#courses" },
      { label: "Contact", href: "/#contact" },
    ],
  },
  {
    title: "Programs",
    links: [
      { label: "Full-Stack Development", href: "/#courses" },
      { label: "Data Science & AI", href: "/#courses" },
      { label: "Product Design", href: "/#courses" },
      { label: "Cloud Architecture", href: "/#courses" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Success Stories", href: "/#testimonials" },
      { label: "Why iPS", href: "/#why-choose-us" },
      { label: "Platform Highlights", href: "/#gallery" },
      { label: "Careers", href: "/#contact" },
    ],
  },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-[#0d2f6e] via-[#0f3d91] to-[#08224f]">
      {/* Decorative elements */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-32 h-[400px] w-[400px] rounded-full bg-indigo-brand/30 blur-[120px]" />
        <div className="absolute -right-32 -bottom-32 h-[400px] w-[400px] rounded-full bg-gold/10 blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.04] [background:linear-gradient(to_right,rgb(255_255_255/0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.5)_1px,transparent_1px)] [background-size:2.5rem_2.5rem]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div className="space-y-5">
            <Link
              href="/"
              className="flex items-center gap-2.5"
              aria-label={`${APP_NAME} home`}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#ffce4f] to-gold text-royal-deep shadow-[0_4px_16px_-2px_rgb(244_180_0/0.5)]">
                <GraduationCapIcon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-lg font-extrabold tracking-tight text-white">
                {APP_NAME}
              </span>
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-white/60">
              {"India\u2019s premier career-focused learning platform. We engineer careers through world-class education, industry mentorship, and outcomes you can measure."}
            </p>

            {/* Contact */}
            <div className="space-y-3 pt-2">
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="flex items-center gap-2.5 text-sm text-white/60 transition-colors hover:text-[#ffd25e]"
              >
                <MailIcon className="h-4 w-4 text-[#ffd25e]" aria-hidden="true" />
                {COMPANY_INFO.email}
              </a>
              <a
                href="tel:+919999999999"
                className="flex items-center gap-2.5 text-sm text-white/60 transition-colors hover:text-[#ffd25e]"
              >
                <PhoneIcon className="h-4 w-4 text-[#ffd25e]" aria-hidden="true" />
                +91 99999 99999
              </a>
              <p className="flex items-center gap-2.5 text-sm text-white/60">
                <MapPinIcon className="h-4 w-4 shrink-0 text-[#ffd25e]" aria-hidden="true" />
                Koramangala, Bengaluru, India
              </p>
            </div>

            {/* Social */}
            <div className="flex flex-wrap gap-3 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white/70 backdrop-blur-sm transition-all duration-300 hover:border-gold/40 hover:bg-gold hover:text-royal-deep"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((column) => (
            <nav
              key={column.title}
              aria-label={`${column.title} navigation`}
              className="space-y-4"
            >
              <h3 className="text-xs font-bold tracking-widest text-[#ffd25e] uppercase">
                {column.title}
              </h3>
              <ul className="space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1 text-sm text-white/60 transition-colors hover:text-white"
                    >
                      {link.label}
                      <ArrowUpRightIcon
                        className="h-3 w-3 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-white/50">
            &copy; {currentYear} {APP_NAME}. All rights reserved.
          </p>
          <nav aria-label="Legal navigation" className="flex gap-6">
            <Link
              href="/#contact"
              className="text-xs text-white/50 transition-colors hover:text-white"
            >
              Privacy Policy
            </Link>
            <Link
              href="/#contact"
              className="text-xs text-white/50 transition-colors hover:text-white"
            >
              Terms of Service
            </Link>
            <Link
              href="/#contact"
              className="text-xs text-white/50 transition-colors hover:text-white"
            >
              Refund Policy
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}