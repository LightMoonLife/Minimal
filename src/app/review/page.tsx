import type { Metadata } from 'next'
import Link from 'next/link'
import { SeoAnalyzer } from './SeoAnalyzer'
import { GrowthBenchmark } from './GrowthBenchmark'
import { SectionLabel } from '@/components/SectionLabel'

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
      <section className="pt-24 sm:pt-32 lg:pt-40 pb-16 sm:pb-20">
        <SectionLabel number="00" title="Free Review" className="mb-8" />
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-foreground leading-snug tracking-tight max-w-lg mb-6">
          Find out what&apos;s costing you customers.
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-md mb-12">
          Enter a URL or paste your page&apos;s HTML source to get an instant
          SEO audit with actionable recommendations.
        </p>

        <SeoAnalyzer />
      </section>

      {/* Growth Benchmark */}
      <section className="py-20 sm:py-28 border-t border-border/10" aria-labelledby="benchmark-heading">
        <SectionLabel number="01" title="Benchmark" className="mb-8" />
        <h2 id="benchmark-heading" className="text-2xl sm:text-3xl font-medium text-foreground leading-snug tracking-tight max-w-md mb-6">
          See how you compare to your industry.
        </h2>
        <p className="text-base text-muted-foreground leading-relaxed max-w-md mb-12">
          Enter your monthly numbers and select your industry to see where you sit
          against real benchmarks — and how much revenue you could be leaving on the table.
        </p>

        <GrowthBenchmark />
      </section>

      {/* Pricing */}
      <section className="py-20 sm:py-28 border-t border-border/10" aria-labelledby="pricing-heading">
        <SectionLabel number="02" title="Packages" className="mb-8" />
        <h2 className="text-2xl sm:text-3xl font-medium text-foreground leading-snug tracking-tight max-w-md mb-6">
          Go deeper with a full growth programme.
        </h2>
        <p className="text-base text-muted-foreground leading-relaxed max-w-md mb-12">
          The free review gives you a starting point. For businesses serious
          about growth, these packages deliver the full picture and the
          support to act on it.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {plans.map(plan => (
            <div
              key={plan.name}
              className={`border rounded-card p-6 sm:p-8 flex flex-col ${
                plan.highlight
                  ? 'border-accent bg-accent/5 ring-1 ring-accent/30'
                  : 'border-border/10'
              }`}
            >
              <p className="text-xs text-muted-foreground tracking-widest uppercase font-medium mb-4">
                {plan.name}
              </p>

              <div className="flex items-baseline gap-1 mb-2">
                <span className={`text-3xl font-medium tracking-tight leading-none ${
                  plan.highlight ? 'text-accent-deep' : 'text-foreground'
                }`}>
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="text-xs text-muted-foreground">
                    {plan.period}
                  </span>
                )}
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                {plan.description}
              </p>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map(feature => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="text-accent-deep mt-1 shrink-0" aria-hidden="true">
                      <svg width="6" height="6" viewBox="0 0 6 6" fill="currentColor"><circle cx="3" cy="3" r="3" /></svg>
                    </span>
                    <span className="text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className={`text-sm font-medium text-center py-3.5 rounded-pill transition-all duration-200 block ${
                  plan.highlight
                    ? 'bg-accent text-foreground hover:bg-accent-deep hover:text-white'
                    : 'border border-border/15 text-foreground hover:bg-panel'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}
