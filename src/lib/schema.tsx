import type { BlogPost } from './blog'
import type { Project } from './projects'
import { SITE_URL, CONTACT } from './constants'

const personBase = {
  '@type': 'Person' as const,
  name: CONTACT.name,
  jobTitle: CONTACT.jobTitle,
  url: SITE_URL,
  sameAs: [CONTACT.linkedin],
  address: {
    '@type': 'PostalAddress' as const,
    addressLocality: CONTACT.location.locality,
    addressRegion: CONTACT.location.region,
    addressCountry: CONTACT.location.countryCode,
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
    name: `${CONTACT.name} — ${CONTACT.jobTitle}`,
    url: SITE_URL,
    description:
      'Digital transformation, B2B commerce, and conversion optimisation for businesses in Suffolk ready to scale.',
    provider: personBase,
    areaServed: {
      '@type': 'Place',
      name: `${CONTACT.location.region}, ${CONTACT.location.country}`,
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
      name: CONTACT.name,
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
      name: CONTACT.name,
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
