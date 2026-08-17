import type { Metadata } from 'next'
import { experience, education, skills } from '@/lib/cv-data'
import { SectionLabel } from '@/components/SectionLabel'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Digital Growth Architect with 9+ years building revenue systems across B2B digital transformation, platform engineering, and conversion optimisation.',
}

export default function CVPage() {
  return (
    <div className="max-w-content mx-auto px-6">

      <section className="pt-20 pb-20 border-b border-border">
        <SectionLabel number="00" title="About" className="mb-8" />
        <h1 className="text-2xl font-light text-foreground leading-snug tracking-tight mb-4">
          Jack Paul Brookes
        </h1>
        <p className="text-base font-light text-foreground leading-relaxed max-w-lg">
          I started as a product designer, taught myself SEO and CRO, built a £3.2M
          revenue channel from scratch, scaled a marketing team from 1 to 10, and
          now lead digital transformation for an 8-figure B2B business.
        </p>
        <p className="text-base font-light text-muted-foreground leading-relaxed max-w-lg mt-4">
          The thread through all of it: I build the systems that turn digital
          operations into revenue. Not campaigns. Not content strategies.
          Platforms, processes, and teams that produce measurable commercial results.
        </p>
      </section>

      <section className="py-20 border-b border-border" aria-labelledby="experience-heading">
        <SectionLabel number="01" title="Experience" className="mb-12" />
        <ol className="space-y-14" aria-label="Work experience">
          {experience.map((role, i) => (
            <li key={i} className="flex gap-6">
              <span className="font-mono text-xs text-muted-foreground tabular-nums pt-1 w-5 shrink-0">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                  <h2 className="text-base font-medium text-foreground">{role.title}</h2>
                  <span className="font-mono text-xs text-muted-foreground">{role.company}</span>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-0.5 mb-4">
                  <span className="font-mono text-xs text-muted-foreground">{role.period}</span>
                  <span className="font-mono text-xs text-muted-foreground">{role.location}</span>
                </div>
                <p className="text-sm font-light text-muted-foreground leading-relaxed mb-4 max-w-lg">
                  {role.description}
                </p>
                <ul className="space-y-2" aria-label="Role highlights">
                  {role.highlights.map((h, j) => (
                    <li key={j} className="flex gap-3">
                      <span className="font-mono text-xs text-muted-foreground mt-1 shrink-0" aria-hidden="true">&mdash;</span>
                      <span className="text-sm font-light text-foreground leading-relaxed">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="py-20 border-b border-border" aria-labelledby="education-heading">
        <SectionLabel number="02" title="Education" className="mb-12" />
        <ol className="space-y-10" aria-label="Education history">
          {education.map((ed, i) => (
            <li key={i} className="flex gap-6">
              <span className="font-mono text-xs text-muted-foreground tabular-nums pt-1 w-5 shrink-0">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h2 className="text-base font-medium text-foreground mb-1">{ed.degree}</h2>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-0.5 mb-2">
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

      <section className="py-20" aria-labelledby="skills-heading">
        <SectionLabel number="03" title="Skills &amp; Tools" className="mb-12" />
        <dl className="space-y-8">
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
