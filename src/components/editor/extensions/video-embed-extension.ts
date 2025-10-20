import { Node, mergeAttributes } from "@tiptap/core"
import { ReactNodeViewProps, ReactNodeViewRenderer } from "@tiptap/react"
import { VideoEmbedComponent } from "../components/video-embed-component"

export interface VideoEmbedOptions {
  HTMLAttributes: Record<string, any>
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    videoEmbed: {
      setVideoEmbed: (attributes?: { src: string; width?: number; height?: number }) => ReturnType
    }
  }
}

export const VideoEmbedExtension = Node.create<VideoEmbedOptions>({
  name: "videoEmbed",

  addOptions() {
    return {
      HTMLAttributes: {},
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
      width: {
        default: 640,
        parseHTML: (element) => Number.parseInt(element.getAttribute("width") || "640"),
        renderHTML: (attributes) => {
          return {
            width: attributes.width,
          }
        },
      },
      height: {
        default: 360,
        parseHTML: (element) => Number.parseInt(element.getAttribute("height") || "360"),
        renderHTML: (attributes) => {
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
        tag: "iframe[src]",
      },
    ]
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      "iframe",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        class: "rounded-lg",
        frameborder: "0",
        allowfullscreen: "true",
      }),
    ]
  },

  addNodeView() {
    return ReactNodeViewRenderer(VideoEmbedComponent as unknown as React.FC<ReactNodeViewProps<HTMLElement>>)
  },

  addCommands() {
    return {
      setVideoEmbed:
        (attributes = { src: "", width: 640, height: 360 }) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: attributes,
          })
        },
    }
  },
})
