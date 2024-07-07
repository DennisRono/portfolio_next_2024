import About from '@/components/About'
import Landing from '@/components/Landing'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import React from 'react'

const Home = () => {
  return (
    <div>
      <ThemeSwitcher />
      <div className="max-w-screen-2xl min-h-screen mx-auto px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0">
        <Landing />
        <About />
      </div>
    </div>
  )
}

export default Home
