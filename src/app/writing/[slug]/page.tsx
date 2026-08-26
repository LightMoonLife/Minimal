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
      <section className="pt-24 sm:pt-32 lg:pt-40 pb-16 sm:pb-20">
        <Breadcrumb items={[
          { name: 'Writing', href: '/writing' },
          { name: post.title, href: `/writing/${post.slug}` },
        ]} />

        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="text-xs text-accent-deep border border-accent/30 px-3 py-1 rounded-pill bg-accent/10">
            {post.category}
          </span>
          <span className="text-xs font-extralight text-muted-foreground">
            {post.readingTime} min read
          </span>
          <span className="text-xs font-extralight text-muted-foreground">
            {new Date(post.date).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-foreground leading-[.95] tracking-tight max-w-lg">
          {post.title}
        </h1>
      </section>

      {/* TL;DR */}
      <section className="pb-12 border-b border-border/10" aria-label="Summary">
        <div className="border border-accent/20 rounded-card p-6 sm:p-8 bg-accent/5">
          <p className="text-xs text-accent-deep tracking-widest uppercase font-medium mb-3">
            TL;DR
          </p>
          <p className="text-sm font-extralight text-foreground leading-relaxed max-w-lg">
            {post.tldr}
          </p>
        </div>
      </section>

      {/* Content sections */}
      {post.sections.map((section, i) => (
        <section
          key={i}
          className="py-12 border-b border-border/10"
          aria-labelledby={`section-${i}`}
        >
          <h2
            id={`section-${i}`}
            className="font-display text-xl font-extrabold text-foreground leading-snug mb-6 max-w-lg"
          >
            {section.heading}
          </h2>
          <div className="space-y-5">
            {section.content.map((paragraph, j) => (
              <p
                key={j}
                className="text-sm font-extralight text-foreground leading-relaxed max-w-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      ))}

      {/* FAQ */}
      {post.faq.length > 0 && (
        <section className="py-16 border-b border-border/10" aria-labelledby="faq-heading">
          <SectionLabel number="" title="FAQ" className="mb-10" />
          <dl className="space-y-8">
            {post.faq.map((item, i) => (
              <div key={i} className="border border-border/10 rounded-card p-6">
                <dt className="font-display text-sm font-extrabold text-foreground mb-2 max-w-lg">
                  {item.question}
                </dt>
                <dd className="text-sm font-extralight text-muted-foreground leading-relaxed max-w-lg">
                  {item.answer}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 border-b border-border/10" aria-label="Contact">
        <div className="border border-border/10 rounded-card p-6 sm:p-8 bg-panel/50">
          <p className="font-display text-xl font-extrabold text-foreground leading-relaxed max-w-lg mb-6">
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
      <section className="py-12 border-b border-border/10" aria-label="Author">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-sm font-medium text-accent-deep">
            JP
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Jack Paul Brookes</p>
            <p className="text-xs font-extralight text-muted-foreground">
              Digital Growth Architect &middot; Ipswich, Suffolk
            </p>
          </div>
        </div>
      </section>

      <PrevNextNav prev={prev} next={next} basePath="/writing" />

    </div>
  )
}
