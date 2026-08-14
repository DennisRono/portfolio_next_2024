import fs from 'node:fs/promises'
import path from 'node:path'

import { posts } from '#site/content'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { PostItem } from '@/components/post-item'
import { QueryPagination } from '@/components/query-pagination'
import { Tag } from '@/components/tag'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn, sortPosts, sortTagsByCount } from '@/lib/utils'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My blog',
  description: 'This is a description',
}

const POSTS_PER_PAGE = 5

type PageMeta = {
  file: string
  title: string
  description: string
  author?: string
  image?: string
  keywords?: string
  publishedAt?: string
  modifiedAt?: string
}

type CombinedPost = {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  image?: string
  source: 'content' | 'html'
}

function getMetaContent(html: string, name: string) {
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

  const regex = new RegExp(
    `<meta\\s+[^>]*(?:name|property)=["']${escapedName}["'][^>]*content=["']([^"']*)["'][^>]*>`,
    'i',
  )

  return html.match(regex)?.[1]?.trim() || undefined
}

function getTitle(html: string) {
  return html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim()
}

function decodeHtml(value: string) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
}

async function readPageMeta(file: string): Promise<PageMeta> {
  const filePath = path.join(process.cwd(), 'public', 'page', file)
  const html = await fs.readFile(filePath, 'utf8')

  const title =
    getTitle(html) ||
    getMetaContent(html, 'og:title') ||
    file.replace(/\.html$/i, '')

  const description =
    getMetaContent(html, 'description') ||
    getMetaContent(html, 'og:description') ||
    ''

  return {
    file,
    title: decodeHtml(title),
    description: decodeHtml(description),
    author:
      getMetaContent(html, 'author') || getMetaContent(html, 'article:author'),
    image:
      getMetaContent(html, 'og:image') || getMetaContent(html, 'twitter:image'),
    keywords: getMetaContent(html, 'keywords'),
    publishedAt:
      getMetaContent(html, 'article:published_time') ||
      getMetaContent(html, 'date'),
    modifiedAt: getMetaContent(html, 'article:modified_time'),
  }
}

async function getHtmlPosts(): Promise<CombinedPost[]> {
  const pagesDirectory = path.join(process.cwd(), 'public', 'page')

  let files: string[] = []

  try {
    files = await fs.readdir(pagesDirectory)
  } catch {
    return []
  }

  const htmlFiles = files.filter((file) => file.toLowerCase().endsWith('.html'))

  const pages = await Promise.all(htmlFiles.map(readPageMeta))

  return pages.map((page) => ({
    slug: `/page/${encodeURIComponent(page.file)}`,
    title: page.title,
    description: page.description,
    date: page.publishedAt || page.modifiedAt || '',
    tags:
      page.keywords
        ?.split(',')
        .map((tag) => tag.trim())
        .filter(Boolean) || [],
    image: page.image,
    source: 'html',
  }))
}

interface BlogPageProps {
  searchParams: {
    page?: string
  }
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const currentPage = Number(searchParams?.page) || 1

  const htmlPosts = await getHtmlPosts()

  const contentPosts: CombinedPost[] = posts
    .filter((post) => post.published)
    .map((post) => ({
      slug: post.slug,
      title: post.title,
      description: post.description || '',
      date: post.date,
      tags: post.tags || [],
      source: 'content',
    }))

  const allPosts = [...contentPosts, ...htmlPosts]

  const sortedPosts = allPosts.sort((a, b) => {
    const dateA = new Date(a.date || 0).getTime()
    const dateB = new Date(b.date || 0).getTime()

    return dateB - dateA
  })

  const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE)

  const displayPosts = sortedPosts.slice(
    POSTS_PER_PAGE * (currentPage - 1),
    POSTS_PER_PAGE * currentPage,
  )

  const tags = allPosts.reduce<Record<string, number>>((acc, post) => {
    post.tags.forEach((tag) => {
      acc[tag] = (acc[tag] || 0) + 1
    })

    return acc
  }, {})

  const sortedTags = sortTagsByCount(tags)

  return (
    <div className="">
      <Header />

      <div className="px-2 sm:container max-w-9xl py-6 lg:py-10 w-full">
        <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
          <div className="flex-1 space-y-4">
            <h1 className="inline-block font-black text-4xl lg:text-5xl">
              My Blogs
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-6 sm:grid-cols-12 gap-12 mt-8 min-h-screen">
          <div className="col-span-6 sm:grid-cols-12 col-start-1 sm:col-span-8">
            {displayPosts?.length > 0 ? (
              <ul className="flex flex-col">
                {displayPosts.map((post) => {
                  const { slug, date, title, description, tags, image } = post

                  return (
                    <li key={slug}>
                      <PostItem
                        slug={slug}
                        date={date}
                        title={title}
                        description={description}
                        tags={tags}
                        image={image}
                      />
                    </li>
                  )
                })}
              </ul>
            ) : (
              <p>Nothing to see here yet</p>
            )}

            <QueryPagination
              totalPages={totalPages}
              className="justify-end mt-4"
            />
          </div>

          <Card className="sticky top-20 col-span-6 sm:grid-cols-12 row-start-3 h-fit sm:col-span-4 sm:col-start-9 sm:row-start-1 rounded-sm border border-[#2e2e2e]">
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>

            <CardContent className="flex flex-wrap gap-2">
              {Array.isArray(sortedTags)
                ? sortedTags
                    ?.slice(0, 33)
                    .map((tag) => <Tag tag={tag} key={tag} count={tags[tag]} />)
                : null}

              <Link
                href="/tags"
                className={cn(buttonVariants({ variant: 'link' }), 'py-0')}
              >
                More Tags →
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
