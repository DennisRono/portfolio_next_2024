import Link from 'next/link'
import React from 'react'
import ThemeSwitcher from './ThemeSwitcher'

const Header = () => {
  return (
    <div className="h-14">
      <div className="px-4 sm:container h-full">
        <div className="flex items-center justify-between h-full">
          <div className="">
            <Link
              href="/"
              className="text-2xl sm:text-3xl text-nowrap font-bold text-[#2b2b2b] dark:text-[#e6e6e6] font-apercu mb-2 -ml-2"
            >
              <span
                style={{
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundImage:
                    'linear-gradient(90deg, rgb(219, 39, 119), rgb(147, 51, 234))',
                }}
                className="capitalize font-bold"
              >
                Dennis Kibet R.
              </span>
            </Link>
          </div>
          <div className="flex items-center justify-start gap-4">
            <Link href="/blog">Blog</Link>
            <Link href="/resume">Resume</Link>
            <Link href="/#about" className="hidden sm:block">
              About
            </Link>
            <div className="ml-2">
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
