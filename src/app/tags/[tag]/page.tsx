import { posts } from '#site/content'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { PostItem } from '@/components/post-item'
import { Tag } from '@/components/tag'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getAllTags, getPostsByTagSlug, sortTagsByCount } from '@/lib/utils'
import { slug } from 'github-slugger'
import { Metadata } from 'next'

interface TagPageProps {
  params: {
    tag: string
  }
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { tag } = params
  return {
    title: tag,
    description: `Posts on the topic of ${tag}`,
  }
}

export const generateStaticParams = () => {
  const tags = getAllTags(posts)
  const paths = Object.keys(tags).map((tag) => ({ tag: slug(tag) }))
  return paths
}

export default function TagPage({ params }: TagPageProps) {
  const { tag } = params
  const title = tag.split('-').join(' ')

  const allPosts = getPostsByTagSlug(posts, tag)
  const displayPosts = allPosts.filter((post) => post.published)
  const tags = getAllTags(posts)
  const sortedTags = sortTagsByCount(tags)

  return (
    <div className="">
      <Header />
      <div className="px-2 sm:container max-w-8xl py-6 lg:py-10 w-full">
        <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
          <div className="flex-1 space-y-4">
            <h1 className="inline-block font-black text-4xl lg:text-5xl capitalize">
              {title}
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
                        slug={'../'+slug}
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
          </div>
          <Card className="sticky top-20 col-span-6 sm:grid-cols-12 row-start-3 h-fit sm:col-span-4 sm:col-start-9 sm:row-start-1 rounded-sm border border-[#2e2e2e]">
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {sortedTags?.map((t) => (
                <Tag
                  tag={t}
                  key={t}
                  count={tags[t]}
                  current={slug(t) === tag}
                />
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  )
}
