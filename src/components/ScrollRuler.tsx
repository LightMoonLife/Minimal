'use client'

import { useEffect, useRef } from 'react'

export function ScrollRuler() {
  const markerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const marker = markerRef.current
    if (!marker) return

    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      const pct = scrollable > 0 ? window.scrollY / scrollable : 0
      marker.style.top = `${pct * 100}%`
    }

    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  const ticks = Array.from({ length: 21 }, (_, i) => i * 5)

  return (
    <div
      className="fixed left-0 top-0 bottom-0 w-5 z-30 hidden min-[900px]:block"
      aria-hidden="true"
    >
      <div className="absolute inset-y-0 left-2 w-px" style={{ backgroundColor: 'var(--line)' }} />

      {ticks.map((pct) => (
        <div
          key={pct}
          className="absolute left-0"
          style={{ top: `${pct}%` }}
        >
          <div
            className="h-px"
            style={{
              width: pct % 25 === 0 ? '10px' : '6px',
              backgroundColor: pct % 25 === 0 ? 'var(--line-strong)' : 'var(--line)',
            }}
          />
        </div>
      ))}

      <div
        ref={markerRef}
        className="absolute left-0 w-3 h-1"
        style={{ backgroundColor: 'rgb(var(--blueprint))' }}
      />
    </div>
  )
}
