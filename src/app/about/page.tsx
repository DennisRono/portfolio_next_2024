/* eslint-disable react/no-unescaped-entities */
'use server'
import React from 'react'
import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import Link from 'next/link'
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Phone,
  ExternalLink,
} from 'lucide-react'

const BASE_URL = process.env.NEXT_PUBLIC_URL || 'https://denniskibet.com'

const description =
  "Dennis Kibet is a Full Stack Software Engineer from Nairobi, Kenya, with a Bachelor's degree in Computer Science from Machakos University and further training from Moringa School. He has over three years of experience developing innovative digital solutions for business and consumer applications. Proficient in both front-end and back-end technologies, Dennis has worked on projects including WeCare, Nullchemy Shop, NPay, and N-Analytics. He is skilled in JavaScript, PHP, Python, and various frameworks, with a strong background in AI, Machine Learning, and UI/UX design. Dennis is known for his commitment to continuous learning and problem-solving, and his ability to collaborate effectively with cross-cultural, global teams."

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  return {
    title: 'Dennis Kibet',
    description: description,
    metadataBase: new URL(BASE_URL),
    alternates: { canonical: `/about-us` },
    openGraph: {
      title: 'Dennis Kibet',
      description: description,
      url: `${BASE_URL}`,
      siteName: 'denniskibet',
      images: [],
      locale: 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Dennis Kibet',
      description: description,
      siteId: '1687769811139391489',
      creator: '@dennisrkibet',
      images: [],
    },
    verification: {
      google: 'google',
      yandex: 'yandex',
      yahoo: 'yahoo',
    },
  }
}

const About = () => {
  return (
    <>
      <Header />
      <main className="px-2 sm:container max-w-8xl py-6 lg:py-10 w-full">
        <section id="about" className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-blue-300">About Me</h2>
          <p className="text-gray-300 mb-4 leading-relaxed text-xl">
            Dennis Kibet is a passionate Full Stack Software Engineer and tech
            enthusiast from Eldoret, Kenya. He holds a Bachelor's degree in
            Computer Science from Machakos University and has further honed his
            skills at Moringa School, specializing in software engineering. With
            over three years of experience, Dennis has developed a diverse
            portfolio that includes remote agency work, startup collaborations,
            and various partnerships, resulting in innovative digital solutions
            for both business and consumer domains.
          </p>
          <p className="text-gray-300 leading-relaxed text-xl">
            Proficient in a wide range of technologies, Dennis is skilled in
            both front-end and back-end development, utilizing languages such as
            JavaScript (ES6+), PHP, Node.js, Java, C#, and Python. He is
            experienced with frameworks like React.js, Next.js, React Native,
            Electron, Django, Flask, and Flutter. His expertise extends to AI
            and Machine Learning, with knowledge in TensorFlow, PyTorch,
            sklearn, Pandas, and Numpy. Additionally, Dennis has a strong
            background in UI/UX design, employing tools like Adobe XD, Figma,
            Sketch, and Webflow.
          </p>
          <p className="text-gray-300 mb-4 leading-relaxed text-xl">
            Throughout his career, Dennis has demonstrated a commitment to
            continuous learning and problem-solving. He has worked on various
            projects, including:
          </p>
          <ul className="ml-10 list-disc">
            <li className="text-gray-300 mb-4 leading-relaxed text-lg">
              <strong>WeCare:</strong> A chatbot application designed to provide
              emotional support to users experiencing distress, utilizing
              advanced AI models for empathetic conversations.
            </li>
            <li className="text-gray-300 mb-4 leading-relaxed text-lg">
              <strong>Nullchemy Shop:</strong> An online marketplace that
              connects buyers and sellers, featuring analytical tools for
              performance tracking and a user-friendly shopping experience.
            </li>
            <li className="text-gray-300 mb-4 leading-relaxed text-lg">
              <strong>NPay:</strong> A mobile payment solution aimed at
              simplifying transactions and providing users with actionable
              financial insights, including budget planning and personalized
              analytics.
            </li>
            <li className="text-gray-300 mb-4 leading-relaxed text-lg">
              <strong>N-Analytics:</strong> A business intelligence tool
              tailored for enterprises seeking data-driven insights,
              facilitating advanced analytics for supply chain management and
              performance tracking.
            </li>
          </ul>
          <p className="text-gray-300 mb-4 leading-relaxed text-xl">
            Dennis's dedication to advancing technology is evident in his
            innovative approach to software development and his ability to
            integrate complex systems seamlessly. His strong command of English
            and proven ability to collaborate with cross-cultural, global teams
            make him a valuable asset in any tech-driven environment.
          </p>
        </section>

        <section id="contact" className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-blue-300">Contact Me</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            I'm always open to new opportunities and collaborations. Feel free
            to reach out!
          </p>
          <div className="space-y-4">
            <div className="flex items-center text-gray-300">
              <Mail size={20} className="mr-4" />
              <span>dennisrkibet@gmail.com</span>
            </div>
            <div className="flex items-center text-gray-300">
              <Phone size={20} className="mr-4" />
              <span>+254 798 116 710</span>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default About
