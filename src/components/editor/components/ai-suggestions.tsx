"use client"

import { useState, useEffect } from "react"
import type { Editor } from "@tiptap/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Check, Sparkles } from "lucide-react"

interface AISuggestionsProps {
  editor: Editor
  isVisible: boolean
  onClose: () => void
}

interface Suggestion {
  id: string
  type: "grammar" | "style" | "clarity" | "tone"
  message: string
  original: string
  suggested: string
  confidence: number
}

export function AISuggestions({ editor, isVisible, onClose }: AISuggestionsProps) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])

  useEffect(() => {
    if (isVisible) {
      // Simulate AI suggestions based on current content
      const content = editor.getText()
      const mockSuggestions = generateMockSuggestions(content)
      setSuggestions(mockSuggestions)
    }
  }, [isVisible, editor])

  const applySuggestion = (suggestion: Suggestion) => {
    // Find and replace the text in the editor
    const { state } = editor
    const { doc } = state

    doc.descendants((node, pos) => {
      if (node.isText && node.text?.includes(suggestion.original)) {
        const start = pos + node.text.indexOf(suggestion.original)
        const end = start + suggestion.original.length

        editor.chain().focus().setTextSelection({ from: start, to: end }).insertContent(suggestion.suggested).run()

        // Remove the applied suggestion
        setSuggestions((prev) => prev.filter((s) => s.id !== suggestion.id))
        return false
      }
    })
  }

  const dismissSuggestion = (suggestionId: string) => {
    setSuggestions((prev) => prev.filter((s) => s.id !== suggestionId))
  }

  const generateMockSuggestions = (content: string): Suggestion[] => {
    const suggestions: Suggestion[] = []

    // Grammar suggestions
    if (content.includes("i am")) {
      suggestions.push({
        id: "1",
        type: "grammar",
        message: "Capitalize 'I' in English",
        original: "i am",
        suggested: "I am",
        confidence: 95,
      })
    }

    // Style suggestions
    if (content.includes("very good")) {
      suggestions.push({
        id: "2",
        type: "style",
        message: "Consider using a stronger adjective",
        original: "very good",
        suggested: "excellent",
        confidence: 80,
      })
    }

    // Clarity suggestions
    if (content.includes("thing")) {
      suggestions.push({
        id: "3",
        type: "clarity",
        message: "Be more specific than 'thing'",
        original: "thing",
        suggested: "concept",
        confidence: 70,
      })
    }

    // Tone suggestions
    if (content.includes("I think")) {
      suggestions.push({
        id: "4",
        type: "tone",
        message: "Consider a more confident tone",
        original: "I think",
        suggested: "I believe",
        confidence: 75,
      })
    }

    return suggestions
  }

  const getTypeColor = (type: Suggestion["type"]) => {
    switch (type) {
      case "grammar":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "style":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "clarity":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "tone":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  if (!isVisible || suggestions.length === 0) {
    return null
  }

  return (
    <div className="fixed right-4 top-20 w-80 max-h-96 overflow-y-auto z-50">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-purple-500" />
              <h3 className="font-medium">AI Suggestions</h3>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-3">
            {suggestions.map((suggestion) => (
              <div key={suggestion.id} className="border border-border rounded-lg p-3">
                <div className="flex items-start justify-between mb-2">
                  <Badge className={`text-xs ${getTypeColor(suggestion.type)}`}>
                    {suggestion.type.charAt(0).toUpperCase() + suggestion.type.slice(1)}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{suggestion.confidence}% confident</span>
                </div>

                <p className="text-sm mb-2">{suggestion.message}</p>

                <div className="space-y-1 mb-3">
                  <div className="text-xs text-muted-foreground">Original:</div>
                  <div className="text-sm bg-red-50 dark:bg-red-950 px-2 py-1 rounded">"{suggestion.original}"</div>
                  <div className="text-xs text-muted-foreground">Suggested:</div>
                  <div className="text-sm bg-green-50 dark:bg-green-950 px-2 py-1 rounded">
                    "{suggestion.suggested}"
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" onClick={() => applySuggestion(suggestion)} className="flex items-center gap-1">
                    <Check className="h-3 w-3" />
                    Apply
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => dismissSuggestion(suggestion.id)}
                    className="flex items-center gap-1"
                  >
                    <X className="h-3 w-3" />
                    Dismiss
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
