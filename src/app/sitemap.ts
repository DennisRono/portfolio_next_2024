import type { MetadataRoute } from 'next'
import { posts } from '#site/content'
import projects from '@/data/projects'

import { getBaseUrl } from '@/lib/Helpers'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteobj = {
    url: `${getBaseUrl()}/`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.5,
  }
  const dynamicBlogPages: any[] = Array.isArray(posts)
    ? posts.map((item: any) => {
        return {
          ...siteobj,
          url: `${getBaseUrl()}/${item.slug}`,
          lastModified: item.updatedAt,
        }
      })
    : []
  const dynamicProjectPages: any[] = Array.isArray(projects)
    ? projects.map((item: any) => {
        return {
          ...siteobj,
          url: `${getBaseUrl()}/project/${item.slug}`,
          priority: 0.7,
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
    ...dynamicBlogPages,
    ...dynamicProjectPages,
  ]
}
