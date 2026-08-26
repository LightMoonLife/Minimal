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
    <nav className="py-16 sm:py-20 border-t border-border/10" aria-label="Navigation">
      <div className="flex flex-col sm:flex-row gap-5">
        {prev ? (
          <Link
            href={`${basePath}/${prev.slug}`}
            className="group flex-1 border border-border/10 rounded-card p-6 hover:bg-panel/50 transition-all duration-200"
          >
            <span className="text-xs text-muted-foreground group-hover:text-accent-deep transition-colors">
              &larr; Prev
            </span>
            <span className="block font-display text-base font-extrabold text-foreground mt-1">{prev.title}</span>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
        {next && (
          <Link
            href={`${basePath}/${next.slug}`}
            className="group flex-1 border border-border/10 rounded-card p-6 hover:bg-panel/50 transition-all duration-200 sm:text-right"
          >
            <span className="text-xs text-muted-foreground group-hover:text-accent-deep transition-colors">
              Next &rarr;
            </span>
            <span className="block font-display text-base font-extrabold text-foreground mt-1">{next.title}</span>
          </Link>
        )}
      </div>
    </nav>
  )
}
