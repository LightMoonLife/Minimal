'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

const COLS = 8
const COVER_DUR = 480
const LABEL_DELAY = 260
const REVEAL_EXTRA = 340
const REVEAL_DUR = 520

const pageLabels: [RegExp, string][] = [
  [/^\/$/, 'Home'],
  [/^\/work\/.+/, 'Case study'],
  [/^\/work$/, 'Selected work'],
  [/^\/writing\/.+/, 'Article'],
  [/^\/writing$/, 'Writing'],
  [/^\/services\/.+/, 'Services'],
  [/^\/cv$/, 'About'],
  [/^\/contact$/, 'Contact'],
  [/^\/review$/, 'Free review'],
]

function getLabel(path: string): string {
  for (const [re, label] of pageLabels) {
    if (re.test(path)) return label
  }
  return 'Jack Brookes'
}

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function isInternalRoute(href: string): boolean {
  return href.startsWith('/') && !href.startsWith('//')
}

export function PageTransition() {
  const router = useRouter()
  const pathname = usePathname()
  const [phase, setPhase] = useState<'idle' | 'cover' | 'covered' | 'reveal'>('idle')
  const [label, setLabel] = useState('')
  const [showLabel, setShowLabel] = useState(false)
  const transitioning = useRef(false)
  const timers = useRef<number[]>([])

  const clearTimers = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }

  const delay = (ms: number, fn: () => void) => {
    timers.current.push(window.setTimeout(fn, ms))
  }

  useEffect(() => () => clearTimers(), [])

  const navigate = useCallback(
    (href: string) => {
      if (transitioning.current) return
      if (prefersReducedMotion()) {
        router.push(href)
        return
      }

      transitioning.current = true
      clearTimers()
      setLabel(getLabel(href.split('?')[0]))
      setShowLabel(false)

      requestAnimationFrame(() =>
        requestAnimationFrame(() => setPhase('cover'))
      )

      delay(LABEL_DELAY, () => setShowLabel(true))

      delay(COVER_DUR, () => {
        router.push(href)
        window.scrollTo(0, 0)
        setPhase('covered')
      })

      delay(COVER_DUR + REVEAL_EXTRA, () => {
        setShowLabel(false)
        setPhase('reveal')
        delay(REVEAL_DUR + 60, () => {
          setPhase('idle')
          transitioning.current = false
        })
      })
    },
    [router]
  )

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a')
      if (!anchor) return

      const href = anchor.getAttribute('href')
      if (!href) return
      if (anchor.target === '_blank') return
      if (anchor.hasAttribute('download')) return
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return

      if (href.includes('#')) return

      if (isInternalRoute(href) && href !== pathname) {
        e.preventDefault()
        e.stopPropagation()
        navigate(href)
      }
    }

    document.addEventListener('click', handler, true)
    return () => document.removeEventListener('click', handler, true)
  }, [navigate, pathname])

  const classes = ['sv-curtain']
  if (phase !== 'idle') classes.push('is-on')
  if (phase === 'cover') classes.push('is-cover')
  if (phase === 'covered') classes.push('is-covered')
  if (phase === 'reveal') classes.push('is-reveal')
  if (showLabel) classes.push('show-label')

  return (
    <div className={classes.join(' ')} aria-hidden="true">
      {Array.from({ length: COLS }, (_, i) => (
        <div
          key={i}
          className="sv-curtain-col"
          style={{ '--i': i } as React.CSSProperties}
        />
      ))}
      <div className="sv-curtain-label">
        <span className="name">
          {label}
          <span className="d">.</span>
        </span>
      </div>
    </div>
  )
}
