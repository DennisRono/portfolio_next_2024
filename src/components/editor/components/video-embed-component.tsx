"use client"

import { useState } from "react"
import { NodeViewWrapper } from "@tiptap/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Video, Settings, Trash2, ExternalLink } from "lucide-react"

interface VideoEmbedComponentProps {
  node: {
    attrs: {
      src: string
      width: number
      height: number
    }
  }
  updateAttributes: (attributes: Record<string, any>) => void
  deleteNode: () => void
}

export function VideoEmbedComponent({ node, updateAttributes, deleteNode }: VideoEmbedComponentProps) {
  const [showSettings, setShowSettings] = useState(false)

  const getEmbedUrl = (url: string): string => {
    // YouTube
    const youtubeMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)
    if (youtubeMatch) {
      return `https://www.youtube.com/embed/${youtubeMatch[1]}`
    }

    // Vimeo
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/)
    if (vimeoMatch) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}`
    }

    // Return original URL if no match
    return url
  }

  const handleUrlInput = (url: string) => {
    const embedUrl = getEmbedUrl(url)
    updateAttributes({ src: embedUrl })
  }

  if (!node.attrs.src) {
    return (
      <NodeViewWrapper>
        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
          <div className="space-y-4">
            <Video className="h-12 w-12 mx-auto text-muted-foreground" />
            <div>
              <h3 className="text-lg font-medium">Embed a video</h3>
              <p className="text-sm text-muted-foreground">Paste a YouTube or Vimeo URL</p>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button className="flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Add Video URL
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-3">
                  <Label htmlFor="video-url">Video URL</Label>
                  <Input
                    id="video-url"
                    placeholder="https://youtube.com/watch?v=..."
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleUrlInput((e.target as HTMLInputElement).value)
                      }
                    }}
                  />
                  <Button
                    size="sm"
                    onClick={() => {
                      const input = document.getElementById("video-url") as HTMLInputElement
                      handleUrlInput(input.value)
                    }}
                  >
                    Embed Video
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </NodeViewWrapper>
    )
  }

  return (
    <NodeViewWrapper>
      <div className="relative group">
        <div className="aspect-video">
          <iframe
            src={node.attrs.src}
            width={node.attrs.width}
            height={node.attrs.height}
            className="w-full h-full rounded-lg"
            frameBorder="0"
            allowFullScreen
          />
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
                <h4 className="font-medium">Video Settings</h4>
                <div className="space-y-2">
                  <Label htmlFor="video-src">Video URL</Label>
                  <Input
                    id="video-src"
                    value={node.attrs.src}
                    onChange={(e) => updateAttributes({ src: e.target.value })}
                    placeholder="Video embed URL..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor="video-width">Width</Label>
                    <Input
                      id="video-width"
                      type="number"
                      value={node.attrs.width}
                      onChange={(e) => updateAttributes({ width: Number.parseInt(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="video-height">Height</Label>
                    <Input
                      id="video-height"
                      type="number"
                      value={node.attrs.height}
                      onChange={(e) => updateAttributes({ height: Number.parseInt(e.target.value) })}
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
