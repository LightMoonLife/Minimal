import type { Metadata } from 'next'
import Image from 'next/image'
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
      <div className="max-w-content mx-auto px-6 sm:px-10">

        {/* Hero */}
        <section className="pt-24 sm:pt-32 lg:pt-40 pb-20 sm:pb-28" aria-label="Introduction">
          <div className="flex flex-col sm:flex-row items-start gap-10 sm:gap-16">
            <div className="flex-1 min-w-0 space-y-8">
              <div>
                <SectionLabel number="00" title="Welcome" className="mb-6" />
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium text-foreground leading-[1.08] tracking-tight">
                  I build the digital
                  <br className="hidden sm:block" />
                  {' '}systems that turn
                  <br className="hidden sm:block" />
                  {' '}your operations
                  <br className="hidden sm:block" />
                  {' '}into{' '}
                  <span className="text-accent-deep">revenue.</span>
                </h1>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
                Digital transformation, B2B platforms, and conversion optimisation
                for manufacturers and equipment suppliers in Suffolk.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-accent text-foreground font-medium text-sm px-7 py-3.5 rounded-pill hover:bg-accent-deep hover:text-white transition-all duration-320 ease-smooth hover:-translate-y-0.5"
                >
                  Book a free review
                  <span aria-hidden="true">&rarr;</span>
                </Link>
                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 border border-border/15 px-6 py-3.5 rounded-pill hover:-translate-y-0.5 transition-all duration-320"
                >
                  See my work
                </Link>
              </div>
            </div>

            <div className="shrink-0 sm:pt-8">
              <Image
                src="/headshot.webp"
                alt="Jack Paul Brookes"
                width={200}
                height={200}
                className="rounded-2xl object-cover object-top w-28 h-28 sm:w-44 sm:h-44 lg:w-52 lg:h-52"
                priority
              />
            </div>
          </div>
        </section>

        {/* Proof bar */}
        <section className="py-16 sm:py-20 border-t border-b border-border/10" aria-label="Impact metrics">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-10">
            {impactMetrics.map((metric) => (
              <div key={metric.label} className="space-y-1.5">
                <p className="text-3xl sm:text-4xl font-medium text-foreground tracking-tight leading-none">
                  {metric.value}
                </p>
                <p className="text-sm font-medium text-foreground">{metric.label}</p>
                <p className="text-xs text-muted-foreground">{metric.context}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Selected Work */}
        <section className="py-20 sm:py-28" aria-labelledby="work-heading">
          <SectionLabel number="01" title="Selected Work" className="mb-12" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {projects.slice(0, 4).map((project) => (
              <Link
                key={project.slug}
                href={`/portfolio/${project.slug}`}
                className="group block border border-border/10 rounded-card p-6 sm:p-8 bg-panel/50 hover:bg-panel hover:shadow-lg hover:-translate-y-0.5 transition-all duration-320 ease-smooth"
              >
                <p className="text-xs text-muted-foreground mb-3">
                  {project.client} &middot; {project.year}
                </p>
                <h3 className="text-lg font-medium text-foreground mb-2 group-hover:text-accent-deep transition-colors duration-200">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-2">
                  {project.tagline}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-medium text-foreground tracking-tight">
                    {project.heroMetric.value}
                  </span>
                  <span className="text-xs text-muted-foreground group-hover:text-accent-deep group-hover:translate-x-1 transition-all duration-200">
                    View case study &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <span>All case studies</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </section>

        {/* Services */}
        <section className="py-20 sm:py-28 border-t border-border/10" aria-labelledby="services-heading">
          <SectionLabel number="02" title="What I Do" className="mb-12" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {services.map((service) => (
              <div
                key={service.number}
                className="border border-border/10 rounded-card p-6 sm:p-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-xs font-medium text-accent-deep">
                    {service.number}
                  </span>
                  <h3 className="text-base font-medium text-foreground">{service.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.deliverables.map((d) => (
                    <span key={d} className="text-xs text-muted-foreground border border-border/10 px-3 py-1 rounded-pill">
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-sm text-accent-deep hover:text-foreground transition-colors duration-200"
            >
              <span>Discuss your project</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </section>

        {/* How I Work */}
        <section className="py-20 sm:py-28 border-t border-border/10" aria-labelledby="approach-heading">
          <SectionLabel number="03" title="How I Work" className="mb-12" />

          <div className="sm:flex gap-16 items-start">
            <div className="flex-1 space-y-6 max-w-lg">
              <p className="text-lg text-foreground leading-relaxed">
                Start with the commercial outcome. Work backwards to the platform, the
                process, and the team that delivers it. Every recommendation is backed
                by evidence. If I can&apos;t measure the impact, I won&apos;t propose the work.
              </p>
              <p className="text-lg text-foreground leading-relaxed">
                I&apos;ve built teams from 1 to 10, delivered platforms that handle real
                commercial complexity, and run CRO programmes that move revenue, not
                just conversion rates. I work at the intersection of strategy and
                execution because that&apos;s where value gets lost.
              </p>
            </div>

            <div className="mt-8 sm:mt-0 flex flex-col gap-3 shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-accent text-foreground font-medium text-sm px-7 py-3.5 rounded-pill hover:bg-accent-deep hover:text-white transition-all duration-320 ease-smooth hover:-translate-y-0.5"
              >
                Book a growth review
              </Link>
              <Link
                href="/cv"
                className="inline-flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 border border-border/15 px-6 py-3 rounded-pill"
              >
                Full background &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="py-20 sm:py-28 border-t border-border/10" aria-label="Client testimonial">
          <div className="border border-border/10 rounded-card p-8 sm:p-12 bg-panel/50">
            <blockquote className="space-y-6">
              <p className="text-xl sm:text-2xl font-medium text-foreground leading-snug tracking-tight max-w-lg">
                &ldquo;Jack took our digital revenue from zero to £2.2M. He didn&apos;t
                just build the platform&mdash;he built the team, the process, and
                the commercial engine behind it.&rdquo;
              </p>
              <footer className="text-sm text-muted-foreground">
                Senior stakeholder, B2B equipment supplier
              </footer>
            </blockquote>
          </div>
        </section>

        {/* Writing */}
        <section className="py-20 sm:py-28 border-t border-border/10" aria-labelledby="writing-heading">
          <SectionLabel number="04" title="Writing" className="mb-12" />

          <div className="space-y-3">
            {posts.slice(0, 3).map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 py-5 px-5 rounded-card border border-transparent hover:border-border/10 hover:bg-panel/50 transition-all duration-200"
              >
                <span className="flex-1 min-w-0">
                  <span className="block text-sm font-medium text-foreground group-hover:text-accent-deep transition-colors duration-200 leading-snug">
                    {post.title}
                  </span>
                </span>
                <span className="flex items-center gap-4 shrink-0">
                  <span className="text-xs text-muted-foreground border border-border/10 px-3 py-1 rounded-pill">
                    {post.category}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {post.readingTime} min
                  </span>
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <span>All posts</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 sm:py-32" aria-labelledby="contact-heading">
          <div className="border border-border/10 rounded-card p-8 sm:p-14 bg-panel/50 text-center space-y-6">
            <SectionLabel number="05" title="Next Step" className="justify-center mb-4" />
            <h2 className="text-2xl sm:text-3xl font-medium text-foreground leading-snug tracking-tight max-w-md mx-auto">
              Find out what&apos;s costing you revenue.
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed max-w-md mx-auto">
              Book a free 30-minute growth review. I&apos;ll look at your website,
              your systems, and your numbers, and tell you exactly where the
              biggest opportunities are.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-accent text-foreground font-medium text-sm px-8 py-4 rounded-pill hover:bg-accent-deep hover:text-white transition-all duration-320 ease-smooth hover:-translate-y-0.5"
              >
                Book your free review
                <span aria-hidden="true">&rarr;</span>
              </Link>
              <a
                href="mailto:jackpbrookes@gmail.com"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
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
