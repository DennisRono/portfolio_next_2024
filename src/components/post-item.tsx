import { Calendar } from 'lucide-react'
import Link from 'next/link'
import { buttonVariants } from './ui/button'
import { cn, formatDate } from '@/lib/utils'
import { Tag } from './tag'
import Image from 'next/image'

interface PostItemProps {
  slug: string
  title: string
  description?: string
  date: string
  tags?: Array<string>
  image?: string
}

export function PostItem({
  slug,
  title,
  description,
  date,
  tags,
  image,
}: PostItemProps) {
  return (
    <article className="flex flex-col gap-2 border-b border-[#2e2e2e] py-6 w-full">
      <div
        className={cn(
          'grid grid-cols-1 gap-6',
          image ? 'md:grid-cols-[2fr_1fr]' : ''
        )}
      >
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold hover:text-primary transition-colors">
            <Link href={slug}>{title}</Link>
          </h2>
          <div className="flex gap-2 flex-wrap">
            {tags?.map((tag) => (
              <Tag tag={tag} key={tag} />
            ))}
          </div>
          <div className="max-w-none text-muted-foreground line-clamp-3 overflow-ellipsis">
            {description}
          </div>
          <div className="flex justify-between items-center mt-2">
            <dl>
              <dt className="sr-only">Published On</dt>
              <dd className="text-sm sm:text-base font-medium flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <time dateTime={date}>{formatDate(date)}</time>
              </dd>
            </dl>
            <Link
              href={slug}
              className={cn(buttonVariants({ variant: 'link' }), 'py-0')}
            >
              Read more →
            </Link>
          </div>
        </div>
        {image && (
          <div className="order-first md:order-last">
            <Link
              href={slug}
              className="block overflow-hidden rounded-lg aspect-[16/9]"
            >
              <Image
                src={image || '/placeholder.svg'}
                alt={title}
                width={400}
                height={225}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </Link>
          </div>
        )}
      </div>
    </article>
  )
}
