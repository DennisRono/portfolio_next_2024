import type { MetadataRoute } from 'next'
import { posts } from '#site/content'

import { getBaseUrl } from '@/lib/Helpers'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteobj = {
    url: `${getBaseUrl()}/`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.7,
  }
  const dynamicProdPages: any[] = Array.isArray(posts)
    ? posts.map((item: any) => {
        return {
          ...siteobj,
          url: `${getBaseUrl()}/${item.slug}`,
          lastModified: item.updatedAt,
        }
      })
    : []

  return [
    {
      url: `${getBaseUrl()}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${getBaseUrl()}/resume`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${getBaseUrl()}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    ...dynamicProdPages,
  ]
}
