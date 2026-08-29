export interface Role {
  title: string
  company: string
  period: string
  location: string
  description: string
  highlights: string[]
}

export interface Education {
  degree: string
  institution: string
  year: string
  notes?: string
}

export interface SkillGroup {
  label: string
  items: string[]
}

export interface Service {
  number: string
  slug: string
  title: string
  description: string
  deliverables: string[]
}

export interface ImpactMetric {
  value: string
  label: string
  context: string
  source: string
}

export const impactMetrics: ImpactMetric[] = [
  { value: '£2.2M', label: 'Revenue scaled', context: 'from £600K on <2% budget', source: 'Delivered in-house at Liquidline' },
  { value: '71%', label: 'Quoting time cut', context: '14 min down to 4 min', source: 'Delivered in-house at Liquidline' },
  { value: '4.29%', label: 'Conversion rate', context: 'from 1.72%, +£90K/mo', source: 'Delivered in-house at Liquidline' },
  { value: '95%', label: 'Monthly active usage', context: 'within 6 months of launch', source: 'Delivered in-house at Liquidline' },
  { value: '75%', label: 'Faster onboarding', context: '4 weeks down to 1', source: 'Delivered in-house at Liquidline' },
  { value: '61:1', label: 'ROAS', context: '£90 CPA vs £5,500 LTV', source: 'Delivered in-house at Tchibo' },
]

export const experience: Role[] = [
  {
    title: 'Digital Transformation Manager',
    company: 'Liquidline',
    period: 'Jan 2023 to Present',
    location: 'Ipswich',
    description:
      'Architecting technology strategy for an 8-figure B2B coffee equipment supplier. Leading cross-functional delivery of platforms, tools, and processes that drive commercial outcomes.',
    highlights: [
      'Transformed customer onboarding: 75% faster (4 weeks to 1 week), 62% cheaper (£512 to £196/customer)',
      'Engineered B2B portal (Laravel 10, Tailwind): online orders +23%, consumables +17%, 0 to 67% customers ordering online in 18 months',
      'Launched sales tool \'IQ\' (multiple API integrations): quote creation 20min to 4min (80% reduction)',
      'Drove HubSpot adoption across sales & marketing: full-stack automation & integration',
      'Accelerated conversion with CRO programme: 1.72% to 4.29%, +£90K/month revenue',
    ],
  },
  {
    title: 'Head of Marketing',
    company: 'Liquidline',
    period: 'Dec 2018 to Jan 2023',
    location: 'Ipswich',
    description:
      'Scaled marketing from a one-person operation to a team of 10. Built the digital revenue engine that catapulted the business from £600K to £2.2M in digital revenue.',
    highlights: [
      'Scaled marketing team 1 to 10; catapulted digital revenue £600K to £2.2M on <2% budget',
      'Forced 7% market share in Design & Build sector in 2 years',
      'Optimised social engagement 1.2% to 7%; traffic +2,300%',
      'Built highest-performing team: engagement score 7.2 to 9.6 (company-wide lead)',
      'Launched B2C e-commerce (hubcoffee.co.uk) in 8 weeks as a COVID pivot',
    ],
  },
  {
    title: 'Head of Digital',
    company: 'Liquidline',
    period: 'Apr 2018 to Dec 2018',
    location: 'Ipswich',
    description:
      'Owned SEO, CRO, and lead generation. Built the landing page system that generated £300K in 6 months from a single day per week.',
    highlights: [
      'Dominated #1 ranking for top industry keyword: traffic 720 to 13,320/month',
      'Optimised landing page CRO: conversion 1.24% to 4.21%',
      '0 to 30+ customers/month from one page. £300K in 6 months (1 day/week)',
    ],
  },
  {
    title: 'Web & Graphic Designer',
    company: 'Liquidline',
    period: 'Aug 2017 to Apr 2018',
    location: 'Ipswich',
    description:
      'Redesigned the primary website for lead generation. Created the brand system and sales collateral that supported the company\'s growth phase.',
    highlights: [
      'Redesigned liquidline.co.uk (WordPress) for lead generation',
      'Created UK brand guidelines; designed 130-page sales deck and 112-page product brochure',
      'Designed Cafe Bonte Single Origins coffee packaging line',
    ],
  },
  {
    title: 'Digital Designer',
    company: 'Tchibo',
    period: 'Jun 2015 to Aug 2017',
    location: 'Epsom',
    description:
      'Self-taught SEO & CRO and built an entire revenue channel from scratch. Managed PPC, ran 50+ A/B tests, and led the team that secured a Marks & Spencer contract.',
    highlights: [
      'Built £3.2M revenue channel from scratch: PPC + CRO over 2 years',
      'Grew organic traffic 0 to 15,000/month (self-taught SEO)',
      'Managed £7K/month PPC: CPA £90 vs £5,500 customer value (61:1 ROAS)',
      '50+ A/B tests: product page conversion 0.9% to 3.1%',
      'Led team of 3 to create Smokin Bean brand. Secured Marks & Spencer contract (2017)',
    ],
  },
  {
    title: 'Product Designer',
    company: 'Flair Leisure Products',
    period: 'Sep 2010 to Aug 2011',
    location: 'Cheam',
    description:
      'Industrial placement year. Physical product design and development for the toy industry.',
    highlights: [
      'Orchestrated Trash Pack development. Won Boys Toy of the Year 2011',
      'Optimised Disney/Nickelodeon approval process: production 3 months to 4 weeks',
      'Delivered Tatty Teddy journal maker in 5 weeks (process adopted company-wide)',
    ],
  },
]

export const education: Education[] = [
  {
    degree: 'BA Industrial Design & Technology',
    institution: 'Brunel University',
    year: '2009 to 2013',
    notes: 'Foundation in user-first engineering & rapid prototyping.',
  },
]

export const skills: SkillGroup[] = [
  {
    label: 'Leadership',
    items: ['Digital Transformation', 'Team Leadership', 'P&L Ownership', 'Cross-Functional Management'],
  },
  {
    label: 'Engineering',
    items: ['Laravel', 'Tailwind CSS', 'WordPress', 'API Integrations', 'UX/UI Design'],
  },
  {
    label: 'Growth',
    items: ['CRO/A/B Testing', 'SEO', 'PPC', 'HubSpot CRM', 'Marketing Automation'],
  },
]

import { pillars } from './pillars'

export const services: Service[] = pillars.map((p, i) => ({
  number: String(i + 1).padStart(2, '0'),
  slug: p.slug,
  title: p.title,
  description: p.description,
  deliverables: p.deliverables.slice(0, 4),
}))
