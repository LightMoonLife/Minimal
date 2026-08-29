import Link from 'next/link'

interface NavItem {
  slug: string
  title: string
}

interface PrevNextNavProps {
  prev: NavItem | null
  next: NavItem | null
  basePath: string
}

export function PrevNextNav({ prev, next, basePath }: PrevNextNavProps) {
  return (
    <nav className="py-16 sm:py-20" aria-label="Navigation">
      <div className="flex flex-col sm:flex-row gap-5">
        {prev ? (
          <Link
            href={`${basePath}/${prev.slug}`}
            className="group flex-1 soft-card p-6"
          >
            <span className="text-xs text-ink-soft group-hover:text-blueprint transition-colors">
              &larr; Prev
            </span>
            <span className="block text-base font-bold text-ink mt-1">{prev.title}</span>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
        {next && (
          <Link
            href={`${basePath}/${next.slug}`}
            className="group flex-1 soft-card p-6 sm:text-right"
          >
            <span className="text-xs text-ink-soft group-hover:text-blueprint transition-colors">
              Next &rarr;
            </span>
            <span className="block text-base font-bold text-ink mt-1">{next.title}</span>
          </Link>
        )}
      </div>
    </nav>
  )
}
