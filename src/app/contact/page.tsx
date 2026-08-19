import type { Metadata } from 'next'
import { ContactForm } from './ContactForm'
import { SectionLabel } from '@/components/SectionLabel'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch to discuss digital transformation, revenue platforms, or growth consulting.',
}

export default function ContactPage() {
  return (
    <div className="max-w-content mx-auto px-6">

      <section className="pt-32 sm:pt-40 pb-24 border-b border-border">
        <SectionLabel number="00" title="Contact" className="mb-10" />
        <h1 className="text-3xl sm:text-4xl font-extralight text-foreground leading-snug tracking-tight mb-6">
          Let&apos;s talk
        </h1>
        <p className="text-lg font-light text-muted-foreground leading-relaxed max-w-sm">
          I work with a small number of clients directly at any one time. Typically respond within one working day.
        </p>
      </section>

      <section className="py-20 border-b border-border" aria-label="Direct contact details">
        <SectionLabel number="01" title="Direct" className="mb-10" />
        <dl className="space-y-4">
          <div className="flex items-baseline gap-4">
            <dt className="font-mono text-xs text-muted-foreground w-16 shrink-0">Email</dt>
            <dd>
              <a
                href="mailto:jackpbrookes@gmail.com"
                className="font-mono text-xs text-foreground hover:text-muted-foreground transition-colors duration-200"
              >
                jackpbrookes@gmail.com
              </a>
            </dd>
          </div>
          <div className="flex items-baseline gap-4">
            <dt className="font-mono text-xs text-muted-foreground w-16 shrink-0">LinkedIn</dt>
            <dd>
              <a
                href="https://linkedin.com/in/jackpbrookes"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-foreground hover:text-muted-foreground transition-colors duration-200"
              >
                linkedin.com/in/jackpbrookes &rarr;
              </a>
            </dd>
          </div>
        </dl>
      </section>

      <section className="py-20" aria-labelledby="form-heading">
        <SectionLabel number="02" title="Message" className="mb-16" />
        <ContactForm />
      </section>

    </div>
  )
}
