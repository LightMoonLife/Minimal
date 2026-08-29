import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { posts, getPostBySlug, getAdjacentPosts } from '@/lib/blog'
import { SectionLabel } from '@/components/SectionLabel'
import { Breadcrumb } from '@/components/Breadcrumb'
import { PrevNextNav } from '@/components/PrevNextNav'
import { articleJsonLd, faqPageJsonLd, JsonLd } from '@/lib/schema'
import { Button } from '@/components/ui/button'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return posts.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.dateModified ?? post.date,
      authors: ['Jack Paul Brookes'],
    },
  }
}

export default async function WritingPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const { prev, next } = getAdjacentPosts(slug)

  return (
    <div className="max-w-content mx-auto px-6 sm:px-10">
      <JsonLd data={articleJsonLd(post)} />
      <JsonLd data={faqPageJsonLd(post.faq)} />

      {/* Header */}
      <section className="pt-24 sm:pt-32 lg:pt-40 pb-14 sm:pb-16">
        <Breadcrumb items={[
          { name: 'Writing', href: '/writing' },
          { name: post.title, href: `/writing/${post.slug}` },
        ]} />

        <div className="flex flex-wrap items-center gap-3 mb-5">
          <span className="pill-badge bg-blueprint/10 text-blueprint text-xs border border-blueprint/20">
            {post.category}
          </span>
          <span className="text-xs text-ink-faint">
            {post.readingTime} min read
          </span>
          <span className="text-xs text-ink-faint">
            {new Date(post.date).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-ink leading-tight tracking-tighter max-w-lg">
          {post.title}
        </h1>
      </section>

      {/* TL;DR */}
      <section className="pb-10" aria-label="Summary">
        <div className="soft-card p-5 sm:p-6 bg-blueprint/5">
          <p className="text-xs text-blueprint tracking-widest uppercase font-medium mb-2">
            TL;DR
          </p>
          <p className="text-sm text-ink leading-relaxed max-w-lg">
            {post.tldr}
          </p>
        </div>
      </section>

      {/* Content sections */}
      {post.sections.map((section, i) => (
        <section
          key={i}
          className="py-10"
          aria-labelledby={`section-${i}`}
        >
          <h2
            id={`section-${i}`}
            className="text-xl lg:text-3xl font-bold text-ink leading-snug mb-5 max-w-lg"
          >
            {section.heading}
          </h2>
          <div className="space-y-4">
            {section.content.map((paragraph, j) => (
              <p
                key={j}
                className="text-base text-ink leading-relaxed max-w-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      ))}

      {/* FAQ */}
      {post.faq.length > 0 && (
        <section className="py-14" aria-labelledby="faq-heading">
          <SectionLabel number="" title="FAQ" className="mb-8" />
          <dl className="space-y-4">
            {post.faq.map((item, i) => (
              <div key={i} className="soft-card p-5">
                <dt className="text-sm font-bold text-ink mb-1.5 max-w-lg">
                  {item.question}
                </dt>
                <dd className="text-sm text-ink-soft leading-relaxed max-w-lg">
                  {item.answer}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {/* CTA */}
      <section className="py-14" aria-label="Contact">
        <div className="soft-card p-5 sm:p-6">
          <p className="text-xl lg:text-3xl font-bold text-ink leading-snug max-w-lg mb-5">
            {post.cta}
          </p>
          <Button asChild>
            <Link href="/contact">
              Get in touch
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </Button>
        </div>
      </section>

      {/* Author */}
      <section className="py-10" aria-label="Author">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-blueprint/20 flex items-center justify-center text-sm font-medium text-blueprint">
            JP
          </div>
          <div>
            <p className="text-sm font-medium text-ink">Jack Paul Brookes</p>
            <p className="text-xs text-ink-soft">
              Digital Growth Architect &middot; Ipswich, Suffolk
            </p>
          </div>
        </div>
      </section>

      <PrevNextNav prev={prev} next={next} basePath="/writing" />

    </div>
  )
}
