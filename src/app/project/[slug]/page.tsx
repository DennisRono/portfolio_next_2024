/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Image from 'next/image'
import { Metadata } from 'next'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { Calendar, Clock, CloudDownload, Loader2 } from 'lucide-react'
import projects from '@/data/projects'
import { ProjectType } from '@/interfaces'
import ProfileImage from '@/assets/images/profile.png'
import { my_projects } from '#site/content'
import { MDXContent } from '@/components/mdx-components'
import ProjectFiles from './ProjectFiles'

const BASE_URL = process.env.NEXT_PUBLIC_URL || 'https://denniskibet.com'

const generateProjectMetadata = (project: ProjectType): Metadata => {
  const og_images = [
    {
      url: `/api/og?title=${encodeURIComponent(project.title)}`,
      width: 1200,
      height: 630,
      alt: project.title,
    },
  ]
  return {
    title: project.title,
    description: project.preview,
    metadataBase: new URL(BASE_URL),
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: project.title,
      description: project.preview,
      url: `${BASE_URL}/projects/${project.slug}`,
      siteName: 'denniskibet',
      images: og_images,
      locale: 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.preview,
      siteId: '1687769811139391489',
      creator: '@dennisrkibet',
      images: og_images,
    },
    verification: {
      google: 'google',
      yandex: 'yandex',
      yahoo: 'yahoo',
    },
  }
}

const getProject = (slug: string): ProjectType | undefined => {
  return projects.find((project: ProjectType) => project.slug === slug)
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const project: ProjectType | undefined = getProject(params.slug)
  if (!project) {
    return {
      title: 'Project Not Found',
      description: 'The project you are looking for does not exist.',
    }
  }
  return generateProjectMetadata(project)
}

const ProjectPage: React.FC<{ params: { slug: string } }> = async ({
  params,
}) => {
  const { slug } = params
  const project: ProjectType | undefined = getProject(slug)
  const project_cont = my_projects.find(
    (project) => project.slugAsParams === slug
  )

  if (!project) {
    return (
      <>
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen pt-24">
          <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
          <p>The project you are looking for does not exist.</p>
        </main>
        <Footer />
      </>
    )
  }

  const now = new Date()

  const calculateReadingTime = (text: string) => {
    const wordsPerMinute = 200 // Average reading speed
    const wordCount = text.trim().split(/\s+/).length
    return Math.ceil(wordCount / wordsPerMinute)
  }

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <article>
          <h1 className="text-6xl font-bold my-6 mb-12 leading-[70px]">
            {project.title}
          </h1>

          <div className="relative mb-8">
            <Image
              src={project.imageUrl}
              alt={project.title}
              className="rounded-md mx-auto my-4 w-full h-full max-h-[60vh] object-cover"
            />
          </div>

          <div className="flex items-center justify-start gap-8 w-full mb-3">
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <Image src={ProfileImage} alt="Dennis Kibet" />
              </div>
              <div className="space-y-2">
                <h3 className="font-bold">Dennis Kibet</h3>
              </div>
            </div>
            <span className="border border-gray-400 rounded-md py-1 px-4 text-base capitalize">
              {project.stack_string || 'Technology'}
            </span>
            <div className="flex items-center gap-2">
              <Calendar className="w-6 h-6" />
              <span>{project.year}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-6 h-6" />
              <span>{calculateReadingTime(project.preview)} minutes read</span>
            </div>
          </div>
          {project.docs && project.docs.length !== 0 && (
            <ProjectFiles docs={project.docs} />
          )}

          <blockquote className="border-l-4 my-8 text-lg border-gray-400 pl-4 italic text-gray-600 dark:text-white">
            {project.preview}
          </blockquote>
          {project_cont && project_cont.published && (
            <MDXContent code={project_cont.body} />
          )}
        </article>
      </main>
      <Footer />
    </>
  )
}

export default ProjectPage
