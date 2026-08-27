'use client'

import { useEffect, useRef, useState } from 'react'

const steps = [
  { number: '01', label: 'Audit', description: 'Map the gaps, quantify cost of inaction' },
  { number: '02', label: 'Strategise', description: 'Prioritise by commercial impact' },
  { number: '03', label: 'Build', description: 'Ship software, measure results' },
  { number: '04', label: 'Optimise', description: 'Test, compound, repeat' },
]

export function ProcessSteps() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="relative" aria-label="Process steps" role="list">
      {/* Desktop: horizontal layout */}
      <div className="hidden sm:flex items-stretch gap-0">
        {steps.map((step, i) => (
          <div key={step.number} className="flex items-stretch" role="listitem">
            <div className="bracket-frame p-5 w-48 flex flex-col">
              <span className="font-mono text-xs text-blueprint tabular-nums block mb-2">
                {step.number}
              </span>
              <p className="font-display text-base font-bold text-ink mb-1">{step.label}</p>
              <p className="text-xs text-ink-soft leading-relaxed">{step.description}</p>
            </div>
            {i < steps.length - 1 && (
              <svg
                className="shrink-0 self-center"
                width="40"
                height="2"
                viewBox="0 0 40 2"
                aria-hidden="true"
              >
                <line
                  x1="0" y1="1" x2="40" y2="1"
                  stroke="rgb(var(--blueprint))"
                  strokeWidth="1.5"
                  strokeDasharray="40"
                  strokeDashoffset={visible ? '0' : '40'}
                  style={{
                    transition: visible
                      ? `stroke-dashoffset 1s ease ${i * 0.2 + 0.3}s`
                      : 'none',
                  }}
                />
              </svg>
            )}
          </div>
        ))}
      </div>

      {/* Mobile: vertical stack */}
      <div className="sm:hidden space-y-0">
        {steps.map((step, i) => (
          <div key={step.number} role="listitem">
            <div className="bracket-frame p-5">
              <span className="font-mono text-xs text-blueprint tabular-nums block mb-2">
                {step.number}
              </span>
              <p className="font-display text-base font-bold text-ink mb-1">{step.label}</p>
              <p className="text-xs text-ink-soft leading-relaxed">{step.description}</p>
            </div>
            {i < steps.length - 1 && (
              <svg
                className="mx-auto block"
                width="2"
                height="24"
                viewBox="0 0 2 24"
                aria-hidden="true"
              >
                <line
                  x1="1" y1="0" x2="1" y2="24"
                  stroke="rgb(var(--blueprint))"
                  strokeWidth="1.5"
                  strokeDasharray="24"
                  strokeDashoffset={visible ? '0' : '24'}
                  style={{
                    transition: visible
                      ? `stroke-dashoffset 0.6s ease ${i * 0.15 + 0.2}s`
                      : 'none',
                  }}
                />
              </svg>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
