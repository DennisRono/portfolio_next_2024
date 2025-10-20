"use client"

import { useState } from "react"
import { NodeViewWrapper } from "@tiptap/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface MathComponentProps {
  node: {
    attrs: {
      latex: string
      inline: boolean
    }
  }
  updateAttributes: (attributes: Record<string, any>) => void
}

export function MathComponent({ node, updateAttributes }: MathComponentProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [latex, setLatex] = useState(node.attrs.latex)

  const handleSave = () => {
    updateAttributes({ latex })
    setIsEditing(false)
  }

  return (
    <NodeViewWrapper className="inline">
      <Popover open={isEditing} onOpenChange={setIsEditing}>
        <PopoverTrigger asChild>
          <span className="math-expression cursor-pointer bg-muted px-2 py-1 rounded text-sm font-mono hover:bg-muted/80">
            ${node.attrs.latex || "LaTeX"}$
          </span>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="space-y-3">
            <h4 className="font-medium">Edit Math Expression</h4>
            <Input
              value={latex}
              onChange={(e) => setLatex(e.target.value)}
              placeholder="Enter LaTeX expression..."
              className="font-mono text-sm"
            />
            <div className="text-xs text-muted-foreground">Preview: ${latex}$</div>
            <div className="flex gap-2">
              <Button size="sm" onClick={handleSave}>
                Save
              </Button>
              <Button size="sm" variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </NodeViewWrapper>
  )
}
