import type { Metadata } from 'next'
import Link from 'next/link'
import { SeoAnalyzer } from './SeoAnalyzer'
import { GrowthBenchmark } from './GrowthBenchmark'
import { SectionLabel } from '@/components/SectionLabel'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Free Review',
  description:
    'Get a free website review with actionable insights on how to improve your conversion rate and grow revenue.',
}

const plans = [
  {
    name: 'Free Review',
    price: 'Free',
    period: '',
    description: 'A basic overview of your site with high-level observations.',
    features: [
      'Homepage first-impression audit',
      'Top 3 conversion blockers identified',
      'Delivered within 48 hours',
    ],
    cta: 'Start free review',
    highlight: false,
  },
  {
    name: 'Growth Audit',
    price: '£999',
    period: 'one-off',
    description: 'A full audit of your website and digital presence with a step-by-step growth guide.',
    features: [
      'Full-site conversion audit',
      'SEO performance review',
      'Competitor benchmarking',
      'Prioritised action plan',
      'Growth playbook document',
    ],
    cta: 'Book my audit',
    highlight: false,
  },
  {
    name: 'Ongoing Growth',
    price: '£99',
    period: '/month',
    description: 'Monthly performance reports and recommendations. No ongoing support included.',
    features: [
      'Everything in Growth Audit',
      'Monthly performance report',
      'Conversion tracking setup',
      'Monthly recommendations',
    ],
    cta: 'Start ongoing growth',
    highlight: false,
  },
  {
    name: 'Growth Partner',
    price: '£299',
    period: '/month',
    description: 'Ongoing audit, implementation support, and direct access to me.',
    features: [
      'Everything in Ongoing Growth',
      'Hands-on implementation support',
      'Monthly strategy call',
      'Priority response time',
      'Quarterly deep-dive audit',
    ],
    cta: 'Become a growth partner',
    highlight: true,
  },
  {
    name: 'Custom',
    price: 'Bespoke',
    period: '',
    description: 'For businesses with specific requirements or larger-scale transformation projects.',
    features: [
      'Scoped to your exact needs',
      'I manage the project directly',
      'Full-stack implementation',
      'I train your team and hand over directly',
    ],
    cta: 'Talk to me about this',
    highlight: false,
  },
]

export default function ReviewPage() {
  return (
    <div className="max-w-content mx-auto px-6 sm:px-10">

      {/* Hero */}
      <section className="pt-24 sm:pt-32 lg:pt-40 pb-14 sm:pb-16">
        <SectionLabel number="00" title="Free Review" className="mb-6" />
        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-ink leading-tight tracking-tighter max-w-lg mb-5">
          Find out what&apos;s costing you customers.
        </h1>
        <p className="text-lg text-ink-soft leading-relaxed max-w-md mb-10">
          Enter a URL or paste your page&apos;s HTML source to get an instant
          SEO audit with actionable recommendations.
        </p>

        <SeoAnalyzer />
      </section>

      {/* Growth Benchmark */}
      <section className="py-16 sm:py-24" aria-labelledby="benchmark-heading">
        <SectionLabel number="01" title="Benchmark" className="mb-6" />
        <h2 id="benchmark-heading" className="text-xl lg:text-3xl font-bold text-ink leading-snug tracking-tighter max-w-md mb-5">
          See how you compare to your industry.
        </h2>
        <p className="text-base text-ink-soft leading-relaxed max-w-md mb-10">
          Enter your monthly numbers and select your industry to see where you sit
          against real benchmarks — and how much revenue you could be leaving on the table.
        </p>

        <GrowthBenchmark />
      </section>

      {/* Pricing */}
      <section className="py-16 sm:py-24" aria-labelledby="pricing-heading">
        <SectionLabel number="02" title="Packages" className="mb-6" />
        <h2 className="text-xl lg:text-3xl font-bold text-ink leading-snug tracking-tighter max-w-md mb-5">
          Go deeper with a full growth programme.
        </h2>
        <p className="text-base text-ink-soft leading-relaxed max-w-md mb-10">
          The free review gives you a starting point. For businesses serious
          about growth, these packages deliver the full picture and the
          support to act on it.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {plans.map(plan => (
            <div
              key={plan.name}
              className={`soft-card p-5 sm:p-6 flex flex-col ${
                plan.highlight
                  ? 'ring-2 ring-signal'
                  : ''
              }`}
            >
              <p className="text-xs text-ink-faint tracking-widest uppercase font-medium mb-3">
                {plan.name}
              </p>

              <div className="flex items-baseline gap-1 mb-2">
                <span className={`font-mono text-2xl font-bold tracking-tighter leading-none tabular-nums ${
                  plan.highlight ? 'text-signal' : 'text-ink'
                }`}>
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="text-xs text-ink-faint">
                    {plan.period}
                  </span>
                )}
              </div>

              <p className="text-sm text-ink-soft leading-relaxed mb-5">
                {plan.description}
              </p>

              <ul className="space-y-2.5 mb-6 flex-1">
                {plan.features.map(feature => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="text-blueprint mt-1 shrink-0" aria-hidden="true">
                      <svg width="6" height="6" viewBox="0 0 6 6" fill="currentColor"><circle cx="3" cy="3" r="3" /></svg>
                    </span>
                    <span className="text-sm text-ink">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.highlight ? 'default' : 'outline'}
                className="w-full"
                asChild
              >
                <Link href="/contact">
                  {plan.cta}
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}
