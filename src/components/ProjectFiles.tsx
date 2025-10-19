'use client'
import { useState } from 'react'
import {
  FileText,
  ImageIcon,
  Archive,
  File,
  ChevronDown,
  Folder,
} from 'lucide-react'
import DownloadButton from '@/components/DownloadButton'
import type { DocType } from '@/interfaces'

export default function ProjectFiles({ docs }: { docs: DocType[] }) {
  const groupedDocs = docs.reduce((acc, doc) => {
    const type = doc.type || 'Other'
    if (!acc[type]) {
      acc[type] = []
    }
    acc[type].push(doc)
    return acc
  }, {} as Record<string, DocType[]>)

  const [isOpen, setIsOpen] = useState(false)
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set())

  const toggleFolder = (type: string) => {
    const newExpanded = new Set(expandedFolders)
    if (newExpanded.has(type)) {
      newExpanded.delete(type)
    } else {
      newExpanded.add(type)
    }
    setExpandedFolders(newExpanded)
  }

  const getFileIcon = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase() || ''
    const iconProps = { className: 'w-3 h-3 flex-shrink-0' }

    if (['pdf', 'doc', 'docx', 'txt'].includes(ext)) {
      return <FileText {...iconProps} />
    }
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) {
      return <ImageIcon {...iconProps} />
    }
    if (['zip', 'rar', '7z'].includes(ext)) {
      return <Archive {...iconProps} />
    }
    return <File {...iconProps} />
  }

  if (docs.length === 0) {
    return null
  }

  return (
    <div className="w-full mb-6">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-muted hover:bg-muted/80 transition-colors text-sm font-medium text-foreground"
        >
          <Folder className="w-4 h-4" />
          <span>{docs.length} files</span>
          <ChevronDown className="w-3.5 h-3.5" />
        </button>
      ) : (
        <div className="border border-border rounded-sm bg-card overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/50">
            <div className="flex items-center gap-2">
              <Folder className="w-4 h-4 text-foreground" />
              <span className="text-sm font-semibold text-foreground">
                Files
              </span>
              <span className="text-xs text-muted-foreground">
                ({docs.length})
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-muted rounded transition-colors"
              title="Collapse files"
            >
              <ChevronDown className="w-4 h-4 text-foreground rotate-180" />
            </button>
          </div>

          <div className="max-h-96 overflow-y-auto">
            <div className="py-1">
              {Object.entries(groupedDocs).map(([type, typeDocs]) => (
                <div key={type}>
                  <button
                    onClick={() => toggleFolder(type)}
                    className="w-full flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition-colors group"
                  >
                    <ChevronDown
                      className={`w-3.5 h-3.5 flex-shrink-0 transition-transform ${
                        expandedFolders.has(type) ? '' : '-rotate-90'
                      }`}
                    />
                    <Folder className="w-3.5 h-3.5 flex-shrink-0 text-primary" />
                    <span className="truncate text-xs">{type}</span>
                    <span className="ml-auto text-muted-foreground text-xs">
                      {typeDocs.length}
                    </span>
                  </button>

                  {expandedFolders.has(type) && (
                    <div className="space-y-0">
                      {typeDocs.map((doc) => (
                        <div
                          key={doc.file_name}
                          className="flex items-center gap-2 px-3 py-1.5 ml-4 text-xs text-foreground hover:bg-muted group transition-colors rounded"
                        >
                          <div className="w-3 flex-shrink-0">
                            {getFileIcon(doc.file_name)}
                          </div>
                          <span className="truncate text-xs">
                            {doc.file_name}
                          </span>
                          <div className="opacity-80 group-hover:opacity-100 transition-opacity flex-shrink-0" title='Download'>
                            <DownloadButton
                              url={doc.path}
                              filename={doc.file_name}
                              label=""
                              loadingLabel=""
                              className="h-5 w-5 p-0 text-foreground hover:text-primary"
                              showProgress={false}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
