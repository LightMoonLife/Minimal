import type { MetadataRoute } from 'next'
import { posts } from '@/lib/blog'
import { projects } from '@/lib/projects'
import { pillars } from '@/lib/pillars'
import { SITE_URL as BASE } from '@/lib/constants'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/work`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/writing`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/cv`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/contact`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/review`, changeFrequency: 'monthly', priority: 0.7 },
  ]

  const pillarRoutes: MetadataRoute.Sitemap = pillars.map((pillar) => ({
    url: `${BASE}/services/${pillar.slug}`,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE}/writing/${post.slug}`,
    lastModified: new Date(post.dateModified ?? post.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${BASE}/work/${project.slug}`,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...pillarRoutes, ...postRoutes, ...projectRoutes]
}
