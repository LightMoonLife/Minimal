import type { Metadata } from 'next'
import Link from 'next/link'
import { projects } from '@/lib/projects'
import { impactMetrics, services } from '@/lib/cv-data'
import { SectionLabel } from '@/components/SectionLabel'

export const metadata: Metadata = {
  title: 'Jack Paul Brookes — Digital Growth Architect',
  description:
    'I build revenue platforms, not just websites. Digital transformation, B2B commerce, and conversion optimisation for businesses ready to scale.',
}

export default function HomePage() {
  return (
    <div className="max-w-content mx-auto px-6">

      {/* ——— Hero ——— */}
      <section className="pt-20 pb-20 border-b border-border" aria-label="Introduction">
        <div className="space-y-8">
          <div>
            <h1 className="text-2xl font-light text-foreground leading-snug tracking-tight">
              Jack Paul Brookes
            </h1>
            <p className="font-mono text-xs text-muted-foreground tracking-widest mt-1">
              Digital Growth Architect
            </p>
          </div>

          <p className="text-lg font-light text-foreground leading-relaxed max-w-lg">
            I build revenue platforms, not just websites.
          </p>

          <p className="text-base font-light text-muted-foreground leading-relaxed max-w-lg">
            Digital transformation for B2B businesses — strategy, engineering, and
            optimisation driven by commercial outcomes, not vanity metrics.
          </p>

          <dl className="space-y-1">
            {[
              { label: 'Based in', value: 'Ipswich, UK' },
              { label: 'Focus', value: 'B2B Digital Transformation & Revenue Platforms' },
              { label: 'Experience', value: '9+ years building digital revenue systems' },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-baseline gap-3">
                <dt className="font-mono text-xs text-muted-foreground w-28 shrink-0">{label}</dt>
                <dd className="font-mono text-xs text-foreground">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ——— Impact ——— */}
      <section className="py-16 border-b border-border" aria-label="Impact metrics">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {impactMetrics.map((metric) => (
            <div key={metric.label} className="space-y-1">
              <p className="text-2xl sm:text-3xl font-light text-accent tracking-tight leading-none">
                {metric.value}
              </p>
              <p className="font-mono text-xs text-foreground">{metric.label}</p>
              <p className="font-mono text-xs text-muted-foreground">{metric.context}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ——— Selected Work ——— */}
      <section className="py-20 border-b border-border" aria-labelledby="work-heading">
        <SectionLabel number="01" title="Selected Work" className="mb-12" />

        <ol className="space-y-0" aria-label="Featured engagements">
          {projects.slice(0, 4).map((project, i) => (
            <li key={project.slug}>
              <Link
                href={`/portfolio/${project.slug}`}
                className="group flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6 py-6 border-b border-border last:border-0 hover:bg-muted -mx-6 px-6 transition-colors duration-200"
              >
                <span className="font-mono text-xs text-muted-foreground tabular-nums shrink-0 w-5">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block text-base font-light text-foreground group-hover:text-foreground transition-colors">
                    {project.title}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground mt-0.5 block">
                    {project.client}
                  </span>
                </span>
                <span className="flex items-center gap-6 sm:shrink-0">
                  <span className="font-mono text-xs text-accent font-medium">
                    {project.heroMetric.value}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {project.year}
                  </span>
                  <span
                    className="font-mono text-xs text-muted-foreground group-hover:translate-x-1 transition-transform duration-200 hidden sm:block"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ol>

        <div className="mt-10">
          <Link
            href="/portfolio"
            className="font-mono text-xs text-muted-foreground hover:text-accent transition-colors duration-200 inline-flex items-center gap-2"
          >
            <span>All engagements</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* ——— Services ——— */}
      <section className="py-20 border-b border-border" aria-labelledby="services-heading">
        <SectionLabel number="02" title="Services" className="mb-12" />

        <div className="space-y-12">
          {services.map((service) => (
            <div key={service.number} className="flex gap-6">
              <span className="font-mono text-xs text-muted-foreground tabular-nums pt-0.5 w-5 shrink-0">
                {service.number}
              </span>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-medium text-foreground mb-2">{service.title}</h3>
                <p className="text-sm font-light text-muted-foreground leading-relaxed max-w-lg mb-3">
                  {service.description}
                </p>
                <p className="font-mono text-xs text-foreground">
                  {service.deliverables.join(' · ')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ——— Approach ——— */}
      <section className="py-20 border-b border-border" aria-labelledby="approach-heading">
        <SectionLabel number="03" title="How I Work" className="mb-12" />

        <div className="space-y-6 max-w-lg">
          <p className="text-base font-light text-foreground leading-relaxed">
            Start with the commercial outcome. Work backwards to the platform, the
            process, and the team that delivers it. Every recommendation is backed
            by evidence — if I can&apos;t measure the impact, I won&apos;t propose the work.
          </p>
          <p className="text-base font-light text-foreground leading-relaxed">
            I&apos;ve built teams from 1 to 10, delivered platforms that handle real
            commercial complexity, and run CRO programmes that move revenue — not
            just conversion rates. I work at the intersection of strategy and
            execution because that&apos;s where value gets lost.
          </p>
        </div>

        <div className="mt-12">
          <Link
            href="/cv"
            className="font-mono text-xs text-muted-foreground hover:text-accent transition-colors duration-200 inline-flex items-center gap-2"
          >
            <span>Full background</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* ——— Contact ——— */}
      <section className="py-20" aria-labelledby="contact-heading">
        <SectionLabel number="04" title="Get in Touch" className="mb-12" />

        <div className="space-y-4">
          <p className="text-base font-light text-foreground max-w-md">
            Available for freelance projects and consulting engagements.
            If you&apos;re building something that needs to generate revenue,
            let&apos;s talk.
          </p>
          <div className="space-y-2">
            <a
              href="mailto:jackpbrookes@gmail.com"
              className="font-mono text-xs text-foreground hover:text-accent transition-colors duration-200 block"
            >
              jackpbrookes@gmail.com
            </a>
            <a
              href="https://linkedin.com/in/jackpbrookes"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-muted-foreground hover:text-accent transition-colors duration-200 block"
            >
              LinkedIn →
            </a>
          </div>
          <div className="pt-4">
            <Link
              href="/contact"
              className="font-mono text-xs text-muted-foreground hover:text-accent transition-colors duration-200 inline-flex items-center gap-2"
            >
              <span>Send a message</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
