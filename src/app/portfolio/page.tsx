import type { Metadata } from 'next'
import Link from 'next/link'
import { projects } from '@/lib/projects'
import { SectionLabel } from '@/components/SectionLabel'

export const metadata: Metadata = {
  title: 'Work',
  description:
    'CRO and UX case studies — e-commerce checkout optimisation, SaaS onboarding redesign, and financial services landing page programmes.',
}

export default function PortfolioPage() {
  return (
    <div className="max-w-content mx-auto px-6">

      {/* Header */}
      <section className="pt-20 pb-20 border-b border-border">
        <SectionLabel number="00" title="Work" className="mb-8" />
        <h1 className="text-2xl font-light text-foreground leading-snug tracking-tight max-w-sm">
          Case studies in CRO, UX research, and digital optimisation.
        </h1>
      </section>

      {/* Project list */}
      <section className="py-8" aria-label="All projects">
        <ol aria-label="Project list">
          {projects.map((project, i) => (
            <li key={project.slug}>
              <Link
                href={`/portfolio/${project.slug}`}
                className="group block py-10 border-b border-border hover:bg-muted -mx-6 px-6 transition-colors duration-200"
              >
                <div className="flex items-start gap-6">
                  <span className="font-mono text-xs text-muted-foreground tabular-nums pt-1 w-5 shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-3">
                      <h2 className="text-lg font-light text-foreground leading-tight">
                        {project.title}
                      </h2>
                      <span className="font-mono text-xs text-muted-foreground">
                        {project.year}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground font-light leading-relaxed mb-4 max-w-md">
                      {project.tagline}
                    </p>
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                      <div className="flex items-baseline gap-2">
                        <span className="font-mono text-xs text-accent font-medium">
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
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.services.map(s => (
                        <span
                          key={s}
                          className="font-mono text-xs text-accent/70 border border-accent/25 px-2 py-0.5"
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
                    →
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
