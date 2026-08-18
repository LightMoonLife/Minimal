import type { Metadata } from 'next'
import Link from 'next/link'
import { posts, categories } from '@/lib/blog'
import { SectionLabel } from '@/components/SectionLabel'

export const metadata: Metadata = {
  title: 'Free Guides',
  description:
    'Practical guides on digital transformation, CRO, B2B revenue systems, and AI for manufacturing businesses. By Jack Paul Brookes, Digital Growth Architect.',
}

export default function BlogPage() {
  return (
    <div className="max-w-content mx-auto px-6">

      <section className="pt-32 sm:pt-40 pb-24 border-b border-border">
        <SectionLabel number="00" title="Free Guides" className="mb-10" />
        <h1 className="text-3xl sm:text-4xl font-extralight text-foreground leading-snug tracking-tight max-w-md mb-6">
          Free guides on building revenue systems for B2B businesses.
        </h1>
        <p className="text-lg font-light text-muted-foreground leading-relaxed max-w-md">
          Practical guides on digital transformation, conversion optimisation,
          and what actually works, from someone who&apos;s done the work, not just
          written about it.
        </p>
      </section>

      {/* Category filter */}
      <section className="py-6 border-b border-border" aria-label="Filter by category">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-xs text-muted-foreground">Filter</span>
          {categories.map(cat => {
            const count = posts.filter(p => p.category === cat).length
            return (
              <span
                key={cat}
                className="font-mono text-xs text-foreground/70 border border-border px-2.5 py-1"
              >
                {cat} ({count})
              </span>
            )
          })}
        </div>
      </section>

      {/* Post list */}
      <section className="py-8" aria-label="All posts">
        <ol aria-label="Free guides">
          {posts.map((post, i) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block py-10 border-b border-border hover:bg-muted -mx-6 px-6 transition-colors duration-200"
              >
                <div className="flex items-start gap-6">
                  <span className="font-mono text-xs text-muted-foreground tabular-nums pt-1 w-5 shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-3">
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
                    <h2 className="text-lg font-light text-foreground leading-snug mb-3 max-w-lg">
                      {post.title}
                    </h2>
                    <p className="text-sm text-muted-foreground font-light leading-relaxed max-w-md">
                      {post.excerpt}
                    </p>
                  </div>
                  <span
                    className="font-mono text-xs text-muted-foreground group-hover:translate-x-1 transition-transform duration-200 hidden sm:block pt-1 shrink-0"
                    aria-hidden="true"
                  >
                    &rarr;
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </section>

    </div>
  )
}
