import { Extension } from '@tiptap/core'

export interface CollaborationOptions {
  document?: unknown
  field?: string
  fragment?: unknown
  user: {
    name: string
    color: string
  }
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    collaboration: {
      setCollaborationUser: (user: {
        name: string
        color: string
      }) => ReturnType
    }
  }
}

export const CollaborationExtension = Extension.create<CollaborationOptions>({
  name: 'collaboration',
  addOptions() {
    return {
      document: null,
      field: 'default',
      fragment: null,
      user: {
        name: 'Anonymous',
        color: '#f783ac',
      },
    }
  },

  addCommands() {
    return {
      setCollaborationUser:
        (user) =>
        ({ editor }) => {
          this.options.user = user
      
          return true
        },
    }
  },

  onCreate() {
    console.log('Collaboration extension created')
  },

  onDestroy() {
    console.log('Collaboration extension destroyed')
  },
})
