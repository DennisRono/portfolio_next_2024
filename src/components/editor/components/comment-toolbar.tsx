"use client"
import type { Editor } from "@tiptap/react"
import { Button } from "@/components/ui/button"
import { Bold, Italic, Link, AtSign, Send } from "lucide-react"

interface CommentToolbarProps {
  editor: Editor
  onSubmit?: () => void
  onCancel?: () => void
}

export function CommentToolbar({ editor, onSubmit, onCancel }: CommentToolbarProps) {
  const addLink = () => {
    const url = window.prompt("Enter URL:")
    if (url) {
      editor.chain().focus().setLink({ href: url }).run()
    }
  }

  return (
    <div className="flex items-center justify-between p-2 border-t border-border border-gray-500 bg-muted/30">
      <div className="flex items-center gap-1">
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
        <Button variant="ghost" size="sm" onClick={addLink}>
          <Link className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().insertContent("@").run()}>
          <AtSign className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center gap-2">
        {onCancel && (
          <Button variant="ghost" size="sm" onClick={onCancel}>
            Cancel
          </Button>
        )}
        {onSubmit && (
          <Button size="sm" onClick={onSubmit}>
            <Send className="h-4 w-4 mr-2" />
            Post
          </Button>
        )}
      </div>
    </div>
  )
}
