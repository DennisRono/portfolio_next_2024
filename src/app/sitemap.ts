import type { MetadataRoute } from 'next'

import { getBaseUrl } from '@/lib/Helpers'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // const response = await fetch(`${getBaseUrl()}/api/blogs`, {
  //   method: 'GET',
  //   redirect: 'follow',
  //   cache: 'no-store',
  // })

  // if (!response.ok) {
  //   console.log('Failed to fetch blog data')
  // }

  // const blogs: any = await response.json()
  // const siteobj = {
  //   url: `${getBaseUrl()}/`,
  //   lastModified: new Date(),
  //   changeFrequency: 'daily',
  //   priority: 0.7,
  // }
  // const dynamicProdPages: any[] = Array.isArray(blogs)
  //   ? blogs.map((item: any) => {
  //       return {
  //         ...siteobj,
  //         url: `${getBaseUrl()}/product/${item.slug}`,
  //         lastModified: item.updatedAt,
  //       }
  //     })
  //   : []

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
    // ...dynamicProdPages,
  ]
}
