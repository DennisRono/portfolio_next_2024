/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Image from 'next/image'
import { Metadata } from 'next'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { Calendar, Clock } from 'lucide-react'
import projects from '@/data/projects'
import { ProjectType } from '@/interfaces'
import ProfileImage from '@/assets/images/profile.png'
import { my_projects } from '#site/content'
import { MDXContent } from '@/components/mdx-components'
import ProjectFiles from './ProjectFiles'
import { notFound } from 'next/navigation'

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

// Calculate reading time on the server
const calculateReadingTime = (text: string) => {
  const wordsPerMinute = 200 // Average reading speed
  const wordCount = text.trim().split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
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

export default async function ProjectPage({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = params
  const project: ProjectType | undefined = getProject(slug)
  const project_content = my_projects.find(
    (project) => project.slugAsParams === slug
  )

  if (!project) {
    notFound()
  }

  const readingTime = calculateReadingTime(project.preview)

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        <article className="prose prose-lg dark:prose-invert max-w-none">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold my-6 mb-8 leading-tight">
            {project.title}
          </h1>

          <div className="relative mb-8 aspect-video overflow-hidden rounded-lg shadow-md">
            <Image
              src={project.imageUrl || "/placeholder.svg"}
              alt={project.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
          </div>

          <div className="flex flex-wrap items-center gap-4 md:gap-8 w-full mb-6 py-2 border-y">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden">
                <Image 
                  src={ProfileImage || "/placeholder.svg"} 
                  alt="Dennis Kibet" 
                  width={48} 
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold text-sm md:text-base">Dennis Kibet</h3>
              </div>
            </div>
            
            <span className="border border-gray-400 rounded-md py-1 px-3 text-sm md:text-base capitalize">
              {project.stack_string || 'Technology'}
            </span>
            
            <div className="flex items-center gap-2 text-sm md:text-base text-muted-foreground">
              <Calendar className="w-4 h-4 md:w-5 md:h-5" />
              <span>{project.year}</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm md:text-base text-muted-foreground">
              <Clock className="w-4 h-4 md:w-5 md:h-5" />
              <span>{readingTime} min read</span>
            </div>
          </div>
          
          {project.docs && project.docs.length > 0 && (
            <ProjectFiles docs={project.docs} />
          )}

          <blockquote className="border-l-4 my-8 text-lg border-primary/50 pl-4 italic text-muted-foreground">
            {project.preview}
          </blockquote>
          
          {project_content && project_content.published && (
            <div className="mt-8">
              <MDXContent code={project_content.body} />
            </div>
          )}
        </article>
      </main>
      <Footer />
    </>
  )
}
