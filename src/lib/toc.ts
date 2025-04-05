export type TableOfContentsItem = {
    title: string
    url: string
    items?: TableOfContentsItem[]
  }
  
  export function extractHeadings(content: string): TableOfContentsItem[] {
    // This regex matches h1, h2, h3 headings in MDX content
    const headingRegex = /(?:^|\n)#{1,3}\s+(.+)$/gm
    const matches = Array.from(content.matchAll(headingRegex))
  
    const headings: TableOfContentsItem[] = []
  
    matches.forEach((match) => {
      const title = match[1].trim()
      const url = `#${title.toLowerCase().replace(/\s+/g, "-")}`
  
      // Count the number of # to determine heading level
      const level = (match[0].match(/#/g) || []).length
  
      if (level === 1) {
        headings.push({ title, url })
      } else if (level === 2) {
        if (!headings.length) {
          headings.push({ title, url })
        } else {
          const lastHeading = headings[headings.length - 1]
          if (!lastHeading.items) {
            lastHeading.items = []
          }
          lastHeading.items.push({ title, url })
        }
      } else if (level === 3) {
        if (!headings.length) {
          headings.push({ title, url })
        } else {
          const lastHeading = headings[headings.length - 1]
          if (!lastHeading.items || !lastHeading.items.length) {
            if (!lastHeading.items) {
              lastHeading.items = []
            }
            lastHeading.items.push({ title, url })
          } else {
            const lastSubHeading = lastHeading.items[lastHeading.items.length - 1]
            if (!lastSubHeading.items) {
              lastSubHeading.items = []
            }
            lastSubHeading.items.push({ title, url })
          }
        }
      }
    })
  
    return headings
  }
  
  