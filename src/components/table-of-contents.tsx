'use client'
import { cn } from '@/lib/utils'
import { TocEntry } from '@stefanprobst/rehype-extract-toc'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export function TableOfContents({ toc }: { toc: TocEntry[] }) {
  const [activeHeading, setActiveHeading] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      const headingElements = Array.from(
        document.querySelectorAll('h1[id], h2[id], h3[id]')
      )

      const visibleHeadings = headingElements.filter((heading) => {
        const rect = heading.getBoundingClientRect()
        return rect.top <= 150 && rect.bottom >= 0
      })

      if (visibleHeadings.length > 0) {
        const activeHeadingElement = visibleHeadings[0]
        const activeHeadingId = activeHeadingElement.id
        setActiveHeading(`#${activeHeadingId}`)
      } else if (headingElements.length > 0 && window.scrollY < 200) {
        setActiveHeading(`#${headingElements[0].id}`)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  if (!toc || !toc.length) {
    return null
  }

  return (
    <div className="space-y-2">
      {toc.map((heading) => (
        <div key={heading.id} className="space-y-2">
          <Link
            href={'#'+heading.id || '#'}
            className={cn(
              'text-sm hover:text-foreground transition-colors block',
              activeHeading === heading.id
                ? 'font-medium text-foreground'
                : 'text-muted-foreground'
            )}
          >
            {heading.value}
          </Link>
          {(heading.children?.length ?? 0) > 0 && (
            <div className="ml-4 space-y-2">
              {(heading.children ?? []).map((subheading) => (
                <div key={subheading.id} className="space-y-2">
                  <Link
                    href={'#'+subheading.id || '#'}
                    className={cn(
                      'text-sm hover:text-foreground transition-colors block',
                      activeHeading === subheading.id
                        ? 'font-medium text-foreground'
                        : 'text-muted-foreground'
                    )}
                  >
                    {subheading.value}
                  </Link>
                  {subheading.children && subheading.children.length > 0 && (
                    <div className="ml-4 space-y-2">
                      {subheading.children.map((subsubheading) => (
                        <Link
                          key={subsubheading.id}
                          href={'#'+subsubheading.id || '#'}
                          className={cn(
                            'text-sm hover:text-foreground transition-colors block',
                            activeHeading === subsubheading.id
                              ? 'font-medium text-foreground'
                              : 'text-muted-foreground'
                          )}
                        >
                          {subsubheading.value}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
