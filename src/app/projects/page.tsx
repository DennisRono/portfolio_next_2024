'use client'
import React from 'react'
import projects from '@/data/projects'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Projects from '@/components/Projects'
import DownloadButton from '@/components/DownloadButton'

const ProjectsPage = () => {
  return (
    <>
      <Header />
      <main className="max-w-screen-2xl min-h-screen mx-auto px-4 sm:px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0">
        <div className="h-auto sm:h-[30vh] w-full flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-volte-rounded-semibold mb-4">
            My Projects
          </h1>
          <p className="mb-6 text-sm sm:text-base">
            Some of the undertakings that I have done, mostly in my free time
          </p>

          <DownloadButton
            url="/pdf/dennis-kibet-projects.pdf"
            filename="dennis-kibet-projects.pdf"
            label="Download PDF Format"
            loadingLabel="Downloading..."
            className="py-2 px-4 rounded-[8px] bg-primary text-primary-foreground hover:bg-primary/90 border"
          />
        </div>

        <Projects no={projects.length} f={true} />
      </main>
      <Footer />
    </>
  )
}

export default ProjectsPage
