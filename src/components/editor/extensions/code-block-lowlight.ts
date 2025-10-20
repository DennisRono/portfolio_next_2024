import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight"
import {common, createLowlight} from 'lowlight'

// Import common languages
import javascript from "highlight.js/lib/languages/javascript"
import typescript from "highlight.js/lib/languages/typescript"
import python from "highlight.js/lib/languages/python"
import css from "highlight.js/lib/languages/css"
import html from "highlight.js/lib/languages/xml"
import json from "highlight.js/lib/languages/json"
import bash from "highlight.js/lib/languages/bash"
import sql from "highlight.js/lib/languages/sql"

const lowlight = createLowlight(common)

// Register languages
lowlight.register("javascript", javascript)
lowlight.register("typescript", typescript)
lowlight.register("python", python)
lowlight.register("css", css)
lowlight.register("html", html)
lowlight.register("json", json)
lowlight.register("bash", bash)
lowlight.register("sql", sql)

export const CodeBlockLowlightExtension = CodeBlockLowlight.configure({
  lowlight,
  HTMLAttributes: {
    class: "hljs rounded-lg bg-muted p-4 font-mono text-sm overflow-x-auto",
  },
})
