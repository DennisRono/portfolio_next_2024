"use client"

import type React from "react"
import { useState, useRef } from "react"
import { NodeViewWrapper } from "@tiptap/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Upload, Settings, Trash2, ExternalLink } from "lucide-react"

interface ImageUploadComponentProps {
  node: {
    attrs: {
      src: string
      alt: string
      title: string
      width: string
      height: string
    }
  }
  updateAttributes: (attributes: Record<string, any>) => void
  deleteNode: () => void
}

export function ImageUploadComponent({ node, updateAttributes, deleteNode }: ImageUploadComponentProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    try {
      // Create a local URL for preview
      const url = URL.createObjectURL(file)
      updateAttributes({ src: url, alt: file.name })

      // In a real implementation, you would upload to a server here
      // const uploadedUrl = await uploadToServer(file)
      // updateAttributes({ src: uploadedUrl })
    } catch (error) {
      console.error("Upload failed:", error)
    } finally {
      setIsUploading(false)
    }
  }

  const handleUrlInput = (url: string) => {
    updateAttributes({ src: url })
  }

  if (!node.attrs.src) {
    return (
      <NodeViewWrapper>
        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
          <div className="space-y-4">
            <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
            <div>
              <h3 className="text-lg font-medium">Add an image</h3>
              <p className="text-sm text-muted-foreground">Upload a file or paste a URL</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <Button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="flex items-center gap-2"
              >
                <Upload className="h-4 w-4" />
                {isUploading ? "Uploading..." : "Upload File"}
              </Button>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                    <ExternalLink className="h-4 w-4" />
                    Add URL
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-3">
                    <Label htmlFor="image-url">Image URL</Label>
                    <Input
                      id="image-url"
                      placeholder="https://example.com/image.jpg"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleUrlInput((e.target as HTMLInputElement).value)
                        }
                      }}
                    />
                    <Button
                      size="sm"
                      onClick={() => {
                        const input = document.getElementById("image-url") as HTMLInputElement
                        handleUrlInput(input.value)
                      }}
                    >
                      Add Image
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
        </div>
      </NodeViewWrapper>
    )
  }

  return (
    <NodeViewWrapper>
      <div className="relative group">
        <img
          src={node.attrs.src || "/placeholder.svg"}
          alt={node.attrs.alt || ""}
          title={node.attrs.title || ""}
          width={node.attrs.width || undefined}
          height={node.attrs.height || undefined}
          className="rounded-lg max-w-full h-auto"
        />

        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
          <Popover open={showSettings} onOpenChange={setShowSettings}>
            <PopoverTrigger asChild>
              <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                <Settings className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-3">
                <h4 className="font-medium">Image Settings</h4>
                <div className="space-y-2">
                  <Label htmlFor="alt-text">Alt Text</Label>
                  <Input
                    id="alt-text"
                    value={node.attrs.alt || ""}
                    onChange={(e) => updateAttributes({ alt: e.target.value })}
                    placeholder="Describe the image..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title-text">Title</Label>
                  <Input
                    id="title-text"
                    value={node.attrs.title || ""}
                    onChange={(e) => updateAttributes({ title: e.target.value })}
                    placeholder="Image title..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor="width">Width</Label>
                    <Input
                      id="width"
                      value={node.attrs.width || ""}
                      onChange={(e) => updateAttributes({ width: e.target.value })}
                      placeholder="Auto"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="height">Height</Label>
                    <Input
                      id="height"
                      value={node.attrs.height || ""}
                      onChange={(e) => updateAttributes({ height: e.target.value })}
                      placeholder="Auto"
                    />
                  </div>
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
