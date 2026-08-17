export interface ApproachPhase {
  number: string
  title: string
  description: string
}

export interface ResultMetric {
  value: string
  label: string
  context?: string
}

export interface Project {
  slug: string
  title: string
  tagline: string
  client: string
  year: string
  services: string[]
  heroMetric: ResultMetric
  overview: string
  challenge: string
  approach: ApproachPhase[]
  results: ResultMetric[]
  learnings: string[]
}

export const projects: Project[] = [
  {
    slug: 'b2b-commerce-platform',
    title: 'B2B Commerce Platform',
    tagline: 'Engineering a self-service portal that moved 67% of customers to online ordering in 18 months.',
    client: 'Liquidline — 8-figure B2B supplier',
    year: '2023',
    services: ['Platform Engineering', 'Laravel 10', 'Tailwind CSS', 'UX Design'],
    heroMetric: { value: '67%', label: 'Customers ordering online', context: 'From 0% in 18 months' },
    overview:
      'Liquidline is a major UK B2B coffee equipment supplier. Their customers — offices, hotels, restaurants — were placing all orders by phone and email. No self-service, no order history, no reordering. The business needed a digital commerce layer that matched the complexity of B2B ordering (account pricing, multi-site delivery, consumable subscriptions) without the friction of enterprise portals.',
    challenge:
      'B2B ordering is fundamentally different from B2C. Customers have negotiated pricing, multiple delivery addresses, standing orders, and account managers. Off-the-shelf e-commerce platforms couldn\'t handle this complexity without heavy customisation. The portal needed to feel as simple as a consumer checkout while supporting the full weight of B2B operations — and it needed to drive adoption without forcing customers off their existing ordering habits.',
    approach: [
      {
        number: '01',
        title: 'Commercial mapping',
        description:
          'Mapped the existing order flow end-to-end: phone calls, emails, spreadsheets, manual ERP entry. Quantified the cost per order across channels and identified the highest-volume, lowest-complexity order types as the adoption wedge — consumables reordering.',
      },
      {
        number: '02',
        title: 'Platform architecture',
        description:
          'Built on Laravel 10 with Tailwind CSS. Integrated with the existing ERP for real-time pricing, stock, and order status. Designed the data model to support account-level pricing, multi-site delivery, and order history from day one.',
      },
      {
        number: '03',
        title: 'UX for adoption',
        description:
          'Designed the portal experience around the reorder flow — not product browsing. Customers see their previous orders first, can reorder in two clicks, and only encounter the full catalogue when they choose to. This reduced the barrier from "learn a new system" to "click reorder".',
      },
      {
        number: '04',
        title: 'Phased rollout',
        description:
          'Launched to the top 50 accounts first with account manager support. Used early adoption data to refine the experience before opening to all customers. Account managers were trained as portal advocates, not competitors.',
      },
    ],
    results: [
      { value: '67%', label: 'Online ordering adoption', context: '0→67% of customers in 18 months' },
      { value: '+23%', label: 'Online orders', context: 'Year-on-year increase' },
      { value: '+17%', label: 'Consumables revenue', context: 'Driven by reorder ease' },
      { value: '2 clicks', label: 'Reorder flow', context: 'From login to order placed' },
    ],
    learnings: [
      'The reorder-first UX was the single biggest driver of adoption. Customers don\'t want to browse a catalogue — they want to repeat what they already buy. Designing around this insight made the portal feel useful from the first login.',
      'Account manager buy-in was as important as customer UX. When account managers saw the portal as a tool that freed them from order-taking (not a threat to their role), they became the primary adoption channel.',
      'B2B portals that try to replicate B2C shopping experiences fail. The mental model is completely different — it\'s procurement, not shopping. The interface needs to respect that.',
    ],
  },
  {
    slug: 'digital-revenue-engine',
    title: 'Digital Revenue Engine',
    tagline: 'Scaling digital revenue from £600K to £2.2M — on less than 2% of company budget.',
    client: 'Liquidline — B2B coffee equipment',
    year: '2018–2023',
    services: ['Growth Strategy', 'Team Building', 'Digital Marketing', 'E-commerce'],
    heroMetric: { value: '£2.2M', label: 'Digital revenue', context: 'Scaled from £600K on <2% budget' },
    overview:
      'When I joined Liquidline as their first digital hire, the company was generating £600K in digital revenue with no marketing team, no strategy, and no systems. Over four years as Head of Marketing, I built the team from 1 to 10, established every digital channel, and scaled revenue to £2.2M — all on less than 2% of company revenue as budget.',
    challenge:
      'Building a digital revenue function from nothing inside a traditional B2B business. The company had no marketing team, no CRM, no analytics, no content, and no digital acquisition channels. Every system, process, and hire needed to be built from scratch — and justify its existence with revenue, not vanity metrics.',
    approach: [
      {
        number: '01',
        title: 'Foundation',
        description:
          'Built the measurement layer first — analytics, attribution, reporting. You can\'t scale what you can\'t measure. Established baseline metrics across every channel before investing in growth.',
      },
      {
        number: '02',
        title: 'Channel development',
        description:
          'Systematically built each channel: SEO (dominated #1 ranking for top industry terms), PPC (managed budget with clear ROAS targets), social (engagement from 1.2%→7%), email (automated nurture sequences via HubSpot).',
      },
      {
        number: '03',
        title: 'Team scaling',
        description:
          'Hired and developed a team of 10 across content, design, digital marketing, and web development. Built the highest-performing team in the company — engagement score 7.2→9.6.',
      },
      {
        number: '04',
        title: 'Commercial alignment',
        description:
          'Every marketing activity was tied to a revenue number. Weekly reporting to the board on pipeline, conversion, and revenue attribution. Marketing became the most commercially accountable function in the business.',
      },
    ],
    results: [
      { value: '£2.2M', label: 'Digital revenue', context: 'From £600K — 3.7× growth' },
      { value: '1→10', label: 'Team scaled', context: 'Highest engagement score in company' },
      { value: '7%', label: 'Market share captured', context: 'Design & Build sector in 2 years' },
      { value: '+2,300%', label: 'Traffic growth', context: 'Social engagement 1.2%→7%' },
    ],
    learnings: [
      'In a traditional B2B business, the fastest way to earn budget is to tie every activity to a revenue number from day one. Vanity metrics (impressions, followers, traffic) build zero credibility with a board that thinks in margin and pipeline.',
      'Team engagement directly correlates with output quality. Investing in people — clear development paths, autonomy, purpose — produced better work than any process or tool change.',
      'The COVID pivot to B2C e-commerce (hubcoffee.co.uk, launched in 8 weeks) proved that a well-built team can execute at speed when the commercial opportunity is clear.',
    ],
  },
  {
    slug: 'conversion-architecture',
    title: 'Conversion Architecture',
    tagline: 'A CRO programme that turned one landing page into £300K revenue in six months.',
    client: 'Liquidline — B2B equipment',
    year: '2018',
    services: ['CRO', 'SEO', 'Landing Page Optimisation', 'A/B Testing'],
    heroMetric: { value: '+£90K', label: 'Monthly revenue increase', context: 'Conversion 1.72%→4.29%' },
    overview:
      'Liquidline\'s website was generating traffic but not converting. The site had decent visibility but conversion rates sat at 1.72% — well below what the traffic quality justified. I built a systematic CRO programme that identified the highest-leverage pages, tested relentlessly, and turned the existing traffic into a revenue machine.',
    challenge:
      'The traffic was there but the conversion infrastructure wasn\'t. Landing pages were generic, forms were buried, trust signals were missing, and the user journey from search to enquiry had too many steps. The challenge was to maximise revenue from existing traffic — no additional ad spend, no new channels — just better conversion of what was already coming.',
    approach: [
      {
        number: '01',
        title: 'Traffic & intent analysis',
        description:
          'Mapped every high-traffic page against search intent and conversion rate. Identified the top industry keyword where Liquidline could dominate — and the landing page that would capture that intent.',
      },
      {
        number: '02',
        title: 'SEO dominance',
        description:
          'Secured #1 ranking for the industry\'s highest-volume keyword. Traffic to the target page grew from 720 to 13,320/month. But traffic without conversion is a vanity metric — the real work was what happened after the click.',
      },
      {
        number: '03',
        title: 'Landing page engineering',
        description:
          'Rebuilt the landing page with a conversion-first architecture: clear value proposition above the fold, social proof at decision points, progressive form disclosure, and multiple CTA placements matched to scroll depth.',
      },
      {
        number: '04',
        title: 'Continuous testing',
        description:
          'Ran a systematic A/B testing programme across headlines, form length, CTA copy, trust signals, and page layout. Every test was statistically significant before implementation. The compound effect of marginal gains drove conversion from 1.24% to 4.21%.',
      },
    ],
    results: [
      { value: '+£90K', label: 'Monthly revenue', context: 'Attributed to CRO programme' },
      { value: '4.29%', label: 'Conversion rate', context: 'From 1.72% — 2.5× improvement' },
      { value: '#1', label: 'Search ranking', context: 'Top industry keyword' },
      { value: '30+', label: 'Customers/month', context: 'From one page — £300K in 6 months' },
    ],
    learnings: [
      'One page, optimised properly, can be worth more than an entire marketing channel. The £300K generated from a single landing page in 6 months (working 1 day/week) outperformed campaigns with 10× the budget.',
      'SEO and CRO are not separate disciplines — they\'re two halves of the same revenue system. Ranking #1 is worthless if the page doesn\'t convert; a perfect landing page is invisible without traffic.',
      'Progressive form disclosure (showing fields in stages rather than all at once) was the single highest-impact test. It reduced perceived effort without reducing data quality.',
    ],
  },
  {
    slug: 'revenue-channel-build',
    title: 'Revenue Channel Build',
    tagline: 'Building a £3.2M digital revenue channel from zero — including self-teaching every skill needed.',
    client: 'Tchibo — Coffee & FMCG',
    year: '2015–2017',
    services: ['CRO', 'PPC Management', 'SEO', 'Brand Development'],
    heroMetric: { value: '£3.2M', label: 'Revenue from scratch', context: 'Built in 2 years' },
    overview:
      'I joined Tchibo as a Digital Designer with no SEO, CRO, or PPC experience. Within two years, I had self-taught every discipline needed and built a £3.2M digital revenue channel from nothing. This engagement demonstrates what happens when curiosity, commercial instinct, and relentless execution meet a clear opportunity.',
    challenge:
      'Tchibo\'s UK digital presence was generating zero measurable revenue. No organic traffic strategy, no conversion optimisation, no paid acquisition. The website existed but served no commercial purpose. The opportunity was massive — a strong product, an established brand, and zero digital competition in the UK market — but every capability needed to capture it had to be built from scratch.',
    approach: [
      {
        number: '01',
        title: 'Self-education',
        description:
          'Systematically learned SEO, CRO, and PPC through a combination of online courses, industry communities, and direct experimentation. Applied every technique to live campaigns from day one — theory was always tested against real commercial outcomes.',
      },
      {
        number: '02',
        title: 'Organic growth',
        description:
          'Built the SEO programme from zero. Grew organic traffic from 0 to 15,000/month in two years through technical SEO, content strategy, and authority building. Every piece of content was tied to a keyword with commercial intent.',
      },
      {
        number: '03',
        title: 'Paid acquisition',
        description:
          'Managed a £7K/month PPC budget with surgical precision. Achieved a CPA of £90 against a customer lifetime value of £5,500 — a 61:1 return on ad spend. Budget was allocated by ROAS, not channel loyalty.',
      },
      {
        number: '04',
        title: 'Conversion optimisation',
        description:
          'Ran 50+ A/B tests across the product pages and checkout. Product page conversion moved from 0.9% to 3.1%. Each test was designed to isolate a single variable and run to statistical significance.',
      },
    ],
    results: [
      { value: '£3.2M', label: 'Revenue built', context: 'From zero in 2 years' },
      { value: '61:1', label: 'ROAS', context: '£90 CPA vs £5,500 customer value' },
      { value: '15K', label: 'Monthly organic traffic', context: 'From 0 — self-taught SEO' },
      { value: '3.1%', label: 'Product page conversion', context: 'From 0.9% — 50+ A/B tests' },
    ],
    learnings: [
      'The combination of SEO + CRO + PPC as a unified revenue system (not three separate channels) was the multiplier. Traffic × conversion × spend efficiency compounds faster than optimising any single variable.',
      'Self-teaching is underrated as a signal of commercial capability. The willingness to learn whatever the problem demands — rather than staying within a job description — is what turns a designer into a revenue architect.',
      'The Smokin Bean brand project (which secured a Marks & Spencer contract) proved that creative execution and commercial strategy aren\'t opposed — they\'re most powerful together.',
    ],
  },
  {
    slug: 'onboarding-transformation',
    title: 'Customer Onboarding Transformation',
    tagline: 'Re-engineering B2B onboarding to be 75% faster and 62% cheaper per customer.',
    client: 'Liquidline — B2B operations',
    year: '2023',
    services: ['Process Design', 'Digital Transformation', 'CX Strategy'],
    heroMetric: { value: '75%', label: 'Faster onboarding', context: '4 weeks → 1 week' },
    overview:
      'Customer onboarding at Liquidline took 4 weeks and cost £512 per customer. For a business scaling its customer base, this was an unsustainable bottleneck — slow onboarding delayed revenue recognition, frustrated customers, and consumed operations capacity. I led the project to re-engineer the entire onboarding process.',
    challenge:
      'The onboarding process had accumulated complexity over years — manual data entry, paper forms, multiple handoffs between teams, and no visibility into where a customer was in the pipeline. The process worked when the business had 50 new customers a month, but it was breaking at 200+. The goal was radical simplification without losing the human touch that B2B customers expect.',
    approach: [
      {
        number: '01',
        title: 'Process mapping',
        description:
          'Documented every step in the existing onboarding flow — 47 discrete steps across 4 teams. Identified which steps added value for the customer and which existed only because of system limitations or legacy process.',
      },
      {
        number: '02',
        title: 'Bottleneck analysis',
        description:
          'Timed each step and identified the three biggest bottlenecks: manual data entry (duplicate entry across 3 systems), approval routing (average 6 days waiting for sign-off), and equipment scheduling (manual calendar management).',
      },
      {
        number: '03',
        title: 'System integration',
        description:
          'Connected CRM, ERP, and scheduling systems via API integrations. Eliminated duplicate data entry entirely. Built automated approval workflows that reduced sign-off from 6 days to same-day for standard orders.',
      },
      {
        number: '04',
        title: 'Measurement & iteration',
        description:
          'Built a real-time onboarding dashboard showing every customer\'s progress. Used the data to identify remaining friction points and iterate weekly. The dashboard itself changed behaviour — visible bottlenecks get fixed faster.',
      },
    ],
    results: [
      { value: '75%', label: 'Faster onboarding', context: '4 weeks → 1 week' },
      { value: '62%', label: 'Cost reduction', context: '£512 → £196 per customer' },
      { value: '47→18', label: 'Process steps', context: 'Radical simplification' },
      { value: 'Same-day', label: 'Approval routing', context: 'From 6-day average' },
    ],
    learnings: [
      'Process transformation is 70% politics and 30% technology. The hardest part wasn\'t building the integrations — it was convincing four team leads that their manual processes weren\'t adding the value they thought they were.',
      'Real-time visibility changed behaviour more than any process mandate. When everyone could see the bottlenecks, people fixed them without being asked.',
      'The cost-per-customer metric (£512→£196) was the number that got board attention and budget approval for further transformation work. Always frame process improvement in commercial terms.',
    ],
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug)
}

export function getAdjacentProjects(slug: string): { prev: Project | null; next: Project | null } {
  const index = projects.findIndex(p => p.slug === slug)
  return {
    prev: index > 0 ? projects[index - 1] : null,
    next: index < projects.length - 1 ? projects[index + 1] : null,
  }
}
