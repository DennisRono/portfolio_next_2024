import Image from 'next/image'
import React from 'react'
import Calendar from '@/assets/images/calendar.png'
import Grad from '@/assets/images/graduation-cap.png'
import Projects from '@/assets/images/projects.png'
import Book from '@/assets/images/book.png'
import Link from 'next/link'

const Landing = () => {
  return (
    <div className="min-h-[50vh] py-[5rem] flex flex-col justify-center">
      <div className="sm:flex items-start justify-between gap-4">
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
        <div className="flex-1 flex flex-col items-start sm:items-end justify-center pt-4">
          <a
            href="https://calendly.com/dennisrkibet/30min"
            target="_blank"
            rel="noreferrer"
            className="py-2 px-4 cursor-pointer border border-slate-800 rounded-md overflow-hidden w-min flex items-center justify-start gap-4 mb-4"
            title="chat with me"
          >
            <div className="h-6 w-6">
              <Image src={Calendar} alt={'calendar image'} />
            </div>
            <span className="text-black dark:text-white text-nowrap">
              Chat with me
            </span>
          </a>
          <Link
            href="/resume"
            className="py-2 px-4 cursor-pointer border border-slate-800 rounded-md overflow-hidden w-min flex items-center justify-start gap-4 mb-4"
            title="chat with me"
          >
            <div className="h-6 w-6">
              <Image src={Grad} alt={'calendar image'} />
            </div>
            <span className="text-black dark:text-white text-nowrap">
              Hire me
            </span>
            <span className="text-black dark:text-white">|</span>
            <span className="text-black dark:text-white">Resume</span>
          </Link>
          <Link
            href="/projects"
            className="py-2 px-4 cursor-pointer border border-slate-800 rounded-md overflow-hidden w-min flex items-center justify-start gap-4 mb-4"
            title="chat with me"
          >
            <div className="h-6 w-6">
              <Image src={Projects} alt={'calendar image'} />
            </div>
            <span className="text-black dark:text-white text-nowrap text-xs">
              What i&apos;ve done
            </span>
            <span className="text-black dark:text-white">|</span>
            <span className="text-black dark:text-white">Projects</span>
          </Link>
          <Link
            href="#about-me"
            className="py-2 px-4 cursor-pointer border border-slate-800 rounded-md overflow-hidden w-min flex items-center justify-start gap-4 mb-4"
            title="chat with me"
          >
            <div className="h-6 w-6">
              <Image src={Book} alt={'calendar image'} />
            </div>
            <span className="text-black dark:text-white text-nowrap text-xs">
              Know me
            </span>
            <span className="text-black dark:text-white">|</span>
            <span className="text-nowrap text-black dark:text-white">
              About Me
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Landing
