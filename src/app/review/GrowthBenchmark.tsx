'use client'

import { useState } from 'react'
import Link from 'next/link'

interface IndustryData {
  label: string
  conversionRate: { poor: number; good: number; better: number; best: number }
  leadToCustomer: { poor: number; good: number; better: number; best: number }
  costPerLead: { poor: number; good: number; better: number; best: number }
}

const industries: Record<string, IndustryData> = {
  manufacturing: {
    label: 'Manufacturing',
    conversionRate: { poor: 1.0, good: 2.3, better: 3.5, best: 5.0 },
    leadToCustomer: { poor: 3, good: 5, better: 10, best: 15 },
    costPerLead: { poor: 150, good: 90, better: 55, best: 30 },
  },
  professional: {
    label: 'Professional Services',
    conversionRate: { poor: 1.5, good: 3.5, better: 5.0, best: 8.0 },
    leadToCustomer: { poor: 4, good: 7, better: 12, best: 20 },
    costPerLead: { poor: 120, good: 75, better: 45, best: 20 },
  },
  ecommerce: {
    label: 'E-commerce',
    conversionRate: { poor: 1.0, good: 2.5, better: 4.0, best: 6.0 },
    leadToCustomer: { poor: 1.5, good: 3, better: 6, best: 10 },
    costPerLead: { poor: 80, good: 45, better: 25, best: 12 },
  },
  saas: {
    label: 'SaaS / Tech',
    conversionRate: { poor: 1.5, good: 3.0, better: 5.0, best: 7.0 },
    leadToCustomer: { poor: 3, good: 5, better: 8, best: 12 },
    costPerLead: { poor: 200, good: 120, better: 70, best: 35 },
  },
  construction: {
    label: 'Construction / Trades',
    conversionRate: { poor: 0.8, good: 2.0, better: 3.5, best: 5.0 },
    leadToCustomer: { poor: 5, good: 8, better: 15, best: 22 },
    costPerLead: { poor: 100, good: 60, better: 35, best: 18 },
  },
  healthcare: {
    label: 'Healthcare',
    conversionRate: { poor: 1.2, good: 3.0, better: 4.5, best: 7.0 },
    leadToCustomer: { poor: 5, good: 8, better: 14, best: 20 },
    costPerLead: { poor: 130, good: 80, better: 50, best: 25 },
  },
  financial: {
    label: 'Financial Services',
    conversionRate: { poor: 1.0, good: 3.0, better: 5.0, best: 8.0 },
    leadToCustomer: { poor: 3, good: 6, better: 10, best: 16 },
    costPerLead: { poor: 180, good: 110, better: 65, best: 30 },
  },
  education: {
    label: 'Education / Training',
    conversionRate: { poor: 1.5, good: 3.5, better: 5.5, best: 8.0 },
    leadToCustomer: { poor: 4, good: 8, better: 13, best: 18 },
    costPerLead: { poor: 90, good: 55, better: 30, best: 15 },
  },
}

type Rating = 'poor' | 'below' | 'good' | 'better' | 'best'

function getRating(
  value: number,
  thresholds: { poor: number; good: number; better: number; best: number },
  inverted = false
): Rating {
  if (inverted) {
    if (value >= thresholds.poor) return 'poor'
    if (value >= thresholds.good) return 'below'
    if (value >= thresholds.better) return 'good'
    if (value >= thresholds.best) return 'better'
    return 'best'
  }
  if (value < thresholds.poor) return 'poor'
  if (value < thresholds.good) return 'below'
  if (value < thresholds.better) return 'good'
  if (value < thresholds.best) return 'better'
  return 'best'
}

function getPosition(
  value: number,
  thresholds: { poor: number; good: number; better: number; best: number },
  inverted = false
): number {
  const max = inverted ? thresholds.poor * 1.3 : thresholds.best * 1.3
  const min = inverted ? thresholds.best * 0.5 : 0
  const range = max - min
  if (range === 0) return 50
  const raw = inverted
    ? ((max - value) / range) * 100
    : ((value - min) / range) * 100
  return Math.max(2, Math.min(98, raw))
}

const ratingLabels: Record<Rating, string> = {
  poor: 'Needs work',
  below: 'Below average',
  good: 'Average',
  better: 'Above average',
  best: 'Top performer',
}

const ratingColors: Record<Rating, string> = {
  poor: 'text-red-600 dark:text-red-400',
  below: 'text-orange-600 dark:text-orange-400',
  good: 'text-foreground',
  better: 'text-accent-deep',
  best: 'text-accent-deep',
}

interface MetricResult {
  label: string
  value: string
  rating: Rating
  position: number
  thresholds: { poor: number; good: number; better: number; best: number }
  inverted: boolean
  insight: string
}

function BenchmarkBar({ result }: { result: MetricResult }) {
  const t = result.thresholds
  const max = result.inverted ? t.poor * 1.3 : t.best * 1.3
  const min = result.inverted ? t.best * 0.5 : 0
  const range = max - min

  const goodPos = result.inverted
    ? ((max - t.good) / range) * 100
    : ((t.good - min) / range) * 100
  const betterPos = result.inverted
    ? ((max - t.better) / range) * 100
    : ((t.better - min) / range) * 100
  const bestPos = result.inverted
    ? ((max - t.best) / range) * 100
    : ((t.best - min) / range) * 100

  return (
    <div className="border border-border/10 rounded-card p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4 mb-1">
        <p className="text-sm font-medium text-foreground">{result.label}</p>
        <p className={`text-sm font-medium whitespace-nowrap ${ratingColors[result.rating]}`}>
          {ratingLabels[result.rating]}
        </p>
      </div>
      <p className="text-2xl font-medium text-foreground tracking-tight mb-4">
        {result.value}
      </p>

      <div className="relative h-3 rounded-pill overflow-hidden mb-2">
        <div className="absolute inset-0 flex">
          <div className="h-full bg-red-400/30 dark:bg-red-400/20" style={{ width: `${goodPos}%` }} />
          <div className="h-full bg-orange-300/40 dark:bg-orange-400/20" style={{ width: `${betterPos - goodPos}%` }} />
          <div className="h-full bg-accent/30" style={{ width: `${bestPos - betterPos}%` }} />
          <div className="h-full bg-emerald-400/30 dark:bg-emerald-400/20" style={{ width: `${100 - bestPos}%` }} />
        </div>
        <div
          className="absolute top-0 h-full w-1 bg-foreground rounded-full -translate-x-1/2 shadow-sm"
          style={{ left: `${result.position}%` }}
        />
      </div>

      <div className="relative h-4 text-[10px] text-muted-foreground mb-4">
        <span className="absolute -translate-x-1/2" style={{ left: `${goodPos}%` }}>
          Avg
        </span>
        <span className="absolute -translate-x-1/2" style={{ left: `${betterPos}%` }}>
          Good
        </span>
        <span className="absolute -translate-x-1/2" style={{ left: `${bestPos}%` }}>
          Best
        </span>
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed">{result.insight}</p>
    </div>
  )
}

export function GrowthBenchmark() {
  const [industry, setIndustry] = useState('')
  const [traffic, setTraffic] = useState('')
  const [leads, setLeads] = useState('')
  const [customers, setCustomers] = useState('')
  const [results, setResults] = useState<MetricResult[] | null>(null)

  function calculate() {
    const data = industries[industry]
    if (!data) return

    const t = parseInt(traffic, 10) || 0
    const l = parseInt(leads, 10) || 0
    const c = parseInt(customers, 10) || 0

    if (t === 0) return

    const convRate = (l / t) * 100
    const leadToCustomerRate = l > 0 ? (c / l) * 100 : 0
    const costPerLead = t > 0 && l > 0 ? Math.round(t * 0.12 / l) : 0

    const convRating = getRating(convRate, data.conversionRate)
    const ltcRating = getRating(leadToCustomerRate, data.leadToCustomer)

    const metrics: MetricResult[] = [
      {
        label: 'Visitor → Lead rate',
        value: `${convRate.toFixed(2)}%`,
        rating: convRating,
        position: getPosition(convRate, data.conversionRate),
        thresholds: data.conversionRate,
        inverted: false,
        insight: convRating === 'poor' || convRating === 'below'
          ? `Your site converts ${convRate.toFixed(1)}% of visitors into leads. The ${data.label} average is ${data.conversionRate.good}%. Improving your CTAs, page speed, and trust signals could close this gap.`
          : convRating === 'best'
          ? `At ${convRate.toFixed(1)}%, you're outperforming most ${data.label.toLowerCase()} businesses. Focus on scaling traffic to multiply this advantage.`
          : `${convRate.toFixed(1)}% is solid for ${data.label.toLowerCase()}. Targeted landing pages and stronger offers could push you into the top tier (${data.conversionRate.best}%+).`,
      },
      {
        label: 'Lead → Customer rate',
        value: l > 0 ? `${leadToCustomerRate.toFixed(1)}%` : 'N/A',
        rating: l > 0 ? ltcRating : 'poor',
        position: l > 0 ? getPosition(leadToCustomerRate, data.leadToCustomer) : 2,
        thresholds: data.leadToCustomer,
        inverted: false,
        insight: l === 0
          ? 'Enter your monthly leads to benchmark your close rate.'
          : ltcRating === 'poor' || ltcRating === 'below'
          ? `Only ${leadToCustomerRate.toFixed(0)}% of leads become customers. The ${data.label} average is ${data.leadToCustomer.good}%. Your follow-up process, qualification, or sales funnel likely needs attention.`
          : ltcRating === 'best'
          ? `${leadToCustomerRate.toFixed(0)}% close rate puts you in the top tier. Your sales process is working — focus on volume.`
          : `${leadToCustomerRate.toFixed(0)}% is a healthy close rate. Better lead qualification and faster follow-up could push you above ${data.leadToCustomer.better}%.`,
      },
      {
        label: 'Estimated cost per lead',
        value: l > 0 ? `~£${costPerLead}` : 'N/A',
        rating: l > 0 ? getRating(costPerLead, data.costPerLead, true) : 'poor',
        position: l > 0 ? getPosition(costPerLead, data.costPerLead, true) : 2,
        thresholds: data.costPerLead,
        inverted: true,
        insight: l === 0
          ? 'Based on an estimated £0.12/visitor average, this estimates what each lead costs you.'
          : costPerLead > data.costPerLead.good
          ? `At ~£${costPerLead} per lead, you're spending more than the ${data.label.toLowerCase()} average (£${data.costPerLead.good}). Improving conversion rate is the fastest way to lower this.`
          : costPerLead < data.costPerLead.best
          ? `~£${costPerLead} per lead is excellent. You're acquiring leads very efficiently compared to ${data.label.toLowerCase()} benchmarks.`
          : `~£${costPerLead} per lead is competitive. Conversion rate optimisation could reduce this further toward £${data.costPerLead.best}.`,
      },
    ]

    const overallScore = metrics.reduce((sum, m) => {
      const scores: Record<Rating, number> = { poor: 1, below: 2, good: 3, better: 4, best: 5 }
      return sum + scores[m.rating]
    }, 0)

    const revenueGap = t > 0 && l > 0 && c > 0
      ? Math.round(
          (t * (data.conversionRate.better / 100) * (data.leadToCustomer.better / 100) - c) *
          (industry === 'ecommerce' ? 85 : industry === 'saas' ? 1200 : 2500)
        )
      : null

    setResults(metrics)
    setRevenueGap(revenueGap)
    setOverallScore(overallScore)
  }

  const [revenueGap, setRevenueGap] = useState<number | null>(null)
  const [overallScore, setOverallScore] = useState(0)

  const inputClass =
    'w-full bg-transparent border border-border/15 rounded-card px-4 py-3 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors duration-200'

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label htmlFor="bench-industry" className="block text-xs text-muted-foreground font-medium mb-2">
            Industry
          </label>
          <select
            id="bench-industry"
            value={industry}
            onChange={e => setIndustry(e.target.value)}
            className={`${inputClass} cursor-pointer`}
          >
            <option value="">Select your industry</option>
            {Object.entries(industries).map(([key, val]) => (
              <option key={key} value={key}>{val.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="bench-traffic" className="block text-xs text-muted-foreground font-medium mb-2">
            Monthly website visitors
          </label>
          <input
            id="bench-traffic"
            type="number"
            min="0"
            value={traffic}
            onChange={e => setTraffic(e.target.value)}
            className={inputClass}
            placeholder="e.g. 5000"
          />
        </div>

        <div>
          <label htmlFor="bench-leads" className="block text-xs text-muted-foreground font-medium mb-2">
            Monthly leads / enquiries
          </label>
          <input
            id="bench-leads"
            type="number"
            min="0"
            value={leads}
            onChange={e => setLeads(e.target.value)}
            className={inputClass}
            placeholder="e.g. 50"
          />
        </div>

        <div>
          <label htmlFor="bench-customers" className="block text-xs text-muted-foreground font-medium mb-2">
            Monthly new customers / sales
          </label>
          <input
            id="bench-customers"
            type="number"
            min="0"
            value={customers}
            onChange={e => setCustomers(e.target.value)}
            className={inputClass}
            placeholder="e.g. 8"
          />
        </div>
      </div>

      <button
        onClick={calculate}
        disabled={!industry || !traffic}
        className="bg-accent text-foreground font-medium text-sm px-8 py-3.5 rounded-pill hover:bg-accent-deep hover:text-white transition-all duration-320 ease-smooth hover:-translate-y-0.5 disabled:opacity-40 disabled:hover:translate-y-0 mb-10"
      >
        Benchmark my numbers
      </button>

      {results && (
        <div className="space-y-8 animate-in">
          {revenueGap !== null && revenueGap > 0 && (
            <div className="border border-accent/20 rounded-card p-6 sm:p-8 bg-accent/5">
              <p className="text-xs text-muted-foreground tracking-widest uppercase font-medium mb-3">
                Revenue opportunity
              </p>
              <p className="text-3xl sm:text-4xl font-medium text-accent-deep tracking-tight mb-2">
                ~£{revenueGap.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Estimated additional annual revenue if your conversion rates matched
                the &ldquo;above average&rdquo; benchmark for your industry. This is the
                gap between where you are and where you could be.
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 gap-4">
            {results.map(r => (
              <BenchmarkBar key={r.label} result={r} />
            ))}
          </div>

          <div className="border border-border/10 rounded-card p-6 sm:p-8 bg-panel/50">
            <p className="text-xs text-muted-foreground tracking-widest uppercase font-medium mb-3">
              Overall
            </p>
            <p className="text-sm text-foreground leading-relaxed mb-4">
              {overallScore <= 6
                ? 'Your numbers suggest significant room for improvement. A structured growth audit would identify the specific blockers holding you back and give you a prioritised action plan.'
                : overallScore <= 9
                ? 'You\'re performing around average for your industry, but there\'s clear upside. Targeted optimisations — better CTAs, faster pages, stronger follow-up — could meaningfully shift these numbers.'
                : overallScore <= 12
                ? 'Solid performance across the board. You\'re ahead of most competitors. An ongoing growth programme could help you sustain this and push into the top tier.'
                : 'Exceptional numbers. You\'re operating at or near the top of your industry. The focus now should be on scaling what works and protecting your advantage.'}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-accent text-foreground font-medium text-sm px-6 py-3 rounded-pill hover:bg-accent-deep hover:text-white transition-all duration-200"
            >
              {overallScore <= 9 ? 'Get a free growth review' : 'Let’s talk about scaling'}
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
