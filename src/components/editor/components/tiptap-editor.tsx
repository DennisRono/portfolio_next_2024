'use client'
import { useEditor, EditorContent } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import { Placeholder } from '@tiptap/extension-placeholder'
import { Typography } from '@tiptap/extension-typography'
import { Link } from '@tiptap/extension-link'
import { Image } from '@tiptap/extension-image'
import { Table } from '@tiptap/extension-table'
import { TableRow } from '@tiptap/extension-table-row'
import { TableHeader } from '@tiptap/extension-table-header'
import { TableCell } from '@tiptap/extension-table-cell'
import { TaskList } from '@tiptap/extension-task-list'
import { TaskItem } from '@tiptap/extension-task-item'
import { Highlight } from '@tiptap/extension-highlight'
import { TextAlign } from '@tiptap/extension-text-align'
import { Color } from '@tiptap/extension-color'
import { TextStyle } from '@tiptap/extension-text-style'
import { Underline } from '@tiptap/extension-underline'
import { Subscript } from '@tiptap/extension-subscript'
import { Superscript } from '@tiptap/extension-superscript'
import { CharacterCount } from '@tiptap/extension-character-count'
import { Markdown } from 'tiptap-markdown'
import { BubbleMenu } from './bubble-menu'
import { CommentToolbar } from './comment-toolbar'
import { FullpageSidebar } from './fullpage-sidebar'
import { AISuggestions } from './ai-suggestions'
import { AIWritingAssistant } from './ai-writing-assistant'
import { useState } from 'react'

import { useEditorContext } from '../context/editor-context'
import { EditorToolbar } from './editor-toolbar'
import { EditorMenuBar } from './editor-menu-bar'
import { MentionExtension } from '../extensions/mention-extension'
import { AIExtension } from '../extensions/ai-extension'
import { CollaborationExtension } from '../extensions/collaboration-extension'
import { CodeBlockLowlightExtension } from '../extensions/code-block-lowlight'
import { FootnoteExtension } from '../extensions/footnote-extension'
import { CalloutExtension } from '../extensions/callout-extension'
import { EmojiExtension } from '../extensions/emoji-extension'
import { MathExtension } from '../extensions/math-extension'
import { DragHandleExtension } from '../extensions/drag-handle-extension'
import { ImageUploadExtension } from '../extensions/image-upload-extension'
import { VideoEmbedExtension } from '../extensions/video-embed-extension'
import { FileAttachmentExtension } from '../extensions/file-attachment-extension'

export function TiptapEditor() {
  const { config } = useEditorContext()
  const [sidebarVisible, setSidebarVisible] = useState(false)
  const [aiSuggestionsVisible, setAiSuggestionsVisible] = useState(false)
  const [aiAssistantVisible, setAiAssistantVisible] = useState(false)

  const extensions = [
    StarterKit.configure({
      bulletList: {
        keepMarks: true,
        keepAttributes: false,
      },
      orderedList: {
        keepMarks: true,
        keepAttributes: false,
      },
      codeBlock: false,
    }),
    Placeholder.configure({
      placeholder: config.placeholder,
    }),
    Markdown.configure({
      html: true, // Allow HTML input/output
      tightLists: true, // No <p> inside <li> in markdown output
      tightListClass: 'tight', // Add class to <ul> allowing you to remove <p> margins when tight
      bulletListMarker: '-', // <li> prefix in markdown output
      linkify: false, // Create links from "https://..." text
      breaks: false, // New lines (\n) in markdown input are converted to <br>
      transformPastedText: false, // Allow to paste markdown text in the editor
      transformCopiedText: false, // Copied text is transformed to markdown
    }),
    Typography,
    Link.configure({
      openOnClick: false,
      HTMLAttributes: {
        class:
          'text-primary underline underline-offset-2 hover:text-primary/80',
      },
    }),
    Image.configure({
      HTMLAttributes: {
        class: 'rounded-lg max-w-full h-auto',
      },
    }),
    Table.configure({
      resizable: true,
    }),
    TableRow,
    TableHeader,
    TableCell,
    TaskList,
    TaskItem.configure({
      nested: true,
    }),
    Highlight.configure({
      multicolor: true,
    }),
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
    Color,
    TextStyle,
    Underline,
    Subscript,
    Superscript,
    CharacterCount.configure({
      limit: config.maxLength,
    }),
    CodeBlockLowlightExtension,
    FootnoteExtension,
    CalloutExtension,
    EmojiExtension,
    MathExtension,
    DragHandleExtension,
    ImageUploadExtension,
    VideoEmbedExtension,
    FileAttachmentExtension,
  ]

  // Add conditional extensions
  // if (config.mode === "comment" && config.onMention) {
  //   extensions.push(
  //     MentionExtension.configure({
  //       onMention: config.onMention,
  //     }),
  //   )
  // }

  if (config.enableAI) {
    extensions.push(
      AIExtension.configure({
        enableAutoSuggestions: true,
        enableGrammarCheck: true,
      })
    )
  }

  if (config.enableCollaboration) {
    extensions.push(CollaborationExtension)
  }

  const editor = useEditor({
    extensions,
    immediatelyRender: false,
    content: config.content,
    editable: !config.readOnly,
    onUpdate: ({ editor }) => {
      const content = editor.getHTML()
      const contentText = editor.getText()
      const contentJson = editor.getJSON()
      const markdownContent = (editor.storage as any).markdown?.getMarkdown?.()
      config.onChange?.(markdownContent ?? content)
      
      // Show AI suggestions after typing
      if (config.enableAI && content.length > 50) {
        setTimeout(() => setAiSuggestionsVisible(true), 1000)
      }
    },
    editorProps: {
      attributes: {
        class: `prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl mx-auto focus:outline-none relative ${
          config.mode === 'comment' ? 'prose-sm max-w-none' : ''
        } ${config.mode === 'fullpage' ? 'max-w-4xl' : ''}`,
      },
    },
  })

  if (!editor) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full relative">
      {config.showMenuBar && <EditorMenuBar editor={editor} />}
      {config.showToolbar && config.mode !== 'comment' && (
        <EditorToolbar
          editor={editor}
          showAI={config.enableAI}
          showWordCount={config.mode !== 'blog'}
        />
      )}

      <div
        className={`flex-1 overflow-auto ${
          config.mode === 'comment' ? 'max-h-32' : ''
        }`}
      >
        <EditorContent
          editor={editor}
          className={`
            min-h-[120px] p-4 
            ${config.mode === 'fullpage' ? 'min-h-screen pr-80' : ''}
            ${config.mode === 'comment' ? 'min-h-[80px] p-3' : ''}
            ${config.mode === 'blog' ? 'min-h-[300px]' : ''}
          `}
        />

        {config.mode !== 'comment' && <BubbleMenu editor={editor} />}
      </div>

      {config.mode === 'comment' && (
        <CommentToolbar
          editor={editor}
          onSubmit={config.onSubmit}
          onCancel={config.onCancel}
        />
      )}

      {config.mode === 'fullpage' && (
        <FullpageSidebar
          editor={editor}
          isVisible={sidebarVisible}
          onToggle={() => setSidebarVisible(!sidebarVisible)}
        />
      )}

      {/* AI */}
      {config.enableAI && (
        <>
          <AISuggestions
            editor={editor}
            isVisible={aiSuggestionsVisible}
            onClose={() => setAiSuggestionsVisible(false)}
          />
          <AIWritingAssistant
            editor={editor}
            isVisible={aiAssistantVisible}
            onClose={() => setAiAssistantVisible(false)}
          />
        </>
      )}
    </div>
  )
}
