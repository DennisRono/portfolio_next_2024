export type EditorMode = "blog" | "comment" | "fullpage"

export interface EditorConfig {
  mode: EditorMode
  placeholder: string
  content: string
  onChange?: (content: string) => void
  onMention?: (query: string) => Promise<Array<{ id: string; label: string; avatar?: string }>>
  fullscreen: boolean
  readOnly: boolean
  showToolbar: boolean
  showMenuBar: boolean
  enableCollaboration: boolean
  enableAI: boolean
  maxLength?: number
  onSubmit?: () => void
  onCancel?: () => void
}

export interface MentionUser {
  id: string
  label: string
  avatar?: string
}

export interface AICommand {
  id: string
  label: string
  description: string
  icon: string
  action: (editor: any) => void
}

export interface EditorTheme {
  primary: string
  secondary: string
  background: string
  foreground: string
  muted: string
  border: string
}
