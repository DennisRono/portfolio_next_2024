"use client"

import { useEffect, useState } from "react"
import type { Editor } from "@tiptap/react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Bold, Italic, Link, Highlighter, Palette } from "lucide-react"

interface FloatingToolbarProps {
  editor: Editor
}

export function FloatingToolbar({ editor }: FloatingToolbarProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0 })

  useEffect(() => {
    const updatePosition = () => {
      const { selection } = editor.state
      const { from, to } = selection

      if (from === to) {
        setIsVisible(false)
        return
      }

      const start = editor.view.coordsAtPos(from)
      const end = editor.view.coordsAtPos(to)

      setPosition({
        top: start.top - 60,
        left: (start.left + end.left) / 2,
      })
      setIsVisible(true)
    }

    editor.on("selectionUpdate", updatePosition)
    return () => editor.off("selectionUpdate", updatePosition)
  }, [editor])

  if (!isVisible) return null

  const addLink = () => {
    const url = window.prompt("Enter URL:")
    if (url) {
      editor.chain().focus().setLink({ href: url }).run()
    }
  }

  return (
    <div
      className="fixed z-50 bg-background border border-border rounded-lg shadow-lg p-1 flex items-center gap-1"
      style={{ top: position.top, left: position.left, transform: "translateX(-50%)" }}
    >
      <Button
        variant={editor.isActive("bold") ? "default" : "ghost"}
        size="sm"
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        variant={editor.isActive("italic") ? "default" : "ghost"}
        size="sm"
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        variant={editor.isActive("highlight") ? "default" : "ghost"}
        size="sm"
        onClick={() => editor.chain().focus().toggleHighlight().run()}
      >
        <Highlighter className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm" onClick={addLink}>
        <Link className="h-4 w-4" />
      </Button>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="sm">
            <Palette className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-48">
          <div className="grid grid-cols-6 gap-2">
            {["#000000", "#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6", "#8b5cf6", "#ec4899"].map((color) => (
              <button
                key={color}
                className="w-6 h-6 rounded border border-border"
                style={{ backgroundColor: color }}
                onClick={() => editor.chain().focus().setColor(color).run()}
              />
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
