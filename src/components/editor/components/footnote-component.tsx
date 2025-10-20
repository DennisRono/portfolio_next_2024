"use client"
import { NodeViewWrapper } from "@tiptap/react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface FootnoteComponentProps {
  node: {
    attrs: {
      id: string
      content: string
    }
  }
  updateAttributes: (attributes: Record<string, any>) => void
}

export function FootnoteComponent({ node, updateAttributes }: FootnoteComponentProps) {
  return (
    <NodeViewWrapper className="inline">
      <Popover>
        <PopoverTrigger asChild>
          <span className="footnote-ref cursor-pointer text-primary text-xs align-super hover:bg-primary/10 px-1 rounded">
            [{node.attrs.id}]
          </span>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="space-y-2">
            <h4 className="font-medium">Footnote {node.attrs.id}</h4>
            <textarea
              className="w-full p-2 border rounded text-sm resize-none"
              rows={3}
              value={node.attrs.content}
              onChange={(e) => updateAttributes({ content: e.target.value })}
              placeholder="Enter footnote content..."
            />
          </div>
        </PopoverContent>
      </Popover>
    </NodeViewWrapper>
  )
}
