import { Node, mergeAttributes } from "@tiptap/core"
import { ReactNodeViewProps, ReactNodeViewRenderer } from "@tiptap/react"
import { FootnoteComponent } from "../components/footnote-component"

export interface FootnoteOptions {
  HTMLAttributes: Record<string, any>
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    footnote: {
      setFootnote: (attributes?: { id: string; content: string }) => ReturnType
    }
  }
}

export const FootnoteExtension = Node.create<FootnoteOptions>({
  name: "footnote",

  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },

  group: "inline",

  inline: true,

  selectable: false,

  atom: true,

  addAttributes() {
    return {
      id: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-id"),
        renderHTML: (attributes) => {
          if (!attributes.id) {
            return {}
          }
          return {
            "data-id": attributes.id,
          }
        },
      },
      content: {
        default: "",
        parseHTML: (element) => element.getAttribute("data-content"),
        renderHTML: (attributes) => {
          if (!attributes.content) {
            return {}
          }
          return {
            "data-content": attributes.content,
          }
        },
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: `span[data-type="${this.name}"]`,
      },
    ]
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      "span",
      mergeAttributes({ "data-type": this.name }, this.options.HTMLAttributes, HTMLAttributes, {
        class: "footnote-ref cursor-pointer text-primary text-xs align-super",
      }),
      `[${node.attrs.id}]`,
    ]
  },

  addNodeView() {
    return ReactNodeViewRenderer(FootnoteComponent as unknown as React.FC<ReactNodeViewProps<HTMLElement>>)
  },

  addCommands() {
    return {
      setFootnote:
        (attributes = { id: "", content: "" }) =>
        ({ commands }) => {
          const id = attributes.id || Date.now().toString()
          return commands.insertContent({
            type: this.name,
            attrs: { ...attributes, id },
          })
        },
    }
  },
})
