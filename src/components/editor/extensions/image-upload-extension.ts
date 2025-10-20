import { Node, mergeAttributes } from "@tiptap/core"
import { ReactNodeViewProps, ReactNodeViewRenderer } from "@tiptap/react"
import { ImageUploadComponent } from "../components/image-upload-component"

export interface ImageUploadOptions {
  HTMLAttributes: Record<string, any>
  onUpload?: (file: File) => Promise<string>
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    imageUpload: {
      setImageUpload: (attributes?: { src?: string; alt?: string; title?: string }) => ReturnType
    }
  }
}

export const ImageUploadExtension = Node.create<ImageUploadOptions>({
  name: "imageUpload",

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
        parseHTML: (element) => element.getAttribute("src"),
        renderHTML: (attributes) => {
          if (!attributes.src) {
            return {}
          }
          return {
            src: attributes.src,
          }
        },
      },
      alt: {
        default: null,
        parseHTML: (element) => element.getAttribute("alt"),
        renderHTML: (attributes) => {
          if (!attributes.alt) {
            return {}
          }
          return {
            alt: attributes.alt,
          }
        },
      },
      title: {
        default: null,
        parseHTML: (element) => element.getAttribute("title"),
        renderHTML: (attributes) => {
          if (!attributes.title) {
            return {}
          }
          return {
            title: attributes.title,
          }
        },
      },
      width: {
        default: null,
        parseHTML: (element) => element.getAttribute("width"),
        renderHTML: (attributes) => {
          if (!attributes.width) {
            return {}
          }
          return {
            width: attributes.width,
          }
        },
      },
      height: {
        default: null,
        parseHTML: (element) => element.getAttribute("height"),
        renderHTML: (attributes) => {
          if (!attributes.height) {
            return {}
          }
          return {
            height: attributes.height,
          }
        },
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: "img[src]",
      },
    ]
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      "img",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        class: "rounded-lg max-w-full h-auto",
      }),
    ]
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageUploadComponent as unknown as React.FC<ReactNodeViewProps<HTMLElement>>)
  },

  addCommands() {
    return {
      setImageUpload:
        (attributes = {}) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: attributes,
          })
        },
    }
  },
})
