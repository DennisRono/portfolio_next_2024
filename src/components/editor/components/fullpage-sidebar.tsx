"use client"

import React, { useState } from "react"
import type { Editor } from "@tiptap/react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { FileText, Hash, Clock, Eye, EyeOff } from "lucide-react"

interface FullpageSidebarProps {
  editor: Editor
  isVisible: boolean
  onToggle: () => void
}

interface HeadingItem {
  level: number
  text: string
  id: string
}

export function FullpageSidebar({ editor, isVisible, onToggle }: FullpageSidebarProps) {
  const [headings, setHeadings] = useState<HeadingItem[]>([])

  React.useEffect(() => {
    const updateHeadings = () => {
      const headingItems: HeadingItem[] = []

      editor.state.doc.descendants((node, pos) => {
        if (node.type.name === "heading") {
          headingItems.push({
            level: node.attrs.level,
            text: node.textContent,
            id: `heading-${pos}`,
          })
        }
      })

      setHeadings(headingItems)
    }

    editor.on("update", updateHeadings)
    updateHeadings()

    return () => {
      editor.off("update", updateHeadings)
    }
  }, [editor])

  const scrollToHeading = (id: string) => {
    const element = document.querySelector(`[data-id="${id}"]`)
    element?.scrollIntoView({ behavior: "smooth" })
  }

  if (!isVisible) {
    return (
      <Button variant="ghost" size="sm" onClick={onToggle} className="fixed right-4 top-20 z-40">
        <Eye className="h-4 w-4" />
      </Button>
    )
  }

  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-background border-l border-border z-40 flex flex-col">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h3 className="font-semibold">Document Outline</h3>
        <Button variant="ghost" size="sm" onClick={onToggle}>
          <EyeOff className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {/* Document Stats */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">Statistics</h4>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-center p-2 bg-muted rounded">
                <div className="text-lg font-semibold">{editor.storage.characterCount?.words() || 0}</div>
                <div className="text-xs text-muted-foreground">Words</div>
              </div>
              <div className="text-center p-2 bg-muted rounded">
                <div className="text-lg font-semibold">{editor.storage.characterCount?.characters() || 0}</div>
                <div className="text-xs text-muted-foreground">Characters</div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Table of Contents */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">Table of Contents</h4>
            {headings.length > 0 ? (
              <div className="space-y-1">
                {headings.map((heading, index) => (
                  <button
                    key={index}
                    onClick={() => scrollToHeading(heading.id)}
                    className={`
                      w-full text-left p-2 rounded text-sm hover:bg-muted transition-colors
                      ${heading.level === 1 ? "font-semibold" : ""}
                      ${heading.level === 2 ? "ml-2" : ""}
                      ${heading.level === 3 ? "ml-4" : ""}
                      ${heading.level > 3 ? "ml-6" : ""}
                    `}
                  >
                    <div className="flex items-center gap-2">
                      <Hash className="h-3 w-3 text-muted-foreground" />
                      <span className="truncate">{heading.text || "Untitled"}</span>
                      <Badge variant="outline" className="text-xs">
                        H{heading.level}
                      </Badge>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No headings found</p>
            )}
          </div>

          <Separator />

          {/* Recent Activity */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">Recent Activity</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-3 w-3 text-muted-foreground" />
                <span>Last saved: Just now</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <FileText className="h-3 w-3 text-muted-foreground" />
                <span>Document created</span>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
