import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { projects, getProjectBySlug, getAdjacentProjects } from '@/lib/projects'
import { SectionLabel } from '@/components/SectionLabel'

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

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  const { prev, next } = getAdjacentProjects(slug)

  return (
    <div className="max-w-content mx-auto px-6">

      {/* Header */}
      <section className="pt-20 pb-20 border-b border-border">
        <div className="mb-4">
          <Link
            href="/portfolio"
            className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors duration-200 inline-flex items-center gap-2"
          >
            <span aria-hidden="true">←</span>
            <span>Work</span>
          </Link>
        </div>

        <h1 className="text-2xl font-light text-foreground leading-snug tracking-tight mb-3">
          {project.title}
        </h1>
        <p className="text-base font-light text-muted-foreground leading-relaxed max-w-md mb-10">
          {project.tagline}
        </p>

        <dl className="grid grid-cols-2 sm:grid-cols-4 gap-y-6 gap-x-4">
          <div>
            <dt className="font-mono text-xs text-muted-foreground mb-1">Client</dt>
            <dd className="font-mono text-xs text-foreground">{project.client}</dd>
          </div>
          <div>
            <dt className="font-mono text-xs text-muted-foreground mb-1">Year</dt>
            <dd className="font-mono text-xs text-foreground">{project.year}</dd>
          </div>
          <div className="col-span-2">
            <dt className="font-mono text-xs text-muted-foreground mb-1">Services</dt>
            <dd className="font-mono text-xs text-foreground">{project.services.join(', ')}</dd>
          </div>
        </dl>
      </section>

      {/* Hero metric */}
      <section className="py-16 border-b border-border" aria-label="Primary result">
        <div className="space-y-1">
          <p className="font-mono text-xs text-muted-foreground tracking-widest uppercase">
            Primary result
          </p>
          <p className="text-6xl font-light text-foreground tracking-tighter leading-none">
            {project.heroMetric.value}
          </p>
          <p className="font-mono text-xs text-muted-foreground">
            {project.heroMetric.label}
          </p>
          {project.heroMetric.context && (
            <p className="font-mono text-xs text-muted-foreground">
              {project.heroMetric.context}
            </p>
          )}
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 border-b border-border" aria-labelledby="overview-heading">
        <SectionLabel number="01" title="Overview" className="mb-8" />
        <p className="text-base font-light text-foreground leading-relaxed max-w-lg">
          {project.overview}
        </p>
      </section>

      {/* Challenge */}
      <section className="py-16 border-b border-border" aria-labelledby="challenge-heading">
        <SectionLabel number="02" title="Challenge" className="mb-8" />
        <p className="text-base font-light text-foreground leading-relaxed max-w-lg">
          {project.challenge}
        </p>
      </section>

      {/* Approach */}
      <section className="py-16 border-b border-border" aria-labelledby="approach-heading">
        <SectionLabel number="03" title="Approach" className="mb-12" />
        <ol className="space-y-10" aria-label="Approach phases">
          {project.approach.map(phase => (
            <li key={phase.number} className="flex gap-6">
              <span className="font-mono text-xs text-muted-foreground tabular-nums pt-0.5 w-5 shrink-0">
                {phase.number}
              </span>
              <div>
                <h3 className="text-sm font-medium text-foreground mb-2">{phase.title}</h3>
                <p className="text-sm font-light text-muted-foreground leading-relaxed max-w-lg">
                  {phase.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Results */}
      <section className="py-16 border-b border-border" aria-labelledby="results-heading">
        <SectionLabel number="04" title="Results" className="mb-12" />
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {project.results.map(result => (
            <div key={result.label} className="space-y-1">
              <dt className="font-mono text-xs text-muted-foreground">{result.label}</dt>
              <dd className="text-3xl font-light text-foreground tracking-tight leading-none">
                {result.value}
              </dd>
              {result.context && (
                <p className="font-mono text-xs text-muted-foreground">{result.context}</p>
              )}
            </div>
          ))}
        </dl>
      </section>

      {/* Learnings */}
      <section className="py-16 border-b border-border" aria-labelledby="learnings-heading">
        <SectionLabel number="05" title="Learnings" className="mb-12" />
        <ol className="space-y-8" aria-label="Key learnings">
          {project.learnings.map((learning, i) => (
            <li key={i} className="flex gap-6">
              <span className="font-mono text-xs text-muted-foreground tabular-nums pt-0.5 w-5 shrink-0">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="text-sm font-light text-foreground leading-relaxed max-w-lg">
                {learning}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Prev / Next navigation */}
      <nav className="py-16" aria-label="Project navigation">
        <div className="flex flex-col sm:flex-row gap-8 justify-between">
          {prev ? (
            <Link
              href={`/portfolio/${prev.slug}`}
              className="group flex flex-col gap-1"
            >
              <span className="font-mono text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                ← Previous
              </span>
              <span className="text-base font-light text-foreground">{prev.title}</span>
            </Link>
          ) : (
            <div />
          )}
          {next && (
            <Link
              href={`/portfolio/${next.slug}`}
              className="group flex flex-col gap-1 sm:text-right"
            >
              <span className="font-mono text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                Next →
              </span>
              <span className="text-base font-light text-foreground">{next.title}</span>
            </Link>
          )}
        </div>
      </nav>

    </div>
  )
}
