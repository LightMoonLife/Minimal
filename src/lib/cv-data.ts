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

export interface Certification {
  name: string
  issuer: string
  year: string
}

export const experience: Role[] = [
  {
    title: 'Senior CRO & UX Lead',
    company: 'Your Company Name',
    period: '2022 — Present',
    location: 'London, UK',
    description:
      'Leading the conversion optimisation and UX practice, owning the end-to-end testing programme across the company's digital portfolio.',
    highlights: [
      'Managed a continuous A/B testing programme generating £2.4M in incremental revenue across 3 years',
      'Built and led a team of 3 analysts and 2 UX designers',
      'Established the CRO framework, tooling stack, and reporting cadence adopted across the organisation',
      'Partnered with product, engineering, and paid media teams to align optimisation with business priorities',
    ],
  },
  {
    title: 'CRO & UX Consultant',
    company: 'Digital Agency',
    period: '2019 — 2022',
    location: 'London, UK',
    description:
      'Delivered optimisation programmes for clients across e-commerce, fintech, and SaaS, spanning research, design, and test execution.',
    highlights: [
      'Delivered 40+ CRO and UX projects, consistently exceeding client revenue targets',
      'Led qualitative and quantitative research for journey mapping, persona development, and usability testing',
      'Managed client relationships across senior stakeholder and C-suite levels',
    ],
  },
  {
    title: 'UX Analyst',
    company: 'Product Company',
    period: '2017 — 2019',
    location: 'London, UK',
    description:
      'Conducted user research and produced UX deliverables to support the product team's development roadmap.',
    highlights: [
      'Planned and ran moderated and unmoderated user testing sessions',
      'Produced journey maps, personas, wireframes, and interaction specifications',
      'Collaborated with developers to ensure design intent was preserved in implementation',
    ],
  },
  {
    title: 'Junior UX Designer',
    company: 'Design Studio',
    period: '2015 — 2017',
    location: 'London, UK',
    description:
      'Supported senior designers across web and app design projects for clients in retail and media.',
    highlights: [
      'Created wireframes, prototypes, and UI assets for client-facing digital products',
      'Assisted with user research, synthesis, and insight documentation',
    ],
  },
]

export const education: Education[] = [
  {
    degree: 'MSc Human-Computer Interaction',
    institution: 'University of London',
    year: '2014 — 2015',
    notes: 'Distinction. Dissertation: Cognitive load and form completion in mobile checkout flows.',
  },
  {
    degree: 'BA (Hons) Product Design',
    institution: 'Northumbria University',
    year: '2011 — 2014',
    notes: 'First class honours.',
  },
]

export const skills: SkillGroup[] = [
  {
    label: 'CRO & Testing',
    items: ['VWO', 'Optimizely', 'AB Tasty', 'Google Optimize (sunset)', 'Statistical analysis', 'ICE / PIE prioritisation'],
  },
  {
    label: 'Analytics',
    items: ['Google Analytics 4', 'Adobe Analytics', 'Mixpanel', 'Hotjar', 'FullStory', 'Looker Studio'],
  },
  {
    label: 'UX Research',
    items: ['Moderated user testing', 'Unmoderated testing (Maze, UserTesting)', 'Jobs-to-be-Done interviews', 'Heuristic evaluation', 'Journey mapping', 'Card sorting'],
  },
  {
    label: 'Design',
    items: ['Figma', 'Prototyping', 'Wireframing', 'Design systems', 'Accessibility auditing'],
  },
  {
    label: 'Development',
    items: ['HTML', 'CSS', 'JavaScript (working knowledge)', 'React (working knowledge)'],
  },
]

export const certifications: Certification[] = [
  { name: 'CXL Conversion Optimisation Minidegree', issuer: 'CXL Institute', year: '2021' },
  { name: 'Google Analytics 4 Certification', issuer: 'Google', year: '2023' },
  { name: 'Nielsen Norman Group UX Certification', issuer: 'NN/g', year: '2019' },
]
