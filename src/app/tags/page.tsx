import { getAllTags, sortTagsByCount } from '@/lib/utils'
import { Metadata } from 'next'
import { posts } from '#site/content'
import { Tag } from '@/components/tag'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Tags',
  description: "Topic I've written about",
}

export default async function TagsPage() {
  const tags = getAllTags(posts)
  const sortedTags = sortTagsByCount(tags)

  return (
    <>
      <Header />
      <div className="container max-w-8xl py-6 lg:py-10 min-h-[84vh]">
        <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8 mb-4">
          <div className="flex-1 space-y-4">
            <h1 className="inline-block font-black text-4xl lg:text-5xl">
              All Tags
            </h1>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {sortedTags?.map((tag) => (
            <Tag tag={tag} count={tags[tag]} key={tag} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  )
}
