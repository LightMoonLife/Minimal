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

      <section className="pt-24 sm:pt-32 lg:pt-40 pb-14 sm:pb-16">
        <Breadcrumb items={[{ name: 'Writing', href: '/writing' }]} />
        <SectionLabel number="00" title="Writing" className="mb-6" />
        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-ink leading-tight tracking-tighter max-w-md mb-5">
          Guides on building revenue systems for B2B businesses.
        </h1>
        <p className="text-lg text-ink-soft leading-relaxed max-w-md">
          Practical guides on digital transformation, conversion optimisation,
          and what actually works, from someone who&apos;s done the work, not just
          written about it.
        </p>
      </section>

      {/* Category filter */}
      <section className="pb-6" aria-label="Filter by category">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map(cat => {
            const count = posts.filter(p => p.category === cat).length
            return (
              <span
                key={cat}
                className="pill-badge bg-ink/5 text-ink-faint text-xs"
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
              className="group block soft-card p-5 sm:p-6"
            >
              <div className="flex flex-wrap items-center gap-3 mb-2">
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
              <h2 className="text-lg font-bold text-ink leading-snug mb-1.5 group-hover:text-blueprint transition-colors duration-200 max-w-lg">
                {post.title}
              </h2>
              <p className="text-sm text-ink-soft leading-relaxed max-w-md">
                {post.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </section>

    </div>
  )
}
