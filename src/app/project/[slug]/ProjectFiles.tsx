'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Loader2, CloudDownload, FileIcon } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

interface DocState {
  type: string
  path: string
  file_name: string
}

const ProjectFiles = ({ docs }: { docs: DocState[] }) => {
  const [downloadingFiles, setDownloadingFiles] = useState<Set<string>>(
    new Set()
  )

  const handleDownload = async (doc: DocState) => {
    setDownloadingFiles((prev) => new Set(prev).add(doc.file_name))
    try {
      const response = await fetch(doc.path)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.style.display = 'none'
      a.href = url
      a.download = doc.file_name
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error(`Download failed for ${doc.file_name}:`, error)
    } finally {
      setDownloadingFiles((prev) => {
        const newSet = new Set(prev)
        newSet.delete(doc.file_name)
        return newSet
      })
    }
  }
  console.log(docs)

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1" className="border-none">
        <AccordionTrigger className="text-lg font-semibold hover:no-underline">
          Project Files
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex items-center justify-start gap-2 flex-wrap">
            {docs.map((doc: DocState) => (
              <Button
                key={doc.file_name}
                onClick={() => handleDownload(doc)}
                disabled={downloadingFiles.has(doc.file_name)}
                className="w-min justify-start text-left"
                variant="outline"
                title={doc.file_name}
              >
                {downloadingFiles.has(doc.file_name) ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <FileIcon className="mr-2 h-4 w-4" />
                )}
                <span className="flex-grow truncate">
                  {downloadingFiles.has(doc.file_name)
                    ? 'Downloading...'
                    : doc.file_name}
                </span>
                {!downloadingFiles.has(doc.file_name) && (
                  <CloudDownload className="ml-2 h-4 w-4 flex-shrink-0" />
                )}
              </Button>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default ProjectFiles
