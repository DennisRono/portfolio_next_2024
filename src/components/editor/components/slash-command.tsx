"use client"

import { useState, useEffect, forwardRef, useImperativeHandle } from "react"
import type { Editor } from "@tiptap/react"
import { Heading1, Heading2, Heading3, List, ListOrdered, Quote, Code, ImageIcon, Table, Minus } from "lucide-react"

interface SlashCommandProps {
  editor: Editor
  range: any
}

interface SlashCommandRef {
  onKeyDown: (props: { event: KeyboardEvent }) => boolean
}

const SLASH_COMMANDS = [
  {
    title: "Heading 1",
    description: "Big section heading",
    icon: Heading1,
    command: ({ editor, range }: { editor: Editor; range: any }) => {
      editor.chain().focus().deleteRange(range).setNode("heading", { level: 1 }).run()
    },
  },
  {
    title: "Heading 2",
    description: "Medium section heading",
    icon: Heading2,
    command: ({ editor, range }: { editor: Editor; range: any }) => {
      editor.chain().focus().deleteRange(range).setNode("heading", { level: 2 }).run()
    },
  },
  {
    title: "Heading 3",
    description: "Small section heading",
    icon: Heading3,
    command: ({ editor, range }: { editor: Editor; range: any }) => {
      editor.chain().focus().deleteRange(range).setNode("heading", { level: 3 }).run()
    },
  },
  {
    title: "Bullet List",
    description: "Create a simple bullet list",
    icon: List,
    command: ({ editor, range }: { editor: Editor; range: any }) => {
      editor.chain().focus().deleteRange(range).toggleBulletList().run()
    },
  },
  {
    title: "Numbered List",
    description: "Create a list with numbering",
    icon: ListOrdered,
    command: ({ editor, range }: { editor: Editor; range: any }) => {
      editor.chain().focus().deleteRange(range).toggleOrderedList().run()
    },
  },
  {
    title: "Quote",
    description: "Capture a quote",
    icon: Quote,
    command: ({ editor, range }: { editor: Editor; range: any }) => {
      editor.chain().focus().deleteRange(range).toggleBlockquote().run()
    },
  },
  {
    title: "Code Block",
    description: "Capture a code snippet",
    icon: Code,
    command: ({ editor, range }: { editor: Editor; range: any }) => {
      editor.chain().focus().deleteRange(range).toggleCodeBlock().run()
    },
  },
  {
    title: "Image",
    description: "Upload an image",
    icon: ImageIcon,
    command: ({ editor, range }: { editor: Editor; range: any }) => {
      const url = window.prompt("Enter image URL:")
      if (url) {
        editor.chain().focus().deleteRange(range).setImage({ src: url }).run()
      }
    },
  },
  {
    title: "Table",
    description: "Insert a table",
    icon: Table,
    command: ({ editor, range }: { editor: Editor; range: any }) => {
      editor.chain().focus().deleteRange(range).insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
    },
  },
  {
    title: "Divider",
    description: "Visually divide blocks",
    icon: Minus,
    command: ({ editor, range }: { editor: Editor; range: any }) => {
      editor.chain().focus().deleteRange(range).setHorizontalRule().run()
    },
  },
]

export const SlashCommand = forwardRef<SlashCommandRef, SlashCommandProps>(({ editor, range }, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const selectItem = (index: number) => {
    const item = SLASH_COMMANDS[index]
    if (item) {
      item.command({ editor, range })
    }
  }

  const upHandler = () => {
    setSelectedIndex((selectedIndex + SLASH_COMMANDS.length - 1) % SLASH_COMMANDS.length)
  }

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % SLASH_COMMANDS.length)
  }

  const enterHandler = () => {
    selectItem(selectedIndex)
  }

  useEffect(() => setSelectedIndex(0), [])

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }) => {
      if (event.key === "ArrowUp") {
        upHandler()
        return true
      }

      if (event.key === "ArrowDown") {
        downHandler()
        return true
      }

      if (event.key === "Enter") {
        enterHandler()
        return true
      }

      return false
    },
  }))

  return (
    <div className="z-50 h-auto max-h-[330px] w-72 overflow-y-auto rounded-md border border-border bg-background px-1 py-2 shadow-md transition-all">
      <div className="grid gap-1">
        {SLASH_COMMANDS.map((item, index) => (
          <button
            key={index}
            className={`flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent ${
              index === selectedIndex ? "bg-accent text-accent-foreground" : ""
            }`}
            onClick={() => selectItem(index)}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-background">
              <item.icon className="h-4 w-4" />
            </div>
            <div>
              <p className="font-medium">{item.title}</p>
              <p className="text-xs text-muted-foreground">{item.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
})

SlashCommand.displayName = "SlashCommand"
