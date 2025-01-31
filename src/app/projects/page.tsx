'use client'
import React, { useState } from 'react'
import projects from '@/data/projects'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Projects from '@/components/Projects'
import { CloudDownload, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

const ProjectsPage = () => {
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = async () => {
    setIsDownloading(true)
    try {
      const response = await fetch('/pdf/dennis-kibet-projects.pdf')
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.style.display = 'none'
      a.href = url
      a.download = 'dennis-kibet-projects.pdf'
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Download failed:', error)
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <>
      <Header />
      <div className="max-w-screen-2xl min-h-screen mx-auto px-4 sm:px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0">
        <div className="h-auto sm:h-[30vh] w-full flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-volte-rounded-semibold mb-4">
            My Projects
          </h1>
          <p className="mb-6 text-sm sm:text-base">
            Some of the undertakings that I have done, mostly in my free time
          </p>
          <Button
            onClick={handleDownload}
            disabled={isDownloading}
            className="flex items-center justify-center gap-2 py-2 px-4 rounded-[8px] bg-primary text-primary-foreground hover:bg-primary/90 border"
          >
            {isDownloading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <CloudDownload className="mr-2 h-4 w-4" />
            )}
            {isDownloading ? 'Downloading...' : 'Download PDF Format'}
          </Button>
        </div>
        <Projects no={projects.length} f={true} />
      </div>
      <Footer />
    </>
  )
}

export default ProjectsPage
