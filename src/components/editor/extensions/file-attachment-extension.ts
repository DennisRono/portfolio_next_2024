import { Node, mergeAttributes } from "@tiptap/core"
import { ReactNodeViewProps, ReactNodeViewRenderer } from "@tiptap/react"
import { FileAttachmentComponent } from "../components/file-attachment-component"

export interface FileAttachmentOptions {
  HTMLAttributes: Record<string, any>
  onUpload?: (file: File) => Promise<string>
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    fileAttachment: {
      setFileAttachment: (attributes?: { src: string; name: string; size?: number; type?: string }) => ReturnType
    }
  }
}

export const FileAttachmentExtension = Node.create<FileAttachmentOptions>({
  name: "fileAttachment",

  addOptions() {
    return {
      HTMLAttributes: {},
      onUpload: undefined,
    }
  },

  group: "block",

  draggable: true,

  addAttributes() {
    return {
      src: {
        default: null,
        parseHTML: (element) => element.getAttribute("href"),
        renderHTML: (attributes) => {
          if (!attributes.src) {
            return {}
          }
          return {
            href: attributes.src,
          }
        },
      },
      name: {
        default: "Untitled",
        parseHTML: (element) => element.textContent,
        renderHTML: (attributes) => {
          return {}
        },
      },
      size: {
        default: 0,
        parseHTML: (element) => Number.parseInt(element.getAttribute("data-size") || "0"),
        renderHTML: (attributes) => {
          return {
            "data-size": attributes.size,
          }
        },
      },
      type: {
        default: "application/octet-stream",
        parseHTML: (element) => element.getAttribute("data-type"),
        renderHTML: (attributes) => {
          return {
            "data-type": attributes.type,
          }
        },
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'a[data-type="file-attachment"]',
      },
    ]
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      "a",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        "data-type": "file-attachment",
        class: "file-attachment",
      }),
      node.attrs.name,
    ]
  },

  addNodeView() {
    return ReactNodeViewRenderer(FileAttachmentComponent as unknown as React.FC<ReactNodeViewProps<HTMLElement>>)
  },

  addCommands() {
    return {
      setFileAttachment:
        (attributes = { src: "", name: "Untitled" }) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: attributes,
          })
        },
    }
  },
})
