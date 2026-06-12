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
    slug: 'checkout-optimisation',
    title: 'Checkout Optimisation',
    tagline: 'Reducing payment-step friction to recover abandoned revenue at scale.',
    client: 'Fashion e-commerce, UK',
    year: '2024',
    services: ['CRO', 'UX Research', 'A/B Testing'],
    heroMetric: { value: '+23%', label: 'Checkout conversion rate' },
    overview:
      'The checkout funnel for a high-volume UK fashion retailer was leaking revenue at the payment step. With a cart abandonment rate of 78%—above the industry average—there was a measurable opportunity to recover revenue through targeted optimisation rather than increased ad spend.',
    challenge:
      'Session recordings and funnel analysis showed users hesitating at the payment step, with notable drop-off around delivery cost revelation and security perception. The challenge was to reduce this friction without disrupting the brand experience or introducing development complexity.',
    approach: [
      {
        number: '01',
        title: 'Discovery',
        description:
          'Quantitative funnel analysis in GA4, segmented by device, traffic source, and new vs. returning user. Identified the payment step as responsible for 61% of all checkout drop-off. Supplemented with heuristic evaluation of the checkout UI against Nielsen\'s 10 usability heuristics.',
      },
      {
        number: '02',
        title: 'Qualitative Research',
        description:
          '8 moderated remote user testing sessions with representative customers. Sessions focused on the checkout journey end-to-end, with think-aloud protocol. Key finding: users consistently expressed uncertainty about total delivery cost and distrust of the payment form\'s visual design.',
      },
      {
        number: '03',
        title: 'Hypothesis Framework',
        description:
          '12 prioritised hypotheses developed using the ICE scoring framework (Impact, Confidence, Ease). Top 3 selected for the first test cycle: inline delivery cost reassurance, progress indicator addition, and payment form visual trust uplift.',
      },
      {
        number: '04',
        title: 'A/B Testing',
        description:
          'Sequential A/B tests run over 8 weeks using VWO. Each test required a minimum sample of 2,400 transactions per variant to detect a 5% relative change at 95% statistical significance. Tests were monitored daily but called only on reaching significance to avoid peeking bias.',
      },
      {
        number: '05',
        title: 'Implementation & Monitoring',
        description:
          'Winning variants handed to the development team with annotated specification documents. Post-launch monitoring for 30 days to confirm performance held outside the test environment, accounting for seasonal variation.',
      },
    ],
    results: [
      { value: '+23%', label: 'Checkout conversion rate', context: 'Primary KPI over 8-week test period' },
      { value: '−18%', label: 'Cart abandonment rate', context: 'Measured at the payment step specifically' },
      { value: '+11%', label: 'Average order value', context: 'Secondary effect from delivery threshold clarity' },
      { value: '£890K', label: 'Estimated incremental revenue', context: 'Annualised projection based on test uplift' },
    ],
    learnings: [
      'Inline delivery cost reassurance ("Free standard delivery on this order") outperformed visual trust seals (padlock icons, Trustpilot badges) in direct tests. Relevance at the moment of decision beats generic credential signals.',
      'A progress indicator showing checkout steps reduced drop-off at the payment stage by 31% in isolation. Knowing "I\'m on step 3 of 4" reduces perceived effort significantly.',
      'Mobile checkout exhibited materially different drop-off patterns to desktop, requiring separate optimisation iterations rather than a single responsive solution.',
    ],
  },
  {
    slug: 'saas-onboarding-redesign',
    title: 'SaaS Onboarding Redesign',
    tagline: 'Moving from a generic 12-step flow to role-based, progressive onboarding.',
    client: 'B2B project management SaaS',
    year: '2023',
    services: ['UX Research', 'Interaction Design', 'Prototyping', 'Usability Testing'],
    heroMetric: { value: '+41%', label: 'User activation rate' },
    overview:
      'A fast-growing B2B SaaS platform was struggling to convert free trial sign-ups into activated users. With 30-day trials and only 34% of users completing onboarding—defined as creating a first project and inviting a team member—significant ARR was being left in the funnel.',
    challenge:
      'The existing onboarding flow treated all users identically regardless of role, company size, or use case. Product managers, operations leads, and engineers all saw the same generic 12-step sequence. The result was poor time-to-value and high drop-off in the first 72 hours—before users had experienced the product\'s core value.',
    approach: [
      {
        number: '01',
        title: 'Jobs-to-be-Done Research',
        description:
          '14 user interviews split between churned trial users and highly activated customers. Questions structured around the JTBD framework to understand the "hiring" context: what problem prompted the search, what alternatives were considered, and what moment made the product feel valuable.',
      },
      {
        number: '02',
        title: 'Product Analytics',
        description:
          'Deep analysis of Mixpanel event data to identify the "aha moment"—the product action most correlated with long-term retention. Found that users who created a project from a template within 48 hours retained at 3× the rate of those who started from blank. This became the activation target.',
      },
      {
        number: '03',
        title: 'User Archetype Mapping',
        description:
          'Defined 3 primary onboarding archetypes based on research: the Solo Maker, the Team Lead, and the Ops Manager. Mapped each archetype\'s divergent expectations, vocabulary, and ideal first-session outcomes. Used these to design branching onboarding paths.',
      },
      {
        number: '04',
        title: 'Design & Prototype',
        description:
          'High-fidelity prototypes built in Figma for each archetype path. Key design decisions: a single role-qualifying question at sign-up, progressive disclosure of advanced features, contextual empty states with pre-filled templates, and in-app tooltips triggered by hesitation signals.',
      },
      {
        number: '05',
        title: 'Test & Measure',
        description:
          'Two rounds of usability testing (12 participants total) to validate comprehension and flow. Soft launch to 20% of new sign-ups, measuring activation rate, time-to-value, and 30-day retention against control over 6 weeks.',
      },
    ],
    results: [
      { value: '+41%', label: 'Activation rate', context: 'Users completing the defined activation event' },
      { value: '−60%', label: 'Time-to-value', context: 'Median days to first project creation' },
      { value: '+28%', label: '30-day retention', context: 'Measured against same-period cohort' },
      { value: '+14pts', label: 'Trial NPS', context: 'Improvement among free trial users' },
    ],
    learnings: [
      'The single highest-leverage change was adding one qualifying question at sign-up ("What best describes your role?"). Personalising the subsequent experience from this single data point drove more activation improvement than all other changes combined.',
      'Empty state design was significantly underinvested in the original product. Replacing blank canvas states with template suggestions reduced cognitive load and dramatically increased first-session completion rates.',
      'Showing a step count of more than 5 in a progress bar had a measurable negative effect on completion. Hiding the total count—and surfacing only the current step—improved confidence and reduced premature abandonment.',
    ],
  },
  {
    slug: 'financial-services-landing-pages',
    title: 'Financial Services Landing Page Programme',
    tagline: 'Building a systematic test programme to improve lead quality and reduce CPL.',
    client: 'UK financial services provider',
    year: '2023',
    services: ['CRO', 'Landing Page Optimisation', 'Analytics', 'A/B Testing'],
    heroMetric: { value: '+31%', label: 'Qualified leads' },
    overview:
      'A UK financial services firm was running paid search at scale but struggling with lead quality. High CPL and low conversion-to-customer rates were eroding ROAS. The brief was to develop a systematic landing page optimisation programme that could run continuously alongside paid campaigns.',
    challenge:
      'Landing pages were generic, disconnected from ad copy, and lacked the trust architecture needed in a regulated industry. Page-level conversion rates averaged 2.1% across 22 pages. There was no structured testing process, and the team had no framework for prioritising which pages to optimise first.',
    approach: [
      {
        number: '01',
        title: 'Audit',
        description:
          'Full heuristic evaluation of all 22 landing pages against a custom rubric covering message clarity, trust signals, form friction, mobile experience, and accessibility. Scored each page 1–5 across 8 dimensions to create a baseline and identify patterns.',
      },
      {
        number: '02',
        title: 'Message Match Analysis',
        description:
          'Audit of ad copy → landing page headline consistency across all active campaigns. Found that 14 of 22 pages had a significant mismatch between the keyword intent driving the click and the page headline. This became a primary hypothesis for testing.',
      },
      {
        number: '03',
        title: 'Competitive Teardown',
        description:
          '8 competitor and sector-leader landing pages reviewed for trust signal patterns, CTA approaches, and social proof placement. Documented a "reassurance architecture" pattern common to the highest-performing financial services pages.',
      },
      {
        number: '04',
        title: 'Prioritisation',
        description:
          'Pages ranked using a composite score: monthly traffic × (target CVR − current CVR) × estimated revenue per lead. Top 6 pages identified for first test cycle. Weekly reporting cadence established with the paid media team to align test windows with campaign activity.',
      },
      {
        number: '05',
        title: 'Test Programme',
        description:
          '6-month rolling A/B test programme with 3–4 concurrent tests at any time. Tests were designed as single-variable where possible, with multivariate tests reserved for pages with sufficient traffic. Results reviewed bi-weekly with stakeholders; winners rolled out within 1-week development sprint.',
      },
    ],
    results: [
      { value: '+31%', label: 'Qualified leads', context: 'Leads scoring above internal qualification threshold' },
      { value: '−22%', label: 'Cost per lead', context: 'Across all campaign landing pages in scope' },
      { value: '+0.9pp', label: 'Conversion rate', context: 'From 2.1% to 3.0% across all pages in scope' },
      { value: '~£1.2M', label: 'Incremental qualified pipeline', context: 'Annualised value at average deal size' },
    ],
    learnings: [
      'Message-match—aligning the page headline directly to the ad\'s keyword intent—was the highest-impact individual test across the programme. Visitors converted at a meaningfully higher rate when the headline confirmed they\'d arrived in the right place.',
      'In regulated financial services, a "reassurance cluster" (FCA authorisation badge, FSCS scheme membership, and 3+ customer testimonials visible above the fold) outperformed any single trust element tested in isolation.',
      'Form length had a complex relationship with lead quality: shorter forms improved volume but decreased quality. A 5-field form with intelligent pre-qualification questions struck the best balance for the client\'s sales team capacity.',
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
