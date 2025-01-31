import React from 'react'
import Image from 'next/image'
import Grad from '@/assets/images/graduation-cap.png'
import ResumeForm from './ResumeForm'
import MadDeveloper from '@/assets/images/mad-designer.png'
import Header from '@/components/Header'

const page = () => {
  return (
    <div className="h-screen pt-4 overflow-hidden">
      <Header />
      <div className="sm:container flex items-center justify-center h-[calc(100vh-56px)]">
        <div className="sm:p-2 flex-1 -translate-y-20 sm:translate-y-0">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h1 className="text-center text-3xl xl:text-5xl 2xl:text-6xl font-bold text-[#2b2b2b] dark:text-[#e6e6e6] font-apercu">
              <span
                style={{
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundImage: 'linear-gradient(90deg, #8753ff, #64a0ff)',
                }}
                className="capitalize font-bold"
              >
                Hire Me
              </span>
            </h1>
            <Image
              src={Grad}
              alt="graduation icon image"
              className="mx-0 h-[80px] w-min"
            />
          </div>
          <div className="text-center flex flex-col items-center">
            <ResumeForm />
            <p className="text-center text-lg w-[65%] text-[#2b2b2b] dark:text-[#e6e6e6]">
              Request and you&apos;ll get an email with the resume attached
            </p>
            <p className="text-center text-xs w-[65%] text-[#2b2b2b] dark:text-[#e6e6e6]">
              This site is protected by reCAPTCHA and the Google
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noreferrer"
              >
                Privacy Policy
              </a>{' '}
              and
              <a
                href="https://policies.google.com/terms"
                target="_blank"
                rel="noreferrer"
              >
                Terms of Service
              </a>{' '}
              apply.
            </p>
          </div>
        </div>
        <div className="hidden sm:flex items-center justify-start flex-1">
          <Image src={MadDeveloper} alt="" className="w-[80%]" />
        </div>
      </div>
    </div>
  )
}

export default page
