'use client'

import { useState, useMemo } from 'react'

type Status = 'pass' | 'warning' | 'fail'

interface CheckResult {
  name: string
  status: Status
  detail: string
  suggestion: string
  points: number
  maxPoints: number
}

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

function analyzeHtml(html: string, keyword: string): CheckResult[] {
  const results: CheckResult[] = []
  const kw = keyword.trim()

  // 1. Title tag
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

  // 2. Meta description
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

  // 3. H1 tag
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

  // 4. H2 tags
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

  // 5. Keyword density
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
      status = 'fail'
      pts = 0
      issues.push('keyword not found in body content')
    } else if (density < 0.5) {
      status = 'warning'
      pts = 5
      issues.push(`density is low (${density.toFixed(2)}%). Aim for 1-2%`)
    } else if (density > 3) {
      status = 'warning'
      pts = 5
      issues.push(`density is high (${density.toFixed(2)}%). This may look like keyword stuffing`)
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

  // 6. Image alt text
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

  // 7. Internal links
  const links = extractLinks(html)
  {
    let pts = 0
    let status: Status = 'pass'
    const issues: string[] = []

    if (links.internal === 0) {
      status = 'warning'
      pts = 0
      issues.push('no internal links found')
    } else if (links.internal < 3) {
      pts = 5
      status = 'warning'
      issues.push(`only ${links.internal} internal link${links.internal !== 1 ? 's' : ''} found`)
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

  // 8. Content length
  {
    let pts = 0
    let status: Status = 'pass'
    const issues: string[] = []

    if (wordCount < 300) {
      status = 'fail'
      pts = 0
      issues.push('very thin content')
    } else if (wordCount < 800) {
      status = 'warning'
      pts = 3
      issues.push('content may be too short for competitive ranking')
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

function StatusBadge({ status }: { status: Status }) {
  const config = {
    pass: { label: 'PASS', bg: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' },
    warning: { label: 'WARN', bg: 'bg-amber-500/15 text-amber-600 dark:text-amber-400' },
    fail: { label: 'FAIL', bg: 'bg-red-500/15 text-red-600 dark:text-red-400' },
  }
  const c = config[status]
  return (
    <span className={`font-mono text-xs tracking-wider px-2.5 py-1 ${c.bg}`}>
      {c.label}
    </span>
  )
}

function ScoreRing({ score }: { score: number }) {
  const radius = 54
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference
  const color =
    score >= 80 ? 'stroke-emerald-500' : score >= 50 ? 'stroke-amber-500' : 'stroke-red-500'
  const textColor =
    score >= 80
      ? 'text-emerald-500'
      : score >= 50
      ? 'text-amber-500'
      : 'text-red-500'

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-36 h-36">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            strokeWidth="6"
            className="stroke-border"
          />
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className={`${color} transition-all duration-700`}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-4xl font-extralight ${textColor}`}>{score}</span>
        </div>
      </div>
      <p className="font-mono text-xs text-muted-foreground tracking-widest">
        {score >= 80 ? 'HEALTHY' : score >= 50 ? 'NEEDS WORK' : 'CRITICAL'}
      </p>
    </div>
  )
}

export function SeoAnalyzer() {
  const [html, setHtml] = useState('')
  const [keyword, setKeyword] = useState('')
  const [url, setUrl] = useState('')
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
      {/* Input form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="seo-keyword" className="block font-mono text-xs text-muted-foreground mb-2">
              Target Keyword
            </label>
            <input
              id="seo-keyword"
              type="text"
              value={keyword}
              onChange={e => { setKeyword(e.target.value); setSubmitted(false) }}
              required
              placeholder="e.g. B2B coffee machines Suffolk"
              className="w-full bg-transparent border border-border px-4 py-3 font-mono text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-foreground transition-colors duration-200"
            />
          </div>
          <div>
            <label htmlFor="seo-url" className="block font-mono text-xs text-muted-foreground mb-2">
              Page URL <span className="text-muted-foreground/50">(optional, for report label)</span>
            </label>
            <input
              id="seo-url"
              type="text"
              value={url}
              onChange={e => setUrl(e.target.value)}
              placeholder="https://yourwebsite.com/page"
              className="w-full bg-transparent border border-border px-4 py-3 font-mono text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-foreground transition-colors duration-200"
            />
          </div>
        </div>

        <div>
          <label htmlFor="seo-html" className="block font-mono text-xs text-muted-foreground mb-2">
            Page HTML Source
          </label>
          <p className="font-mono text-xs text-muted-foreground/60 mb-3">
            Right-click your page &rarr; View Page Source &rarr; Select All &rarr; Copy &rarr; Paste below
          </p>
          <textarea
            id="seo-html"
            value={html}
            onChange={e => { setHtml(e.target.value); setSubmitted(false) }}
            required
            rows={8}
            placeholder="Paste your page's HTML source code here..."
            className="w-full bg-transparent border border-border px-4 py-3 font-mono text-xs text-foreground placeholder-muted-foreground focus:outline-none focus:border-foreground transition-colors duration-200 resize-y leading-relaxed"
          />
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={!html.trim() || !keyword.trim()}
            className="bg-gradient-to-r from-pink-500 to-emerald-500 text-white font-mono text-xs tracking-widest px-8 py-3.5 hover:opacity-90 transition-opacity duration-200 disabled:opacity-30"
          >
            ANALYSE
          </button>
          {submitted && (
            <button
              type="button"
              onClick={handleReset}
              className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Reset
            </button>
          )}
        </div>
      </form>

      {/* Results */}
      {results && (
        <div className="mt-16 border-t border-border pt-16">
          {/* Score header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-10 mb-16">
            <ScoreRing score={score} />
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-2xl font-extralight text-foreground mb-2">
                SEO Health Score
              </h3>
              {url && (
                <p className="font-mono text-xs text-muted-foreground mb-4 break-all">{url}</p>
              )}
              <p className="font-mono text-xs text-muted-foreground mb-1">
                Keyword: <span className="text-foreground">&quot;{keyword}&quot;</span>
              </p>
              <div className="flex items-center gap-4 mt-4 justify-center sm:justify-start">
                <span className="font-mono text-xs text-emerald-500">{passCount} passed</span>
                <span className="font-mono text-xs text-amber-500">{warnCount} warnings</span>
                <span className="font-mono text-xs text-red-500">{failCount} failed</span>
              </div>
            </div>
          </div>

          {/* Checklist */}
          <div className="space-y-0">
            {results.map((r, i) => (
              <div
                key={r.name}
                className="border-t border-border py-6 last:border-b"
              >
                <div className="flex items-start gap-4">
                  <span className="font-mono text-xs text-muted-foreground tabular-nums pt-1 w-5 shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h4 className="text-sm font-medium text-foreground">{r.name}</h4>
                      <StatusBadge status={r.status} />
                      <span className="font-mono text-xs text-muted-foreground ml-auto">
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

          {/* Upsell */}
          <div className="mt-16 bg-gradient-to-br from-pink-500/5 to-emerald-500/5 border border-border p-10">
            <p className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-4">
              Want the full picture?
            </p>
            <p className="text-lg font-extralight text-foreground leading-relaxed mb-6 max-w-lg">
              This free tool covers the basics. A full Growth Audit analyses your entire site,
              your competitors, and builds you a prioritised action plan.
            </p>
            <p className="font-mono text-xs text-muted-foreground mb-6">
              See the packages below to go deeper.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
