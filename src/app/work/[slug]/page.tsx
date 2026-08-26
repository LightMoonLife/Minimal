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
      <section className="pt-24 sm:pt-32 lg:pt-40 pb-16 sm:pb-20">
        <Breadcrumb items={[
          { name: 'Work', href: '/work' },
          { name: project.title, href: `/work/${project.slug}` },
        ]} />

        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-[.95] tracking-tight mb-2">
          {project.title}
        </h1>
        <p className="text-sm font-extralight text-muted-foreground mb-6">
          {project.deliveryTag}
        </p>
        <p className="text-lg font-extralight text-muted-foreground leading-relaxed max-w-md mb-10">
          {project.tagline}
        </p>

        <div className="flex flex-wrap gap-2">
          {[
            { label: 'Client', value: project.client },
            { label: 'Year', value: project.year },
            ...project.services.map(s => ({ label: '', value: s })),
          ].map((item, i) => (
            <span key={i} className="text-xs font-extralight text-muted-foreground border border-border/10 px-3 py-1.5 rounded-pill">
              {item.label ? `${item.label}: ${item.value}` : item.value}
            </span>
          ))}
        </div>
      </section>

      {/* Hero metric */}
      <section className="py-16 sm:py-20 border-t border-border/10" aria-label="Primary result">
        <div className="border border-border/10 rounded-card p-8 sm:p-12 bg-panel/50 text-center space-y-3">
          <p className="text-xs font-extralight text-muted-foreground tracking-widest uppercase">
            Primary result
          </p>
          <p className="font-display text-7xl sm:text-8xl font-extrabold text-foreground tracking-tighter leading-none">
            {project.heroMetric.value}
          </p>
          <p className="text-sm font-extralight text-muted-foreground">
            {project.heroMetric.label}
          </p>
          {project.heroMetric.context && (
            <p className="text-xs font-extralight text-muted-foreground">
              {project.heroMetric.context}
            </p>
          )}
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 sm:py-20 border-t border-border/10" aria-labelledby="overview-heading">
        <SectionLabel number="01" title="Overview" className="mb-8" />
        <p className="text-base font-extralight text-foreground leading-relaxed max-w-lg">
          {project.overview}
        </p>
      </section>

      {/* Challenge */}
      <section className="py-16 sm:py-20 border-t border-border/10" aria-labelledby="challenge-heading">
        <SectionLabel number="02" title="Challenge" className="mb-8" />
        <p className="text-base font-extralight text-foreground leading-relaxed max-w-lg">
          {project.challenge}
        </p>
      </section>

      {/* Approach */}
      <section className="py-16 sm:py-20 border-t border-border/10" aria-labelledby="approach-heading">
        <SectionLabel number="03" title="Approach" className="mb-10" />
        <ol className="space-y-4" aria-label="Approach phases">
          {project.approach.map(phase => (
            <li key={phase.number} className="border border-border/10 rounded-card p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center text-xs font-medium text-accent-deep">
                  {phase.number}
                </span>
                <h3 className="font-display text-base font-extrabold text-foreground">{phase.title}</h3>
              </div>
              <p className="text-sm font-extralight text-muted-foreground leading-relaxed">
                {phase.description}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Results */}
      <section className="py-16 sm:py-20 border-t border-border/10" aria-labelledby="results-heading">
        <SectionLabel number="04" title="Results" className="mb-10" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {project.results.map(result => (
            <div key={result.label} className="border border-border/10 rounded-card p-6 sm:p-8 bg-panel/50 space-y-2">
              <p className="text-xs font-extralight text-muted-foreground">{result.label}</p>
              <p className="font-display text-4xl font-extrabold text-foreground tracking-tighter leading-none">
                {result.value}
              </p>
              {result.context && (
                <p className="text-xs font-extralight text-muted-foreground">{result.context}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Learnings */}
      <section className="py-16 sm:py-20 border-t border-border/10" aria-labelledby="learnings-heading">
        <SectionLabel number="05" title="Learnings" className="mb-10" />
        <ol className="space-y-6" aria-label="Key learnings">
          {project.learnings.map((learning, i) => (
            <li key={i} className="flex gap-4">
              <span className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center text-xs font-medium text-accent-deep shrink-0 mt-0.5">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="text-sm font-extralight text-foreground leading-relaxed">
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
