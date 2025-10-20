"use client"

import { useState } from "react"
import { TiptapEditor } from "./components/tiptap-editor"
import { EditorProvider } from "./context/editor-context"
import { ModeSwitcher } from "./components/mode-switcher"
import { ResponsiveWrapper } from "./components/responsive-wrapper"
import type { EditorMode, EditorConfig } from "./types"

interface EditorProps {
  mode?: EditorMode
  config?: Partial<EditorConfig>
  placeholder?: string
  content?: string
  onChange?: (content: string) => void
  onMention?: (query: string) => Promise<Array<{ id: string; label: string; avatar?: string }>>
  className?: string
  fullscreen?: boolean
  readOnly?: boolean
  showModeSwitcher?: boolean
  onSubmit?: () => void
  onCancel?: () => void
}

export function Editor({
  mode = "blog",
  config = {},
  placeholder = "Start writing...",
  content = "",
  onChange,
  onMention,
  className = "",
  fullscreen = false,
  readOnly = false,
  showModeSwitcher = false,
  onSubmit,
  onCancel,
}: EditorProps) {
  const [currentMode, setCurrentMode] = useState<EditorMode>(mode)
  const [isFullscreen, setIsFullscreen] = useState(fullscreen)

  const editorConfig: EditorConfig = {
    mode: currentMode,
    placeholder: getPlaceholderForMode(currentMode, placeholder),
    content,
    onChange,
    onMention,
    fullscreen: isFullscreen,
    readOnly,
    showToolbar: currentMode !== "comment" || showModeSwitcher,
    showMenuBar: currentMode === "fullpage",
    enableCollaboration: config.enableCollaboration ?? false,
    enableAI: config.enableAI ?? false,
    maxLength: config.maxLength,
    onSubmit,
    onCancel,
    ...config,
  }

  function getPlaceholderForMode(mode: EditorMode, defaultPlaceholder: string): string {
    switch (mode) {
      case "comment":
        return "Add a comment..."
      case "blog":
        return "Write your blog post..."
      case "fullpage":
        return "Start writing your document..."
      default:
        return defaultPlaceholder
    }
  }

  return (
    <EditorProvider config={editorConfig}>
      <div className={`ultimate-editor ${className}`}>
        <ResponsiveWrapper>
          {showModeSwitcher && (
            <ModeSwitcher
              currentMode={currentMode}
              onModeChange={setCurrentMode}
              isFullscreen={isFullscreen}
              onFullscreenToggle={() => setIsFullscreen(!isFullscreen)}
            />
          )}
          <TiptapEditor />
        </ResponsiveWrapper>
      </div>
    </EditorProvider>
  )
}

export * from "./types"
export * from "./components"
export * from "./extensions"
