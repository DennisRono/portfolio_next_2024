import Image from 'next/image'
import React from 'react'
import NullchemyShop from '@/assets/images/nullchemy_shop.png'
import WeCare from '@/assets/images/wecare_one.png'
import NPay from '@/assets/images/npay_landing.png'
import NAnalytics from '@/assets/images/analytics.png'
import NullEMS from '@/assets/images/null_ems.png'
import WenotiFy from '@/assets/images/wenotify.png'
import TenAfriq from '@/assets/images/tenafriq-landing-page.png'
import BebeWa from '@/assets/images/bebewa-dash.png'
import ShopYangu from '@/assets/images/shop-yangu-landing-page.png'
import { ArrowRight, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import projects from '@/data/projects'

const Projects = ({ no, f }: { no: number; f: boolean }) => {
  const projImage = [
    WeCare,
    NullchemyShop,
    NPay,
    NAnalytics,
    NullEMS,
    WenotiFy,
    TenAfriq,
    BebeWa,
    ShopYangu,
  ]
  return (
    <>
      <div className="flex flex-col sm:flex-row items-start justify-between gap-4 py-4">
        {!f ? (
          <div className="w-full sm:w-1/4">
            <h2 className="text-bold text-5xl mb-4">My Projects</h2>
            <p className="text-lg">
              Some of the Projects that i have worked on of the years
            </p>
          </div>
        ) : null}
        <div className={f ? 'w-full' : 'w-full sm:w-3/4'}>
          {projects.slice(0, no).map((project, index) => (
            <Link href={`/project/${project.slug}`} key={project.id}>
              <div className="cursor-pointer flex flex-col sm:flex-row items-start justify-start gap-4 mb-4 hover:bg-[#fff2] p-4 rounded-sm border border-transparent hover:border-[#fff2] hover:shadow-sm">
                <div className="w-1/4">
                  <div className="h-28 overflow-hidden rounded-[5px] border-4 border-slate-400">
                    <Image
                      src={projImage[index]}
                      alt="nullchemy shop"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <Link href={project.external_url}>
                    <div className="flex items-center justify-start gap-2">
                      <h2 className="font-bold text-3xl -mt-2">
                        {project.title}
                      </h2>
                      <ExternalLink className="h-5 w-5" />
                    </div>
                  </Link>
                  <p className="text-base text-gray-600 line-clamp-2 overflow-ellipsis">
                    {project.preview}
                  </p>
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
            </Link>
          ))}
          {!f ? (
            <Link
              href="/projects"
              className="flex items-center justify-start gap-2 hover:underline ml-8"
            >
              <h2 className="font-semibold text-lg">View All Projects</h2>
              <ArrowRight className="h-4 w-4" />
            </Link>
          ) : null}
        </div>
      </div>
    </>
  )
}

export default Projects
