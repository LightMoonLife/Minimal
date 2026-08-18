import type { Metadata } from 'next'
import Link from 'next/link'
import { SeoAnalyzer } from './SeoAnalyzer'
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
    cta: 'Get started above',
    highlight: false,
    gradient: false,
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
    cta: 'Book audit',
    highlight: false,
    gradient: false,
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
    cta: 'Get started',
    highlight: false,
    gradient: false,
  },
  {
    name: 'Growth Partner',
    price: '£299',
    period: '/month',
    description: 'Ongoing audit, implementation support, and direct access to a growth architect.',
    features: [
      'Everything in Ongoing Growth',
      'Hands-on implementation support',
      'Monthly strategy call',
      'Priority response time',
      'Quarterly deep-dive audit',
    ],
    cta: 'Get started',
    highlight: true,
    gradient: true,
  },
  {
    name: 'Custom',
    price: 'Bespoke',
    period: '',
    description: 'For businesses with specific requirements or larger-scale transformation projects.',
    features: [
      'Scoped to your exact needs',
      'Dedicated project management',
      'Full-stack implementation',
      'Team training and handover',
    ],
    cta: 'Get in touch',
    highlight: false,
    gradient: false,
  },
]

export default function ReviewPage() {
  return (
    <div className="max-w-content mx-auto px-6">

      {/* Hero */}
      <section className="pt-32 sm:pt-40 pb-24 border-b border-border">
        <SectionLabel number="00" title="Free Review" className="mb-10" />
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extralight text-foreground leading-snug tracking-tight max-w-lg mb-6">
          Find out what&apos;s costing you customers.
        </h1>
        <p className="text-lg font-light text-muted-foreground leading-relaxed max-w-md mb-16">
          Paste your page&apos;s HTML source and a target keyword to get an instant
          on-page SEO audit with actionable recommendations.
        </p>

        <SeoAnalyzer />
      </section>

      {/* Pricing */}
      <section className="py-28 sm:py-32" aria-labelledby="pricing-heading">
        <SectionLabel number="01" title="Packages" className="mb-10" />
        <h2 className="text-2xl sm:text-3xl font-extralight text-foreground leading-snug tracking-tight max-w-md mb-6">
          Go deeper with a full growth programme.
        </h2>
        <p className="text-base font-light text-muted-foreground leading-relaxed max-w-md mb-16">
          The free review gives you a starting point. For businesses serious
          about growth, these packages deliver the full picture and the
          support to act on it.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map(plan => (
            <div
              key={plan.name}
              className={`border p-8 flex flex-col ${
                plan.highlight
                  ? 'border-transparent bg-gradient-to-br from-pink-500/10 to-emerald-500/10'
                  : 'border-border'
              }`}
            >
              <p className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-4">
                {plan.name}
              </p>

              <div className="flex items-baseline gap-1 mb-2">
                <span
                  className={`text-3xl font-extralight tracking-tight leading-none ${
                    plan.gradient
                      ? 'bg-gradient-to-r from-pink-500 to-emerald-500 bg-clip-text text-transparent'
                      : 'text-foreground'
                  }`}
                >
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="font-mono text-xs text-muted-foreground">
                    {plan.period}
                  </span>
                )}
              </div>

              <p className="text-sm font-light text-muted-foreground leading-relaxed mb-8">
                {plan.description}
              </p>

              <ul className="space-y-3 mb-10 flex-1">
                {plan.features.map(feature => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="font-mono text-xs text-muted-foreground mt-0.5 shrink-0">/</span>
                    <span className="font-mono text-xs text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className={`font-mono text-xs tracking-widest text-center py-3.5 transition-all duration-200 block ${
                  plan.gradient
                    ? 'bg-gradient-to-r from-pink-500 to-emerald-500 text-white hover:opacity-90'
                    : plan.highlight
                    ? 'bg-foreground text-background hover:opacity-90'
                    : 'border border-border text-foreground hover:bg-muted'
                }`}
              >
                {plan.cta.toUpperCase()}
              </Link>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}
