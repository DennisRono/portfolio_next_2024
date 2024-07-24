import { posts } from '#site/content'
import { MDXContent } from '@/components/mdx-components'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { siteConfig } from '@/config/site'
import { Tag } from '@/components/tag'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
interface PostPageProps {
  params: {
    slug: string[]
  }
}

async function getPostFromParams(params: PostPageProps['params']) {
  const slug = params?.slug?.join('/')
  console.log(slug)

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

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostFromParams(params)

  if (!post || !post.published) {
    notFound()
  }

  return (
    <div className="">
      <Header />
      <article className="px-2 !sm:container py-6 prose dark:prose-invert max-w-4xl mx-auto">
        <h1 className="mb-2 mt-4 text-3xl sm:text-7xl">{post.title}</h1>
        <div className="flex gap-2 mb-2">
          {post.tags?.map((tag) => (
            <Tag tag={tag} key={tag} />
          ))}
        </div>
        {post.description ? (
          <p className="text-[1rem] xs:text-xl mt-0 text-muted-foreground font-extralight">
            {post.description}
          </p>
        ) : null}
        <hr className="my-4" />
        <MDXContent code={post.body} />
      </article>
      <Footer />
    </div>
  )
}
