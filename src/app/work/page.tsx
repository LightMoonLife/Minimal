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

      <section className="pt-24 sm:pt-32 lg:pt-40 pb-14 sm:pb-16">
        <Breadcrumb items={[{ name: 'Work', href: '/work' }]} />
        <SectionLabel number="00" title="Work" className="mb-6" />
        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-ink leading-tight tracking-tighter max-w-md">
          Case studies in digital transformation, platform engineering, and revenue growth.
        </h1>
      </section>

      <section className="pb-12" aria-label="All case studies">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className="group block soft-card p-5 sm:p-6"
            >
              <p className="text-xs text-ink-faint mb-2">
                {project.deliveryTag} &middot; {project.year}
              </p>
              <h2 className="text-lg font-bold text-ink mb-1.5 group-hover:text-blueprint transition-colors duration-200">
                {project.title}
              </h2>
              <p className="text-sm text-ink-soft leading-relaxed mb-5 line-clamp-2">
                {project.tagline}
              </p>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xl font-bold text-ink tracking-tighter tabular-nums">
                  {project.heroMetric.value}
                </span>
                <span className="text-xs text-ink-soft">
                  {project.heroMetric.label}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.services.map(s => (
                  <span
                    key={s}
                    className="pill-badge bg-ink/5 text-ink-faint text-xs"
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
