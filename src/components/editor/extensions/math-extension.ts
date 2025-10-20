import { Node, mergeAttributes } from "@tiptap/core"
import { ReactNodeViewProps, ReactNodeViewRenderer } from "@tiptap/react"
import { MathComponent } from "../components/math-component"

export interface MathOptions {
  HTMLAttributes: Record<string, any>
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    math: {
      setMath: (attributes?: { latex: string; inline?: boolean }) => ReturnType
    }
  }
}

export const MathExtension = Node.create<MathOptions>({
  name: "math",

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
      latex: {
        default: "",
        parseHTML: (element) => element.getAttribute("data-latex"),
        renderHTML: (attributes) => {
          return {
            "data-latex": attributes.latex,
          }
        },
      },
      inline: {
        default: true,
        parseHTML: (element) => element.getAttribute("data-inline") === "true",
        renderHTML: (attributes) => {
          return {
            "data-inline": attributes.inline.toString(),
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
        class: "math-expression",
      }),
      `$${node.attrs.latex}$`,
    ]
  },

  addNodeView() {
    return ReactNodeViewRenderer(MathComponent as unknown as React.FC<ReactNodeViewProps<HTMLElement>>)
  },

  addCommands() {
    return {
      setMath:
        (attributes = { latex: "", inline: true }) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: attributes,
          })
        },
    }
  },
})
