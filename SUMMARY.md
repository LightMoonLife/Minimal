# Growth Architect Portfolio — Change Summary

## What changed

### 1. SEO & Metadata Infrastructure
- Added `metadataBase` to root layout (`https://jackpbrookes.com`)
- Set `lang="en-GB"` on html element
- Created `src/lib/schema.tsx` — typed JSON-LD helpers: `personJsonLd`, `professionalServiceJsonLd`, `articleJsonLd`, `faqPageJsonLd`, `breadcrumbJsonLd`, `caseStudyJsonLd`
- Created `src/app/sitemap.ts` — all routes including services, writing, work
- Created `src/app/robots.ts` — standard allow-all with sitemap reference
- Added Suffolk/Ipswich to default title and structured data

### 2. Route Restructuring
- **`/blog` → `/writing`**: New page at `src/app/writing/page.tsx` and `src/app/writing/[slug]/page.tsx`
- **`/portfolio` → `/work`**: New page at `src/app/work/page.tsx` and `src/app/work/[slug]/page.tsx`
- **`/services/[slug]`**: New pillar pages with 4 service pillars (Digital Transformation, Revenue Platforms, Conversion & Growth, Marketing Operations)
- 301 redirects in `next.config.ts` for old routes
- Old `/blog` and `/portfolio` route files removed
- All internal links updated across Navigation, PageTransition, homepage, Footer

### 3. Content Architecture
- Created `src/lib/pillars.ts` — 4 pillar page definitions with slug, headline, description, sections, deliverables
- Added `Pillar` type to `BlogPost` interface in `src/lib/blog.ts`
- Added `pillar` field to all 5 blog posts
- Added `dateModified` and `relatedSlugs` to `BlogPost` interface
- Added `slug` field to `Service` interface in `src/lib/cv-data.ts`
- Added `source` field to `ImpactMetric` interface with delivery attribution labels

### 4. Homepage Overhaul
- Outcome-led hero: "Turn your B2B operations into a revenue system"
- Suffolk mentioned naturally in subheading
- Primary CTA links to `/review` (free growth review tool)
- Stats strip now shows source labels ("Delivered in-house at Liquidline" / "Delivered in-house at Tchibo")
- Service cards are now clickable links to `/services/[slug]` pillar pages
- Added lifecycle diagram component (`src/components/LifecycleDiagram.tsx`) — interactive inline SVG with 5 stages (Audit → Strategy → Build → Optimise → Iterate) and hover/click descriptions
- Added dedicated free review tool CTA section
- Reordered sections: Services → Work → How I Work → Testimonial → Writing → Free Review Tool → Final CTA

### 5. Components
- Created `src/components/Breadcrumb.tsx` — with BreadcrumbList JSON-LD
- Created `src/components/LifecycleDiagram.tsx` — interactive SVG lifecycle diagram
- Updated `src/components/Footer.tsx` — NAP block (Ipswich, Suffolk, UK), footer navigation links, structured `<address>` element
- Updated `src/components/Navigation.tsx` — new route paths
- Updated `src/components/PageTransition.tsx` — new route labels and paths

## Placeholders

No `{{PLACEHOLDER}}` tokens were needed — all stats and testimonials use real data from existing content, with source labels attributing each metric to its employer context.

## Launch checklist

- [ ] Verify `headshot.webp` is present in `/public`
- [ ] Update `SITE_URL` in `src/lib/schema.tsx` if domain changes
- [ ] Add real phone number to Footer NAP block when ready
- [ ] Verify 301 redirects work in production (old `/blog` and `/portfolio` URLs)
- [ ] Test Open Graph metadata with social sharing debugger
- [ ] Submit updated sitemap to Google Search Console
- [ ] Verify JSON-LD structured data with Google Rich Results Test
- [ ] Review all pillar page content for accuracy and completeness
- [ ] Consider adding `dateModified` values to existing blog posts
