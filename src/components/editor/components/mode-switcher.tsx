"use client"
import { Button } from "@/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { FileText, MessageSquare, Maximize, Minimize } from "lucide-react"
import type { EditorMode } from "../types"

interface ModeSwitcherProps {
  currentMode: EditorMode
  onModeChange: (mode: EditorMode) => void
  isFullscreen: boolean
  onFullscreenToggle: () => void
}

export function ModeSwitcher({ currentMode, onModeChange, isFullscreen, onFullscreenToggle }: ModeSwitcherProps) {
  return (
    <div className="flex items-center gap-2 p-2 border-b border-border">
      <ToggleGroup
        type="single"
        value={currentMode}
        onValueChange={(value) => value && onModeChange(value as EditorMode)}
        className="gap-1"
      >
        <ToggleGroupItem value="blog" aria-label="Blog mode" size="sm">
          <FileText className="h-4 w-4 mr-2" />
          Blog
        </ToggleGroupItem>
        <ToggleGroupItem value="comment" aria-label="Comment mode" size="sm">
          <MessageSquare className="h-4 w-4 mr-2" />
          Comment
        </ToggleGroupItem>
        <ToggleGroupItem value="fullpage" aria-label="Fullpage mode" size="sm">
          <Maximize className="h-4 w-4 mr-2" />
          Document
        </ToggleGroupItem>
      </ToggleGroup>

      <div className="ml-auto">
        <Button
          variant="ghost"
          size="sm"
          onClick={onFullscreenToggle}
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
          {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  )
}
