import type { Metadata } from 'next'
import Link from 'next/link'
import { projects } from '@/lib/projects'
import { SectionLabel } from '@/components/SectionLabel'

export const metadata: Metadata = {
  title: 'Results',
  description:
    'Case studies in B2B digital transformation, revenue platform engineering, and conversion optimisation.',
}

export default function PortfolioPage() {
  return (
    <div className="max-w-content mx-auto px-6">

      <section className="pt-32 sm:pt-40 pb-24 border-b border-border">
        <SectionLabel number="00" title="Results" className="mb-10" />
        <h1 className="text-3xl sm:text-4xl font-extralight text-foreground leading-snug tracking-tight max-w-sm">
          Case studies in digital transformation, platform engineering, and revenue growth.
        </h1>
      </section>

      <section className="py-8" aria-label="All case studies">
        <ol aria-label="Case study list">
          {projects.map((project, i) => (
            <li key={project.slug}>
              <Link
                href={`/portfolio/${project.slug}`}
                className="group block py-12 border-b border-border hover:bg-muted -mx-6 px-6 transition-colors duration-200"
              >
                <div className="flex items-start gap-6">
                  <span className="font-mono text-xs text-muted-foreground tabular-nums pt-1 w-5 shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-4">
                      <h2 className="text-xl font-light text-foreground leading-tight">
                        {project.title}
                      </h2>
                      <span className="font-mono text-xs text-muted-foreground">
                        {project.year}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground font-light leading-relaxed mb-5 max-w-md">
                      {project.tagline}
                    </p>
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                      <div className="flex items-baseline gap-2">
                        <span className="font-mono text-xs text-foreground font-medium">
                          {project.heroMetric.value}
                        </span>
                        <span className="font-mono text-xs text-muted-foreground">
                          {project.heroMetric.label.toLowerCase()}
                        </span>
                      </div>
                      <span className="font-mono text-xs text-muted-foreground">
                        {project.client}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-5">
                      {project.services.map(s => (
                        <span
                          key={s}
                          className="font-mono text-xs text-muted-foreground border border-border px-2 py-0.5"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span
                    className="font-mono text-xs text-muted-foreground group-hover:translate-x-1 transition-transform duration-200 hidden sm:block pt-1 shrink-0"
                    aria-hidden="true"
                  >
                    &rarr;
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </section>

    </div>
  )
}
