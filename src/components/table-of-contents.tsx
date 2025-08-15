'use client'
import { cn } from '@/lib/utils'
import type React from 'react'

import type { TocEntry } from '@stefanprobst/rehype-extract-toc'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ChevronDown, ListFilter, X } from 'lucide-react'

export function TableOfContents({ toc }: { toc: TocEntry[] }) {
  const [activeHeading, setActiveHeading] = useState('')
  const [open, setOpen] = useState<boolean>(false)

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

  const handleLinkClick = (e: React.MouseEvent, headingId: string) => {
    e.preventDefault()
    if (headingId) {
      document.getElementById(headingId)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
      setOpen(false) // Close the table of contents after clicking
    }
  }

  if (!toc || !toc.length) {
    return null
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
      >
        <ListFilter className="h-4 w-4" />
        <span className="font-medium">Contents</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-300 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => setOpen(false)}
          />

          <div className="fixed top-4 right-4 w-80 max-h-[80vh] bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800">
              <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <ListFilter className="h-4 w-4" />
                Table of Contents
              </h3>
              <button
                onClick={() => setOpen(false)}
                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <X className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto max-h-[calc(80vh-80px)] space-y-1">
              {toc.map((heading) => (
                <div key={heading.id} className="space-y-1">
                  <Link
                    href={'#' + heading.id || '#'}
                    onClick={(e) => handleLinkClick(e, heading.id || '#')}
                    className={cn(
                      'block px-3 py-2 text-sm rounded-lg transition-all duration-200 hover:bg-blue-50 dark:hover:bg-gray-800 hover:translate-x-1',
                      activeHeading === `#${heading.id}`
                        ? 'font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border-l-2 border-blue-500'
                        : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                    )}
                  >
                    {heading.value}
                  </Link>
                  {(heading.children?.length ?? 0) > 0 && (
                    <div className="ml-4 space-y-1">
                      {(heading.children ?? []).map((subheading) => (
                        <div key={subheading.id} className="space-y-1">
                          <Link
                            href={'#' + subheading.id || '#'}
                            onClick={(e) =>
                              handleLinkClick(e, subheading.id || '#')
                            }
                            className={cn(
                              'block px-3 py-1.5 text-sm rounded-lg transition-all duration-200 hover:bg-blue-50 dark:hover:bg-gray-800 hover:translate-x-1',
                              activeHeading === `#${subheading.id}`
                                ? 'font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border-l-2 border-blue-400'
                                : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
                            )}
                          >
                            {subheading.value}
                          </Link>
                          {subheading.children &&
                            subheading.children.length > 0 && (
                              <div className="ml-4 space-y-1">
                                {subheading.children.map((subsubheading) => (
                                  <Link
                                    key={subsubheading.id}
                                    href={'#' + subsubheading.id || '#'}
                                    onClick={(e) =>
                                      handleLinkClick(
                                        e,
                                        subsubheading.id || '#'
                                      )
                                    }
                                    className={cn(
                                      'block px-3 py-1 text-xs rounded-lg transition-all duration-200 hover:bg-blue-50 dark:hover:bg-gray-800 hover:translate-x-1',
                                      activeHeading === `#${subsubheading.id}`
                                        ? 'font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border-l-2 border-blue-300'
                                        : 'text-gray-500 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400'
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
          </div>
        </>
      )}
    </div>
  )
}
