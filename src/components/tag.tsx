import Link from 'next/link'
import { slug } from 'github-slugger'

interface TagProps {
  tag: string
  current?: boolean
  count?: number
}
export function Tag({ tag, current, count }: TagProps) {
  return (
    <Link
      className="text-nowrap inline-flex items-center justify-center text-transparent bg-clip-text border border-slate-700 border-opacity-30 rounded-full text-sm font-medium tracking-wide leading-tight px-3 py-1 uppercase gradient-text cursor-pointer"
      href={`/tags/${slug(tag)}`}
    >
      {tag} {count ? `(${count})` : null}
    </Link>
  )
}
