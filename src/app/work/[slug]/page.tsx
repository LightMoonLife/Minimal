import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { projects, getProjectBySlug, getAdjacentProjects } from '@/lib/projects'
import { SectionLabel } from '@/components/SectionLabel'
import { Breadcrumb } from '@/components/Breadcrumb'
import { PrevNextNav } from '@/components/PrevNextNav'
import { caseStudyJsonLd, JsonLd } from '@/lib/schema'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return projects.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return {}
  return {
    title: project.title,
    description: project.tagline,
  }
}

export default async function WorkProjectPage({ params }: PageProps) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  const { prev, next } = getAdjacentProjects(slug)

  return (
    <div className="max-w-content mx-auto px-6 sm:px-10">
      <JsonLd data={caseStudyJsonLd(project)} />

      {/* Header */}
      <section className="pt-24 sm:pt-32 lg:pt-40 pb-14 sm:pb-16">
        <Breadcrumb items={[
          { name: 'Work', href: '/work' },
          { name: project.title, href: `/work/${project.slug}` },
        ]} />

        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-ink leading-tight tracking-tighter mb-2">
          {project.title}
        </h1>
        <p className="text-sm text-ink-soft mb-5">
          {project.deliveryTag}
        </p>
        <p className="text-lg text-ink-soft leading-relaxed max-w-md mb-8">
          {project.tagline}
        </p>

        <div className="flex flex-wrap gap-2">
          {[
            { label: 'Client', value: project.client },
            { label: 'Year', value: project.year },
            ...project.services.map(s => ({ label: '', value: s })),
          ].map((item, i) => (
            <span key={i} className="pill-badge bg-ink/5 text-ink-faint text-xs">
              {item.label ? `${item.label}: ${item.value}` : item.value}
            </span>
          ))}
        </div>
      </section>

      {/* Hero metric */}
      <section className="py-14 sm:py-16" aria-label="Primary result">
        <div className="soft-card p-6 sm:p-10 text-center space-y-2">
          <p className="text-xs text-ink-faint tracking-widest uppercase">
            Primary result
          </p>
          <p className="font-mono text-4xl sm:text-6xl font-bold text-ink tracking-tighter leading-none tabular-nums">
            {project.heroMetric.value}
          </p>
          <p className="text-sm text-ink-soft">
            {project.heroMetric.label}
          </p>
          {project.heroMetric.context && (
            <p className="text-xs text-ink-faint">
              {project.heroMetric.context}
            </p>
          )}
        </div>
      </section>

      {/* Overview */}
      <section className="py-14 sm:py-16" aria-labelledby="overview-heading">
        <SectionLabel number="01" title="Overview" className="mb-6" />
        <p className="text-base text-ink leading-relaxed max-w-lg">
          {project.overview}
        </p>
      </section>

      {/* Challenge */}
      <section className="py-14 sm:py-16" aria-labelledby="challenge-heading">
        <SectionLabel number="02" title="Challenge" className="mb-6" />
        <p className="text-base text-ink leading-relaxed max-w-lg">
          {project.challenge}
        </p>
      </section>

      {/* Approach */}
      <section className="py-14 sm:py-16" aria-labelledby="approach-heading">
        <SectionLabel number="03" title="Approach" className="mb-8" />
        <ol className="space-y-4" aria-label="Approach phases">
          {project.approach.map(phase => (
            <li key={phase.number} className="soft-card p-5 sm:p-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="font-mono text-xs text-blueprint tabular-nums">
                  {phase.number}
                </span>
                <h3 className="text-base font-bold text-ink">{phase.title}</h3>
              </div>
              <p className="text-sm text-ink-soft leading-relaxed">
                {phase.description}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Results */}
      <section className="py-14 sm:py-16" aria-labelledby="results-heading">
        <SectionLabel number="04" title="Results" className="mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {project.results.map(result => (
            <div key={result.label} className="soft-card p-5 sm:p-6 space-y-1.5">
              <p className="text-xs text-ink-faint">{result.label}</p>
              <p className="font-mono text-2xl font-bold text-ink tracking-tighter leading-none tabular-nums">
                {result.value}
              </p>
              {result.context && (
                <p className="text-xs text-ink-faint">{result.context}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Learnings */}
      <section className="py-14 sm:py-16" aria-labelledby="learnings-heading">
        <SectionLabel number="05" title="Learnings" className="mb-8" />
        <ol className="space-y-5" aria-label="Key learnings">
          {project.learnings.map((learning, i) => (
            <li key={i} className="flex gap-4">
              <span className="font-mono text-xs text-blueprint tabular-nums shrink-0 mt-0.5">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="text-sm text-ink leading-relaxed">
                {learning}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <PrevNextNav prev={prev} next={next} basePath="/work" />

    </div>
  )
}
