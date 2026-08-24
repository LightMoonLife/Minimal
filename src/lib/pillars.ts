export interface PillarPage {
  slug: string
  title: string
  headline: string
  description: string
  sections: { heading: string; content: string[] }[]
  deliverables: string[]
}

export const pillars: PillarPage[] = [
  {
    slug: 'digital-transformation',
    title: 'Digital Transformation',
    headline: 'Modernise your operations. Unlock the revenue hiding in your systems.',
    description:
      'Technology strategy and platform architecture for B2B businesses ready to replace spreadsheets, manual processes, and disconnected tools with connected systems that drive commercial outcomes.',
    sections: [
      {
        heading: 'The problem with most digital transformation projects',
        content: [
          'Most digital transformation projects fail because they start with technology and work backwards to a business case. The result is expensive software that nobody uses, processes that got automated without being improved, and a board that\'s sceptical of the next proposal.',
          'I start with the commercial outcome. What does this business need to achieve in the next 12 months? Then I work backwards to the platform, the process, and the team that delivers it.',
        ],
      },
      {
        heading: 'What I deliver',
        content: [
          'A technology audit that maps your current systems, identifies the gaps, and quantifies the cost of doing nothing. A roadmap that prioritises by commercial impact, not technical elegance. And hands-on leadership of the build, working directly with your teams to ship working software that drives measurable results.',
        ],
      },
    ],
    deliverables: ['Technology audits', 'Platform roadmaps', 'Process re-engineering', 'Team scaling', 'Vendor selection'],
  },
  {
    slug: 'revenue-platforms',
    title: 'Revenue Platforms',
    headline: 'Stop losing orders to clunky systems. Build a platform that sells.',
    description:
      'Custom B2B portals, e-commerce builds, and internal tools engineered to generate measurable commercial returns. Laravel, HubSpot, API integrations — whatever the problem needs.',
    sections: [
      {
        heading: 'B2B commerce is not B2C with a login page',
        content: [
          'Off-the-shelf e-commerce platforms are built for consumers buying one product at a time. B2B ordering involves negotiated pricing, multi-site delivery, account hierarchies, standing orders, and procurement workflows. Forcing B2B complexity through a B2C checkout creates friction that kills adoption.',
          'I build platforms that respect B2B complexity while feeling as simple as a consumer experience. The result: customers actually use them, and your operations team stops drowning in phone orders and spreadsheets.',
        ],
      },
      {
        heading: 'What I deliver',
        content: [
          'Custom B2B self-service portals, internal sales tools, API integrations between CRM, ERP, and operational systems. Every platform is built around one question: does this generate revenue or reduce cost? If it doesn\'t do either, it doesn\'t get built.',
        ],
      },
    ],
    deliverables: ['B2B portals', 'E-commerce platforms', 'Sales tools', 'API integrations', 'ERP connectivity'],
  },
  {
    slug: 'conversion-and-growth',
    title: 'Conversion & Growth',
    headline: 'Turn the traffic you already have into revenue you can measure.',
    description:
      'CRO programmes, SEO, PPC, and data-driven optimisation that turns existing traffic into qualified leads and measurable revenue. Evidence-first methodology: every recommendation comes with a number.',
    sections: [
      {
        heading: 'Traffic is a vanity metric',
        content: [
          'Your website might get 10,000 visitors a month, but if only 1.5% convert, you\'re leaving serious money on the table. The fix isn\'t more traffic — it\'s better conversion of what you already have.',
          'I run systematic CRO programmes that identify the highest-leverage pages, test relentlessly, and compound marginal gains into significant revenue lifts. Combined with SEO to drive qualified traffic, the result is a revenue system, not a marketing channel.',
        ],
      },
      {
        heading: 'What I deliver',
        content: [
          'Full-funnel conversion audits, A/B testing programmes, landing page optimisation, SEO strategy, and PPC management — all measured against revenue, not clicks. Every recommendation is backed by data and every test runs to statistical significance before implementation.',
        ],
      },
    ],
    deliverables: ['CRO audits & programmes', 'A/B testing', 'Landing page optimisation', 'SEO strategy', 'PPC management'],
  },
  {
    slug: 'marketing-operations',
    title: 'Marketing Operations',
    headline: 'Build the operational infrastructure that makes growth repeatable.',
    description:
      'HubSpot implementation, automation workflows, reporting frameworks, and the systems that connect marketing activity to commercial outcomes. Growth that scales, not hacks that break.',
    sections: [
      {
        heading: 'Marketing without operations is guesswork',
        content: [
          'If you can\'t trace a website visit through to a signed contract, you\'re spending money on marketing without knowing what works. Most B2B businesses have this problem: the marketing team reports on clicks and the sales team reports on revenue, and nobody can connect the two.',
          'Marketing operations is the infrastructure that closes that gap. CRM setup, automation workflows, attribution modelling, and reporting frameworks that let you see exactly which activities drive revenue.',
        ],
      },
      {
        heading: 'What I deliver',
        content: [
          'HubSpot CRM implementation and optimisation, marketing automation workflows, lead scoring models, sales enablement tooling, and reporting frameworks that tie marketing spend to commercial outcomes. Every system is built to scale with your business, not to need replacing in 18 months.',
        ],
      },
    ],
    deliverables: ['HubSpot CRM setup', 'Marketing automation', 'Reporting frameworks', 'Lead scoring', 'Sales enablement'],
  },
]

export function getPillarBySlug(slug: string): PillarPage | undefined {
  return pillars.find(p => p.slug === slug)
}
