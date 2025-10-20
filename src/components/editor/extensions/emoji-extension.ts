import { Node, mergeAttributes } from "@tiptap/core"

export interface EmojiOptions {
  HTMLAttributes: Record<string, any>
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    emoji: {
      insertEmoji: (emoji: string) => ReturnType
    }
  }
}

export const EmojiExtension = Node.create<EmojiOptions>({
  name: "emoji",
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
      emoji: {
        default: "😀",
        parseHTML: (element) => element.getAttribute("data-emoji"),
        renderHTML: (attributes) => {
          return {
            "data-emoji": attributes.emoji,
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
        class: "emoji",
      }),
      node.attrs.emoji,
    ]
  },

  addCommands() {
    return {
      insertEmoji:
        (emoji: string) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: { emoji },
          })
        },
    }
  },
})
