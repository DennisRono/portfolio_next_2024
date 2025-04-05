"use client"
import { TableOfContentsItem } from "@/lib/toc"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useEffect, useState } from "react"

interface TableOfContentsProps {
  toc: TableOfContentsItem[]
}

export function TableOfContents({ toc }: TableOfContentsProps) {
  const [activeHeading, setActiveHeading] = useState("")
  
  useEffect(() => {
    const handleScroll = () => {
      const headingElements = Array.from(document.querySelectorAll("h1, h2, h3"))
      
      const visibleHeadings = headingElements.filter((heading) => {
        const rect = heading.getBoundingClientRect()
        return rect.top >= 0 && rect.top <= 200
      })
      
      if (visibleHeadings.length > 0) {
        const activeHeadingId = visibleHeadings[0].id
        setActiveHeading(`#${activeHeadingId}`)
      }
    }
    
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Check on initial load
    
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])
  
  if (!toc.length) {
    return null
  }
  
  return (
    <div className="space-y-2">
      {toc.map((heading) => (
        <div key={heading.url} className="space-y-2">
          <Link
            href={heading.url}
            className={cn(
              "text-sm hover:text-foreground transition-colors",
              activeHeading === heading.url ? "font-medium text-foreground" : "text-muted-foreground"
            )}
          >
            {heading.title}
          </Link>
          {(heading.items?.length ?? 0) > 0 && (
            <div className="ml-4 space-y-2">
              {(heading.items ?? []).map((subheading) => (
                <div key={subheading.url} className="space-y-2">
                  <Link
                    href={subheading.url}
                    className={cn(
                      "text-sm hover:text-foreground transition-colors",
                      activeHeading === subheading.url ? "font-medium text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {subheading.title}
                  </Link>
                  {subheading.items && subheading.items.length > 0 && (
                    <div className="ml-4 space-y-2">
                      {subheading.items.map((subsubheading) => (
                        <Link
                          key={subsubheading.url}
                          href={subsubheading.url}
                          className={cn(
                            "text-sm hover:text-foreground transition-colors",
                            activeHeading === subsubheading.url ? "font-medium text-foreground" : "text-muted-foreground"
                          )}
                        >
                          {subsubheading.title}
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
