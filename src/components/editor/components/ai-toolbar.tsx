"use client"

import { useState } from "react"
import type { Editor } from "@tiptap/react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Sparkles, Wand2, Languages, FileText, Zap, Expand, Shrink, PenTool } from "lucide-react"

interface AIToolbarProps {
  editor: Editor
}

export function AIToolbar({ editor }: AIToolbarProps) {
  const [customPrompt, setCustomPrompt] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState("spanish")
  const [selectedStyle, setSelectedStyle] = useState("formal")

  const handleCustomGeneration = () => {
    if (customPrompt.trim()) {
      editor.commands.generateContent(customPrompt)
      setCustomPrompt("")
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 hover:from-purple-500/20 hover:to-blue-500/20"
        >
          <Sparkles className="h-4 w-4 mr-2" />
          AI Assistant
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              AI Writing Tools
            </h4>
            <p className="text-sm text-muted-foreground">Select text to use these tools, or generate new content</p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => editor.commands.improveWriting()}
              className="justify-start"
            >
              <Wand2 className="h-4 w-4 mr-2" />
              Improve
            </Button>
            <Button variant="outline" size="sm" onClick={() => editor.commands.fixGrammar()} className="justify-start">
              <Zap className="h-4 w-4 mr-2" />
              Fix Grammar
            </Button>
            <Button variant="outline" size="sm" onClick={() => editor.commands.expandText()} className="justify-start">
              <Expand className="h-4 w-4 mr-2" />
              Expand
            </Button>
            <Button variant="outline" size="sm" onClick={() => editor.commands.shortenText()} className="justify-start">
              <Shrink className="h-4 w-4 mr-2" />
              Shorten
            </Button>
          </div>

          {/* Translation */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Translate</Label>
            <div className="flex gap-2">
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="flex-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="spanish">Spanish</SelectItem>
                  <SelectItem value="french">French</SelectItem>
                  <SelectItem value="german">German</SelectItem>
                  <SelectItem value="italian">Italian</SelectItem>
                  <SelectItem value="portuguese">Portuguese</SelectItem>
                </SelectContent>
              </Select>
              <Button
                size="sm"
                onClick={() => editor.commands.translateText(selectedLanguage)}
                className="flex items-center gap-1"
              >
                <Languages className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Writing Style */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Change Style</Label>
            <div className="flex gap-2">
              <Select value={selectedStyle} onValueChange={setSelectedStyle}>
                <SelectTrigger className="flex-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="formal">Formal</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="academic">Academic</SelectItem>
                  <SelectItem value="creative">Creative</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                </SelectContent>
              </Select>
              <Button
                size="sm"
                onClick={() => editor.commands.changeWritingStyle(selectedStyle)}
                className="flex items-center gap-1"
              >
                <PenTool className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Summarize */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => editor.commands.summarizeText()}
            className="w-full justify-start"
          >
            <FileText className="h-4 w-4 mr-2" />
            Summarize Document
          </Button>

          {/* Custom Generation */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Generate Content</Label>
            <Textarea
              placeholder="Describe what you want to write about..."
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              className="min-h-[60px] resize-none"
            />
            <Button size="sm" onClick={handleCustomGeneration} disabled={!customPrompt.trim()} className="w-full">
              <Sparkles className="h-4 w-4 mr-2" />
              Generate
            </Button>
          </div>

          {/* Keyboard Shortcuts */}
          <div className="pt-2 border-t border-border">
            <p className="text-xs text-muted-foreground mb-2">Keyboard Shortcuts:</p>
            <div className="space-y-1 text-xs text-muted-foreground">
              <div className="flex justify-between">
                <span>Improve Writing</span>
                <kbd className="px-1 py-0.5 bg-muted rounded text-xs">⌘⇧I</kbd>
              </div>
              <div className="flex justify-between">
                <span>Fix Grammar</span>
                <kbd className="px-1 py-0.5 bg-muted rounded text-xs">⌘⇧G</kbd>
              </div>
              <div className="flex justify-between">
                <span>Summarize</span>
                <kbd className="px-1 py-0.5 bg-muted rounded text-xs">⌘⇧S</kbd>
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
