import React from 'react'
import projects from '@/data/projects.json'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Projects from '@/components/Projects'

const page = () => {
  return (
    <>
      <Header />
      <div className="max-w-screen-2xl min-h-screen mx-auto px-2 xs:px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0">
        <Projects no={projects.data.length} f={true} />
      </div>
      <Footer />
    </>
  )
}

export default page
