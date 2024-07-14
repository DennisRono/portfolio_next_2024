import React from 'react'
import Image from 'next/image'
import Grad from '@/assets/images/graduation-cap.png'
import Link from 'next/link'

const page = () => {
  return (
    <div className="h-screen pt-4 overflow-hidden">
      <h1 className="font-semibold text-center font-volte-rounded-bold text-8xl mt-4 text-[#2b2b2b] dark:text-[#e6e6e6]">
        Hire Me
      </h1>
      <Link
        href="/"
        className="absolute top-0 right-0 m-4 hover:underline text-[#2b2b2b] dark:text-[#e6e6e6]"
      >
        Back Home
      </Link>
      <div className="flex items-center justify-center h-full">
        <div className="p-2 -mt-[20%]">
          <div className="mb-4">
            <Image
              src={Grad}
              alt="graduation icon image"
              className="mx-auto h-[150px] w-[150px]"
            />
          </div>
          <div className="text-center flex flex-col items-center">
            <form className="flex items-center justify-center gap-4 mb-4">
              <input
                type="text"
                className="py-2 px-6 w-[300px] rounded-md outline-none border border-slate-900"
                placeholder="email..."
              />
              <button className="bg-blue-500 h-10 w-24 rounded-full text-white cursor-pointer">
                request
              </button>
            </form>
            <p className="text-center text-lg w-[65%] text-[#2b2b2b] dark:text-[#e6e6e6]">
              Request and you&apos;ll get an email with the resume attached
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
