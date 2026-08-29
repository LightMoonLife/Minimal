import type { Metadata } from 'next'
import { experience, education, skills, impactMetrics } from '@/lib/cv-data'
import { SectionLabel } from '@/components/SectionLabel'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Digital Marketing Consultant with 9+ years building revenue systems across B2B digital transformation, platform engineering, and conversion optimisation.',
}

export default function CVPage() {
  return (
    <div className="max-w-content mx-auto px-6 sm:px-10">

      {/* What I do */}
      <section className="pt-24 sm:pt-32 lg:pt-40 pb-14 sm:pb-16">
        <SectionLabel number="00" title="About" className="mb-6" />
        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-ink leading-tight tracking-tighter mb-5">
          Jack Paul Brookes
        </h1>
        <p className="text-lg text-ink leading-relaxed max-w-lg">
          I help B2B businesses turn their websites and digital operations into
          measurable revenue systems. That means conversion architecture, platform
          engineering, SEO, and the commercial strategy that ties it all together.
          I work directly with a small number of clients at a time.
        </p>
        <div className="mt-6">
          <span className="pill-badge bg-blueprint/10 text-blueprint text-xs font-medium border border-blueprint/20">
            <span className="w-2 h-2 rounded-full bg-blueprint mr-2" />
            Currently taking on new clients
          </span>
        </div>
      </section>

      {/* Results summary */}
      <section className="py-14 sm:py-16" aria-label="Results summary">
        <SectionLabel number="01" title="Results" className="mb-8" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          {impactMetrics.map((metric) => (
            <div key={metric.label} className="soft-card p-5 space-y-1.5">
              <p className="font-mono text-2xl sm:text-3xl font-bold text-ink tracking-tighter leading-none tabular-nums">
                {metric.value}
              </p>
              <p className="text-sm font-medium text-ink">{metric.label}</p>
              <p className="text-xs text-ink-soft">{metric.context}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="py-14 sm:py-16" aria-labelledby="experience-heading">
        <SectionLabel number="02" title="Experience" className="mb-8" />
        <ol className="space-y-4" aria-label="Work experience">
          {experience.map((role, i) => (
            <li key={i} className="soft-card p-5 sm:p-6">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                <h2 className="text-base font-bold text-ink">{role.title}</h2>
                <span className="text-xs text-blueprint font-medium">{role.company}</span>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-0.5 mb-3">
                <span className="text-xs text-ink-soft">{role.period}</span>
                <span className="text-xs text-ink-soft">{role.location}</span>
              </div>
              <p className="text-sm text-ink-soft leading-relaxed mb-4 max-w-lg">
                {role.description}
              </p>
              <ul className="space-y-2" aria-label="Role highlights">
                {role.highlights.map((h, j) => (
                  <li key={j} className="flex gap-3">
                    <span className="text-blueprint mt-1.5 shrink-0" aria-hidden="true">
                      <svg width="6" height="6" viewBox="0 0 6 6" fill="currentColor"><circle cx="3" cy="3" r="3" /></svg>
                    </span>
                    <span className="text-sm text-ink leading-relaxed">{h}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      <section className="py-14 sm:py-16" aria-labelledby="education-heading">
        <SectionLabel number="03" title="Education" className="mb-8" />
        <ol className="space-y-4" aria-label="Education history">
          {education.map((ed, i) => (
            <li key={i} className="soft-card p-5 sm:p-6">
              <h2 className="text-base font-bold text-ink mb-1">{ed.degree}</h2>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-0.5 mb-2">
                <span className="text-xs text-blueprint font-medium">{ed.institution}</span>
                <span className="text-xs text-ink-soft">{ed.year}</span>
              </div>
              {ed.notes && (
                <p className="text-sm text-ink-soft">{ed.notes}</p>
              )}
            </li>
          ))}
        </ol>
      </section>

      <section className="py-14 sm:py-16" aria-labelledby="skills-heading">
        <SectionLabel number="04" title="Skills &amp; Tools" className="mb-8" />
        <div className="space-y-4">
          {skills.map(group => (
            <div key={group.label} className="soft-card p-5 sm:p-6">
              <p className="text-xs text-ink-faint font-medium uppercase tracking-widest mb-3">
                {group.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.items.map(item => (
                  <span key={item} className="pill-badge bg-ink/5 text-ink text-sm">
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
