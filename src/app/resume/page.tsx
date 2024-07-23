import React from 'react'
import Image from 'next/image'
import Grad from '@/assets/images/graduation-cap.png'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import ResumeForm from './ResumeForm'
import MadDeveloper from '@/assets/images/mad-designer.png'

const page = () => {
  return (
    <div className="h-screen pt-4 overflow-hidden">
      <Link
        href="/"
        className="flex items-center justify-start gap-2 group absolute top-4 left-4 cursor-pointer z-[999]"
      >
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="text-[#2b2b2b] dark:text-[#e6e6e6] text-lg h-4 transition-transform group-hover:-translate-x-2"
        />
        <span className="text-xl text-[#2b2b2b] dark:text-[#e6e6e6] font-volte-rounded-semibold">
          Dennis Kibet
        </span>
      </Link>
      <div className="flex items-center justify-center h-full">
        <div className="p-2 flex-1">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h1 className="text-center text-3xl xl:text-5xl 2xl:text-6xl font-bold text-[#2b2b2b] dark:text-[#e6e6e6] font-apercu">
              <span
                style={{
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundImage: 'linear-gradient(90deg, #1d1335, #002259)',
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
          </div>
        </div>
        <div className="flex items-center justify-center flex-1">
          <Image src={MadDeveloper} alt="" className="w-[85%]" />
        </div>
      </div>
    </div>
  )
}

export default page
