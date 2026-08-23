import type { Metadata } from 'next'
import { ContactForm } from './ContactForm'
import { SectionLabel } from '@/components/SectionLabel'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch to discuss digital transformation, revenue platforms, or growth consulting.',
}

export default function ContactPage() {
  return (
    <div className="max-w-content mx-auto px-6 sm:px-10">

      <section className="pt-24 sm:pt-32 lg:pt-40 pb-16 sm:pb-20">
        <SectionLabel number="00" title="Contact" className="mb-8" />
        <h1 className="text-3xl sm:text-4xl font-medium text-foreground leading-snug tracking-tight mb-6">
          Let&apos;s talk
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-sm">
          I work with a small number of clients directly at any one time. Typically respond within one working day.
        </p>
      </section>

      <section className="py-16 sm:py-20 border-t border-border/10" aria-label="Direct contact details">
        <SectionLabel number="01" title="Direct" className="mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <a
            href="mailto:jackpbrookes@gmail.com"
            className="group border border-border/10 rounded-card p-6 hover:bg-panel/50 transition-all duration-200 block"
          >
            <p className="text-xs text-muted-foreground mb-2">Email</p>
            <p className="text-sm font-medium text-foreground group-hover:text-accent-deep transition-colors duration-200">
              jackpbrookes@gmail.com
            </p>
          </a>
          <a
            href="https://linkedin.com/in/jackpbrookes"
            target="_blank"
            rel="noopener noreferrer"
            className="group border border-border/10 rounded-card p-6 hover:bg-panel/50 transition-all duration-200 block"
          >
            <p className="text-xs text-muted-foreground mb-2">LinkedIn</p>
            <p className="text-sm font-medium text-foreground group-hover:text-accent-deep transition-colors duration-200">
              linkedin.com/in/jackpbrookes &rarr;
            </p>
          </a>
        </div>
      </section>

      <section className="py-16 sm:py-20 border-t border-border/10" aria-labelledby="form-heading">
        <SectionLabel number="02" title="Message" className="mb-10" />
        <ContactForm />
      </section>

    </div>
  )
}
