'use client'

import { useState } from 'react'

const stages = [
  {
    id: 'audit',
    label: 'Audit',
    description: 'Map your systems, identify gaps, and quantify the cost of inaction.',
  },
  {
    id: 'strategy',
    label: 'Strategy',
    description: 'Prioritise by commercial impact. Build the roadmap that pays for itself.',
  },
  {
    id: 'build',
    label: 'Build',
    description: 'Ship working software with your team. Measurable results, not slide decks.',
  },
  {
    id: 'optimise',
    label: 'Optimise',
    description: 'Test, measure, compound. Turn marginal gains into significant revenue lifts.',
  },
  {
    id: 'iterate',
    label: 'Iterate',
    description: 'Feed learnings back in. Every cycle gets sharper, faster, more profitable.',
  },
]

export function LifecycleDiagram() {
  const [active, setActive] = useState<number | null>(null)

  const count = stages.length
  const size = 320
  const cx = size / 2
  const cy = size / 2
  const radius = 120
  const nodeRadius = 28

  const points = stages.map((_, i) => {
    const angle = (2 * Math.PI * i) / count - Math.PI / 2
    return {
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
    }
  })

  return (
    <div className="flex flex-col sm:flex-row items-center gap-8 sm:gap-12">
      <div className="shrink-0">
        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="w-64 h-64 sm:w-72 sm:h-72"
          aria-label="Service lifecycle: Audit, Strategy, Build, Optimise, Iterate"
          role="img"
        >
          {points.map((from, i) => {
            const to = points[(i + 1) % count]
            return (
              <line
                key={`line-${i}`}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                className="stroke-border/20"
                strokeWidth={1.5}
              />
            )
          })}

          {stages.map((stage, i) => {
            const pt = points[i]
            const isActive = active === i
            return (
              <g
                key={stage.id}
                className="cursor-pointer"
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                onClick={() => setActive(active === i ? null : i)}
              >
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={nodeRadius}
                  className={`transition-all duration-200 ${
                    isActive
                      ? 'fill-accent stroke-accent-deep'
                      : 'fill-panel stroke-border/30'
                  }`}
                  strokeWidth={isActive ? 2 : 1.5}
                />
                <text
                  x={pt.x}
                  y={pt.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className={`text-[10px] font-medium select-none pointer-events-none transition-colors duration-200 ${
                    isActive ? 'fill-foreground' : 'fill-muted-foreground'
                  }`}
                >
                  {stage.label}
                </text>
              </g>
            )
          })}

          <text
            x={cx}
            y={cy - 6}
            textAnchor="middle"
            dominantBaseline="central"
            className="fill-muted-foreground text-[9px] tracking-widest uppercase font-medium"
          >
            How I
          </text>
          <text
            x={cx}
            y={cy + 8}
            textAnchor="middle"
            dominantBaseline="central"
            className="fill-muted-foreground text-[9px] tracking-widest uppercase font-medium"
          >
            Work
          </text>
        </svg>
      </div>

      <div className="min-h-[80px] flex-1">
        {active !== null ? (
          <div className="space-y-2">
            <p className="text-sm font-medium text-accent-deep">
              {stages[active].label}
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              {stages[active].description}
            </p>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
            Hover or tap a stage to see how each phase drives commercial outcomes.
          </p>
        )}
      </div>
    </div>
  )
}
