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
      className={`fixed bottom-0 inset-x-0 z-40 bg-background/95 backdrop-blur-sm border-t border-border transition-all duration-300 sm:hidden ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="max-w-content mx-auto px-6 py-3 flex items-center justify-between gap-4">
        <p className="font-mono text-xs text-muted-foreground truncate">
          Free 30-min growth review
        </p>
        <Link
          href="/contact"
          className="shrink-0 bg-accent text-white font-mono text-xs tracking-widest px-4 py-2.5 hover:bg-accent/90 transition-colors duration-200"
        >
          BOOK NOW
        </Link>
      </div>
    </div>
  )
}
