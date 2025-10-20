import { Node, mergeAttributes } from '@tiptap/core'
import type { SuggestionOptions } from '@tiptap/suggestion'
import { PluginKey } from '@tiptap/pm/state'

export interface MentionOptions {
  HTMLAttributes: Record<string, any>
  renderLabel: (props: { options: MentionOptions; node: any }) => string
  suggestion: Omit<SuggestionOptions, 'editor'>
  onMention?: (query: string) => Promise<Array<{ id: string; label: string; avatar?: string }>>
}

export const MentionExtension = Node.create<MentionOptions>({
  name: 'mention',

  addOptions() {
    return {
      HTMLAttributes: {},
      renderLabel({ node }) {
        return `@${node.attrs.label ?? node.attrs.id}`
      },
      suggestion: {
        char: '@',
        pluginKey: new PluginKey('mention'),
        command: ({ editor, range, props }) => {
          editor
            .chain()
            .focus()
            .insertContentAt(range, [
              {
                type: this.name,
                attrs: props,
              },
              { type: 'text', text: ' ' },
            ])
            .run()
        },
        allow: ({ state, range }) => {
          const $from = state.doc.resolve(range.from)
          const type = state.schema.nodes[this.name]
          return !!$from.parent.type.contentMatch.matchType(type)
        },
      },
      onMention: undefined,
    }
  },

  group: 'inline',
  inline: true,
  selectable: false,
  atom: true,

  addAttributes() {
    return {
      id: {
        default: null,
        parseHTML: (el) => el.getAttribute('data-id'),
        renderHTML: (attrs) => (attrs.id ? { 'data-id': attrs.id } : {}),
      },
      label: {
        default: null,
        parseHTML: (el) => el.getAttribute('data-label'),
        renderHTML: (attrs) => (attrs.label ? { 'data-label': attrs.label } : {}),
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
      'span',
      mergeAttributes(
        { 'data-type': this.name },
        this.options.HTMLAttributes,
        HTMLAttributes,
        {
          class:
            'mention bg-primary/10 text-primary px-1 py-0.5 rounded text-sm font-medium',
        },
      ),
      this.options.renderLabel({ options: this.options, node }),
    ]
  },

  renderText({ node }) {
    return this.options.renderLabel({ options: this.options, node })
  },

  addKeyboardShortcuts() {
    return {
      Backspace: () =>
        this.editor.commands.command(({ tr, state }) => {
          let isMention = false
          const { selection } = state
          const { empty, anchor } = selection

          if (!empty) return false

          state.doc.nodesBetween(anchor - 1, anchor, (node, pos) => {
            if (node.type.name === this.name) {
              isMention = true
              tr.insertText(
                this.options.suggestion.char || '',
                pos,
                pos + node.nodeSize,
              )
              return false
            }
          })

          return isMention
        }),
    }
  },
})
