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
      "Jack took our digital revenue from zero to £2.2M. He didn't just build the platform — he built the team, the process, and the commercial engine behind it.",
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
        <section className="pt-24 sm:pt-32 lg:pt-40 pb-20 sm:pb-28" aria-label="Introduction">
          <div className="max-w-2xl space-y-8">
            <div>
              <SectionLabel number="00" title="Welcome" className="mb-6" />
              <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold text-ink leading-[.95] tracking-tight">
                Digital growth for
                <br className="hidden sm:block" />
                {' '}manufacturers &amp;
                <br className="hidden sm:block" />
                {' '}<span className="text-blueprint italic">equipment suppliers.</span>
              </h1>
            </div>

            <p className="text-lg text-ink-soft leading-relaxed max-w-md">
              I turn B2B operations into revenue systems — platform engineering,
              conversion optimisation, and digital transformation that drives
              measurable commercial outcomes.
            </p>

            <div>
              <Button size="lg" asChild>
                <Link href="/contact">
                  Book your free review
                  <span aria-hidden="true" className="ml-1">&rarr;</span>
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Proof bar */}
        <section className="py-16 sm:py-20 border-t border-b border-line" aria-label="Impact metrics">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-10">
            {impactMetrics.map((metric) => (
              <Link
                key={metric.label}
                href={statLinks[metric.value] || '/work'}
                className="group space-y-1.5"
              >
                <p className="font-mono text-4xl sm:text-5xl font-bold text-blueprint tracking-tighter leading-none tabular-nums group-hover:text-ink transition-colors duration-200">
                  {metric.value}
                </p>
                <p className="text-sm font-medium text-ink">{metric.label}</p>
                <p className="text-xs text-ink-soft">{metric.context}</p>
                <p className="text-[11px] text-ink-faint italic">{metric.source}</p>
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
                className="group block bracket-frame bg-surface/50 hover:bg-surface transition-colors duration-200"
              >
                <Image
                  src={`/work/${project.slug}.webp`}
                  alt={project.title}
                  width={1200}
                  height={680}
                  className="w-full h-auto object-cover"
                />
                <div className="p-6 sm:p-8">
                  <p className="text-xs text-ink-faint mb-3">
                    {project.deliveryTag} &middot; {project.year}
                  </p>
                  <h3 className="font-display text-lg font-bold text-ink mb-2 group-hover:text-blueprint transition-colors duration-200">
                    {project.title}
                  </h3>
                  <p className="text-sm text-ink-soft leading-relaxed mb-6 line-clamp-2">
                    {project.tagline}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-3xl font-bold text-blueprint tracking-tighter tabular-nums">
                      {project.heroMetric.value}
                    </span>
                    <span className="text-xs text-ink-soft group-hover:text-blueprint transition-colors duration-200">
                      View case study &rarr;
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-sm text-ink-soft hover:text-ink transition-colors duration-200"
            >
              <span>All case studies</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </section>

        {/* Services — 3 outcome-focused cards */}
        <section className="py-20 sm:py-28 border-t border-line" aria-labelledby="services-heading">
          <SectionLabel number="02" title="What I Do" className="mb-12" />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {homepageServices.map((service, i) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group bracket-frame p-6 sm:p-8 hover:bg-surface/50 transition-colors duration-200"
              >
                <span className="font-mono text-xs text-blueprint tabular-nums mb-4 block">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-base font-bold text-ink mb-3 group-hover:text-blueprint transition-colors duration-200">
                  {service.heading}
                </h3>
                <p className="text-sm text-ink-soft leading-relaxed mb-5">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.deliverables.map((d) => (
                    <span key={d} className="text-xs text-ink-faint border border-line px-3 py-1">
                      {d}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* How I Work */}
        <section id="process" className="py-20 sm:py-28 border-t border-line" aria-labelledby="approach-heading">
          <SectionLabel number="03" title="How I Work" className="mb-12" />

          <div className="space-y-12">
            <ProcessSteps />

            <div className="max-w-lg space-y-6">
              <p className="text-lg text-ink leading-relaxed">
                Start with the commercial outcome. Work backwards to the platform, the
                process, and the team that delivers it. Every recommendation is backed
                by evidence. If I can&apos;t measure the impact, I won&apos;t propose the work.
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 sm:py-28 border-t border-line" aria-label="Client testimonials">
          <SectionLabel number="04" title="What Clients Say" className="mb-12" />

          <div className="space-y-5">
            {visibleTestimonials.map((t, i) => (
              <div key={i} className="bracket-frame p-8 sm:p-12 bg-surface/50">
                <blockquote className="space-y-6">
                  <p className="font-display text-2xl sm:text-3xl font-bold text-ink leading-snug tracking-tight max-w-lg italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <footer className="space-y-1">
                    <p className="text-sm text-ink">{t.attribution}</p>
                    <p className="text-xs text-ink-faint italic">{t.context}</p>
                  </footer>
                </blockquote>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section id="contact" className="py-24 sm:py-32" aria-labelledby="contact-heading">
          <div className="bracket-frame p-8 sm:p-14 bg-surface/50 text-center space-y-6">
            <SectionLabel number="05" title="Next Step" className="justify-center mb-4" />
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink leading-snug tracking-tight max-w-md mx-auto">
              Find out what&apos;s costing you revenue.
            </h2>
            <p className="text-base text-ink-soft leading-relaxed max-w-md mx-auto">
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
            <p className="text-xs text-ink-faint">
              or email directly:{' '}
              <a
                href={`mailto:${CONTACT.email}`}
                className="text-ink hover:text-blueprint transition-colors duration-200"
              >
                {CONTACT.email}
              </a>
            </p>
          </div>
        </section>

        {/* Writing — compact */}
        <section className="pb-20 sm:pb-28" aria-labelledby="writing-heading">
          <div className="border-t border-line pt-12">
            <div className="flex items-center justify-between mb-6">
              <p className="text-xs tracking-widest text-ink-faint uppercase font-medium font-mono">Latest writing</p>
              <Link
                href="/writing"
                className="text-xs text-ink-soft hover:text-ink transition-colors duration-200"
              >
                All posts &rarr;
              </Link>
            </div>
            <div className="divide-y divide-line">
              {posts.slice(0, 3).map((post) => (
                <Link
                  key={post.slug}
                  href={`/writing/${post.slug}`}
                  className="group flex items-center justify-between gap-4 py-4"
                >
                  <span className="text-sm text-ink group-hover:text-blueprint transition-colors duration-200 leading-snug truncate">
                    {post.title}
                  </span>
                  <span className="text-xs text-ink-faint shrink-0 font-mono tabular-nums">
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
