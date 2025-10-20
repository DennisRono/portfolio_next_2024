"use client"
import type { Editor } from "@tiptap/react"

interface WordCountProps {
  editor: Editor
  limit?: number
}

export function WordCount({ editor, limit }: WordCountProps) {
  const words = editor.storage.characterCount?.words() || 0
  const characters = editor.storage.characterCount?.characters() || 0

  return (
    <div className="flex items-center gap-4 text-sm text-muted-foreground">
      <span>{words} words</span>
      <span>{characters} characters</span>
      {limit && (
        <span className={characters > limit ? "text-destructive" : ""}>
          {characters}/{limit}
        </span>
      )}
    </div>
  )
}
