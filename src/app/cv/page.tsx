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
    <div className="max-w-content mx-auto px-6 sm:px-10">

      {/* What I do */}
      <section className="pt-24 sm:pt-32 lg:pt-40 pb-16 sm:pb-20">
        <SectionLabel number="00" title="About" className="mb-8" />
        <h1 className="text-3xl sm:text-4xl font-medium text-foreground leading-snug tracking-tight mb-6">
          Jack Paul Brookes
        </h1>
        <p className="text-lg text-foreground leading-relaxed max-w-lg">
          I help B2B businesses turn their websites and digital operations into
          measurable revenue systems. That means conversion architecture, platform
          engineering, SEO, and the commercial strategy that ties it all together.
          I work directly with a small number of clients at a time.
        </p>
        <div className="mt-8 inline-flex items-center gap-2 text-xs text-accent-deep border border-accent/30 px-4 py-2 rounded-pill bg-accent/10">
          <span className="w-2 h-2 rounded-full bg-accent-deep" />
          Currently taking on new clients
        </div>
      </section>

      {/* Results summary */}
      <section className="py-16 sm:py-20 border-t border-border/10" aria-label="Results summary">
        <SectionLabel number="01" title="Results" className="mb-10" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          {impactMetrics.map((metric) => (
            <div key={metric.label} className="border border-border/10 rounded-card p-5 bg-panel/50 space-y-1.5">
              <p className="text-3xl sm:text-4xl font-medium text-foreground tracking-tight leading-none">
                {metric.value}
              </p>
              <p className="text-sm font-medium text-foreground">{metric.label}</p>
              <p className="text-xs text-muted-foreground">{metric.context}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="py-16 sm:py-20 border-t border-border/10" aria-labelledby="experience-heading">
        <SectionLabel number="02" title="Experience" className="mb-10" />
        <ol className="space-y-4" aria-label="Work experience">
          {experience.map((role, i) => (
            <li key={i} className="border border-border/10 rounded-card p-6 sm:p-8">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                <h2 className="text-base font-medium text-foreground">{role.title}</h2>
                <span className="text-xs text-accent-deep font-medium">{role.company}</span>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-0.5 mb-4">
                <span className="text-xs text-muted-foreground">{role.period}</span>
                <span className="text-xs text-muted-foreground">{role.location}</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5 max-w-lg">
                {role.description}
              </p>
              <ul className="space-y-2" aria-label="Role highlights">
                {role.highlights.map((h, j) => (
                  <li key={j} className="flex gap-3">
                    <span className="text-accent-deep mt-1.5 shrink-0" aria-hidden="true">
                      <svg width="6" height="6" viewBox="0 0 6 6" fill="currentColor"><circle cx="3" cy="3" r="3" /></svg>
                    </span>
                    <span className="text-sm text-foreground leading-relaxed">{h}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      <section className="py-16 sm:py-20 border-t border-border/10" aria-labelledby="education-heading">
        <SectionLabel number="03" title="Education" className="mb-10" />
        <ol className="space-y-4" aria-label="Education history">
          {education.map((ed, i) => (
            <li key={i} className="border border-border/10 rounded-card p-6 sm:p-8">
              <h2 className="text-base font-medium text-foreground mb-1">{ed.degree}</h2>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-0.5 mb-3">
                <span className="text-xs text-accent-deep font-medium">{ed.institution}</span>
                <span className="text-xs text-muted-foreground">{ed.year}</span>
              </div>
              {ed.notes && (
                <p className="text-sm text-muted-foreground">{ed.notes}</p>
              )}
            </li>
          ))}
        </ol>
      </section>

      <section className="py-16 sm:py-20 border-t border-border/10" aria-labelledby="skills-heading">
        <SectionLabel number="04" title="Skills &amp; Tools" className="mb-10" />
        <div className="space-y-4">
          {skills.map(group => (
            <div key={group.label} className="border border-border/10 rounded-card p-6 sm:p-8">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest mb-3">
                {group.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.items.map(item => (
                  <span key={item} className="text-sm text-foreground border border-border/10 px-3 py-1.5 rounded-pill">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}
