import React from 'react'

const Landing = () => {
  return (
    <div className="min-h-[50vh] py-[5rem] flex flex-col justify-center">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-4xl xl:text-6xl 2xl:text-8xl font-bold text-[#2b2b2b] dark:text-[#e6e6e6] font-apercu mb-2 -ml-2">
            <span
              style={{
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundImage:
                  'linear-gradient(90deg, rgb(219, 39, 119), rgb(147, 51, 234))',
              }}
              className="capitalize font-bold"
            >
              Dennis Kibet
            </span>
          </h1>
          <h2 className="font-semibold font-space-mono text-2xl mb-4 dark:text-white">
            Full Stack Software Engineer
          </h2>
          <p className="text-xl mb-4 dark:text-white">
            Welcome to my portfolio, a haven for my thoughts. I&apos;m a
            passionate Full Stack Software Engineer, Entrepreneur, and tech
            enthusiast. In leisure, I craft side projects and explore new
            technologies.
          </p>
          <p className="text-xl dark:text-white">
            This is my place for contemplation, candid reflections, and all the
            nuances. Have a good read!
          </p>
        </div>
        <div className="flex-1"></div>
      </div>
    </div>
  )
}

export default Landing
