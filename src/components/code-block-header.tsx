'use client'
import { Check, Copy, Code, X } from 'lucide-react'
import React from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

interface CodeBlockHeaderProps {
  children: string
  language?: string
}

export default function CodeBlockHeader({
  children,
  language,
}: CodeBlockHeaderProps) {
  const [copyState, setCopyState] = React.useState<
    'idle' | 'success' | 'error'
  >('idle')

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation()
    const textToCopy = typeof children === 'string' ? children.trim() : ''

    if (!textToCopy) {
      setCopyState('error')
      setTimeout(() => setCopyState('idle'), 1500)
      return
    }

    try {
      if (!navigator.clipboard) {
        throw new Error('Clipboard API not available')
      }

      await navigator.clipboard.writeText(textToCopy)
      setCopyState('success')
    } catch (err) {
      console.error('Failed to copy text: ', err)
      setCopyState('error')
    } finally {
      setTimeout(() => setCopyState('idle'), 1500)
    }
  }

  const getTooltipText = () => {
    switch (copyState) {
      case 'success':
        return 'Copied!'
      case 'error':
        return 'Failed to copy!'
      default:
        return 'Copy code'
    }
  }

  return (
    <div className="flex items-center justify-between w-full bg-black px-4 py-0.5 rounded-t-[7px] border border-[#2e2e2e]">
      <div className="flex items-center gap-2">
        <Code className="h-4 w-4 text-zinc-400" />
        {language && (
          <span className="text-xs font-mono text-zinc-400 uppercase">
            {language}
          </span>
        )}
      </div>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={handleCopy}
              className={cn(
                'relative flex items-center justify-center h-8 w-8 rounded-md transition-all',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
              )}
              aria-label={getTooltipText()}
            >
              <div
                className={cn(
                  'absolute inset-0 flex items-center justify-center transition-all duration-300',
                  copyState === 'success'
                    ? 'opacity-100 scale-100'
                    : 'opacity-0 scale-75'
                )}
              >
                <Check className="h-3 w-3 text-green-500" />
              </div>

              <div
                className={cn(
                  'absolute inset-0 flex items-center justify-center transition-all duration-300',
                  copyState === 'error'
                    ? 'opacity-100 scale-100'
                    : 'opacity-0 scale-75'
                )}
              >
                <X className="h-3 w-3 text-red-500" />
              </div>

              <div
                className={cn(
                  'absolute inset-0 flex items-center justify-center transition-all duration-300',
                  copyState === 'idle'
                    ? 'opacity-100 scale-100'
                    : 'opacity-0 scale-75'
                )}
              >
                <Copy className="h-3 w-3 text-zinc-400" />
              </div>
            </button>
          </TooltipTrigger>
          <TooltipContent
            side="left"
            className={cn(
              'text-xs p-1 rounded-[5px]',
              copyState === 'error' && 'bg-red-500/90 text-white border-red-600'
            )}
          >
            {getTooltipText()}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
