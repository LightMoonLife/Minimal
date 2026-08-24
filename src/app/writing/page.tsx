import type { Metadata } from 'next'
import Link from 'next/link'
import { posts, categories } from '@/lib/blog'
import { SectionLabel } from '@/components/SectionLabel'
import { Breadcrumb } from '@/components/Breadcrumb'

export const metadata: Metadata = {
  title: 'Writing',
  description:
    'Practical guides on digital transformation, CRO, B2B revenue systems, and AI for manufacturing businesses. By Jack Paul Brookes, Digital Growth Architect.',
}

export default function WritingPage() {
  return (
    <div className="max-w-content mx-auto px-6 sm:px-10">

      <section className="pt-24 sm:pt-32 lg:pt-40 pb-16 sm:pb-20">
        <Breadcrumb items={[{ name: 'Writing', href: '/writing' }]} />
        <SectionLabel number="00" title="Writing" className="mb-8" />
        <h1 className="text-3xl sm:text-4xl font-medium text-foreground leading-snug tracking-tight max-w-md mb-6">
          Guides on building revenue systems for B2B businesses.
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
          Practical guides on digital transformation, conversion optimisation,
          and what actually works, from someone who&apos;s done the work, not just
          written about it.
        </p>
      </section>

      {/* Category filter */}
      <section className="pb-8 border-b border-border/10" aria-label="Filter by category">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map(cat => {
            const count = posts.filter(p => p.category === cat).length
            return (
              <span
                key={cat}
                className="text-xs text-muted-foreground border border-border/10 px-3 py-1.5 rounded-pill"
              >
                {cat} ({count})
              </span>
            )
          })}
        </div>
      </section>

      {/* Post list */}
      <section className="py-8" aria-label="All posts">
        <div className="space-y-4">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/writing/${post.slug}`}
              className="group block border border-border/10 rounded-card p-6 sm:p-8 hover:bg-panel/50 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-320 ease-smooth"
            >
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="text-xs text-accent-deep border border-accent/30 px-3 py-1 rounded-pill bg-accent/10">
                  {post.category}
                </span>
                <span className="text-xs text-muted-foreground">
                  {post.readingTime} min read
                </span>
                <span className="text-xs text-muted-foreground">
                  {new Date(post.date).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <h2 className="text-lg font-medium text-foreground leading-snug mb-2 group-hover:text-accent-deep transition-colors duration-200 max-w-lg">
                {post.title}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
                {post.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </section>

    </div>
  )
}
