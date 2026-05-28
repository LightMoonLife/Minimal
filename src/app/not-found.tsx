import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '404 — Page not found',
}

export default function NotFound() {
  return (
    <div className="max-w-content mx-auto px-6 pt-20">
      <p className="font-mono text-xs text-muted-foreground mb-6">404</p>
      <h1 className="text-2xl font-light text-foreground mb-4">Page not found.</h1>
      <Link
        href="/"
        className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors duration-200 inline-flex items-center gap-2"
      >
        <span aria-hidden="true">←</span>
        <span>Back to home</span>
      </Link>
    </div>
  )
}
