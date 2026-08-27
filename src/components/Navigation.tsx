'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

const navLinks = [
  { href: '/portfolio', label: 'Work' },
  { href: '/cv', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

export function Navigation() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const initial = stored === 'dark' || (!stored && prefersDark) ? 'dark' : 'light'
    setTheme(initial)
    document.documentElement.classList.toggle('dark', initial === 'dark')
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    localStorage.setItem('theme', next)
    document.documentElement.classList.toggle('dark', next === 'dark')
  }

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
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b border-border bg-background ${
          scrolled ? 'backdrop-blur-sm shadow-sm' : ''
        }`}
      >
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="font-mono text-xs tracking-[0.2em] text-foreground hover:text-muted-foreground transition-colors duration-200"
            aria-label="Home"
          >
            Jack Brookes
          </Link>

          <div className="hidden sm:flex items-center gap-8">
            <nav aria-label="Main navigation">
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

            <Link
              href="/contact"
              className="font-mono text-xs tracking-widest px-4 py-1.5 border border-accent text-accent hover:bg-accent hover:text-white transition-colors duration-200 whitespace-nowrap"
            >
              Book your free review
            </Link>

            <button
              onClick={toggleTheme}
              className="text-muted-foreground hover:text-accent transition-colors duration-200 p-1"
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              type="button"
            >
              {mounted && (theme === 'light' ? <MoonIcon /> : <SunIcon />)}
            </button>
          </div>

          <div className="sm:hidden flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="text-muted-foreground hover:text-accent transition-colors duration-200 p-1"
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              type="button"
            >
              {mounted && (theme === 'light' ? <MoonIcon /> : <SunIcon />)}
            </button>

            <button
              className="font-mono text-xs tracking-[0.2em] text-muted-foreground hover:text-accent transition-colors duration-200"
              onClick={() => setOpen(v => !v)}
              aria-label={open ? 'Close navigation' : 'Open navigation'}
              aria-expanded={open}
              aria-controls="mobile-nav"
            >
              {open ? 'CLOSE' : 'MENU'}
            </button>
          </div>
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
            <li>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-5 group"
                tabIndex={open ? 0 : -1}
              >
                <span className="font-mono text-xs text-white/25 group-hover:text-white/50 transition-colors duration-200 w-5 shrink-0">
                  04
                </span>
                <span className="text-5xl font-light text-white/80 group-hover:text-white transition-colors duration-200 leading-none tracking-tight">
                  Free Review
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  )
}
