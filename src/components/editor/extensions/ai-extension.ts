import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from '@tiptap/pm/state'
import { Decoration, DecorationSet } from '@tiptap/pm/view'

export interface AIExtensionOptions {
  apiKey?: string
  model?: string
  enableAutoSuggestions?: boolean
  enableGrammarCheck?: boolean
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    ai: {
      improveWriting: () => ReturnType
      summarizeText: () => ReturnType
      translateText: (language: string) => ReturnType
      generateContent: (prompt: string) => ReturnType
      fixGrammar: () => ReturnType
      changeWritingStyle: (style: string) => ReturnType
      expandText: () => ReturnType
      shortenText: () => ReturnType
    }
  }
}

/* ------------------------------
   Helper functions (moved out of extension object)
   ------------------------------ */

function simulateAIImprovement(text: string): string {
  const improvements = [
    (t: string) => t.replace(/\b(good|nice|great)\b/gi, 'excellent'),
    (t: string) => t.replace(/\b(big|large)\b/gi, 'substantial'),
    (t: string) => t.replace(/\b(small|little)\b/gi, 'minimal'),
    (t: string) => t.replace(/\b(very)\s+/gi, 'remarkably '),
  ]

  return improvements.reduce((acc, improvement) => improvement(acc), text)
}

function simulateAISummarization(text: string): string {
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0)
  const keyPoints = sentences.slice(
    0,
    Math.min(3, Math.ceil(sentences.length / 3))
  )
  return keyPoints.length ? keyPoints.join('. ') + '.' : ''
}

function simulateAITranslation(text: string, language: string): string {
  const translations: Record<string, Record<string, string>> = {
    spanish: {
      hello: 'hola',
      world: 'mundo',
      the: 'el/la',
      and: 'y',
      is: 'es',
      are: 'son',
    },
    french: {
      hello: 'bonjour',
      world: 'monde',
      the: 'le/la',
      and: 'et',
      is: 'est',
      are: 'sont',
    },
  }

  const dict = translations[language.toLowerCase()] || {}
  let translated = text.toLowerCase()

  Object.entries(dict).forEach(([english, foreign]) => {
    translated = translated.replace(
      new RegExp(`\\b${english}\\b`, 'g'),
      foreign
    )
  })

  return `[Translated to ${language}] ${translated}`
}

function simulateAIGeneration(prompt: string): string {
  const templates = [
    `Based on "${prompt}", here's a generated response: This is an AI-generated content that expands on your prompt with relevant information and insights.`,
    `Regarding "${prompt}": Here are some key points to consider: 1) Context matters, 2) Multiple perspectives exist, 3) Further research may be needed.`,
    `In response to "${prompt}": This topic involves several important aspects that deserve careful consideration and analysis.`,
  ]

  return templates[Math.floor(Math.random() * templates.length)]
}

function simulateGrammarFix(text: string): string {
  return text
    .replace(/\bi\b/g, 'I')
    .replace(/\s+/g, ' ')
    .replace(
      /([.!?])\s*([a-z])/g,
      (match, punct, letter) => `${punct} ${letter.toUpperCase()}`
    )
    .trim()
}

function simulateStyleChange(text: string, style: string): string {
  switch (style.toLowerCase()) {
    case 'formal':
      return text
        .replace(/\bcan't\b/g, 'cannot')
        .replace(/\bwon't\b/g, 'will not')
        .replace(/\bdon't\b/g, 'do not')
    case 'casual':
      return text
        .replace(/\bcannot\b/g, "can't")
        .replace(/\bwill not\b/g, "won't")
        .replace(/\bdo not\b/g, "don't")
    case 'academic':
      return `Furthermore, ${text.replace(
        /\bI think\b/g,
        'it can be argued that'
      )}`
    default:
      return text
  }
}

function simulateTextExpansion(text: string): string {
  const expansions = [
    'This point deserves further elaboration.',
    'To provide more context,',
    "It's worth noting that",
    'Additionally, one should consider',
  ]

  const expansion = expansions[Math.floor(Math.random() * expansions.length)]
  return `${text} ${expansion} this concept involves multiple dimensions and considerations.`
}

function simulateTextShortening(text: string): string {
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0)
  return sentences.length
    ? sentences.slice(0, Math.ceil(sentences.length / 2)).join('. ') + '.'
    : ''
}

function findGrammarErrors(
  text: string
): Array<{ start: number; end: number; message: string }> {
  const errors: Array<{ start: number; end: number; message: string }> = []

  const patterns = [
    { regex: /\bi\s+am\s+/gi, message: "Consider capitalizing 'I'" },
    { regex: /\s{2,}/g, message: 'Multiple spaces detected' },
    { regex: /[.!?]{2,}/g, message: 'Multiple punctuation marks' },
  ]

  patterns.forEach((pattern) => {
    let match: RegExpExecArray | null
    while ((match = pattern.regex.exec(text)) !== null) {
      errors.push({
        start: match.index,
        end: match.index + match[0].length,
        message: pattern.message,
      })
    }
  })

  return errors
}

/* ------------------------------
   Extension
   ------------------------------ */

export const AIExtension = Extension.create<AIExtensionOptions>({
  name: 'ai',

  addOptions() {
    return {
      apiKey: '',
      model: 'gpt-3.5-turbo',
      enableAutoSuggestions: true,
      enableGrammarCheck: true,
    }
  },

  addCommands() {
    return {
      improveWriting:
        () =>
        ({ editor, chain }) => {
          const { from, to } = editor.state.selection
          const selectedText = editor.state.doc.textBetween(from, to)

          if (!selectedText) return false

          const improvedText = simulateAIImprovement(selectedText)
          return chain().insertContentAt({ from, to }, improvedText).run()
        },

      summarizeText:
        () =>
        ({ editor, chain }) => {
          const content = editor.getText()
          if (!content) return false

          const summary = simulateAISummarization(content)
          return chain().insertContent(`\n\n**Summary:** ${summary}`).run()
        },

      translateText:
        (language: string) =>
        ({ editor, chain }) => {
          const { from, to } = editor.state.selection
          const selectedText = editor.state.doc.textBetween(from, to)

          if (!selectedText) return false

          const translatedText = simulateAITranslation(selectedText, language)
          return chain().insertContentAt({ from, to }, translatedText).run()
        },

      generateContent:
        (prompt: string) =>
        ({ editor, chain }) => {
          const generatedContent = simulateAIGeneration(prompt)
          return chain().insertContent(generatedContent).run()
        },

      fixGrammar:
        () =>
        ({ editor, chain }) => {
          const { from, to } = editor.state.selection
          const selectedText = editor.state.doc.textBetween(from, to)

          if (!selectedText) return false

          const fixedText = simulateGrammarFix(selectedText)
          return chain().insertContentAt({ from, to }, fixedText).run()
        },

      changeWritingStyle:
        (style: string) =>
        ({ editor, chain }) => {
          const { from, to } = editor.state.selection
          const selectedText = editor.state.doc.textBetween(from, to)

          if (!selectedText) return false

          const styledText = simulateStyleChange(selectedText, style)
          return chain().insertContentAt({ from, to }, styledText).run()
        },

      expandText:
        () =>
        ({ editor, chain }) => {
          const { from, to } = editor.state.selection
          const selectedText = editor.state.doc.textBetween(from, to)

          if (!selectedText) return false

          const expandedText = simulateTextExpansion(selectedText)
          return chain().insertContentAt({ from, to }, expandedText).run()
        },

      shortenText:
        () =>
        ({ editor, chain }) => {
          const { from, to } = editor.state.selection
          const selectedText = editor.state.doc.textBetween(from, to)

          if (!selectedText) return false

          const shortenedText = simulateTextShortening(selectedText)
          return chain().insertContentAt({ from, to }, shortenedText).run()
        },
    }
  },

  addProseMirrorPlugins() {
    // capture options from extension instance so plugin handlers can access them via closure
    const options = this.options

    return [
      new Plugin({
        key: new PluginKey('ai-suggestions'),
        state: {
          init() {
            return DecorationSet.empty
          },
          apply(tr, set) {
            // keep existing decorations in sync with transaction
            set = set.map(tr.mapping, tr.doc)

            if (options.enableGrammarCheck) {
              const decorations: Decoration[] = []

              tr.doc.descendants((node, pos) => {
                if ((node as any).isText && node.text) {
                  // use the top-level helper, not `this.findGrammarErrors`
                  const errors = findGrammarErrors(node.text)
                  errors.forEach((error) => {
                    decorations.push(
                      Decoration.inline(pos + error.start, pos + error.end, {
                        class:
                          'grammar-error underline decoration-wavy decoration-red-500',
                        title: error.message,
                      })
                    )
                  })
                }
              })

              set = set.add(tr.doc, decorations)
            }

            return set
          },
        },
        props: {
          decorations(state) {
            // plugin's `getState` method is available; use pluginKey to fetch state in runtime,
            // but Tiptap expects this kind of pattern. Here `this.getState` is valid because
            // inside plugin props `this` is the plugin instance created above.
            // TypeScript may be picky, but this is the standard approach.
            // (If your TS complains, you can replace with (state) => (this as any).getState(state))
            // We'll use a safe cast to avoid type errors:
            return (this as any).getState(state)
          },
        },
      }),
    ]
  },

  addKeyboardShortcuts() {
    // Use the declared ai commands group
    return {
      'Mod-Shift-i': () =>
        (this.editor.commands as any).ai?.improveWriting?.() ?? false,
      'Mod-Shift-s': () =>
        (this.editor.commands as any).ai?.summarizeText?.() ?? false,
      'Mod-Shift-g': () =>
        (this.editor.commands as any).ai?.fixGrammar?.() ?? false,
    }
  },
})
