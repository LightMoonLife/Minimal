'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { ThemeToggle } from './ThemeToggle'

const navLinks = [
  { href: '/work', homeHref: '/#work', label: 'Work' },
  { href: '/writing', label: 'Writing' },
  { href: '/cv', label: 'About' },
  { href: '/contact', homeHref: '/#contact', label: 'Contact' },
]

export function Navigation() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const isHome = pathname === '/'

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  function resolveHref(link: typeof navLinks[number]) {
    if (isHome && link.homeHref) return link.homeHref
    return link.href
  }

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-320 ease-smooth ${
          scrolled
            ? 'bg-background/90 backdrop-blur-md border-b border-border/10'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-content mx-auto px-6 sm:px-10 h-16 flex items-center">
          <Link
            href="/"
            className="font-display text-base font-extrabold tracking-tight text-foreground hover:text-accent-deep transition-colors duration-200 shrink-0"
            aria-label="Home"
          >
            Jack Brookes
          </Link>

          <nav aria-label="Main navigation" className="hidden sm:flex items-center flex-1">
            <ul className="flex items-center gap-8 ml-auto" role="list">
              {navLinks.map((link) => {
                const resolved = resolveHref(link)
                return (
                  <li key={link.href}>
                    <Link
                      href={resolved}
                      className={`text-sm transition-colors duration-200 hover:text-foreground ${
                        pathname.startsWith(link.href)
                          ? 'text-foreground font-medium'
                          : 'text-muted-foreground'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              })}
              <li>
                <Link
                  href={isHome ? '/#contact' : '/contact'}
                  className="bg-accent text-foreground text-sm font-medium px-5 py-2 rounded-pill hover:bg-accent-deep hover:text-white transition-all duration-200"
                >
                  Book your free review
                </Link>
              </li>
            </ul>
            <div className="ml-6">
              <ThemeToggle />
            </div>
          </nav>

          <div className="flex items-center gap-5 sm:hidden ml-auto">
            <ThemeToggle />
            <button
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              onClick={() => setOpen(v => !v)}
              aria-label={open ? 'Close navigation' : 'Open navigation'}
              aria-expanded={open}
              aria-controls="mobile-nav"
            >
              {open ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-nav"
        role="dialog"
        aria-label="Navigation menu"
        aria-modal="true"
        className={`fixed inset-0 z-40 bg-background flex flex-col justify-end pb-16 px-8 sm:hidden transition-opacity duration-320 ease-smooth ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav aria-label="Mobile navigation">
          <ul className="space-y-6" role="list">
            {[{ href: '/', label: 'Home' }, ...navLinks].map((link) => {
              const resolved = 'homeHref' in link ? resolveHref(link as typeof navLinks[number]) : link.href
              return (
                <li key={link.href}>
                  <Link
                    href={resolved}
                    onClick={() => setOpen(false)}
                    className="group block"
                    tabIndex={open ? 0 : -1}
                  >
                    <span className={`font-display text-5xl font-extrabold tracking-tight transition-colors duration-200 ${
                      pathname === link.href ? 'text-accent' : 'text-foreground/70 group-hover:text-foreground'
                    }`}>
                      {link.label}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
          <Link
            href={isHome ? '/#contact' : '/contact'}
            onClick={() => setOpen(false)}
            className="mt-10 block text-center bg-accent text-foreground font-medium text-sm py-4 rounded-card hover:bg-accent-deep hover:text-white transition-all duration-200"
            tabIndex={open ? 0 : -1}
          >
            Book your free review
          </Link>
        </nav>
      </div>
    </>
  )
}
