'use client'
import { useState } from 'react'
import { CloudDownload, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { downloadFile } from '@/lib/download-utils'
import { useToast } from '@/components/ui/use-toast'
import { Progress } from '@/components/ui/progress'

interface DownloadButtonProps {
  url: string
  filename: string
  label?: string
  loadingLabel?: string
  className?: string
  showProgress?: boolean
}

export default function DownloadButton({
  url,
  filename,
  label = 'Download',
  loadingLabel = 'Downloading...',
  className = '',
  showProgress = true,
}: DownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false)
  const [progress, setProgress] = useState(0)
  const { toast } = useToast()

  const handleDownload = async () => {
    setIsDownloading(true)
    setProgress(0)

    await downloadFile({
      url,
      filename,
      useCache: true,
      onProgress: (p) => {
        setProgress(p * 100)
      },
      onError: (error) => {
        toast({
          title: 'Download Failed',
          description:
            error.message ||
            'There was a problem downloading the file. Please try again.',
          variant: 'destructive',
        })
        setIsDownloading(false)
      },
      onSuccess: () => {
        toast({
          title: 'Download Complete',
          description: `${filename} has been downloaded successfully.`,
        })
        setIsDownloading(false)
      },
    })
  }

  return (
    <div className="flex flex-col gap-2">
      <Button
        onClick={handleDownload}
        disabled={isDownloading}
        className={`flex items-center justify-center gap-2 ${className}`}
      >
        {isDownloading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <CloudDownload className="mr-2 h-4 w-4" />
        )}
        {isDownloading ? loadingLabel : label}
      </Button>

      {showProgress && isDownloading && progress > 0 && (
        <div className="w-full">
          <Progress value={progress} className="h-2 w-full" />
          <p className="text-xs text-muted-foreground mt-1 text-center">
            {Math.round(progress)}%
          </p>
        </div>
      )}
    </div>
  )
}
