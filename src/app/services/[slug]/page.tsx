import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { pillars, getPillarBySlug } from '@/lib/pillars'
import { SectionLabel } from '@/components/SectionLabel'
import { Breadcrumb } from '@/components/Breadcrumb'
import { professionalServiceJsonLd, JsonLd } from '@/lib/schema'
import { Button } from '@/components/ui/button'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return pillars.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const pillar = getPillarBySlug(slug)
  if (!pillar) return {}
  return {
    title: `${pillar.title} | Jack Paul Brookes`,
    description: pillar.description,
  }
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params
  const pillar = getPillarBySlug(slug)
  if (!pillar) notFound()

  return (
    <div className="max-w-content mx-auto px-6 sm:px-10">
      <JsonLd data={professionalServiceJsonLd()} />

      <section className="pt-24 sm:pt-32 lg:pt-40 pb-14 sm:pb-16">
        <Breadcrumb items={[
          { name: 'Services', href: '/services/' + pillars[0].slug },
          { name: pillar.title, href: `/services/${pillar.slug}` },
        ]} />

        <h1 className="font-display text-3xl sm:text-4xl lg:text-6xl font-bold text-ink leading-tight tracking-tight mb-4">
          {pillar.headline}
        </h1>
        <p className="text-lg text-ink-soft leading-relaxed max-w-lg">
          {pillar.description}
        </p>
      </section>

      {pillar.sections.map((section, i) => (
        <section
          key={section.heading}
          className="py-14 sm:py-16 border-t border-line"
          aria-labelledby={`section-${i}`}
        >
          <SectionLabel number={String(i + 1).padStart(2, '0')} title={section.heading} className="mb-6" />
          <div className="space-y-4 max-w-lg">
            {section.content.map((paragraph, j) => (
              <p key={j} className="text-base text-ink leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      ))}

      <section className="py-14 sm:py-16 border-t border-line" aria-labelledby="deliverables-heading">
        <SectionLabel number={String(pillar.sections.length + 1).padStart(2, '0')} title="Deliverables" className="mb-6" />
        <div className="flex flex-wrap gap-2">
          {pillar.deliverables.map(d => (
            <span key={d} className="text-xs text-ink-faint border border-line px-3 py-1.5">
              {d}
            </span>
          ))}
        </div>
      </section>

      <section className="py-16 sm:py-24 border-t border-line">
        <div className="bracket-frame p-6 sm:p-12 bg-surface/50 text-center space-y-5">
          <h2 className="font-display text-xl lg:text-3xl font-bold text-ink leading-snug tracking-tight max-w-md mx-auto">
            Ready to talk about {pillar.title.toLowerCase()}?
          </h2>
          <p className="text-base text-ink-soft leading-relaxed max-w-md mx-auto">
            Book a free 30-minute growth review. I&apos;ll assess your current
            setup and identify the highest-impact opportunities.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Button size="lg" asChild>
              <Link href="/contact">
                Book your free review
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </Button>
            <Link
              href="/review"
              className="text-sm text-ink-soft hover:text-ink transition-colors duration-200"
            >
              or try the free review tool &rarr;
            </Link>
          </div>
        </div>
      </section>

      <nav className="py-14 sm:py-16 border-t border-line" aria-label="Other services">
        <p className="text-xs text-ink-faint tracking-widest uppercase font-medium font-mono mb-5">
          Other services
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {pillars
            .filter(p => p.slug !== pillar.slug)
            .map(p => (
              <Link
                key={p.slug}
                href={`/services/${p.slug}`}
                className="group bracket-frame p-5 hover:bg-surface/50 transition-colors duration-200"
              >
                <h3 className="font-display text-sm font-bold text-ink group-hover:text-blueprint transition-colors duration-200 mb-1">
                  {p.title}
                </h3>
                <p className="text-xs text-ink-soft line-clamp-2">
                  {p.description}
                </p>
              </Link>
            ))}
        </div>
      </nav>
    </div>
  )
}
