"use client"

import type React from "react"
import { useEditorContext } from "../context/editor-context"
import { useIsMobile } from "@/hooks/use-mobile"


interface ResponsiveWrapperProps {
  children: React.ReactNode
}

export function ResponsiveWrapper({ children }: ResponsiveWrapperProps) {
  const { config } = useEditorContext()
  const isMobile = useIsMobile()

  const getResponsiveClasses = () => {
    const baseClasses = "w-full transition-all duration-200"

    if (config.fullscreen) {
      return `${baseClasses} fixed inset-0 z-50 bg-background`
    }

    switch (config.mode) {
      case "comment":
        return `${baseClasses} ${isMobile ? "min-h-[100px]" : "min-h-[120px]"} max-h-[300px] border border-gray-500 rounded-sm`

      case "blog":
        return `${baseClasses} ${isMobile ? "min-h-[300px]" : "min-h-[400px]"} border border-gray-500 rounded-sm`

      case "fullpage":
        return `${baseClasses} ${isMobile ? "min-h-screen" : "min-h-[600px]"} border border-gray-500 rounded-sm`

      default:
        return `${baseClasses} border rounded-lg`
    }
  }

  return <div className={getResponsiveClasses()}>{children}</div>
}
