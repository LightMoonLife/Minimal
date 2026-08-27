import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { projects } from '@/lib/projects'
import { posts } from '@/lib/blog'
import { impactMetrics } from '@/lib/cv-data'
import { SectionLabel } from '@/components/SectionLabel'
import { StickyCTA } from '@/components/StickyCTA'
import { ProcessSteps } from '@/components/ProcessSteps'
import { personJsonLd, professionalServiceJsonLd, JsonLd } from '@/lib/schema'
import { CONTACT } from '@/lib/constants'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Jack Paul Brookes | Digital Growth Architect, Suffolk',
  description:
    'I turn B2B operations into revenue systems. Digital transformation, platform engineering, and conversion optimisation for manufacturers and equipment suppliers in Suffolk.',
}

const statLinks: Record<string, string> = {
  '£2.2M': '/work/digital-revenue-engine',
  '75%': '/work/onboarding-transformation',
  '4.29%': '/work/conversion-architecture',
  '61:1': '/work/revenue-channel-build',
}

const homepageServices = [
  {
    slug: 'digital-transformation',
    heading: 'Modernise operations, unlock revenue',
    description:
      'Replace disconnected tools and manual processes with connected systems that drive commercial outcomes. Technology audits, platform roadmaps, CRM implementation, and process re-engineering.',
    deliverables: ['Technology audits', 'Process re-engineering', 'CRM & automation', 'Team scaling'],
  },
  {
    slug: 'revenue-platforms',
    heading: 'Build platforms your customers actually use',
    description:
      'Custom B2B portals, e-commerce builds, and internal tools engineered around how your customers buy — not how B2C shoppers browse.',
    deliverables: ['B2B portals', 'E-commerce platforms', 'Sales tools', 'API integrations'],
  },
  {
    slug: 'conversion-and-growth',
    heading: 'Turn existing traffic into measurable revenue',
    description:
      'CRO programmes, SEO, and PPC managed against revenue targets, not vanity metrics. Every recommendation backed by data, every test run to statistical significance.',
    deliverables: ['CRO programmes', 'A/B testing', 'SEO strategy', 'PPC management'],
  },
]

const testimonials = [
  {
    quote:
      "Jack took our digital revenue from zero to £2.2M. He didn’t just build the platform — he built the team, the process, and the commercial engine behind it.",
    attribution: 'Senior stakeholder, B2B equipment supplier',
    context: 'Delivered in-house at Liquidline',
  },
  // {{TESTIMONIAL_2}} — Add additional client testimonials here.
  // Each entry needs: quote, attribution (name + role if permitted), context (delivery label).
  // {{TESTIMONIAL_3}}
]

export default function HomePage() {
  const visibleTestimonials = testimonials.filter((t) => !t.quote.startsWith('{{'))

  return (
    <>
      <JsonLd data={personJsonLd()} />
      <JsonLd data={professionalServiceJsonLd()} />
      <StickyCTA />
      <div className="max-w-content mx-auto px-6 sm:px-10">

        {/* Hero */}
        <section className="pt-24 sm:pt-32 lg:pt-40 pb-20 sm:pb-28 hero-atmosphere" aria-label="Introduction">
          <div className="flex flex-col sm:flex-row items-center gap-10 sm:gap-14">
            <div className="flex-1 min-w-0 space-y-8">
              <div>
                <SectionLabel number="00" title="Welcome" className="mb-6 animate-in reveal-1" />
                <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-extrabold text-foreground leading-[.95] tracking-tight animate-in reveal-2">
                  Digital growth for
                  <br className="hidden sm:block" />
                  {' '}manufacturers &amp;
                  <br className="hidden sm:block" />
                  {' '}<span className="text-accent-deep italic">equipment suppliers.</span>
                </h1>
              </div>

              <p className="text-lg font-extralight text-muted-foreground leading-relaxed max-w-md animate-in reveal-3">
                I turn B2B operations into revenue systems — platform engineering,
                conversion optimisation, and digital transformation that drives
                measurable commercial outcomes.
              </p>

              <div className="animate-in reveal-4">
                <Button size="lg" asChild>
                  <Link href="/contact">
                    Book your free review
                    <span aria-hidden="true" className="ml-1">&rarr;</span>
                  </Link>
                </Button>
              </div>
            </div>

            <div className="shrink-0 animate-scale reveal-3">
              <Image
                src="/headshot.webp"
                alt="Jack Paul Brookes"
                width={400}
                height={400}
                className="rounded-2xl object-cover object-top w-40 h-40 sm:w-60 sm:h-60 lg:w-72 lg:h-72"
                priority
              />
            </div>
          </div>
        </section>

        {/* Proof bar */}
        <section className="py-16 sm:py-20 border-t border-b border-border/10" aria-label="Impact metrics">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-10">
            {impactMetrics.map((metric) => (
              <Link
                key={metric.label}
                href={statLinks[metric.value] || '/work'}
                className="group space-y-1.5"
              >
                <p className="font-display text-4xl sm:text-5xl font-extrabold text-foreground tracking-tighter leading-none group-hover:text-accent-deep transition-colors duration-200">
                  {metric.value}
                </p>
                <p className="text-sm font-medium text-foreground">{metric.label}</p>
                <p className="text-xs font-extralight text-muted-foreground">{metric.context}</p>
                <p className="text-[11px] font-extralight text-muted-foreground italic">{metric.source}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Selected Work */}
        <section id="work" className="py-20 sm:py-28" aria-labelledby="work-heading">
          <SectionLabel number="01" title="Selected Work" className="mb-12" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {projects.slice(0, 4).map((project) => (
              <Link
                key={project.slug}
                href={`/work/${project.slug}`}
                className="group block border border-border/10 rounded-card p-6 sm:p-8 bg-panel/50 hover:bg-panel hover:shadow-lg hover:-translate-y-0.5 transition-all duration-320 ease-smooth"
              >
                <p className="text-xs font-extralight text-muted-foreground mb-3">
                  {project.deliveryTag} &middot; {project.year}
                </p>
                <h3 className="font-display text-lg font-extrabold text-foreground mb-2 group-hover:text-accent-deep transition-colors duration-200">
                  {project.title}
                </h3>
                <p className="text-sm font-extralight text-muted-foreground leading-relaxed mb-6 line-clamp-2">
                  {project.tagline}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-display text-3xl font-extrabold text-foreground tracking-tighter">
                    {project.heroMetric.value}
                  </span>
                  <span className="text-xs font-extralight text-muted-foreground group-hover:text-accent-deep group-hover:translate-x-1 transition-all duration-200">
                    View case study &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-sm font-extralight text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <span>All case studies</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </section>

        {/* Services — 3 outcome-focused cards */}
        <section className="py-20 sm:py-28 border-t border-border/10" aria-labelledby="services-heading">
          <SectionLabel number="02" title="What I Do" className="mb-12" />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {homepageServices.map((service, i) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group border border-border/10 rounded-card p-6 sm:p-8 hover:bg-panel/50 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-320 ease-smooth"
              >
                <span className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-xs font-medium text-accent-deep mb-4">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-base font-extrabold text-foreground mb-3 group-hover:text-accent-deep transition-colors duration-200">
                  {service.heading}
                </h3>
                <p className="text-sm font-extralight text-muted-foreground leading-relaxed mb-5">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.deliverables.map((d) => (
                    <span key={d} className="text-xs font-extralight text-muted-foreground border border-border/10 px-3 py-1 rounded-pill">
                      {d}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* How I Work */}
        <section id="process" className="py-20 sm:py-28 border-t border-border/10" aria-labelledby="approach-heading">
          <SectionLabel number="03" title="How I Work" className="mb-12" />

          <div className="space-y-12">
            <ProcessSteps />

            <div className="max-w-lg space-y-6">
              <p className="text-lg font-extralight text-foreground leading-relaxed">
                Start with the commercial outcome. Work backwards to the platform, the
                process, and the team that delivers it. Every recommendation is backed
                by evidence. If I can&apos;t measure the impact, I won&apos;t propose the work.
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 sm:py-28 border-t border-border/10" aria-label="Client testimonials">
          <SectionLabel number="04" title="What Clients Say" className="mb-12" />

          <div className="space-y-5">
            {visibleTestimonials.map((t, i) => (
              <div key={i} className="border border-border/10 rounded-card p-8 sm:p-12 bg-panel/50">
                <blockquote className="space-y-6">
                  <p className="font-display text-2xl sm:text-3xl font-extrabold text-foreground leading-snug tracking-tight max-w-lg italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <footer className="space-y-1">
                    <p className="text-sm text-foreground">{t.attribution}</p>
                    <p className="text-xs font-extralight text-muted-foreground italic">{t.context}</p>
                  </footer>
                </blockquote>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section id="contact" className="py-24 sm:py-32" aria-labelledby="contact-heading">
          <div className="border border-border/10 rounded-card p-8 sm:p-14 bg-panel/50 text-center space-y-6">
            <SectionLabel number="05" title="Next Step" className="justify-center mb-4" />
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-foreground leading-snug tracking-tight max-w-md mx-auto">
              Find out what&apos;s costing you revenue.
            </h2>
            <p className="text-base font-extralight text-muted-foreground leading-relaxed max-w-md mx-auto">
              Book a free 30-minute growth review. I&apos;ll look at your website,
              your systems, and your numbers, and tell you exactly where the
              biggest opportunities are.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Button size="lg" asChild>
                <Link href="/contact">
                  Book your free review
                  <span aria-hidden="true" className="ml-1">&rarr;</span>
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/review">
                  Try the free benchmark tool
                </Link>
              </Button>
            </div>
            <p className="text-xs font-extralight text-muted-foreground">
              or email directly:{' '}
              <a
                href={`mailto:${CONTACT.email}`}
                className="text-foreground hover:text-accent-deep transition-colors duration-200"
              >
                {CONTACT.email}
              </a>
            </p>
          </div>
        </section>

        {/* Writing — compact */}
        <section className="pb-20 sm:pb-28" aria-labelledby="writing-heading">
          <div className="border-t border-border/10 pt-12">
            <div className="flex items-center justify-between mb-6">
              <p className="text-xs tracking-widest text-muted-foreground uppercase font-medium">Latest writing</p>
              <Link
                href="/writing"
                className="text-xs font-extralight text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                All posts &rarr;
              </Link>
            </div>
            <div className="divide-y divide-border/10">
              {posts.slice(0, 3).map((post) => (
                <Link
                  key={post.slug}
                  href={`/writing/${post.slug}`}
                  className="group flex items-center justify-between gap-4 py-4"
                >
                  <span className="text-sm text-foreground group-hover:text-accent-deep transition-colors duration-200 leading-snug truncate">
                    {post.title}
                  </span>
                  <span className="text-xs font-extralight text-muted-foreground shrink-0">
                    {post.readingTime} min
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  )
}
