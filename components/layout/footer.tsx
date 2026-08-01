import Link from "next/link"
import {
  APP_NAME,
  APP_DESCRIPTION,
  COMPANY_INFO,
  SOCIAL_LINKS,
} from "@/lib/constants"
import {
  GraduationCapIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  ArrowUpRightIcon,
  GlobeIcon,
} from "lucide-react"

const socialLinks = [
  {
    label: "Facebook",
    href: SOCIAL_LINKS.facebook,
  },
  {
    label: "Instagram",
    href: SOCIAL_LINKS.instagram,
  },
  {
    label: "YouTube",
    href: SOCIAL_LINKS.youtube,
  },
]

const footerLinks = [
  {
    title: "Institute",
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/#about" },
      { label: "Courses", href: "/#courses" },
      { label: "Gallery", href: "/#gallery" },
      { label: "Contact", href: "/#contact" },
    ],
  },
  {
    title: "Programs",
    links: [
      { label: "Computer Courses", href: "/#courses" },
      { label: "Professional Training", href: "/#courses" },
      { label: "School Coaching", href: "/#courses" },
      { label: "Career Guidance", href: "/#contact" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Admissions", href: "/#contact" },
      { label: "FAQs", href: "/#contact" },
      { label: "Privacy Policy", href: "/#contact" },
      { label: "Refund Policy", href: "/#contact" },
    ],
  },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-[#0A2E73] via-[#0F3D91] to-[#061B45] text-white">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-yellow-400 blur-3xl" />
        <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-indigo-500 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="mb-6 inline-flex items-center gap-3"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-500 shadow-xl">
                <GraduationCapIcon className="h-6 w-6 text-[#0F3D91]" />
              </div>

              <div>
                <h2 className="text-xl font-bold">{APP_NAME}</h2>
                <p className="text-sm text-yellow-300">
                  {COMPANY_INFO.tagline}
                </p>
              </div>
            </Link>

            <p className="max-w-md leading-7 text-white/70">
              {APP_DESCRIPTION}
            </p>

            <div className="mt-8 space-y-3 text-sm">
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="flex items-center gap-3 text-white/70 transition hover:text-yellow-300"
              >
                <MailIcon className="h-4 w-4" />
                {COMPANY_INFO.email}
              </a>

              <a
                href={`tel:${COMPANY_INFO.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-3 text-white/70 transition hover:text-yellow-300"
              >
                <PhoneIcon className="h-4 w-4" />
                {COMPANY_INFO.phone}
              </a>

              <div className="flex items-center gap-3 text-white/70">
                <MapPinIcon className="h-4 w-4" />
                {COMPANY_INFO.address}
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 text-sm font-semibold text-white/80 backdrop-blur transition hover:border-yellow-400 hover:bg-yellow-400 hover:text-[#0F3D91]"
                >
                  <GlobeIcon className="mr-2 h-4 w-4" />
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-yellow-300">
                {section.title}
              </h3>

              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-2 text-white/70 transition hover:text-white"
                    >
                      {link.label}

                      <ArrowUpRightIcon className="h-3 w-3 opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-white/50">
              © {currentYear} {APP_NAME}. All Rights Reserved.
            </p>

            <div className="flex gap-6 text-sm text-white/50">
              <Link href="/#contact" className="hover:text-white">
                Privacy Policy
              </Link>

              <Link href="/#contact" className="hover:text-white">
                Terms & Conditions
              </Link>

              <Link href="/#contact" className="hover:text-white">
                Refund Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}