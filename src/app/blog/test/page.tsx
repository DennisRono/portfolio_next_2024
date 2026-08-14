import fs from 'node:fs/promises'
import path from 'node:path'
import { PostItem } from '@/components/post-item'

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

export default async function PagesPage() {
  const pagesDirectory = path.join(process.cwd(), 'public', 'page')

  let files: string[] = []

  try {
    files = await fs.readdir(pagesDirectory)
  } catch {
    files = []
  }

  const htmlFiles = files.filter((file) => file.toLowerCase().endsWith('.html'))

  const pages = await Promise.all(htmlFiles.map(readPageMeta))

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <header className="mb-10">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl font-semibold tracking-tight">
                Articles
              </h1>

              <p className="mt-2 max-w-2xl text-muted-foreground">
                Browse the latest articles and posts.
              </p>
            </div>
          </div>
        </header>

        {pages.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-16 text-center">
            <h2 className="text-lg font-medium">No posts found</h2>
          </div>
        ) : (
          <div>
            {pages.map((page) => (
              <PostItem
                key={page.file}
                slug={`/page/${encodeURIComponent(page.file)}`}
                title={page.title}
                description={page.description}
                date={page.publishedAt || page.modifiedAt || ''}
                image={page.image}
                tags={page.keywords
                  ?.split(',')
                  .map((tag) => tag.trim())
                  .filter(Boolean)}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
