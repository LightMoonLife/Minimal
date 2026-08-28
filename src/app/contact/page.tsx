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

      <section className="pt-24 sm:pt-32 lg:pt-40 pb-14 sm:pb-16">
        <SectionLabel number="00" title="Contact" className="mb-6" />
        <h1 className="font-display text-3xl sm:text-4xl lg:text-6xl font-bold text-ink leading-tight tracking-tight mb-5">
          Let&apos;s talk
        </h1>
        <p className="text-lg text-ink-soft leading-relaxed max-w-sm">
          I work with a small number of clients directly at any one time. Typically respond within one working day.
        </p>
      </section>

      <section className="py-14 sm:py-16 border-t border-line" aria-label="Direct contact details">
        <SectionLabel number="01" title="Direct" className="mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <a
            href="mailto:jackpbrookes@gmail.com"
            className="group bracket-frame p-5 hover:bg-surface/50 transition-colors duration-200 block"
          >
            <p className="text-xs text-ink-faint mb-1.5">Email</p>
            <p className="text-sm font-medium text-ink group-hover:text-blueprint transition-colors duration-200">
              jackpbrookes@gmail.com
            </p>
          </a>
          <a
            href="https://linkedin.com/in/jackpbrookes"
            target="_blank"
            rel="noopener noreferrer"
            className="group bracket-frame p-5 hover:bg-surface/50 transition-colors duration-200 block"
          >
            <p className="text-xs text-ink-faint mb-1.5">LinkedIn</p>
            <p className="text-sm font-medium text-ink group-hover:text-blueprint transition-colors duration-200">
              linkedin.com/in/jackpbrookes &rarr;
            </p>
          </a>
        </div>
      </section>

      <section className="py-14 sm:py-16 border-t border-line" aria-labelledby="form-heading">
        <SectionLabel number="02" title="Message" className="mb-8" />
        <ContactForm />
      </section>

    </div>
  )
}
