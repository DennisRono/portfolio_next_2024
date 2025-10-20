import { Extension } from "@tiptap/core"
import { Plugin, PluginKey } from "@tiptap/pm/state"
import { Decoration, DecorationSet } from "@tiptap/pm/view"

export const DragHandleExtension = Extension.create({
  name: "dragHandle",

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("dragHandle"),
        props: {
          decorations(state) {
            const decorations: Decoration[] = []
            const { doc, selection } = state
            doc.descendants((node, pos) => {
              if (node.isBlock && node.type.name !== "doc") {
                const decoration = Decoration.widget(
                  pos,
                  () => {
                    const handle = document.createElement("div")
                    handle.className =
                      "drag-handle opacity-0 hover:opacity-100 absolute -left-6 top-1 cursor-grab w-4 h-4 bg-muted rounded flex items-center justify-center text-xs"
                    handle.innerHTML = "⋮⋮"
                    handle.draggable = true
                    handle.addEventListener("dragstart", (e) => {
                      e.dataTransfer?.setData("text/plain", pos.toString())
                    })
                    return handle
                  },
                  {
                    side: -1,
                    key: `drag-handle-${pos}`,
                  },
                )
                decorations.push(decoration)
              }
            })

            return DecorationSet.create(doc, decorations)
          },
        },
      }),
    ]
  },

  addGlobalAttributes() {
    return [
      {
        types: ["paragraph", "heading", "blockquote", "codeBlock", "bulletList", "orderedList"],
        attributes: {
          draggable: {
            default: true,
            renderHTML: () => ({
              draggable: "true",
            }),
          },
        },
      },
    ]
  },
})
