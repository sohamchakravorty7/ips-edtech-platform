import Link from "next/link"
import {
  APP_NAME,
  COMPANY_INFO,
  NAV_LINKS,
  SOCIAL_LINKS,
} from "@/lib/constants"
import { GraduationCapIcon } from "lucide-react"

const socialLinks = [
  { label: "Twitter", href: SOCIAL_LINKS.twitter },
  { label: "LinkedIn", href: SOCIAL_LINKS.linkedin },
  { label: "GitHub", href: SOCIAL_LINKS.github },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link
              href="/"
              className="flex items-center gap-2"
              aria-label={`${APP_NAME} home`}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <GraduationCapIcon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-lg font-bold tracking-tight">{APP_NAME}</span>
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Empowering the next generation of learners with cutting-edge
              educational technology.
            </p>
          </div>

          {/* Quick Links */}
          <nav aria-label="Footer navigation" className="space-y-4">
            <h3 className="text-sm font-semibold">Quick Links</h3>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Contact</h3>
            <address className="space-y-2.5 text-sm not-italic text-muted-foreground">
              <p>
                <Link
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="hover:text-foreground"
                >
                  {COMPANY_INFO.email}
                </Link>
              </p>
              <p>
                <Link
                  href={`tel:${COMPANY_INFO.phone.replace(/[^+\d]/g, "")}`}
                  className="hover:text-foreground"
                >
                  {COMPANY_INFO.phone}
                </Link>
              </p>
              <p>{COMPANY_INFO.address}</p>
            </address>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Follow Us</h3>
            <ul className="flex gap-4">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 items-center rounded-full border px-4 text-sm text-muted-foreground transition-colors hover:border-transparent hover:bg-primary hover:text-primary-foreground"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} {APP_NAME}. All rights reserved.
          </p>
          <nav aria-label="Legal navigation" className="flex gap-6">
            <Link
              href="/#contact"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Privacy Policy
            </Link>
            <Link
              href="/#contact"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Terms of Service
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}