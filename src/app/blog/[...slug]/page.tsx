import { posts } from '#site/content'
import { MDXContent, MDXToC } from '@/components/mdx-components'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { siteConfig } from '@/config/site'
import { Tag } from '@/components/tag'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { CalendarDays, Clock, ChevronLeft, Share2 } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Image from 'next/image'
import { TableOfContents } from '@/components/table-of-contents'

interface PostPageProps {
  params: {
    slug: string[]
  }
}

async function getPostFromParams(params: PostPageProps['params']) {
  const slug = params?.slug?.join('/')
  const post = posts.find((post) => post.slugAsParams === slug)

  return post
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPostFromParams(params)

  if (!post) {
    return {}
  }

  const ogSearchParams = new URLSearchParams()
  ogSearchParams.set('title', post.title)
  console.log(ogSearchParams.toString())

  return {
    metadataBase: new URL('https://denniskibet.com'),
    title: post.title,
    description: post.description,
    authors: { name: siteConfig.author },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: post.slug,
      images: [
        {
          url: `/api/og?${ogSearchParams.toString()}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [`/api/og?${ogSearchParams.toString()}`],
    },
  }
}

export async function generateStaticParams(): Promise<
  PostPageProps['params'][]
> {
  return posts.map((post) => ({ slug: [post.slug] }))
}

function getReadingTime(content: string) {
  const wordsPerMinute = 200
  const words = content.split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostFromParams(params)

  if (!post || !post.published) {
    notFound()
  }

  const readingTime = getReadingTime(post.body)

  const tableOfContents = MDXToC({ code: post.body });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pb-12">
        <div className="container px-4 md:px-8 max-w-6xl mx-auto">
          <div className="py-4">
            <Link
              href="/blog"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to all posts
            </Link>
          </div>

          <article className="grid grid-cols-1 md:grid-cols-[1fr_250px] gap-8">
            <div className="prose dark:prose-invert max-w-none">
              {post.image && (
                <div className="mb-8 rounded-lg overflow-hidden">
                  <Image
                    src={post.image || '/placeholder.svg'}
                    alt={post.title}
                    className="w-full h-auto object-cover aspect-[16/9]"
                  />
                </div>
              )}

              <div className="mb-8">
                <h1 className="mb-4 mt-0 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  {post.title}
                </h1>

                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags?.map((tag) => (
                    <Tag tag={tag} key={tag} />
                  ))}
                </div>

                {post.description && (
                  <p className="text-xl text-muted-foreground font-normal mt-4 mb-6 leading-relaxed">
                    {post.description}
                  </p>
                )}

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={siteConfig?.avatar_url || ''}
                        alt={siteConfig.author}
                      />
                      <AvatarFallback>
                        {siteConfig.author?.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span>{siteConfig.author}</span>
                  </div>

                  <Separator orientation="vertical" className="h-4" />

                  {post.date && (
                    <div className="flex items-center gap-1">
                      <CalendarDays className="h-4 w-4" />
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                    </div>
                  )}

                  <Separator orientation="vertical" className="h-4" />

                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{readingTime} min read</span>
                  </div>
                </div>
              </div>

              <Separator className="my-8" />

              <div className="mdx-content !max-w-4xl overflow-hidden">
                <MDXContent code={post.body} />
              </div>

              <div className="mt-12 pt-6 border-t">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <h3 className="text-lg font-medium">Share this article</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="h-9 w-9 p-0">
                      <Share2 className="h-4 w-4" />
                      <span className="sr-only">Share on Twitter</span>
                    </Button>
                    <Button variant="outline" size="sm" className="h-9 w-9 p-0">
                      <Share2 className="h-4 w-4" />
                      <span className="sr-only">Share on Facebook</span>
                    </Button>
                    <Button variant="outline" size="sm" className="h-9 w-9 p-0">
                      <Share2 className="h-4 w-4" />
                      <span className="sr-only">Share on LinkedIn</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <aside className="hidden md:block">
              <div className="sticky top-20">
                {tableOfContents.length !== 0 && (
                  <div className="rounded-lg border bg-card p-4">
                    <h3 className="font-medium mb-3">Table of Contents</h3>
                    <TableOfContents toc={tableOfContents} />
                  </div>
                )}

                {posts
                  .filter(
                    (p) =>
                      p.published &&
                      p.slugAsParams !== post.slugAsParams &&
                      p.tags?.some((tag) => post.tags?.includes(tag))
                  )
                  .slice(0, 3).length > 0 && (
                  <div className="rounded-lg border bg-card p-4 mt-6">
                    <h3 className="font-medium mb-3">Related Posts</h3>
                    <div className="space-y-4">
                      {posts
                        .filter(
                          (p) =>
                            p.published &&
                            p.slugAsParams !== post.slugAsParams &&
                            p.tags?.some((tag) => post.tags?.includes(tag))
                        )
                        .slice(0, 3)
                        .map((relatedPost) => (
                          <div key={relatedPost.slugAsParams} className="group">
                            <Link
                              href={`/blog/${relatedPost.slugAsParams}`}
                              className="no-underline"
                            >
                              <h4 className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-2">
                                {relatedPost.title}
                              </h4>
                              {relatedPost.description && (
                                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                  {relatedPost.description}
                                </p>
                              )}
                            </Link>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </article>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
            {posts.findIndex((p) => p.slugAsParams === post.slugAsParams) >
              0 && (
              <Link
                href={`/blog/${
                  posts[
                    posts.findIndex(
                      (p) => p.slugAsParams === post.slugAsParams
                    ) - 1
                  ].slugAsParams
                }`}
                className="group p-4 border rounded-lg hover:bg-accent transition-colors"
              >
                <div className="text-sm text-muted-foreground mb-2 flex items-center">
                  <ChevronLeft className="mr-1 h-4 w-4" />
                  Previous Post
                </div>
                <h3 className="font-medium group-hover:text-primary transition-colors line-clamp-2">
                  {
                    posts[
                      posts.findIndex(
                        (p) => p.slugAsParams === post.slugAsParams
                      ) - 1
                    ].title
                  }
                </h3>
              </Link>
            )}

            {posts.findIndex((p) => p.slugAsParams === post.slugAsParams) <
              posts.length - 1 && (
              <Link
                href={`/blog/${
                  posts[
                    posts.findIndex(
                      (p) => p.slugAsParams === post.slugAsParams
                    ) + 1
                  ].slugAsParams
                }`}
                className="group p-4 border rounded-lg hover:bg-accent transition-colors md:ml-auto"
              >
                <div className="text-sm text-muted-foreground mb-2 flex items-center justify-end">
                  Next Post
                  <ChevronLeft className="ml-1 h-4 w-4 rotate-180" />
                </div>
                <h3 className="font-medium group-hover:text-primary transition-colors text-right line-clamp-2">
                  {
                    posts[
                      posts.findIndex(
                        (p) => p.slugAsParams === post.slugAsParams
                      ) + 1
                    ].title
                  }
                </h3>
              </Link>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
