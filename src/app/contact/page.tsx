import type { Metadata } from 'next'
import { ContactForm } from './ContactForm'
import { SectionLabel } from '@/components/SectionLabel'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch to discuss CRO and UX projects, freelance work, or full-time opportunities.',
}

export default function ContactPage() {
  return (
    <div className="max-w-content mx-auto px-6">

      {/* Header */}
      <section className="pt-20 pb-20 border-b border-border">
        <SectionLabel number="00" title="Contact" className="mb-8" />
        <h1 className="text-2xl font-light text-foreground leading-snug tracking-tight mb-4">
          Get in touch
        </h1>
        <p className="text-base font-light text-muted-foreground leading-relaxed max-w-sm">
          Available for freelance projects and full-time roles. Typically respond within one working day.
        </p>
      </section>

      {/* Direct contact */}
      <section className="py-16 border-b border-border" aria-label="Direct contact details">
        <SectionLabel number="01" title="Direct" className="mb-8" />
        <dl className="space-y-3">
          <div className="flex items-baseline gap-4">
            <dt className="font-mono text-xs text-muted-foreground w-16 shrink-0">Email</dt>
            <dd>
              <a
                href="mailto:hello@yourdomain.com"
                className="font-mono text-xs text-foreground hover:text-muted-foreground transition-colors duration-200"
              >
                hello@yourdomain.com
              </a>
            </dd>
          </div>
          <div className="flex items-baseline gap-4">
            <dt className="font-mono text-xs text-muted-foreground w-16 shrink-0">LinkedIn</dt>
            <dd>
              <a
                href="https://linkedin.com/in/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-foreground hover:text-muted-foreground transition-colors duration-200"
              >
                linkedin.com/in/yourprofile →
              </a>
            </dd>
          </div>
        </dl>
      </section>

      {/* Form */}
      <section className="py-16" aria-labelledby="form-heading">
        <SectionLabel number="02" title="Message" className="mb-12" />
        <ContactForm />
      </section>

    </div>
  )
}
