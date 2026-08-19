import type { Metadata } from 'next'
import { experience, education, skills, impactMetrics } from '@/lib/cv-data'
import { SectionLabel } from '@/components/SectionLabel'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Digital Growth Architect with 9+ years building revenue systems across B2B digital transformation, platform engineering, and conversion optimisation.',
}

export default function CVPage() {
  return (
    <div className="max-w-content mx-auto px-6">

      {/* What I do */}
      <section className="pt-32 sm:pt-40 pb-24 border-b border-border">
        <SectionLabel number="00" title="About" className="mb-10" />
        <h1 className="text-3xl sm:text-4xl font-extralight text-foreground leading-snug tracking-tight mb-6">
          Jack Paul Brookes
        </h1>
        <p className="text-lg font-light text-foreground leading-relaxed max-w-lg">
          I help B2B businesses turn their websites and digital operations into
          measurable revenue systems. That means conversion architecture, platform
          engineering, SEO, and the commercial strategy that ties it all together.
          I work directly with a small number of clients at a time.
        </p>
        <p className="font-mono text-xs text-muted-foreground mt-8">
          Currently taking on new clients.
        </p>
      </section>

      {/* Results summary */}
      <section className="py-16 border-b border-border" aria-label="Results summary">
        <SectionLabel number="01" title="Results" className="mb-10" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10">
          {impactMetrics.map((metric) => (
            <div key={metric.label} className="space-y-1">
              <p className="text-4xl sm:text-5xl font-extralight text-foreground tracking-tight leading-none">
                {metric.value}
              </p>
              <p className="font-mono text-xs text-foreground">{metric.label}</p>
              <p className="font-mono text-xs text-muted-foreground">{metric.context}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="py-24 sm:py-32 border-b border-border" aria-labelledby="experience-heading">
        <SectionLabel number="02" title="Experience" className="mb-16" />
        <ol className="space-y-16" aria-label="Work experience">
          {experience.map((role, i) => (
            <li key={i} className="flex gap-6">
              <span className="font-mono text-xs text-muted-foreground tabular-nums pt-1 w-5 shrink-0">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                  <h2 className="text-lg font-medium text-foreground">{role.title}</h2>
                  <span className="font-mono text-xs text-muted-foreground">{role.company}</span>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-0.5 mb-5">
                  <span className="font-mono text-xs text-muted-foreground">{role.period}</span>
                  <span className="font-mono text-xs text-muted-foreground">{role.location}</span>
                </div>
                <p className="text-sm font-light text-muted-foreground leading-relaxed mb-5 max-w-lg">
                  {role.description}
                </p>
                <ul className="space-y-2.5" aria-label="Role highlights">
                  {role.highlights.map((h, j) => (
                    <li key={j} className="flex gap-3">
                      <span className="font-mono text-xs text-muted-foreground mt-1 shrink-0" aria-hidden="true">/</span>
                      <span className="text-sm font-light text-foreground leading-relaxed">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="py-24 sm:py-32 border-b border-border" aria-labelledby="education-heading">
        <SectionLabel number="03" title="Education" className="mb-16" />
        <ol className="space-y-12" aria-label="Education history">
          {education.map((ed, i) => (
            <li key={i} className="flex gap-6">
              <span className="font-mono text-xs text-muted-foreground tabular-nums pt-1 w-5 shrink-0">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h2 className="text-lg font-medium text-foreground mb-1">{ed.degree}</h2>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-0.5 mb-3">
                  <span className="font-mono text-xs text-muted-foreground">{ed.institution}</span>
                  <span className="font-mono text-xs text-muted-foreground">{ed.year}</span>
                </div>
                {ed.notes && (
                  <p className="font-mono text-xs text-muted-foreground">{ed.notes}</p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="py-24 sm:py-32" aria-labelledby="skills-heading">
        <SectionLabel number="04" title="Skills &amp; Tools" className="mb-16" />
        <dl className="space-y-10">
          {skills.map(group => (
            <div key={group.label} className="flex gap-6">
              <dt className="font-mono text-xs text-muted-foreground w-28 shrink-0 pt-0.5">
                {group.label}
              </dt>
              <dd className="flex-1">
                <p className="font-mono text-xs text-foreground leading-relaxed">
                  {group.items.join(', ')}
                </p>
              </dd>
            </div>
          ))}
        </dl>
      </section>

    </div>
  )
}
