"use client"
import { Check, Copy, Code } from "lucide-react"
import React from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

interface CodeBlockHeaderProps {
  children: string
  language?: string
}

export default function CodeBlockHeader({ children, language }: CodeBlockHeaderProps) {
  const [copyOk, setCopyOk] = React.useState(false)
  const [isHovering, setIsHovering] = React.useState(false)

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation()
    const textToCopy = typeof children === "string" ? children.trim() : ""

    if (textToCopy) {
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          setCopyOk(true)
          setTimeout(() => setCopyOk(false), 1500)
        })
        .catch((err) => console.error("Failed to copy text: ", err))
    }
  }

  return (
    <div className="flex items-center justify-between w-full bg-black px-4 py-0.5 rounded-t-[7px] border border-[#2e2e2e]">
      <div className="flex items-center gap-2">
        <Code className="h-4 w-4 text-zinc-400" />
        {language && <span className="text-xs font-mono text-zinc-400 uppercase">{language}</span>}
      </div>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={handleCopy}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className={cn(
                "relative flex items-center justify-center h-8 w-8 rounded-md transition-all",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isHovering ? "bg-zinc-700" : "bg-transparent",
              )}
              aria-label={copyOk ? "Copied!" : "Copy code"}
            >
              <div
                className={cn(
                  "absolute inset-0 flex items-center justify-center transition-all duration-300",
                  copyOk ? "opacity-100 scale-100" : "opacity-0 scale-75",
                )}
              >
                <Check className="h-4 w-4 text-green-500" />
              </div>
              <div
                className={cn(
                  "absolute inset-0 flex items-center justify-center transition-all duration-300",
                  copyOk ? "opacity-0 scale-75" : "opacity-100 scale-100",
                )}
              >
                <Copy className="h-4 w-4 text-zinc-400" />
              </div>
            </button>
          </TooltipTrigger>
          <TooltipContent side="left" className="text-xs">
            {copyOk ? "Copied!" : "Copy code"}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

