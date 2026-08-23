'use client'

import { useState, useMemo, useCallback } from 'react'

type Status = 'pass' | 'warning' | 'fail'
type Tab = 'seo' | 'speed' | 'serp' | 'social'

interface CheckResult {
  name: string
  status: Status
  detail: string
  suggestion: string
  points: number
  maxPoints: number
}

// ---------------------------------------------------------------------------
// HTML parsing helpers
// ---------------------------------------------------------------------------

function extractTag(html: string, tag: string): string | null {
  const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i')
  const match = html.match(regex)
  return match ? match[1].trim() : null
}

function extractAllTags(html: string, tag: string): string[] {
  const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'gi')
  const matches: string[] = []
  let m
  while ((m = regex.exec(html)) !== null) {
    matches.push(m[1].trim())
  }
  return matches
}

function extractMetaContent(html: string, name: string): string | null {
  const regex = new RegExp(
    `<meta[^>]*name=["']${name}["'][^>]*content=["']([^"']*)["'][^>]*/?>|<meta[^>]*content=["']([^"']*)["'][^>]*name=["']${name}["'][^>]*/?>`,
    'i'
  )
  const match = html.match(regex)
  return match ? (match[1] ?? match[2] ?? null) : null
}

function extractMetaProperty(html: string, property: string): string | null {
  const regex = new RegExp(
    `<meta[^>]*property=["']${property}["'][^>]*content=["']([^"']*)["'][^>]*/?>|<meta[^>]*content=["']([^"']*)["'][^>]*property=["']${property}["'][^>]*/?>`,
    'i'
  )
  const match = html.match(regex)
  return match ? (match[1] ?? match[2] ?? null) : null
}

function extractCanonicalUrl(html: string): string | null {
  const match = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["'][^>]*\/?>/i)
  return match ? match[1] : null
}

function extractFavicon(html: string): string | null {
  const match = html.match(/<link[^>]*rel=["'](?:shortcut )?icon["'][^>]*href=["']([^"']*)["'][^>]*\/?>/i)
  return match ? match[1] : null
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text
  return text.slice(0, max - 1) + '…'
}

function extractDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0] || url
  }
}

function extractImgAlts(html: string): { total: number; withAlt: number; alts: string[] } {
  const imgs = html.match(/<img[^>]*>/gi) || []
  const alts: string[] = []
  let withAlt = 0
  for (const img of imgs) {
    const altMatch = img.match(/alt=["']([^"']*)["']/i)
    if (altMatch && altMatch[1].trim()) {
      withAlt++
      alts.push(altMatch[1].trim())
    }
  }
  return { total: imgs.length, withAlt, alts }
}

function extractLinks(html: string): { internal: number; external: number; anchors: string[] } {
  const links = html.match(/<a[^>]*>[\s\S]*?<\/a>/gi) || []
  let internal = 0
  let external = 0
  const anchors: string[] = []
  for (const link of links) {
    const hrefMatch = link.match(/href=["']([^"']*)["']/i)
    const textMatch = link.match(/>([^<]*)</i)
    if (textMatch && textMatch[1].trim()) {
      anchors.push(textMatch[1].trim())
    }
    if (hrefMatch) {
      const href = hrefMatch[1]
      if (href.startsWith('http://') || href.startsWith('https://')) {
        external++
      } else if (href.startsWith('/') || href.startsWith('#') || href.startsWith('.')) {
        internal++
      }
    }
  }
  return { internal, external, anchors }
}

function stripHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function containsKeyword(text: string, keyword: string): boolean {
  return text.toLowerCase().includes(keyword.toLowerCase())
}

function countKeyword(text: string, keyword: string): number {
  const regex = new RegExp(keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')
  return (text.match(regex) || []).length
}

// ---------------------------------------------------------------------------
// SEO analysis
// ---------------------------------------------------------------------------

function analyzeHtml(html: string, keyword: string): CheckResult[] {
  const results: CheckResult[] = []
  const kw = keyword.trim()

  const title = extractTag(html, 'title')
  if (!title) {
    results.push({
      name: 'Title Tag',
      status: 'fail',
      detail: 'No title tag found.',
      suggestion: `Add a <title> tag containing your target keyword "${kw}". Keep it under 60 characters.`,
      points: 0,
      maxPoints: 15,
    })
  } else {
    const len = title.length
    const hasKw = containsKeyword(title, kw)
    const lengthOk = len >= 30 && len <= 60
    let pts = 0
    if (hasKw) pts += 8
    if (lengthOk) pts += 7
    else if (len > 0 && len < 70) pts += 4

    let status: Status = 'pass'
    const issues: string[] = []
    if (!hasKw) { status = 'fail'; issues.push(`does not contain keyword "${kw}"`) }
    if (len < 30) { status = status === 'fail' ? 'fail' : 'warning'; issues.push(`too short (${len} chars, aim for 30-60)`) }
    if (len > 60) { status = status === 'fail' ? 'fail' : 'warning'; issues.push(`too long (${len} chars, may be truncated in search results)`) }

    results.push({
      name: 'Title Tag',
      status: issues.length === 0 ? 'pass' : status,
      detail: issues.length === 0
        ? `"${title}" (${len} chars). Contains keyword. Good length.`
        : `"${title}" (${len} chars). Issues: ${issues.join('; ')}.`,
      suggestion: issues.length === 0
        ? 'Title tag looks good.'
        : `Rewrite the title to include "${kw}" near the front, and keep it between 30-60 characters.`,
      points: pts,
      maxPoints: 15,
    })
  }

  const metaDesc = extractMetaContent(html, 'description')
  if (!metaDesc) {
    results.push({
      name: 'Meta Description',
      status: 'fail',
      detail: 'No meta description found.',
      suggestion: `Add a meta description containing "${kw}". Keep it between 120-160 characters with a clear call to action.`,
      points: 0,
      maxPoints: 10,
    })
  } else {
    const len = metaDesc.length
    const hasKw = containsKeyword(metaDesc, kw)
    const lengthOk = len >= 120 && len <= 160
    let pts = 0
    if (hasKw) pts += 5
    if (lengthOk) pts += 5
    else if (len > 50 && len < 200) pts += 3

    const issues: string[] = []
    let status: Status = 'pass'
    if (!hasKw) { status = 'warning'; issues.push(`does not contain keyword "${kw}"`) }
    if (len < 120) { status = status === 'pass' ? 'warning' : status; issues.push(`short (${len} chars, aim for 120-160)`) }
    if (len > 160) { status = status === 'pass' ? 'warning' : status; issues.push(`long (${len} chars, may be truncated)`) }

    results.push({
      name: 'Meta Description',
      status: issues.length === 0 ? 'pass' : status,
      detail: issues.length === 0
        ? `${len} chars. Contains keyword. Good length.`
        : `${len} chars. ${issues.join('. ')}.`,
      suggestion: issues.length === 0
        ? 'Meta description looks good.'
        : `Write a 120-160 character description that includes "${kw}" and ends with a compelling reason to click.`,
      points: pts,
      maxPoints: 10,
    })
  }

  const h1s = extractAllTags(html, 'h1')
  if (h1s.length === 0) {
    results.push({
      name: 'H1 Heading',
      status: 'fail',
      detail: 'No H1 tag found.',
      suggestion: `Add a single H1 heading containing "${kw}". This is the most important on-page heading signal.`,
      points: 0,
      maxPoints: 15,
    })
  } else {
    const hasKw = containsKeyword(h1s[0], kw)
    const unique = h1s.length === 1
    let pts = 0
    if (hasKw) pts += 8
    if (unique) pts += 7
    else pts += 3

    const issues: string[] = []
    let status: Status = 'pass'
    if (!hasKw) { status = 'fail'; issues.push(`does not contain keyword "${kw}"`) }
    if (!unique) { status = status === 'fail' ? 'fail' : 'warning'; issues.push(`${h1s.length} H1 tags found (should be exactly 1)`) }

    results.push({
      name: 'H1 Heading',
      status: issues.length === 0 ? 'pass' : status,
      detail: issues.length === 0
        ? `"${stripHtml(h1s[0])}" contains keyword. Single H1 on page.`
        : `"${stripHtml(h1s[0])}". ${issues.join('. ')}.`,
      suggestion: issues.length === 0
        ? 'H1 heading looks good.'
        : `Use exactly one H1 tag per page with "${kw}" included naturally.`,
      points: pts,
      maxPoints: 15,
    })
  }

  const h2s = extractAllTags(html, 'h2')
  if (h2s.length === 0) {
    results.push({
      name: 'H2 Headings',
      status: 'warning',
      detail: 'No H2 headings found.',
      suggestion: 'Add H2 subheadings to structure your content. Include keyword variations where natural.',
      points: 0,
      maxPoints: 10,
    })
  } else {
    const withKw = h2s.filter(h => containsKeyword(h, kw)).length
    const ratio = withKw / h2s.length
    let pts = 0
    let status: Status = 'pass'
    if (h2s.length >= 2) pts += 3
    else pts += 1
    if (withKw > 0) pts += 4
    if (ratio > 0 && ratio <= 0.5) pts += 3
    else if (ratio > 0.5) pts += 1

    const issues: string[] = []
    if (withKw === 0) { status = 'warning'; issues.push('none contain the target keyword') }
    if (ratio > 0.5 && h2s.length > 2) { status = 'warning'; issues.push(`keyword appears in ${withKw}/${h2s.length} H2s, which may seem over-optimised`) }

    results.push({
      name: 'H2 Headings',
      status: issues.length === 0 ? 'pass' : status,
      detail: `${h2s.length} H2 heading${h2s.length !== 1 ? 's' : ''} found. ${withKw} contain${withKw !== 1 ? '' : 's'} the keyword.${issues.length > 0 ? ' ' + issues.join('. ') + '.' : ''}`,
      suggestion: issues.length === 0
        ? 'H2 structure looks good.'
        : `Include "${kw}" or close variants in 1-2 of your H2 headings. Don't force it into every one.`,
      points: pts,
      maxPoints: 10,
    })
  }

  const bodyText = stripHtml(html)
  const wordCount = bodyText.split(/\s+/).filter(Boolean).length
  const kwCount = countKeyword(bodyText, kw)
  const kwWords = kw.split(/\s+/).length
  const density = wordCount > 0 ? (kwCount * kwWords / wordCount) * 100 : 0

  if (wordCount < 50) {
    results.push({
      name: 'Keyword Density',
      status: 'warning',
      detail: `Only ${wordCount} words detected. Not enough content to analyse density reliably.`,
      suggestion: 'Paste the full HTML source of the page for accurate keyword density analysis.',
      points: 3,
      maxPoints: 15,
    })
  } else {
    let pts = 0
    let status: Status = 'pass'
    const issues: string[] = []

    if (density === 0) {
      status = 'fail'; pts = 0; issues.push('keyword not found in body content')
    } else if (density < 0.5) {
      status = 'warning'; pts = 5; issues.push(`density is low (${density.toFixed(2)}%). Aim for 1-2%`)
    } else if (density > 3) {
      status = 'warning'; pts = 5; issues.push(`density is high (${density.toFixed(2)}%). This may look like keyword stuffing`)
    } else {
      pts = 15
    }

    results.push({
      name: 'Keyword Density',
      status,
      detail: `"${kw}" appears ${kwCount} time${kwCount !== 1 ? 's' : ''} in ~${wordCount} words (${density.toFixed(2)}% density).${issues.length > 0 ? ' ' + issues.join('. ') + '.' : ''}`,
      suggestion: issues.length === 0
        ? `Good keyword density at ${density.toFixed(2)}%.`
        : density === 0
        ? `Include "${kw}" naturally throughout the page content. Aim for 1-2% density.`
        : density < 0.5
        ? `Add a few more natural mentions of "${kw}" throughout the body content.`
        : `Reduce keyword usage slightly. Rewrite some instances with synonyms or related phrases.`,
      points: pts,
      maxPoints: 15,
    })
  }

  const imgs = extractImgAlts(html)
  if (imgs.total === 0) {
    results.push({
      name: 'Image Alt Text',
      status: 'warning',
      detail: 'No images detected.',
      suggestion: 'Consider adding relevant images with descriptive alt text containing your keyword where appropriate.',
      points: 5,
      maxPoints: 10,
    })
  } else {
    const ratio = imgs.withAlt / imgs.total
    const kwInAlts = imgs.alts.filter(a => containsKeyword(a, kw)).length
    let pts = 0
    let status: Status = 'pass'
    if (ratio >= 0.9) pts += 5
    else if (ratio >= 0.5) pts += 3
    else pts += 1
    if (kwInAlts > 0) pts += 5
    else pts += 2

    const issues: string[] = []
    if (ratio < 0.9) { status = 'warning'; issues.push(`${imgs.total - imgs.withAlt} of ${imgs.total} images missing alt text`) }
    if (kwInAlts === 0) { status = status === 'pass' ? 'warning' : status; issues.push('no alt text contains the target keyword') }

    results.push({
      name: 'Image Alt Text',
      status: issues.length === 0 ? 'pass' : status,
      detail: `${imgs.withAlt}/${imgs.total} images have alt text. ${kwInAlts} contain the keyword.${issues.length > 0 ? ' ' + issues.join('. ') + '.' : ''}`,
      suggestion: issues.length === 0
        ? 'Image alt text looks good.'
        : `Add descriptive alt text to all images. Include "${kw}" in at least one alt attribute where it's genuinely relevant.`,
      points: pts,
      maxPoints: 10,
    })
  }

  const links = extractLinks(html)
  {
    let pts = 0
    let status: Status = 'pass'
    const issues: string[] = []

    if (links.internal === 0) {
      status = 'warning'; pts = 0; issues.push('no internal links found')
    } else if (links.internal < 3) {
      pts = 5; status = 'warning'; issues.push(`only ${links.internal} internal link${links.internal !== 1 ? 's' : ''} found`)
    } else {
      pts = 8
    }

    const kwAnchors = links.anchors.filter(a => containsKeyword(a, kw)).length
    if (kwAnchors > 0) pts += 2

    results.push({
      name: 'Internal Links',
      status,
      detail: `${links.internal} internal, ${links.external} external link${links.external !== 1 ? 's' : ''}.${issues.length > 0 ? ' ' + issues.join('. ') + '.' : ''}`,
      suggestion: issues.length === 0
        ? 'Internal linking looks good.'
        : 'Add 3+ internal links to related pages on your site. Use descriptive anchor text.',
      points: pts,
      maxPoints: 10,
    })
  }

  {
    let pts = 0
    let status: Status = 'pass'
    const issues: string[] = []

    if (wordCount < 300) {
      status = 'fail'; pts = 0; issues.push('very thin content')
    } else if (wordCount < 800) {
      status = 'warning'; pts = 3; issues.push('content may be too short for competitive ranking')
    } else if (wordCount > 800) {
      pts = 5
    }

    results.push({
      name: 'Content Length',
      status,
      detail: `~${wordCount} words detected.${issues.length > 0 ? ' ' + issues.join('. ') + '.' : ''}`,
      suggestion: issues.length === 0
        ? `Good content length at ~${wordCount} words.`
        : wordCount < 300
        ? 'Aim for at least 800+ words of useful, keyword-relevant content for competitive pages.'
        : 'Consider expanding to 1,000+ words if this is a key landing page.',
      points: pts,
      maxPoints: 5,
    })
  }

  return results
}

// ---------------------------------------------------------------------------
// Shared UI components
// ---------------------------------------------------------------------------

function StatusBadge({ status }: { status: Status }) {
  const config = {
    pass: { label: 'PASS', bg: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' },
    warning: { label: 'WARN', bg: 'bg-amber-500/15 text-amber-600 dark:text-amber-400' },
    fail: { label: 'FAIL', bg: 'bg-red-500/15 text-red-600 dark:text-red-400' },
  }
  const c = config[status]
  return (
    <span className={`text-xs tracking-wider px-2.5 py-1 ${c.bg}`}>
      {c.label}
    </span>
  )
}

function ScoreRing({ score, size = 'lg', label }: { score: number; size?: 'sm' | 'lg'; label?: string }) {
  const isLg = size === 'lg'
  const radius = isLg ? 54 : 34
  const viewBox = isLg ? 120 : 80
  const strokeWidth = isLg ? 6 : 4
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference
  const color =
    score >= 80 ? 'stroke-emerald-500' : score >= 50 ? 'stroke-amber-500' : 'stroke-red-500'
  const textColor =
    score >= 80 ? 'text-emerald-500' : score >= 50 ? 'text-amber-500' : 'text-red-500'

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`relative ${isLg ? 'w-36 h-36' : 'w-20 h-20'}`}>
        <svg className="w-full h-full -rotate-90" viewBox={`0 0 ${viewBox} ${viewBox}`}>
          <circle
            cx={viewBox / 2}
            cy={viewBox / 2}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            className="stroke-border"
          />
          <circle
            cx={viewBox / 2}
            cy={viewBox / 2}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className={`${color} transition-all duration-700`}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`${isLg ? 'text-4xl' : 'text-lg'} font-medium ${textColor}`}>{score}</span>
        </div>
      </div>
      {label && (
        <p className="text-xs text-muted-foreground tracking-widest text-center">
          {label}
        </p>
      )}
    </div>
  )
}

function Spinner() {
  return (
    <div className="flex flex-col items-center gap-4 py-16">
      <div className="w-10 h-10 border-2 border-border/10 border-t-foreground rounded-full animate-spin" />
      <p className="text-xs text-muted-foreground tracking-widest">
        FETCHING FROM GOOGLE...
      </p>
      <p className="text-xs text-muted-foreground/60">
        This usually takes 10-30 seconds
      </p>
    </div>
  )
}

// ---------------------------------------------------------------------------
// PageSpeed types & helpers
// ---------------------------------------------------------------------------

interface CoreWebVital {
  id: string
  label: string
  value: string
  numericValue: number
  unit: string
  score: number
  thresholds: { good: number; poor: number }
}

interface PageSpeedResult {
  performanceScore: number
  vitals: CoreWebVital[]
  fetchedUrl: string
}

function formatVitalValue(id: string, value: number): string {
  if (id === 'cumulative-layout-shift') return value.toFixed(3)
  if (value >= 1000) return (value / 1000).toFixed(1) + ' s'
  return Math.round(value) + ' ms'
}

function vitalScore(id: string, value: number, good: number, poor: number): Status {
  if (id === 'cumulative-layout-shift') {
    if (value <= good) return 'pass'
    if (value <= poor) return 'warning'
    return 'fail'
  }
  if (value <= good) return 'pass'
  if (value <= poor) return 'warning'
  return 'fail'
}

function parsePageSpeedResponse(data: Record<string, unknown>): PageSpeedResult {
  const lhr = data.lighthouseResult as Record<string, unknown> | undefined
  const perfScore = Math.round(
    ((lhr?.categories as Record<string, Record<string, unknown>>)?.performance?.score as number ?? 0) * 100
  )
  const audits = (lhr?.audits ?? {}) as Record<string, Record<string, unknown>>
  const fetchedUrl = (lhr?.finalUrl ?? lhr?.requestedUrl ?? '') as string

  const vitalDefs: { id: string; label: string; unit: string; good: number; poor: number }[] = [
    { id: 'largest-contentful-paint', label: 'Largest Contentful Paint (LCP)', unit: 'ms', good: 2500, poor: 4000 },
    { id: 'cumulative-layout-shift', label: 'Cumulative Layout Shift (CLS)', unit: '', good: 0.1, poor: 0.25 },
    { id: 'interaction-to-next-paint', label: 'Interaction to Next Paint (INP)', unit: 'ms', good: 200, poor: 500 },
  ]

  const vitals: CoreWebVital[] = vitalDefs
    .filter(v => audits[v.id])
    .map(v => {
      const audit = audits[v.id]
      const numericValue = (audit.numericValue as number) ?? 0
      return {
        id: v.id,
        label: v.label,
        value: formatVitalValue(v.id, numericValue),
        numericValue,
        unit: v.unit,
        score: Math.round(((audit.score as number) ?? 0) * 100),
        thresholds: { good: v.good, poor: v.poor },
      }
    })

  return { performanceScore: perfScore, vitals, fetchedUrl }
}

// ---------------------------------------------------------------------------
// SERP Preview Tab
// ---------------------------------------------------------------------------

interface SerpData {
  title: string | null
  description: string | null
  url: string | null
  favicon: string | null
}

function extractSerpData(html: string, pageUrl: string): SerpData {
  return {
    title: extractTag(html, 'title'),
    description: extractMetaContent(html, 'description'),
    url: pageUrl.trim() || extractCanonicalUrl(html),
    favicon: extractFavicon(html),
  }
}

function SerpPreviewTab({ html, url }: { html: string; url: string }) {
  const data = useMemo(() => {
    if (!html.trim()) return null
    return extractSerpData(html, url)
  }, [html, url])

  if (!html.trim()) {
    return (
      <div className="py-16 text-center">
        <p className="text-lg font-medium text-muted-foreground mb-2">
          Paste HTML in the On-Page SEO tab first
        </p>
        <p className="text-xs text-muted-foreground/60">
          The SERP preview reads your title, meta description, and URL from the pasted source
        </p>
      </div>
    )
  }

  if (!data) return null

  const displayTitle = data.title || 'No title tag found'
  const displayDesc = data.description || 'No meta description found. Google will auto-generate a snippet from page content, which you cannot control.'
  const displayUrl = data.url || 'https://example.com'
  const domain = extractDomain(displayUrl)

  const titleLen = data.title?.length ?? 0
  const descLen = data.description?.length ?? 0

  const titleStatus: Status = !data.title ? 'fail' : titleLen > 60 ? 'warning' : titleLen < 30 ? 'warning' : 'pass'
  const descStatus: Status = !data.description ? 'fail' : descLen > 160 ? 'warning' : descLen < 120 ? 'warning' : 'pass'

  return (
    <div>
      <p className="text-xs text-muted-foreground tracking-widest uppercase mb-8">
        Google Search Preview
      </p>

      {/* Mock Google result */}
      <div className="border border-border/10 p-6 sm:p-8 mb-10 max-w-xl">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center shrink-0">
            <span className="text-xs font-mono text-muted-foreground">
              {domain.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="min-w-0">
            <p className="text-sm text-foreground truncate">{domain}</p>
            <p className="text-xs text-muted-foreground truncate">{displayUrl}</p>
          </div>
        </div>
        <h3 className="text-xl font-normal leading-snug mb-2" style={{ color: '#1a0dab' }}>
          <span className="dark:text-blue-400">
            {truncate(displayTitle, 60)}
          </span>
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: '#4d5156' }}>
          <span className="dark:text-muted-foreground">
            {truncate(displayDesc, 160)}
          </span>
        </p>
      </div>

      {/* Analysis */}
      <div className="space-y-0">
        <div className="border-t border-border/10 py-6">
          <div className="flex items-start gap-4">
            <span className="text-xs text-muted-foreground tabular-nums pt-1 w-5 shrink-0">01</span>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h4 className="text-sm font-medium text-foreground">Title Tag</h4>
                <StatusBadge status={titleStatus} />
                <span className="text-xs text-muted-foreground ml-auto">
                  {titleLen} / 60 chars
                </span>
              </div>
              {data.title ? (
                <>
                  <p className="text-sm font-light text-muted-foreground leading-relaxed mb-2 break-words">
                    &quot;{data.title}&quot;
                  </p>
                  <div className="w-full bg-muted h-1.5 mt-3">
                    <div
                      className={`h-1.5 transition-all ${
                        titleLen <= 60 ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${Math.min((titleLen / 70) * 100, 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-muted-foreground/50">0</span>
                    <span className="text-xs text-muted-foreground/50">30</span>
                    <span className="text-xs text-emerald-500/60">60</span>
                    <span className="text-xs text-muted-foreground/50">70</span>
                  </div>
                  {titleLen > 60 && (
                    <p className="text-sm font-light text-foreground leading-relaxed mt-3">
                      Your title will be truncated in search results. Shorten it to 60 characters or fewer.
                    </p>
                  )}
                  {titleLen < 30 && (
                    <p className="text-sm font-light text-foreground leading-relaxed mt-3">
                      Your title is very short. Aim for 30-60 characters to use the full space Google provides.
                    </p>
                  )}
                </>
              ) : (
                <p className="text-sm font-light text-foreground leading-relaxed">
                  Add a title tag. Without one, Google will generate its own, which you cannot control.
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-border/10 py-6">
          <div className="flex items-start gap-4">
            <span className="text-xs text-muted-foreground tabular-nums pt-1 w-5 shrink-0">02</span>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h4 className="text-sm font-medium text-foreground">Meta Description</h4>
                <StatusBadge status={descStatus} />
                <span className="text-xs text-muted-foreground ml-auto">
                  {descLen} / 160 chars
                </span>
              </div>
              {data.description ? (
                <>
                  <p className="text-sm font-light text-muted-foreground leading-relaxed mb-2 break-words">
                    &quot;{data.description}&quot;
                  </p>
                  <div className="w-full bg-muted h-1.5 mt-3">
                    <div
                      className={`h-1.5 transition-all ${
                        descLen <= 160 ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${Math.min((descLen / 200) * 100, 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-muted-foreground/50">0</span>
                    <span className="text-xs text-muted-foreground/50">120</span>
                    <span className="text-xs text-emerald-500/60">160</span>
                    <span className="text-xs text-muted-foreground/50">200</span>
                  </div>
                  {descLen > 160 && (
                    <p className="text-sm font-light text-foreground leading-relaxed mt-3">
                      Your description will be truncated. Shorten it to 160 characters and end with a call to action.
                    </p>
                  )}
                  {descLen < 120 && (
                    <p className="text-sm font-light text-foreground leading-relaxed mt-3">
                      Your description is short. Aim for 120-160 characters to maximise the SERP real estate.
                    </p>
                  )}
                </>
              ) : (
                <p className="text-sm font-light text-foreground leading-relaxed">
                  Add a meta description. Without one, Google auto-generates a snippet from your page content, and it rarely converts as well as a hand-written one.
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-b border-border/10 py-6">
          <div className="flex items-start gap-4">
            <span className="text-xs text-muted-foreground tabular-nums pt-1 w-5 shrink-0">03</span>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h4 className="text-sm font-medium text-foreground">Canonical URL</h4>
                <StatusBadge status={data.url ? 'pass' : 'warning'} />
              </div>
              {data.url ? (
                <p className="text-sm font-light text-muted-foreground leading-relaxed break-all">
                  {data.url}
                </p>
              ) : (
                <p className="text-sm font-light text-foreground leading-relaxed">
                  No canonical URL detected. Add a canonical link tag to prevent duplicate content issues.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Social Preview Tab
// ---------------------------------------------------------------------------

interface OgData {
  title: string | null
  description: string | null
  image: string | null
  url: string | null
  siteName: string | null
  type: string | null
}

interface TwitterData {
  card: string | null
  title: string | null
  description: string | null
  image: string | null
  site: string | null
}

interface SocialCheckItem {
  name: string
  status: Status
  value: string | null
  suggestion: string
}

function extractOgData(html: string): OgData {
  return {
    title: extractMetaProperty(html, 'og:title'),
    description: extractMetaProperty(html, 'og:description'),
    image: extractMetaProperty(html, 'og:image'),
    url: extractMetaProperty(html, 'og:url'),
    siteName: extractMetaProperty(html, 'og:site_name'),
    type: extractMetaProperty(html, 'og:type'),
  }
}

function extractTwitterData(html: string): TwitterData {
  return {
    card: extractMetaContent(html, 'twitter:card'),
    title: extractMetaContent(html, 'twitter:title'),
    description: extractMetaContent(html, 'twitter:description'),
    image: extractMetaContent(html, 'twitter:image'),
    site: extractMetaContent(html, 'twitter:site'),
  }
}

function buildSocialChecks(og: OgData, tw: TwitterData): SocialCheckItem[] {
  const checks: SocialCheckItem[] = []

  checks.push({
    name: 'og:title',
    status: og.title ? 'pass' : 'fail',
    value: og.title,
    suggestion: og.title ? 'Set.' : 'Add og:title. Without it, platforms may use the page title or nothing.',
  })
  checks.push({
    name: 'og:description',
    status: og.description ? 'pass' : 'warning',
    value: og.description,
    suggestion: og.description ? 'Set.' : 'Add og:description to control the text shown when shared.',
  })
  checks.push({
    name: 'og:image',
    status: og.image ? 'pass' : 'fail',
    value: og.image,
    suggestion: og.image ? 'Set.' : 'Add og:image (1200x630px recommended). Posts with images get significantly more engagement.',
  })
  checks.push({
    name: 'og:url',
    status: og.url ? 'pass' : 'warning',
    value: og.url,
    suggestion: og.url ? 'Set.' : 'Add og:url to specify the canonical URL for sharing.',
  })
  checks.push({
    name: 'og:type',
    status: og.type ? 'pass' : 'warning',
    value: og.type,
    suggestion: og.type ? 'Set.' : 'Add og:type (e.g. "website", "article") for richer previews.',
  })
  checks.push({
    name: 'og:site_name',
    status: og.siteName ? 'pass' : 'warning',
    value: og.siteName,
    suggestion: og.siteName ? 'Set.' : 'Add og:site_name to show your brand name in share previews.',
  })
  checks.push({
    name: 'twitter:card',
    status: tw.card ? 'pass' : 'warning',
    value: tw.card,
    suggestion: tw.card ? 'Set.' : 'Add twitter:card (use "summary_large_image" for best visibility on X/Twitter).',
  })
  checks.push({
    name: 'twitter:title',
    status: tw.title ? 'pass' : (og.title ? 'pass' : 'warning'),
    value: tw.title || (og.title ? `(falls back to og:title)` : null),
    suggestion: tw.title ? 'Set.' : og.title ? 'Falls back to og:title.' : 'Add twitter:title or og:title.',
  })
  checks.push({
    name: 'twitter:description',
    status: tw.description ? 'pass' : (og.description ? 'pass' : 'warning'),
    value: tw.description || (og.description ? `(falls back to og:description)` : null),
    suggestion: tw.description ? 'Set.' : og.description ? 'Falls back to og:description.' : 'Add twitter:description or og:description.',
  })
  checks.push({
    name: 'twitter:image',
    status: tw.image ? 'pass' : (og.image ? 'pass' : 'fail'),
    value: tw.image || (og.image ? `(falls back to og:image)` : null),
    suggestion: tw.image ? 'Set.' : og.image ? 'Falls back to og:image.' : 'Add twitter:image or og:image for visual share cards.',
  })

  return checks
}

function SocialPreviewTab({ html, url }: { html: string; url: string }) {
  const analysis = useMemo(() => {
    if (!html.trim()) return null
    const og = extractOgData(html)
    const tw = extractTwitterData(html)
    const checks = buildSocialChecks(og, tw)
    return { og, tw, checks }
  }, [html])

  if (!html.trim()) {
    return (
      <div className="py-16 text-center">
        <p className="text-lg font-medium text-muted-foreground mb-2">
          Paste HTML in the On-Page SEO tab first
        </p>
        <p className="text-xs text-muted-foreground/60">
          The social preview reads Open Graph and Twitter Card meta tags from the pasted source
        </p>
      </div>
    )
  }

  if (!analysis) return null

  const { og, tw, checks } = analysis
  const passCount = checks.filter(c => c.status === 'pass').length
  const totalCount = checks.length
  const score = Math.round((passCount / totalCount) * 100)

  const fbTitle = og.title || extractTag(html, 'title') || 'Page Title'
  const fbDesc = og.description || extractMetaContent(html, 'description') || 'No description available'
  const fbDomain = og.url ? extractDomain(og.url) : url ? extractDomain(url) : 'example.com'
  const hasImage = !!(og.image || tw.image)

  const twTitle = tw.title || og.title || extractTag(html, 'title') || 'Page Title'
  const twDesc = tw.description || og.description || extractMetaContent(html, 'description') || 'No description available'
  const twCard = tw.card || 'summary'

  return (
    <div>
      {/* Score summary */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-10 mb-16">
        <ScoreRing score={score} label={score >= 80 ? 'READY' : score >= 50 ? 'PARTIAL' : 'INCOMPLETE'} />
        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-2xl font-medium text-foreground mb-2">
            Social Share Readiness
          </h3>
          <p className="text-xs text-muted-foreground mb-1">
            {passCount} of {totalCount} tags set
          </p>
          <div className="flex items-center gap-4 mt-4 justify-center sm:justify-start">
            <span className="text-xs text-emerald-500">{passCount} set</span>
            <span className="text-xs text-amber-500">{checks.filter(c => c.status === 'warning').length} missing</span>
            <span className="text-xs text-red-500">{checks.filter(c => c.status === 'fail').length} critical</span>
          </div>
        </div>
      </div>

      {/* Facebook / LinkedIn preview */}
      <p className="text-xs text-muted-foreground tracking-widest uppercase mb-6">
        Facebook / LinkedIn Preview
      </p>
      <div className="border border-border/10 max-w-md mb-12 overflow-hidden">
        {hasImage ? (
          <div className="bg-muted h-52 flex items-center justify-center border-b border-border/10">
            <div className="text-center">
              <svg className="w-10 h-10 mx-auto text-muted-foreground/30 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="m21 15-5-5L5 21" />
              </svg>
              <p className="text-xs text-muted-foreground/40">og:image preview</p>
            </div>
          </div>
        ) : (
          <div className="bg-red-500/5 h-32 flex items-center justify-center border-b border-border/10">
            <p className="text-xs text-red-500/60">No og:image set</p>
          </div>
        )}
        <div className="p-4 bg-muted/50">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
            {fbDomain}
          </p>
          <p className="text-base font-medium text-foreground leading-snug mb-1 line-clamp-2">
            {truncate(fbTitle, 65)}
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {truncate(fbDesc, 155)}
          </p>
        </div>
      </div>

      {/* X / Twitter preview */}
      <p className="text-xs text-muted-foreground tracking-widest uppercase mb-6">
        X / Twitter Preview
      </p>
      <div className={`border border-border/10 max-w-md mb-12 overflow-hidden ${twCard === 'summary_large_image' ? '' : 'flex'}`}>
        {twCard === 'summary_large_image' ? (
          <>
            {hasImage ? (
              <div className="bg-muted h-52 flex items-center justify-center border-b border-border/10">
                <div className="text-center">
                  <svg className="w-10 h-10 mx-auto text-muted-foreground/30 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="m21 15-5-5L5 21" />
                  </svg>
                  <p className="text-xs text-muted-foreground/40">twitter:image</p>
                </div>
              </div>
            ) : (
              <div className="bg-red-500/5 h-32 flex items-center justify-center border-b border-border/10">
                <p className="text-xs text-red-500/60">No image set</p>
              </div>
            )}
            <div className="p-4">
              <p className="text-base font-medium text-foreground leading-snug mb-1 line-clamp-1">
                {truncate(twTitle, 70)}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                {truncate(twDesc, 125)}
              </p>
              <p className="text-xs text-muted-foreground/60 mt-2">
                {fbDomain}
              </p>
            </div>
          </>
        ) : (
          <>
            {hasImage ? (
              <div className="bg-muted w-32 shrink-0 flex items-center justify-center border-r border-border/10">
                <svg className="w-8 h-8 text-muted-foreground/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="m21 15-5-5L5 21" />
                </svg>
              </div>
            ) : (
              <div className="bg-red-500/5 w-32 shrink-0 flex items-center justify-center border-r border-border/10">
                <p className="text-xs text-red-500/40">No img</p>
              </div>
            )}
            <div className="p-4 min-w-0">
              <p className="text-xs text-muted-foreground/60 mb-1">{fbDomain}</p>
              <p className="text-sm font-medium text-foreground leading-snug mb-1 line-clamp-1">
                {truncate(twTitle, 70)}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                {truncate(twDesc, 125)}
              </p>
            </div>
          </>
        )}
      </div>

      {/* Tag checklist */}
      <p className="text-xs text-muted-foreground tracking-widest uppercase mb-6">
        Tag Checklist
      </p>
      <div className="space-y-0">
        {checks.map((check, i) => (
          <div key={check.name} className={`border-t border-border/10 py-4 ${i === checks.length - 1 ? 'border-b' : ''}`}>
            <div className="flex items-start gap-4">
              <span className="text-xs text-muted-foreground tabular-nums pt-1 w-5 shrink-0">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-1">
                  <h4 className="text-sm font-medium text-foreground font-mono">{check.name}</h4>
                  <StatusBadge status={check.status} />
                </div>
                {check.value && (
                  <p className="text-sm font-light text-muted-foreground leading-relaxed break-all">
                    {check.value}
                  </p>
                )}
                {check.status !== 'pass' && (
                  <p className="text-sm font-light text-foreground leading-relaxed mt-1">
                    {check.suggestion}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// PageSpeed Tab
// ---------------------------------------------------------------------------

function PageSpeedTab({ url, apiKey }: { url: string; apiKey: string }) {
  const [speedUrl, setSpeedUrl] = useState(url)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<PageSpeedResult | null>(null)
  const [error, setError] = useState('')

  const runTest = useCallback(async () => {
    if (!speedUrl.trim()) return
    setLoading(true)
    setError('')
    setResult(null)

    let testUrl = speedUrl.trim()
    if (!testUrl.startsWith('http')) testUrl = 'https://' + testUrl

    const params = new URLSearchParams({
      url: testUrl,
      strategy: 'mobile',
      category: 'performance',
    })
    if (apiKey.trim()) params.set('key', apiKey.trim())

    try {
      const res = await fetch(
        `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${params.toString()}`
      )
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        const msg = (body as Record<string, Record<string, string>>)?.error?.message || `API returned ${res.status}`
        setError(msg)
        setLoading(false)
        return
      }
      const data = await res.json()
      setResult(parsePageSpeedResponse(data as Record<string, unknown>))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error. Check your connection.')
    } finally {
      setLoading(false)
    }
  }, [speedUrl, apiKey])

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <input
          type="text"
          value={speedUrl}
          onChange={e => setSpeedUrl(e.target.value)}
          placeholder="https://yourwebsite.com"
          className="flex-1 bg-transparent border border-border/15 rounded-card px-4 py-3 font-mono text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-foreground transition-colors duration-200"
        />
        <button
          onClick={runTest}
          disabled={loading || !speedUrl.trim()}
          className="bg-accent text-foreground font-medium text-sm px-8 py-3.5 rounded-pill hover:bg-accent-deep hover:text-white transition-all duration-200 disabled:opacity-30 shrink-0"
        >
          {loading ? 'TESTING...' : 'TEST SPEED'}
        </button>
      </div>

      {loading && <Spinner />}

      {error && (
        <div className="border border-red-500/30 bg-red-500/5 p-6 mt-4">
          <p className="text-xs text-red-500 mb-2">Error</p>
          <p className="text-sm font-light text-foreground">{error}</p>
        </div>
      )}

      {result && !loading && (
        <div className="mt-8">
          {/* Performance score */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-10 mb-16">
            <ScoreRing score={result.performanceScore} label={result.performanceScore >= 80 ? 'FAST' : result.performanceScore >= 50 ? 'MODERATE' : 'SLOW'} />
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-2xl font-medium text-foreground mb-2">
                Performance Score
              </h3>
              <p className="text-xs text-muted-foreground mb-1 break-all">
                {result.fetchedUrl}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Mobile / Lighthouse
              </p>
            </div>
          </div>

          {/* Core Web Vitals */}
          <div className="mb-8">
            <p className="text-xs text-muted-foreground tracking-widest uppercase mb-8">
              Core Web Vitals
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {result.vitals.map(vital => {
                const status = vitalScore(vital.id, vital.numericValue, vital.thresholds.good, vital.thresholds.poor)
                return (
                  <div key={vital.id} className="border border-border/10 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <ScoreRing score={vital.score} size="sm" />
                      <StatusBadge status={status} />
                    </div>
                    <p className="text-2xl font-medium text-foreground tracking-tight mb-1">
                      {vital.value}
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {vital.label}
                    </p>
                    <div className="mt-4 flex items-center gap-3">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="text-xs text-muted-foreground">
                          {vital.id === 'cumulative-layout-shift'
                            ? `< ${vital.thresholds.good}`
                            : `< ${vital.thresholds.good}ms`}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-red-500" />
                        <span className="text-xs text-muted-foreground">
                          {vital.id === 'cumulative-layout-shift'
                            ? `> ${vital.thresholds.poor}`
                            : `> ${vital.thresholds.poor}ms`}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Suggestions based on vitals */}
          <div className="border-t border-border/10 pt-8 mt-8">
            <p className="text-xs text-muted-foreground tracking-widest uppercase mb-6">
              Recommendations
            </p>
            <div className="space-y-4">
              {result.vitals.map(vital => {
                const status = vitalScore(vital.id, vital.numericValue, vital.thresholds.good, vital.thresholds.poor)
                if (status === 'pass') return null
                return (
                  <div key={vital.id} className="flex items-start gap-4 py-3">
                    <StatusBadge status={status} />
                    <div>
                      <p className="text-sm font-medium text-foreground mb-1">
                        {vital.id === 'largest-contentful-paint' && 'Improve Largest Contentful Paint'}
                        {vital.id === 'cumulative-layout-shift' && 'Reduce Layout Shift'}
                        {vital.id === 'interaction-to-next-paint' && 'Improve Interaction Responsiveness'}
                      </p>
                      <p className="text-sm font-light text-muted-foreground leading-relaxed">
                        {vital.id === 'largest-contentful-paint' &&
                          'Optimise your largest above-the-fold image or text block. Compress images, use modern formats (WebP/AVIF), preload critical assets, and reduce server response time.'}
                        {vital.id === 'cumulative-layout-shift' &&
                          'Set explicit width and height on images and embeds. Avoid inserting content above existing content after page load. Use CSS containment where possible.'}
                        {vital.id === 'interaction-to-next-paint' &&
                          'Reduce JavaScript execution time. Break up long tasks, defer non-critical scripts, and minimise main-thread blocking work.'}
                      </p>
                    </div>
                  </div>
                )
              })}
              {result.vitals.every(v => vitalScore(v.id, v.numericValue, v.thresholds.good, v.thresholds.poor) === 'pass') && (
                <p className="text-sm font-light text-emerald-500">All Core Web Vitals pass. Nice work.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {!result && !loading && !error && (
        <div className="py-16 text-center">
          <p className="text-lg font-medium text-muted-foreground mb-2">Enter a URL and test</p>
          <p className="text-xs text-muted-foreground/60">
            Uses Google PageSpeed Insights API to measure real performance data
          </p>
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main exported component
// ---------------------------------------------------------------------------

export function SeoAnalyzer() {
  const [tab, setTab] = useState<Tab>('seo')
  const [html, setHtml] = useState('')
  const [keyword, setKeyword] = useState('')
  const [url, setUrl] = useState('')
  const [apiKey, setApiKey] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const results = useMemo(() => {
    if (!submitted || !html.trim() || !keyword.trim()) return null
    return analyzeHtml(html, keyword)
  }, [submitted, html, keyword])

  const score = useMemo(() => {
    if (!results) return 0
    const earned = results.reduce((s, r) => s + r.points, 0)
    const max = results.reduce((s, r) => s + r.maxPoints, 0)
    return max > 0 ? Math.round((earned / max) * 100) : 0
  }, [results])

  const passCount = results?.filter(r => r.status === 'pass').length ?? 0
  const warnCount = results?.filter(r => r.status === 'warning').length ?? 0
  const failCount = results?.filter(r => r.status === 'fail').length ?? 0

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  function handleReset() {
    setSubmitted(false)
    setHtml('')
    setKeyword('')
    setUrl('')
  }

  return (
    <div>
      {/* Tabs */}
      <div className="flex items-center gap-1 p-1 border border-border/10 rounded-card mb-10 bg-panel/30">
        <button
          onClick={() => setTab('seo')}
          className={`text-sm font-medium px-4 sm:px-5 py-2.5 rounded-pill transition-all duration-200 ${
            tab === 'seo'
              ? 'bg-accent/15 text-accent-deep'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          SEO
        </button>
        <button
          onClick={() => setTab('serp')}
          className={`text-sm font-medium px-4 sm:px-5 py-2.5 rounded-pill transition-all duration-200 ${
            tab === 'serp'
              ? 'bg-accent/15 text-accent-deep'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          SERP
        </button>
        <button
          onClick={() => setTab('social')}
          className={`text-sm font-medium px-4 sm:px-5 py-2.5 rounded-pill transition-all duration-200 ${
            tab === 'social'
              ? 'bg-accent/15 text-accent-deep'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          SOCIAL
        </button>
        <button
          onClick={() => setTab('speed')}
          className={`text-sm font-medium px-4 sm:px-5 py-2.5 rounded-pill transition-all duration-200 ${
            tab === 'speed'
              ? 'bg-accent/15 text-accent-deep'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          SPEED
        </button>
      </div>

      {/* API key (only shown on speed tab) */}
      {tab === 'speed' && (
        <div className="mb-8">
          <label htmlFor="api-key" className="block text-xs text-muted-foreground mb-2">
            Google API Key <span className="text-muted-foreground/50">(optional, increases rate limits)</span>
          </label>
          <input
            id="api-key"
            type="text"
            value={apiKey}
            onChange={e => setApiKey(e.target.value)}
            placeholder="AIza..."
            className="w-full sm:w-80 bg-transparent border border-border/10 px-4 py-2.5 text-xs text-foreground placeholder-muted-foreground focus:outline-none focus:border-foreground transition-colors duration-200"
          />
        </div>
      )}

      {/* SEO Tab */}
      {tab === 'seo' && (
        <>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="seo-keyword" className="block text-xs text-muted-foreground mb-2">
                  Target Keyword
                </label>
                <input
                  id="seo-keyword"
                  type="text"
                  value={keyword}
                  onChange={e => { setKeyword(e.target.value); setSubmitted(false) }}
                  required
                  placeholder="e.g. B2B coffee machines Suffolk"
                  className="w-full bg-transparent border border-border/15 rounded-card px-4 py-3 font-mono text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-foreground transition-colors duration-200"
                />
              </div>
              <div>
                <label htmlFor="seo-url" className="block text-xs text-muted-foreground mb-2">
                  Page URL <span className="text-muted-foreground/50">(optional, for report label)</span>
                </label>
                <input
                  id="seo-url"
                  type="text"
                  value={url}
                  onChange={e => setUrl(e.target.value)}
                  placeholder="https://yourwebsite.com/page"
                  className="w-full bg-transparent border border-border/15 rounded-card px-4 py-3 font-mono text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-foreground transition-colors duration-200"
                />
              </div>
            </div>

            <div>
              <label htmlFor="seo-html" className="block text-xs text-muted-foreground mb-2">
                Page HTML Source
              </label>
              <p className="text-xs text-muted-foreground/60 mb-3">
                Right-click your page &rarr; View Page Source &rarr; Select All &rarr; Copy &rarr; Paste below
              </p>
              <textarea
                id="seo-html"
                value={html}
                onChange={e => { setHtml(e.target.value); setSubmitted(false) }}
                required
                rows={8}
                placeholder="Paste your page's HTML source code here..."
                className="w-full bg-transparent border border-border/15 rounded-card px-4 py-3 text-xs text-foreground placeholder-muted-foreground focus:outline-none focus:border-foreground transition-colors duration-200 resize-y leading-relaxed"
              />
            </div>

            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={!html.trim() || !keyword.trim()}
                className="bg-accent text-foreground font-medium text-sm px-8 py-3.5 rounded-pill hover:bg-accent-deep hover:text-white transition-all duration-200 disabled:opacity-30"
              >
                ANALYSE
              </button>
              {submitted && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  Reset
                </button>
              )}
            </div>
          </form>

          {results && (
            <div className="mt-16 border-t border-border/10 pt-16">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-10 mb-16">
                <ScoreRing score={score} label={score >= 80 ? 'HEALTHY' : score >= 50 ? 'NEEDS WORK' : 'CRITICAL'} />
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-2xl font-medium text-foreground mb-2">
                    SEO Health Score
                  </h3>
                  {url && (
                    <p className="text-xs text-muted-foreground mb-4 break-all">{url}</p>
                  )}
                  <p className="text-xs text-muted-foreground mb-1">
                    Keyword: <span className="text-foreground">&quot;{keyword}&quot;</span>
                  </p>
                  <div className="flex items-center gap-4 mt-4 justify-center sm:justify-start">
                    <span className="text-xs text-emerald-500">{passCount} passed</span>
                    <span className="text-xs text-amber-500">{warnCount} warnings</span>
                    <span className="text-xs text-red-500">{failCount} failed</span>
                  </div>
                </div>
              </div>

              <div className="space-y-0">
                {results.map((r, i) => (
                  <div key={r.name} className="border-t border-border/10 py-6 last:border-b">
                    <div className="flex items-start gap-4">
                      <span className="text-xs text-muted-foreground tabular-nums pt-1 w-5 shrink-0">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <h4 className="text-sm font-medium text-foreground">{r.name}</h4>
                          <StatusBadge status={r.status} />
                          <span className="text-xs text-muted-foreground ml-auto">
                            {r.points}/{r.maxPoints}
                          </span>
                        </div>
                        <p className="text-sm font-light text-muted-foreground leading-relaxed mb-2 break-words">
                          {r.detail}
                        </p>
                        <p className="text-sm font-light text-foreground leading-relaxed">
                          {r.suggestion}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-16 bg-gradient-to-br from-pink-500/5 to-emerald-500/5 border border-border/10 p-10">
                <p className="text-xs text-muted-foreground tracking-widest uppercase mb-4">
                  Want the full picture?
                </p>
                <p className="text-lg font-medium text-foreground leading-relaxed mb-6 max-w-lg">
                  This free tool covers the basics. A full Growth Audit analyses your entire site,
                  your competitors, and builds you a prioritised action plan.
                </p>
                <p className="text-xs text-muted-foreground mb-6">
                  See the packages below to go deeper.
                </p>
              </div>
            </div>
          )}
        </>
      )}

      {/* SERP Tab */}
      {tab === 'serp' && <SerpPreviewTab html={html} url={url} />}

      {/* Social Tab */}
      {tab === 'social' && <SocialPreviewTab html={html} url={url} />}

      {/* Speed Tab */}
      {tab === 'speed' && <PageSpeedTab url={url} apiKey={apiKey} />}
    </div>
  )
}
