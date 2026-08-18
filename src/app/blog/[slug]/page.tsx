import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { posts, getPostBySlug, getAdjacentPosts } from '@/lib/blog'
import { SectionLabel } from '@/components/SectionLabel'

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
      authors: ['Jack Paul Brookes'],
    },
  }
}

function ArticleJsonLd({ post }: { post: NonNullable<ReturnType<typeof getPostBySlug>> }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: 'Jack Paul Brookes',
      jobTitle: 'Digital Growth Architect',
      url: 'https://linkedin.com/in/jackpbrookes',
    },
    publisher: {
      '@type': 'Person',
      name: 'Jack Paul Brookes',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const { prev, next } = getAdjacentPosts(slug)

  return (
    <div className="max-w-content mx-auto px-6">
      <ArticleJsonLd post={post} />

      {/* Header */}
      <section className="pt-32 sm:pt-40 pb-20 border-b border-border">
        <div className="mb-6">
          <Link
            href="/blog"
            className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors duration-200 inline-flex items-center gap-2"
          >
            <span aria-hidden="true">&larr;</span>
            <span>Free Guides</span>
          </Link>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-8">
          <span className="font-mono text-xs text-muted-foreground border border-border px-2 py-0.5">
            {post.category}
          </span>
          <span className="font-mono text-xs text-muted-foreground">
            {post.readingTime} min read
          </span>
          <span className="font-mono text-xs text-muted-foreground">
            {new Date(post.date).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extralight text-foreground leading-snug tracking-tight max-w-lg">
          {post.title}
        </h1>
      </section>

      {/* TL;DR */}
      <section className="py-12 border-b border-border" aria-label="Summary">
        <div className="bg-muted -mx-6 px-6 py-8">
          <p className="font-mono text-xs text-foreground tracking-widest uppercase mb-4">
            TL;DR
          </p>
          <p className="text-sm font-light text-foreground leading-relaxed max-w-lg">
            {post.tldr}
          </p>
        </div>
      </section>

      {/* Content sections */}
      {post.sections.map((section, i) => (
        <section
          key={i}
          className="py-12 border-b border-border"
          aria-labelledby={`section-${i}`}
        >
          <h2
            id={`section-${i}`}
            className="text-lg font-medium text-foreground leading-snug mb-8 max-w-lg"
          >
            {section.heading}
          </h2>
          <div className="space-y-5">
            {section.content.map((paragraph, j) => (
              <p
                key={j}
                className="text-sm font-light text-foreground leading-relaxed max-w-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      ))}

      {/* FAQ */}
      {post.faq.length > 0 && (
        <section className="py-16 border-b border-border" aria-labelledby="faq-heading">
          <SectionLabel number="" title="FAQ" className="mb-12" />
          <dl className="space-y-10">
            {post.faq.map((item, i) => (
              <div key={i}>
                <dt className="text-sm font-medium text-foreground mb-3 max-w-lg">
                  {item.question}
                </dt>
                <dd className="text-sm font-light text-muted-foreground leading-relaxed max-w-lg">
                  {item.answer}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 border-b border-border" aria-label="Contact">
        <p className="text-lg font-light text-foreground leading-relaxed max-w-lg mb-6">
          {post.cta}
        </p>
        <Link
          href="/contact"
          className="font-mono text-xs text-accent hover:text-accent/70 transition-colors duration-200 inline-flex items-center gap-2"
        >
          <span>Get in touch</span>
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </section>

      {/* Author */}
      <section className="py-12 border-b border-border" aria-label="Author">
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-xs text-muted-foreground w-16 shrink-0">Written by</span>
          <div>
            <p className="font-mono text-xs text-foreground">Jack Paul Brookes</p>
            <p className="font-mono text-xs text-muted-foreground mt-0.5">
              Digital Growth Architect &middot; Ipswich, Suffolk
            </p>
          </div>
        </div>
      </section>

      {/* Prev / Next */}
      <nav className="py-16" aria-label="Post navigation">
        <div className="flex flex-col sm:flex-row gap-8 justify-between">
          {prev ? (
            <Link
              href={`/blog/${prev.slug}`}
              className="group flex flex-col gap-1"
            >
              <span className="font-mono text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                &larr; Previous
              </span>
              <span className="text-sm font-light text-foreground max-w-[280px]">{prev.title}</span>
            </Link>
          ) : (
            <div />
          )}
          {next && (
            <Link
              href={`/blog/${next.slug}`}
              className="group flex flex-col gap-1 sm:text-right"
            >
              <span className="font-mono text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                Next &rarr;
              </span>
              <span className="text-sm font-light text-foreground max-w-[280px] sm:ml-auto">{next.title}</span>
            </Link>
          )}
        </div>
      </nav>

    </div>
  )
}
