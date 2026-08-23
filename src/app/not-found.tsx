import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '404 | Page not found',
}

export default function NotFound() {
  return (
    <div className="max-w-content mx-auto px-6 sm:px-10 pt-24 sm:pt-32 lg:pt-40">
      <p className="text-xs text-muted-foreground mb-6">404</p>
      <h1 className="text-3xl sm:text-4xl font-medium text-foreground mb-6 tracking-tight">Page not found.</h1>
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
      >
        <span aria-hidden="true">&larr;</span>
        <span>Back to home</span>
      </Link>
    </div>
  )
}
