import type { Metadata } from 'next'
import Link from 'next/link'
import { projects } from '@/lib/projects'
import { SectionLabel } from '@/components/SectionLabel'
import { Breadcrumb } from '@/components/Breadcrumb'

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Case studies in B2B digital transformation, revenue platform engineering, and conversion optimisation.',
}

export default function WorkPage() {
  return (
    <div className="max-w-content mx-auto px-6 sm:px-10">

      <section className="pt-24 sm:pt-32 lg:pt-40 pb-16 sm:pb-20">
        <Breadcrumb items={[{ name: 'Work', href: '/work' }]} />
        <SectionLabel number="00" title="Work" className="mb-8" />
        <h1 className="text-3xl sm:text-4xl font-medium text-foreground leading-snug tracking-tight max-w-md">
          Case studies in digital transformation, platform engineering, and revenue growth.
        </h1>
      </section>

      <section className="pb-12" aria-label="All case studies">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className="group block border border-border/10 rounded-card p-6 sm:p-8 bg-panel/50 hover:bg-panel hover:shadow-lg hover:-translate-y-0.5 transition-all duration-320 ease-smooth"
            >
              <p className="text-xs text-muted-foreground mb-3">
                {project.deliveryTag} &middot; {project.year}
              </p>
              <h2 className="text-lg font-medium text-foreground mb-2 group-hover:text-accent-deep transition-colors duration-200">
                {project.title}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-2">
                {project.tagline}
              </p>
              <div className="flex items-center justify-between mb-5">
                <span className="text-2xl font-medium text-foreground tracking-tight">
                  {project.heroMetric.value}
                </span>
                <span className="text-xs text-muted-foreground">
                  {project.heroMetric.label}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.services.map(s => (
                  <span
                    key={s}
                    className="text-xs text-muted-foreground border border-border/10 px-3 py-1 rounded-pill"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  )
}
