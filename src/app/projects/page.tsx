import React from 'react'
import projects from '@/data/projects'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Projects from '@/components/Projects'

const page = () => {
  return (
    <>
      <Header />
      <div className="max-w-screen-2xl min-h-screen mx-auto px-2 xs:px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0">
        <div className="h-[30vh] w-full flex flex-col items-center justify-center">
          <h1 className="text-center text-6xl font-volte-rounded-semibold">
            My Projects
          </h1>
          <p className="my-3">
            Some of the undertakings that i have done, mostly in my free time
          </p>
        </div>
        <Projects no={projects.length} f={true} />
      </div>
      <Footer />
    </>
  )
}

export default page
