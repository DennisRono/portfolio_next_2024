"use client"
import type { Editor } from "@tiptap/react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ImageIcon, Video, File, Plus } from "lucide-react"

interface MediaToolbarProps {
  editor: Editor
}

export function MediaToolbar({ editor }: MediaToolbarProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" type="button" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Media
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48">
        <div className="grid gap-2">
          <Button variant="ghost" type="button" size="sm" onClick={() => editor.commands.setImageUpload()} className="justify-start">
            <ImageIcon className="h-4 w-4 mr-2" />
            Add Image
          </Button>
          <Button variant="ghost" type="button" size="sm" onClick={() => editor.commands.setVideoEmbed()} className="justify-start">
            <Video className="h-4 w-4 mr-2" />
            Embed Video
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.commands.setFileAttachment()}
            className="justify-start"
          >
            <File className="h-4 w-4 mr-2" />
            Attach File
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
