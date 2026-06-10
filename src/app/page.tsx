import type { Metadata } from 'next'
import Link from 'next/link'
import { projects } from '@/lib/projects'
import { SectionLabel } from '@/components/SectionLabel'

export const metadata: Metadata = {
  title: 'Your Name — CRO & UX Specialist',
  description:
    'CRO and UX specialist turning behavioural data into design decisions. Eight years of optimising digital experiences for e-commerce, SaaS, and financial services.',
}

export default function HomePage() {
  return (
    <div className="max-w-content mx-auto px-6">

      {/* ——— Intro ——— */}
      <section className="pt-20 pb-20 border-b border-border" aria-label="Introduction">
        <div className="space-y-8">
          <div>
            <h1 className="text-2xl font-light text-foreground leading-snug tracking-tight">
              Your Name
            </h1>
            <p className="font-mono text-xs text-muted-foreground tracking-widest mt-1">
              CRO &amp; UX Specialist
            </p>
          </div>

          <p className="text-lg font-light text-foreground leading-relaxed max-w-lg">
            Turning behavioural data into design decisions that move the needle.
          </p>

          <dl className="space-y-1">
            {[
              { label: 'Based in', value: 'London, UK' },
              { label: 'Specialising in', value: 'E-commerce, SaaS, Financial Services' },
              { label: 'Experience', value: '8+ years in CRO & UX' },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-baseline gap-3">
                <dt className="font-mono text-xs text-muted-foreground w-28 shrink-0">{label}</dt>
                <dd className="font-mono text-xs text-foreground">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ——— Selected Work ——— */}
      <section className="py-20 border-b border-border" aria-labelledby="work-heading">
        <SectionLabel number="01" title="Selected Work" className="mb-12" />

        <ol className="space-y-0" aria-label="Featured projects">
          {projects.map((project, i) => (
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
            <span>All work</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* ——— Approach ——— */}
      <section className="py-20 border-b border-border" aria-labelledby="approach-heading">
        <SectionLabel number="02" title="Approach" className="mb-12" />

        <div className="space-y-6 max-w-lg">
          <p className="text-base font-light text-foreground leading-relaxed">
            Start with evidence. Interrogate the data before touching the design.
            Quantitative analysis tells you where the problem is; qualitative
            research tells you why.
          </p>
          <p className="text-base font-light text-foreground leading-relaxed">
            Then hypothesise, test, and measure. Every design decision should be
            answerable with a number. If you can&apos;t measure it, you can&apos;t
            know if it worked.
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
        <SectionLabel number="03" title="Contact" className="mb-12" />

        <div className="space-y-4">
          <p className="text-base font-light text-foreground">
            Available for freelance projects and full-time roles.
          </p>
          <div className="space-y-2">
            <a
              href="mailto:hello@yourdomain.com"
              className="font-mono text-xs text-foreground hover:text-muted-foreground transition-colors duration-200 block"
            >
              hello@yourdomain.com
            </a>
            <a
              href="https://linkedin.com/in/yourprofile"
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
