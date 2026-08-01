"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { MenuIcon, MoonIcon, SunIcon, XIcon, GraduationCapIcon, ArrowRightIcon } from "lucide-react"
import { APP_NAME, NAV_LINKS } from "@/lib/constants"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()
  const shouldReduceMotion = useReducedMotion()

  // Track scroll position for navbar glass effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 32)
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Track active section for link highlighting
  useEffect(() => {
    const sections = NAV_LINKS.filter(
      (link) => link.href.startsWith("/#")
    ).map((link) => link.href.slice(2))

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`)
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    )

    for (const section of sections) {
      const el = document.getElementById(section)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const isHomePage = pathname === "/"
  const isAtTop = !scrolled && isHomePage

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "glass-panel rounded-none border-x-0 border-t-0"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav
        className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5" aria-label={`${APP_NAME} home`}>
          <span
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#ffce4f] to-gold text-royal-deep shadow-[0_4px_16px_-2px_rgb(244_180_0/0.5)]",
              "transition-transform duration-300 hover:scale-105"
            )}
          >
            <GraduationCapIcon className="h-5 w-5" aria-hidden="true" />
          </span>
          <span
            className={cn(
              "text-lg font-extrabold tracking-tight transition-colors",
              isAtTop ? "text-white" : "text-foreground"
            )}
          >
            {APP_NAME}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive =
              isHomePage && link.href.startsWith("/#")
                ? activeSection === link.href
                : pathname === link.href

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors",
                  isAtTop
                    ? isActive
                      ? "text-white"
                      : "text-white/75 hover:text-white"
                    : isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className={cn(
                      "absolute inset-0 rounded-lg",
                      isAtTop ? "bg-white/15" : "bg-muted"
                    )}
                    transition={{
                      type: shouldReduceMotion ? "tween" : "spring",
                      stiffness: 400,
                      damping: 30,
                      duration: shouldReduceMotion ? 0.1 : undefined,
                    }}
                    aria-hidden="true"
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            )
          })}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-2.5 md:flex">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className={cn(
              !isAtTop &&
                "bg-royal-soft text-royal hover:bg-royal-soft/80 dark:bg-white/10 dark:text-white",
              isAtTop && "text-white hover:bg-white/15 hover:text-white"
            )}
          >
            <SunIcon
              className={cn(
                "h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0",
                isAtTop && "text-white"
              )}
              aria-hidden="true"
            />
            <MoonIcon
              className={cn(
                "absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100",
                isAtTop && "text-white"
              )}
              aria-hidden="true"
            />
          </Button>
          <Link href="/#contact">
            <Button variant="gold" size="sm" className="group gap-1.5">
              Get Started
              <ArrowRightIcon
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className={cn(
              isAtTop && "text-white hover:bg-white/15 hover:text-white"
            )}
          >
            <SunIcon className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            className={cn(isAtTop && "text-white hover:bg-white/15 hover:text-white")}
          >
            {isOpen ? (
              <XIcon className="h-4 w-4" aria-hidden="true" />
            ) : (
              <MenuIcon className="h-4 w-4" aria-hidden="true" />
            )}
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-navigation"
            className="border-t border-border bg-background/95 backdrop-blur-xl md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <nav className="space-y-1 px-4 pb-4 pt-2" aria-label="Mobile navigation">
              {NAV_LINKS.map((link) => {
                const isActive =
                  isHomePage && link.href.startsWith("/#")
                    ? activeSection === link.href
                    : pathname === link.href

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "block rounded-lg px-3.5 py-3 text-sm font-semibold transition-colors",
                      isActive
                        ? "bg-royal-soft text-royal dark:bg-white/10 dark:text-white"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                )
              })}
              <div className="pt-2">
                <Link href="/#contact" onClick={() => setIsOpen(false)}>
                  <Button variant="gold" size="lg" className="w-full">
                    Get Started
                    <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}