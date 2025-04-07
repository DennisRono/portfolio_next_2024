import { posts } from '#site/content'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { PostItem } from '@/components/post-item'
import { QueryPagination } from '@/components/query-pagination'
import { Tag } from '@/components/tag'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn, getAllTags, sortPosts, sortTagsByCount } from '@/lib/utils'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'My blog',
  description: 'This is a description',
}

const POSTS_PER_PAGE = 5

interface BlogPageProps {
  searchParams: {
    page?: string
  }
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const currentPage = Number(searchParams?.page) || 1
  const sortedPosts = sortPosts(posts.filter((post) => post.published))
  const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE)

  const displayPosts = sortedPosts.slice(
    POSTS_PER_PAGE * (currentPage - 1),
    POSTS_PER_PAGE * currentPage
  )

  const tags = getAllTags(posts)
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
                  const { slug, date, title, description, tags } = post
                  return (
                    <li key={slug}>
                      <PostItem
                        slug={slug}
                        date={date}
                        title={title}
                        description={description}
                        tags={tags}
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
