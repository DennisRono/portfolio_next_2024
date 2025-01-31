import About from '@/components/About'
import Footer from '@/components/Footer'
import Landing from '@/components/Landing'
import Projects from '@/components/Projects'
import React from 'react'

const Home = () => {
  return (
    <div>
      <article>
        <div className="max-w-screen-2xl min-h-screen mx-auto px-2 xs:px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0">
          <Landing />
          <About />
          <Projects no={4} f={false} />
          <Footer />
        </div>
      </article>
    </div>
  )
}

export default Home
