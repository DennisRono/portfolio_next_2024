'use client'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import DownloadButton from '@/components/DownloadButton'
import { Folder } from 'lucide-react'

interface DocState {
  type: string
  path: string
  file_name: string
}

export default function ProjectFiles({ docs }: { docs: DocState[] }) {
  // Group files by type
  const groupedDocs = docs.reduce((acc, doc) => {
    const type = doc.type || 'Other'
    if (!acc[type]) {
      acc[type] = []
    }
    acc[type].push(doc)
    return acc
  }, {} as Record<string, DocState[]>)

  // Get file extension
  const getFileExtension = (filename: string) => {
    return filename.split('.').pop()?.toUpperCase() || ''
  }

  // Get file icon color based on type
  const getFileColor = (filename: string) => {
    const ext = getFileExtension(filename).toLowerCase()
    const colorMap: Record<string, string> = {
      pdf: 'bg-red-100 text-red-700 border-red-200',
      doc: 'bg-blue-100 text-blue-700 border-blue-200',
      docx: 'bg-blue-100 text-blue-700 border-blue-200',
      xls: 'bg-green-100 text-green-700 border-green-200',
      xlsx: 'bg-green-100 text-green-700 border-green-200',
      ppt: 'bg-orange-100 text-orange-700 border-orange-200',
      pptx: 'bg-orange-100 text-orange-700 border-orange-200',
      jpg: 'bg-purple-100 text-purple-700 border-purple-200',
      jpeg: 'bg-purple-100 text-purple-700 border-purple-200',
      png: 'bg-purple-100 text-purple-700 border-purple-200',
      zip: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      rar: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    }

    return colorMap[ext] || 'bg-gray-100 text-gray-700 border-gray-200'
  }

  return (
    <div className="my-8 border rounded-lg p-4 bg-card">
      <h3 className="text-xl font-semibold mb-4">Project Files</h3>

      {Object.entries(groupedDocs).length > 0 ? (
        <Accordion type="single" collapsible className="w-full">
          {Object.entries(groupedDocs).map(([type, typeDocs]) => (
            <AccordionItem key={type} value={type} className='!border-none'>
              <AccordionTrigger className="text-base font-medium hover:no-underline py-3">
                <div className="flex items-center gap-2">
                  <Folder />
                  <span>{type}</span>
                  <Badge variant="outline" className="ml-2">
                    {typeDocs.length}
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 py-2">
                  {typeDocs.map((doc) => (
                    <div
                      key={doc.file_name}
                      className="flex items-center p-3 rounded-md border bg-background hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex-1 min-w-0 mr-4">
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className={`${getFileColor(doc.file_name)}`}
                          >
                            <span className="!text-black">
                              {getFileExtension(doc.file_name)}
                            </span>
                          </Badge>
                          <span
                            className="font-medium truncate"
                            title={doc.file_name}
                          >
                            {doc.file_name}
                          </span>
                        </div>
                      </div>

                      <DownloadButton
                        url={doc.path}
                        filename={doc.file_name}
                        label=""
                        loadingLabel=""
                        className="h-8 w-8 p-0"
                        showProgress={false}
                      />
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <p className="text-muted-foreground">
          No files available for this project.
        </p>
      )}
    </div>
  )
}
