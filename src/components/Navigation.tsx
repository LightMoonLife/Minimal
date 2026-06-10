'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

const navLinks = [
  { href: '/portfolio', label: 'Work' },
  { href: '/cv', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export function Navigation() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

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

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-background/95 backdrop-blur-sm border-b border-border'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-content mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="font-mono text-xs tracking-[0.2em] text-foreground hover:text-muted-foreground transition-colors duration-200"
            aria-label="Home"
          >
            YN
          </Link>

          <nav aria-label="Main navigation" className="hidden sm:block">
            <ul className="flex items-center gap-8" role="list">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={`font-mono text-xs tracking-widest transition-colors duration-200 hover:text-accent ${
                      pathname.startsWith(href)
                        ? 'text-accent'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <button
            className="sm:hidden font-mono text-xs tracking-[0.2em] text-muted-foreground hover:text-accent transition-colors duration-200"
            onClick={() => setOpen(v => !v)}
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? 'CLOSE' : 'MENU'}
          </button>
        </div>
      </header>

      {/* Mobile fullscreen overlay */}
      <div
        id="mobile-nav"
        role="dialog"
        aria-label="Navigation menu"
        aria-modal="true"
        className={`fixed inset-0 z-40 bg-accent flex flex-col justify-end pb-16 px-8 sm:hidden transition-opacity duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav aria-label="Mobile navigation">
          <ul className="space-y-8" role="list">
            {[{ href: '/', label: 'Home' }, ...navLinks].map(({ href, label }, i) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-5 group"
                  tabIndex={open ? 0 : -1}
                >
                  <span className="font-mono text-xs text-white/25 group-hover:text-white/50 transition-colors duration-200 w-5 shrink-0">
                    0{i}
                  </span>
                  <span className="text-5xl font-light text-white/80 group-hover:text-white transition-colors duration-200 leading-none tracking-tight">
                    {label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  )
}
