"use client"

import type React from "react"
import { useState, useRef } from "react"
import { NodeViewWrapper } from "@tiptap/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { File, Upload, Settings, Trash2, Download } from "lucide-react"

interface FileAttachmentComponentProps {
  node: {
    attrs: {
      src: string
      name: string
      size: number
      type: string
    }
  }
  updateAttributes: (attributes: Record<string, any>) => void
  deleteNode: () => void
}

export function FileAttachmentComponent({ node, updateAttributes, deleteNode }: FileAttachmentComponentProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return "🖼️"
    if (type.startsWith("video/")) return "🎥"
    if (type.startsWith("audio/")) return "🎵"
    if (type.includes("pdf")) return "📄"
    if (type.includes("word")) return "📝"
    if (type.includes("excel") || type.includes("spreadsheet")) return "📊"
    if (type.includes("powerpoint") || type.includes("presentation")) return "📈"
    return "📎"
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    try {
      // Create a local URL for preview
      const url = URL.createObjectURL(file)
      updateAttributes({
        src: url,
        name: file.name,
        size: file.size,
        type: file.type,
      })

      // In a real implementation, you would upload to a server here
      // const uploadedUrl = await uploadToServer(file)
      // updateAttributes({ src: uploadedUrl })
    } catch (error) {
      console.error("Upload failed:", error)
    } finally {
      setIsUploading(false)
    }
  }

  if (!node.attrs.src) {
    return (
      <NodeViewWrapper>
        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
          <div className="space-y-4">
            <File className="h-10 w-10 mx-auto text-muted-foreground" />
            <div>
              <h3 className="text-lg font-medium">Attach a file</h3>
              <p className="text-sm text-muted-foreground">Upload any file type</p>
            </div>
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="flex items-center gap-2"
            >
              <Upload className="h-4 w-4" />
              {isUploading ? "Uploading..." : "Choose File"}
            </Button>
          </div>
          <input ref={fileInputRef} type="file" onChange={handleFileUpload} className="hidden" />
        </div>
      </NodeViewWrapper>
    )
  }

  return (
    <NodeViewWrapper>
      <div className="relative group">
        <div className="flex items-center gap-3 p-4 border border-border rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
          <div className="text-2xl">{getFileIcon(node.attrs.type)}</div>
          <div className="flex-1 min-w-0">
            <div className="font-medium truncate">{node.attrs.name}</div>
            <div className="text-sm text-muted-foreground">{formatFileSize(node.attrs.size)}</div>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => window.open(node.attrs.src, "_blank")}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Download
          </Button>
        </div>

        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
          <Popover open={showSettings} onOpenChange={setShowSettings}>
            <PopoverTrigger asChild>
              <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                <Settings className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-3">
                <h4 className="font-medium">File Settings</h4>
                <div className="space-y-2">
                  <Label htmlFor="file-name">File Name</Label>
                  <Input
                    id="file-name"
                    value={node.attrs.name}
                    onChange={(e) => updateAttributes({ name: e.target.value })}
                    placeholder="File name..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="file-url">File URL</Label>
                  <Input
                    id="file-url"
                    value={node.attrs.src}
                    onChange={(e) => updateAttributes({ src: e.target.value })}
                    placeholder="File URL..."
                  />
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Button size="sm" variant="destructive" className="h-8 w-8 p-0" onClick={deleteNode}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </NodeViewWrapper>
  )
}
