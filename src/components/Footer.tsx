import Link from 'next/link'
import { CONTACT } from '@/lib/constants'

const footerLinks = [
  { href: '/work', label: 'Work' },
  { href: '/writing', label: 'Writing' },
  { href: '/services/digital-transformation', label: 'Services' },
  { href: '/cv', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/review', label: 'Free Review' },
]

export function Footer() {
  return (
    <footer className="border-t border-line mt-24">
      <div className="max-w-content mx-auto px-6 sm:px-10 py-12 sm:py-16">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-10">
          <div className="space-y-3">
            <p className="font-display text-lg font-bold text-ink">{CONTACT.name}</p>
            <p className="text-sm text-ink-soft">
              {CONTACT.jobTitle}
            </p>
            <address className="not-italic text-sm text-ink-soft space-y-1">
              <p>{CONTACT.location.locality}, {CONTACT.location.region}, {CONTACT.location.country}</p>
              <p>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-ink hover:text-blueprint transition-colors duration-200"
                >
                  {CONTACT.email}
                </a>
              </p>
            </address>
          </div>

          <div className="flex flex-col sm:flex-row gap-8">
            <nav aria-label="Footer navigation">
              <ul className="flex flex-wrap gap-x-6 gap-y-2" role="list">
                {footerLinks.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-ink-soft hover:text-ink transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-start gap-6">
              <a
                href={CONTACT.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-ink-soft hover:text-ink transition-colors duration-200"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-line">
          <p className="text-xs text-ink-faint">
            &copy; {new Date().getFullYear()} {CONTACT.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
