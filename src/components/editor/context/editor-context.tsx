"use client"

import { createContext, useContext, type ReactNode } from "react"
import type { EditorConfig } from "../types"

interface EditorContextType {
  config: EditorConfig
}

const EditorContext = createContext<EditorContextType | undefined>(undefined)

export function EditorProvider({
  children,
  config,
}: {
  children: ReactNode
  config: EditorConfig
}) {
  return <EditorContext.Provider value={{ config }}>{children}</EditorContext.Provider>
}

export function useEditorContext() {
  const context = useContext(EditorContext)
  if (!context) {
    throw new Error("useEditorContext must be used within EditorProvider")
  }
  return context
}
