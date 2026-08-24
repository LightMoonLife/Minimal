import Link from 'next/link'
import { breadcrumbJsonLd, JsonLd } from '@/lib/schema'

interface BreadcrumbItem {
  name: string
  href: string
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const allItems = [{ name: 'Home', href: '/' }, ...items]

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(allItems)} />
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
          {allItems.map((item, i) => (
            <li key={item.href} className="flex items-center gap-1.5">
              {i > 0 && (
                <span aria-hidden="true" className="text-border/30">/</span>
              )}
              {i < allItems.length - 1 ? (
                <Link
                  href={item.href}
                  className="hover:text-foreground transition-colors duration-200"
                >
                  {item.name}
                </Link>
              ) : (
                <span aria-current="page" className="text-foreground font-medium">
                  {item.name}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
