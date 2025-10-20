"use client"
import type { Editor } from "@tiptap/react"
import { Button } from "@/components/ui/button"
import { FileText, Download, Upload, Settings, Save } from "lucide-react"

interface EditorMenuBarProps {
  editor: Editor
}

export function EditorMenuBar({ editor }: EditorMenuBarProps) {
  const exportAsHTML = () => {
    const content = editor.getHTML()
    const blob = new Blob([content], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "document.html"
    a.click()
    URL.revokeObjectURL(url)
  }

  const exportAsMarkdown = () => {
    // This would need a markdown serializer
    const content = editor.getText()
    const blob = new Blob([content], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "document.md"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="border-b border-border p-2 flex items-center justify-between bg-muted/50">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm">
          <FileText className="h-4 w-4 mr-2" />
          New
        </Button>
        <Button variant="ghost" size="sm">
          <Upload className="h-4 w-4 mr-2" />
          Import
        </Button>
        <Button variant="ghost" size="sm" onClick={exportAsHTML}>
          <Download className="h-4 w-4 mr-2" />
          Export HTML
        </Button>
        <Button variant="ghost" size="sm" onClick={exportAsMarkdown}>
          <Download className="h-4 w-4 mr-2" />
          Export MD
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm">
          <Save className="h-4 w-4 mr-2" />
          Save
        </Button>
        <Button variant="ghost" size="sm">
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
