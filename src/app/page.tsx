import type { Metadata } from 'next'
import Link from 'next/link'
import { projects } from '@/lib/projects'
import { posts } from '@/lib/blog'
import { impactMetrics, services } from '@/lib/cv-data'
import { SectionLabel } from '@/components/SectionLabel'
import { StickyCTA } from '@/components/StickyCTA'

export const metadata: Metadata = {
  title: 'Jack Paul Brookes | Digital Growth Architect',
  description:
    'I build revenue platforms, not just websites. Digital transformation, B2B commerce, and conversion optimisation for businesses ready to scale.',
}

export default function HomePage() {
  return (
    <>
      <StickyCTA />
      <div className="max-w-content mx-auto px-6">

        {/* Hero */}
        <section className="pt-32 sm:pt-40 pb-20" aria-label="Introduction">
          <div className="space-y-8">
            <div>
              <p className="font-mono text-xs text-muted-foreground tracking-widest">
                Jack Paul Brookes
              </p>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extralight text-foreground leading-[1.05] tracking-tight mt-4">
                I build the
                <br className="hidden sm:block" />
                {' '}digital systems
                <br className="hidden sm:block" />
                {' '}that turn your
                <br className="hidden sm:block" />
                {' '}operations
                <br className="hidden sm:block" />
                {' '}into revenue.
              </h1>
            </div>

            <p className="text-lg font-light text-muted-foreground leading-relaxed max-w-md">
              Digital transformation, B2B platforms, and conversion optimisation
              for manufacturers and equipment suppliers in Suffolk.
            </p>

            <div className="pt-4">
              <Link
                href="/contact"
                className="inline-block bg-accent text-white font-mono text-xs tracking-widest px-8 py-4 hover:bg-accent/90 transition-colors duration-200"
              >
                BOOK A FREE GROWTH REVIEW
              </Link>
              <p className="font-mono text-xs text-muted-foreground mt-4 max-w-xs">
                30-minute call. I&apos;ll show you exactly where
                you&apos;re leaving revenue on the table.
              </p>
            </div>
          </div>
        </section>

        {/* Proof bar */}
        <section className="py-16 border-t border-b border-border" aria-label="Impact metrics">
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

        {/* Selected Work */}
        <section className="py-28 sm:py-32 border-b border-border" aria-labelledby="work-heading">
          <SectionLabel number="01" title="Results" className="mb-16" />

          <ol className="space-y-0" aria-label="Featured engagements">
            {projects.slice(0, 4).map((project, i) => (
              <li key={project.slug}>
                <Link
                  href={`/portfolio/${project.slug}`}
                  className="group flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6 py-6 border-b border-border last:border-0 hover:bg-muted transition-colors duration-200"
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
                    <span className="font-mono text-xs text-foreground font-medium">
                      {project.heroMetric.value}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">
                      {project.year}
                    </span>
                    <span
                      className="font-mono text-xs text-muted-foreground group-hover:translate-x-1 transition-transform duration-200 hidden sm:block"
                      aria-hidden="true"
                    >
                      &rarr;
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>

          <div className="mt-12">
            <Link
              href="/portfolio"
              className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors duration-200 inline-flex items-center gap-2"
            >
              <span>All case studies</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </section>

        {/* Services */}
        <section className="py-28 sm:py-32 border-b border-border" aria-labelledby="services-heading">
          <SectionLabel number="02" title="Services" className="mb-16" />

          <div className="space-y-14">
            {services.map((service) => (
              <div key={service.number} className="flex gap-6">
                <span className="font-mono text-xs text-muted-foreground tabular-nums pt-0.5 w-5 shrink-0">
                  {service.number}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-medium text-foreground mb-3">{service.title}</h3>
                  <p className="text-base font-light text-muted-foreground leading-relaxed max-w-lg mb-4">
                    {service.description}
                  </p>
                  <p className="font-mono text-xs text-foreground">
                    {service.deliverables.join(' · ')}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <Link
              href="/contact"
              className="font-mono text-xs text-accent hover:text-accent/70 transition-colors duration-200 inline-flex items-center gap-2"
            >
              <span>Discuss your project</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </section>

        {/* Approach */}
        <section className="py-28 sm:py-32 border-b border-border" aria-labelledby="approach-heading">
          <SectionLabel number="03" title="How I Work" className="mb-16" />

          <div className="space-y-8 max-w-lg">
            <p className="text-lg font-light text-foreground leading-relaxed">
              Start with the commercial outcome. Work backwards to the platform, the
              process, and the team that delivers it. Every recommendation is backed
              by evidence. If I can&apos;t measure the impact, I won&apos;t propose the work.
            </p>
            <p className="text-lg font-light text-foreground leading-relaxed">
              I&apos;ve built teams from 1 to 10, delivered platforms that handle real
              commercial complexity, and run CRO programmes that move revenue, not
              just conversion rates. I work at the intersection of strategy and
              execution because that&apos;s where value gets lost.
            </p>
          </div>

          <div className="mt-16 flex flex-wrap items-center gap-6">
            <Link
              href="/contact"
              className="inline-block bg-accent text-white font-mono text-xs tracking-widest px-6 py-3.5 hover:bg-accent/90 transition-colors duration-200"
            >
              BOOK A GROWTH REVIEW
            </Link>
            <Link
              href="/cv"
              className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors duration-200 inline-flex items-center gap-2"
            >
              <span>Full background</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </section>

        {/* Testimonial */}
        <section className="py-28 sm:py-32 border-b border-border" aria-label="Client testimonial">
          <blockquote className="space-y-6">
            <p className="text-2xl sm:text-3xl font-extralight text-foreground leading-snug tracking-tight max-w-lg">
              &ldquo;Jack took our digital revenue from zero to £2.2M. He didn&apos;t
              just build the platform&mdash;he built the team, the process, and
              the commercial engine behind it.&rdquo;
            </p>
            <footer className="font-mono text-xs text-muted-foreground">
              Senior stakeholder, B2B equipment supplier
            </footer>
          </blockquote>
        </section>

        {/* Writing */}
        <section className="py-28 sm:py-32 border-b border-border" aria-labelledby="writing-heading">
          <SectionLabel number="04" title="Free Guides" className="mb-16" />

          <ol className="space-y-0" aria-label="Recent posts">
            {posts.slice(0, 3).map((post, i) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6 py-6 border-b border-border last:border-0 hover:bg-muted transition-colors duration-200"
                >
                  <span className="font-mono text-xs text-muted-foreground tabular-nums shrink-0 w-5">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block text-sm font-light text-foreground leading-snug">
                      {post.title}
                    </span>
                  </span>
                  <span className="flex items-center gap-4 sm:shrink-0">
                    <span className="font-mono text-xs text-muted-foreground">
                      {post.category}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">
                      {post.readingTime} min
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>

          <div className="mt-12">
            <Link
              href="/blog"
              className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors duration-200 inline-flex items-center gap-2"
            >
              <span>All guides</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-32 sm:py-40" aria-labelledby="contact-heading">
          <div className="space-y-8">
            <p className="font-mono text-xs text-muted-foreground tracking-widest">
              05 / NEXT STEP
            </p>
            <h2 className="text-3xl sm:text-4xl font-extralight text-foreground leading-snug tracking-tight max-w-md">
              Find out what&apos;s costing you revenue.
            </h2>
            <p className="text-lg font-light text-muted-foreground leading-relaxed max-w-md">
              Book a free 30-minute growth review. I&apos;ll look at your website,
              your systems, and your numbers, and tell you exactly where the
              biggest opportunities are. No pitch deck. No retainer proposal.
              Just an honest assessment.
            </p>
            <div className="pt-4 flex flex-wrap items-center gap-6">
              <Link
                href="/contact"
                className="inline-block bg-accent text-white font-mono text-xs tracking-widest px-8 py-4 hover:bg-accent/90 transition-colors duration-200"
              >
                BOOK YOUR FREE REVIEW
              </Link>
              <a
                href="mailto:jackpbrookes@gmail.com"
                className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                or email directly &rarr;
              </a>
            </div>
          </div>
        </section>

      </div>
    </>
  )
}
