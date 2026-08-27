'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export function StickyCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <div
      className={`fixed bottom-0 inset-x-0 z-40 bg-background/90 backdrop-blur-md border-t border-border/10 transition-all duration-320 ease-smooth sm:hidden ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="max-w-content mx-auto px-6 py-3 flex items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground truncate">
          Free 30-min growth review
        </p>
        <Link
          href="/contact"
          className="shrink-0 bg-accent text-foreground font-medium text-xs px-5 py-2.5 rounded-pill hover:bg-accent-deep hover:text-white transition-all duration-200"
        >
          Book your free review
        </Link>
      </div>
    </div>
  )
}
