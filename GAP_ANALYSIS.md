# Gap Analysis: Site Restructuring

## What Exists

### Routes
| Route | Status | Notes |
|---|---|---|
| `/` (homepage) | EXISTS | Needs hero rewrite, lifecycle diagram, stats strip with source labels, 4 service cards, promote free-review |
| `/portfolio` | EXISTS | Rename to `/work` |
| `/portfolio/[slug]` | EXISTS | Move to `/work/[slug]` |
| `/blog` | EXISTS | Rename to `/writing` |
| `/blog/[slug]` | EXISTS | Move to `/writing/[slug]` |
| `/cv` | EXISTS | Keep as-is (route unchanged) |
| `/contact` | EXISTS | Keep as-is |
| `/review` | EXISTS | Keep as-is |
| `/services/[slug]` | MISSING | New pillar pages needed |

### SEO Infrastructure
| Item | Status | Notes |
|---|---|---|
| `metadataBase` | MISSING | Not set in root layout |
| `lang="en-GB"` | MISSING | Currently `lang="en"` |
| `app/sitemap.ts` | MISSING | No sitemap |
| `app/robots.ts` | MISSING | No robots.txt |
| `lib/schema.ts` | MISSING | No typed JSON-LD helpers |
| `generateMetadata` (blog) | EXISTS | Blog [slug] has it, but missing dateModified |
| `generateMetadata` (portfolio) | EXISTS | Portfolio [slug] has it, basic |
| Inline JSON-LD | PARTIAL | Blog [slug] has Article JSON-LD inline, not via shared helper |
| Breadcrumb component | MISSING | No breadcrumbs |
| JSON-LD types needed | MISSING | Person, ProfessionalService, Article, BreadcrumbList, FAQPage |

### Content Architecture
| Item | Status | Notes |
|---|---|---|
| `lib/blog.ts` | EXISTS | 3 categories, needs 4 pillars, no `dateModified`, no `relatedSlugs`, no `pillar` field |
| `lib/projects.ts` | EXISTS | 5 projects with `deliveryTag`, needs alignment with `/work` |
| `lib/cv-data.ts` | EXISTS | `impactMetrics` lack source labels (spec requires visible attribution) |
| MDX | NONE | No MDX files; all content is .ts data modules (acceptable per spec) |
| Pillar taxonomy | MISSING | Need 4 pillars: Digital Transformation, Revenue Platforms, Conversion & Growth, Marketing Operations |

### Components
| Component | Status | Notes |
|---|---|---|
| `Navigation.tsx` | EXISTS | Links point to `/portfolio` and `/blog` — need updating |
| `PageTransition.tsx` | EXISTS | Route labels reference old paths — need updating |
| `Footer.tsx` | EXISTS | No NAP block (address/phone for local SEO), no structured location |
| `SectionLabel.tsx` | EXISTS | Reusable, no changes needed |
| `StickyCTA.tsx` | EXISTS | Mobile-only, links to /contact |
| `ThemeToggle.tsx` | EXISTS | Working |
| `SeoAnalyzer.tsx` | EXISTS | Large client component (~1540 lines), working |
| `GrowthBenchmark.tsx` | EXISTS | Working |
| `ContactForm.tsx` | EXISTS | Working |
| LifecycleDiagram | MISSING | Spec requires inline SVG service lifecycle diagram |
| Breadcrumb | MISSING | Spec requires breadcrumb component with JSON-LD |

### Performance
| Item | Status | Notes |
|---|---|---|
| `next/image` | USED | Homepage headshot uses it; no explicit `sizes` prop |
| `next/font` | USED | Inter + JetBrains Mono, self-hosted via google |
| Client components | MODERATE | SeoAnalyzer, GrowthBenchmark, ContactForm, Navigation, StickyCTA, ThemeToggle, PageTransition |
| Image formats | CONFIGURED | `next.config.ts` has `formats: ['image/avif', 'image/webp']` |

### Bugs (reported)
1. **Duplicated form fields on review page** — NOT CONFIRMED. Reviewed `review/page.tsx`: it renders SeoAnalyzer, GrowthBenchmark, and Pricing cards. No duplicate form. Possible confusion with SeoAnalyzer's form fields appearing above and the "Want the full picture?" CTA below results.
2. **Stray icon in contact form Name input** — NOT CONFIRMED. `ContactForm.tsx` has plain `<input>` elements with no icon markup. May be browser autofill icon or extension artifact.

## What Needs Building (Implementation Order)

### Phase 1: SEO/Metadata Infrastructure
- [x] Audit complete
- [ ] Set `lang="en-GB"` in layout.tsx
- [ ] Add `metadataBase` to root layout
- [ ] Create `lib/schema.ts` with typed JSON-LD builders (Person, ProfessionalService, Article, BreadcrumbList, FAQPage)
- [ ] Create `app/sitemap.ts`
- [ ] Create `app/robots.ts`
- [ ] Create `Breadcrumb.tsx` component
- [ ] Add Person + ProfessionalService JSON-LD to homepage
- [ ] Add FAQ JSON-LD to blog posts
- [ ] Update blog [slug] Article JSON-LD to use shared helper

### Phase 2: Route Restructuring & Page Templates
- [ ] Create `/work` route (move from `/portfolio`)
- [ ] Create `/work/[slug]` route (move from `/portfolio/[slug]`)
- [ ] Create `/writing` route (move from `/blog`)
- [ ] Create `/writing/[slug]` route (move from `/blog/[slug]`)
- [ ] Set up redirects from old routes
- [ ] Create `/services/[slug]` pillar pages
- [ ] Update Navigation.tsx hrefs
- [ ] Update PageTransition.tsx route labels and isInternalRoute
- [ ] Update all internal links across the site
- [ ] Add breadcrumbs to all pages

### Phase 3: Homepage Changes
- [ ] Outcome-led hero with Suffolk mention
- [ ] Service lifecycle diagram (LifecycleDiagram.tsx)
- [ ] Stats strip with source labels (e.g. "Delivered in-house at Liquidline")
- [ ] 4 service cards defining pillar taxonomy
- [ ] Promote free-review tool
- [ ] Update hero CTA

### Phase 4: Content Architecture
- [ ] Update BlogPost interface: add `pillar` union type, `dateModified`, `relatedSlugs`
- [ ] Map existing categories to 4 pillars
- [ ] Add source labels to impactMetrics
- [ ] Seed content for service pillar pages
- [ ] Footer NAP block for local SEO

### Phase 5: Final
- [ ] Verify `next build` passes
- [ ] Write SUMMARY.md
