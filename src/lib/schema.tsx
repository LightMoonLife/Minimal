import type { BlogPost } from './blog'
import type { Project } from './projects'

const SITE_URL = 'https://jackpbrookes.com'

const personBase = {
  '@type': 'Person' as const,
  name: 'Jack Paul Brookes',
  jobTitle: 'Digital Growth Architect',
  url: SITE_URL,
  sameAs: ['https://linkedin.com/in/jackpbrookes'],
  address: {
    '@type': 'PostalAddress' as const,
    addressLocality: 'Ipswich',
    addressRegion: 'Suffolk',
    addressCountry: 'GB',
  },
}

export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    ...personBase,
  }
}

export function professionalServiceJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Jack Paul Brookes — Digital Growth Architect',
    url: SITE_URL,
    description:
      'Digital transformation, B2B commerce, and conversion optimisation for businesses in Suffolk ready to scale.',
    provider: personBase,
    areaServed: {
      '@type': 'Place',
      name: 'Suffolk, United Kingdom',
    },
    serviceType: [
      'Digital Transformation',
      'Revenue Platform Engineering',
      'Conversion Rate Optimisation',
      'Marketing Operations',
    ],
  }
}

export function articleJsonLd(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.dateModified ?? post.date,
    author: personBase,
    publisher: {
      '@type': 'Person',
      name: 'Jack Paul Brookes',
    },
  }
}

export function faqPageJsonLd(faqs: { question: string; answer: string }[]) {
  if (faqs.length === 0) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function breadcrumbJsonLd(
  items: { name: string; href: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.href}`,
    })),
  }
}

export function caseStudyJsonLd(project: Project) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: project.title,
    description: project.tagline,
    author: personBase,
    publisher: {
      '@type': 'Person',
      name: 'Jack Paul Brookes',
    },
  }
}

export function JsonLd({ data }: { data: Record<string, unknown> | null }) {
  if (!data) return null
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
