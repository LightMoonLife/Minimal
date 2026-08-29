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
  title: 'Jack Paul Brookes | Digital Marketing Consultant, Suffolk',
  description:
    'B2B Digital Marketing Consultant for SMBs scaling to £10M+. I fix fragmented marketing setups and build high-yield acquisition funnels that transform seven-figure SMBs into eight-figure industry leaders.',
}

const statLinks: Record<string, string> = {
  '£2.2M': '/work/digital-revenue-engine',
  '71%': '/work/digital-revenue-engine',
  '4.29%': '/work/conversion-architecture',
  '95%': '/work/digital-revenue-engine',
  '75%': '/work/onboarding-transformation',
  '61:1': '/work/revenue-channel-build',
}

const homepageServices = [
  {
    slug: 'digital-transformation',
    heading: 'Modernise operations, unlock revenue',
    description:
      'Audit the systems slowing you down, then rebuild the process, CRM, and team structure so growth doesn’t outrun your operations.',
    deliverables: ['Technology audits', 'Process re-engineering', 'CRM & automation', 'Team scaling'],
  },
  {
    slug: 'revenue-platforms',
    heading: 'Build platforms your customers actually use',
    description:
      'I’ve built and shipped a production B2B portal from 0-to-1 — not just advised on one. I know what breaks at 50+ daily users and what ISO 27001 alignment actually requires, because I’ve done both.',
    deliverables: ['B2B portals', 'E-commerce platforms', 'Sales tools', 'API integrations'],
  },
  {
    slug: 'conversion-and-growth',
    heading: 'Turn existing traffic into measurable revenue',
    description:
      'CRO, SEO, and PPC aimed at one number: pipeline. Traffic that doesn’t convert isn’t a marketing win.',
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

      {/* ── Dark Hero ── */}
      <section className="-mt-16 px-3 pb-6" aria-label="Introduction">
        <div
          className="relative overflow-hidden rounded-section pt-32 sm:pt-40 lg:pt-48 pb-16 sm:pb-20 px-6 sm:px-10"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.06), transparent 38%), radial-gradient(circle at 88% 6%, rgba(255,153,0,0.15), transparent 12rem), radial-gradient(circle at 12% 95%, rgba(255,153,0,0.10), transparent 16rem), #0a0a0a',
            boxShadow: '0 1.8rem 5rem rgba(21,21,21,0.2), inset 0 1px 0 rgba(255,255,255,0.1)',
          }}
        >
          <div className="max-w-content mx-auto">
            <div className="max-w-2xl space-y-6">
              <span className="pill-badge bg-white/10 text-white/80 text-xs backdrop-blur-sm border border-white/10">
                B2B Digital Marketing Consultant
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white leading-tight tracking-tighter">
                The B2B Digital Marketing Consultant Behind Your Next{' '}
                <span className="text-signal">£10M in Revenue</span>
              </h1>
              <p className="text-lg text-white/65 leading-relaxed max-w-md">
                I&apos;ve spent 10 years building B2B SaaS platforms in-house — including taking Liquidline&apos;s quoting tool from spreadsheet middleware to a CRM used daily by 50+ BDMs. I bring that same discipline to fixing fragmented marketing systems and building acquisition funnels that hold up under real usage.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button size="lg" asChild>
                  <Link href="/contact">
                    Apply for a Growth Blueprint Session
                    <svg className="w-4 h-4 ml-1" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 3 5 5-5 5"/></svg>
                  </Link>
                </Button>
                <Button variant="secondary" asChild>
                  <Link href="/review">
                    Free review tool
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-content mx-auto px-6 sm:px-10">

        {/* Proof bar */}
        <section className="py-14 sm:py-16" aria-label="Impact metrics">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-10">
            {impactMetrics.map((metric) => (
              <Link
                key={metric.label}
                href={statLinks[metric.value] || '/work'}
                className="group space-y-1.5"
              >
                <p className="font-mono text-2xl sm:text-3xl font-bold text-blueprint tracking-tighter leading-none tabular-nums group-hover:text-ink transition-colors duration-200">
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
        <section id="work" className="py-16 sm:py-24" aria-labelledby="work-heading">
          <SectionLabel number="01" title="Selected Work" className="mb-10" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {projects.slice(0, 4).map((project) => (
              <Link
                key={project.slug}
                href={`/work/${project.slug}`}
                className="group block soft-card overflow-hidden"
              >
                <Image
                  src={`/work/${project.slug}.webp`}
                  alt={project.title}
                  width={1200}
                  height={680}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="p-5 sm:p-6">
                  <p className="text-xs text-ink-faint mb-2">
                    {project.deliveryTag} &middot; {project.year}
                  </p>
                  <h3 className="text-lg font-bold text-ink mb-1.5 group-hover:text-blueprint transition-colors duration-200">
                    {project.title}
                  </h3>
                  <p className="text-sm text-ink-soft leading-relaxed mb-5 line-clamp-2">
                    {project.tagline}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xl font-bold text-blueprint tracking-tighter tabular-nums">
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

        {/* Services */}
        <section className="py-16 sm:py-24" aria-labelledby="services-heading">
          <SectionLabel number="02" title="What I Do" className="mb-10" />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {homepageServices.map((service, i) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group soft-card p-5 sm:p-6"
              >
                <span className="font-mono text-xs text-blueprint tabular-nums mb-3 block">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="text-base font-bold text-ink mb-2 group-hover:text-blueprint transition-colors duration-200">
                  {service.heading}
                </h3>
                <p className="text-sm text-ink-soft leading-relaxed mb-4">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.deliverables.map((d) => (
                    <span key={d} className="pill-badge bg-ink/5 text-ink-faint text-xs">
                      {d}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* How I Work */}
        <section id="process" className="py-16 sm:py-24" aria-labelledby="approach-heading">
          <SectionLabel number="03" title="How I Work" className="mb-10" />

          <div className="space-y-10">
            <ProcessSteps />

            <div className="max-w-lg space-y-4">
              <p className="text-lg text-ink leading-relaxed">
                I start with the commercial outcome and work backwards — to the platform,
                the process, and the team that delivers it. Every recommendation is backed
                by evidence. If I can&apos;t measure the impact, I don&apos;t propose the work.
                This isn&apos;t a sales line — I ran 40+ user interviews before writing a
                single line of the IQ platform spec, and tracked a 95% sprint commitment
                rate through delivery.
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 sm:py-24" aria-label="Client testimonials">
          <SectionLabel number="04" title="What Clients Say" className="mb-10" />

          <div className="space-y-5">
            {visibleTestimonials.map((t, i) => (
              <div key={i} className="soft-card p-6 sm:p-10">
                <blockquote className="space-y-5">
                  <p className="text-xl lg:text-2xl font-bold text-ink leading-snug tracking-tight max-w-lg italic">
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
        <section id="contact" className="py-20 sm:py-28" aria-labelledby="contact-heading">
          <div
            className="rounded-section p-8 sm:p-14 text-center space-y-5"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.06), transparent 38%), radial-gradient(circle at 88% 6%, rgba(255,153,0,0.15), transparent 12rem), radial-gradient(circle at 12% 95%, rgba(255,153,0,0.10), transparent 16rem), #0a0a0a',
              boxShadow: '0 1.8rem 5rem rgba(21,21,21,0.2), inset 0 1px 0 rgba(255,255,255,0.1)',
            }}
          >
            <SectionLabel number="05" title="Next Step" className="justify-center mb-3" />
            <h2 className="text-xl lg:text-3xl font-bold text-white leading-snug tracking-tight max-w-md mx-auto">
              Find out what&apos;s costing you revenue.
            </h2>
            <p className="text-base text-white/65 leading-relaxed max-w-md mx-auto">
              Book a free 30-minute growth review. I&apos;ll look at your website,
              your systems, and your numbers, and tell you exactly where the
              biggest opportunities are.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Button size="lg" asChild>
                <Link href="/contact">
                  Book a Consultation
                  <svg className="w-4 h-4 ml-1" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 3 5 5-5 5"/></svg>
                </Link>
              </Button>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 hover:text-white" asChild>
                <Link href="/review">
                  Try the free benchmark tool
                </Link>
              </Button>
            </div>
            <p className="text-xs text-white/40">
              or email directly:{' '}
              <a
                href={`mailto:${CONTACT.email}`}
                className="text-white/60 hover:text-white transition-colors duration-200"
              >
                {CONTACT.email}
              </a>
            </p>
          </div>
        </section>

        {/* Writing — compact */}
        <section className="pb-16 sm:pb-24" aria-labelledby="writing-heading">
          <div className="pt-10">
            <div className="flex items-center justify-between mb-5">
              <SectionLabel number="" title="Latest Writing" />
              <Link
                href="/writing"
                className="text-xs text-ink-soft hover:text-ink transition-colors duration-200"
              >
                All posts &rarr;
              </Link>
            </div>
            <div className="space-y-3">
              {posts.slice(0, 3).map((post) => (
                <Link
                  key={post.slug}
                  href={`/writing/${post.slug}`}
                  className="group flex items-center justify-between gap-4 soft-card p-4"
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
