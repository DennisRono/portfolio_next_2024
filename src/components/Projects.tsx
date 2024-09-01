import Image from 'next/image'
import React from 'react'
import NullchemyShop from '@/assets/images/nullchemy_shop.png'
import { ArrowRight, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import projects from '@/data/projects.json'

const Projects = () => {
  return (
    <>
      <div className="flex items-start justify-between py-4">
        <div className="w-1/2">
          <h2 className="text-bold text-5xl mb-4">My Projects</h2>
          <p className="text-lg">
            Some of the Projects that i have worked on of the years
          </p>
        </div>
        <div className="w-1/2">
          {projects.data.slice(0, 4).map((project, index) => (
            <a
              href={project.external_url}
              target="_blank"
              rel="noopener noreferrer"
              key={index}
            >
              <div className="flex items-start justify-start gap-4 mb-4 hover:bg-[#fff2] p-4 rounded-sm border border-transparent hover:border-[#fff2] hover:shadow-sm">
                <div className="h-28 overflow-hidden rounded-[5px] border-4 border-slate-400">
                  <Image
                    src={NullchemyShop}
                    alt="nullchemy shop"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-start gap-2">
                    <h2 className="font-bold text-3xl -mt-2">
                      {project.title}
                    </h2>
                    <ExternalLink className="h-5 w-5" />
                  </div>
                  <p className="text-base text-gray-600">{project.preview}</p>
                  <div className="flex items-center justify-start gap-2">
                    {project.stack.slice(0, 6).map((stack, index) => (
                      <div
                        key={index}
                        className="flex items-center rounded-full bg-[var(--background-modals)] px-3 py-1 text-xs font-medium leading-5 text-ctm"
                      >
                        {stack}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </a>
          ))}
          <Link
            href="/projects"
            className="flex items-center justify-start gap-2 hover:underline ml-8"
          >
            <h2 className="font-semibold text-lg">View All Projects</h2>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </>
  )
}

export default Projects
