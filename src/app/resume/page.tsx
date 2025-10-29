import React from 'react'
import Image from 'next/image'
import Grad from '@/assets/images/graduation-cap.png'
import ResumeForm from './ResumeForm'
import MadDeveloper from '@/assets/images/mad-designer.png'
import Header from '@/components/Header'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hire Me | Request Resume',
  description: 'Request my resume and get it delivered directly to your email',
}

export default function HireMePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center py-8 px-4 md:py-12">
        <div className="container max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center justify-center gap-4 mb-6">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-apercu">
                  <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                    Hire Me
                  </span>
                </h1>
                <Image
                  src={Grad || '/placeholder.svg'}
                  alt="Graduation cap"
                  className="h-16 w-auto md:h-20"
                  priority
                />
              </div>

              <div className="w-full max-w-md space-y-6">
                <ResumeForm />

                <div className="space-y-2 text-center">
                  <p className="text-base md:text-lg text-foreground/80">
                    Request and you&apos;ll get an email with the resume
                    attached
                  </p>

                  <p className="text-xs text-muted-foreground">
                    This site is protected by reCAPTCHA and the Google{' '}
                    <a
                      href="https://policies.google.com/privacy"
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary hover:underline"
                    >
                      Privacy Policy
                    </a>{' '}
                    and{' '}
                    <a
                      href="https://policies.google.com/terms"
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary hover:underline"
                    >
                      Terms of Service
                    </a>{' '}
                    apply.
                  </p>
                </div>
              </div>
            </div>

            <div className="hidden md:flex items-center justify-center">
              <div className="relative w-full max-w-lg">
                <div
                  className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 dark:bg-purple-700 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"
                ></div>

                <div
                  className="absolute top-0 -right-4 w-72 h-72 bg-blue-300 dark:bg-blue-700 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"
                ></div>

                <div
                  className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 dark:bg-pink-700 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"
                ></div>

                <div className="relative">
                  <Image
                    src={MadDeveloper || '/placeholder.svg'}
                    alt="Developer illustration"
                    className="w-full h-auto object-contain z-10 relative"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
