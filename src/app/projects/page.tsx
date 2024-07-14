import React from 'react'
import projects from '@/data/projects.json'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowLeft,
  faArrowUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons'
import Footer from '@/components/Footer'

const page = () => {
  return (
    <div className="max-w-screen-2xl min-h-screen mx-auto px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0">
      <div className="pt-[5%]">
        <div className="py-4">
          <Link
            href="/"
            className="flex items-center justify-start gap-2 group"
          >
            <FontAwesomeIcon
              icon={faArrowLeft}
              className="text-[#2b2b2b] dark:text-[#e6e6e6] text-lg h-4 transition-transform group-hover:-translate-x-2"
            />
            <span className="text-xl text-[#2b2b2b] dark:text-[#e6e6e6] font-volte-rounded-semibold">
              Dennis Kibet
            </span>
          </Link>
          <h1 className="text-8xl font-volte-rounded-semibold text-[#2b2b2b] dark:text-[#e6e6e6]">
            All Projects
          </h1>
        </div>
        <div className="">
          <table
            id="content"
            className="mt-12 w-full border-collapse text-left"
          >
            <thead className="sticky top-0 z-10 px-6 py-5 border-b border-[var(--background-modals)] backdrop-blur-1">
              <tr>
                <th className="py-4 pr-8 text-sm font-semibold text-ctm">
                  Year
                </th>
                <th className="py-4 pr-8 text-sm font-semibold text-ctm">
                  Project
                </th>
                <th className="hidden py-4 pr-8 text-sm font-semibold  lg:table-cell text-ctm">
                  Made at
                </th>
                <th className="hidden py-4 pr-8 text-sm font-semibold  lg:table-cell text-ctm">
                  Built with
                </th>
                <th className="hidden py-4 pr-8 text-sm font-semibold  sm:table-cell text-ctm">
                  Link
                </th>
              </tr>
            </thead>
            <tbody>
              {projects.data.map((proj, index) => (
                <tr
                  className="border-b border-[var(--background-modals)] last:border-none"
                  key={index}
                >
                  <td className="py-4 pr-4 align-top text-sm">
                    <div className="translate-y-px text-ctm">{proj.year}</div>
                  </td>
                  <td className="py-4 pr-4 align-top font-semibold leading-snug ">
                    <div>
                      <span className="text-ctm">{proj.title}</span>
                    </div>
                  </td>
                  <td className="hidden py-4 pr-4 align-top text-sm lg:table-cell">
                    <span className="translate-y-px whitespace-nowrap text-ctm">
                      {proj.made_at}
                    </span>
                  </td>
                  <td className="hidden py-4 pr-4 align-top lg:table-cell">
                    <ul className="flex -translate-y-1.5 flex-wrap">
                      {proj.stack.map((stack, index) => (
                        <li className="my-1 mr-1.5" key={index}>
                          <div className="flex items-center rounded-full bg-[var(--background-modals)] px-3 py-1 text-xs font-medium leading-5 text-ctm">
                            {stack}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="hidden py-4 align-top sm:table-cell">
                    <ul className="translate-y-1">
                      <li className="mb-1 flex items-center">
                        <a
                          className="inline-flex items-baseline font-medium leading-tight  hover: focus-visible: text-sm group/link"
                          href={proj.external_url}
                          target="_blank"
                          rel="noreferrer noopener"
                          aria-label="emersoncollective.com (opens in a new tab)"
                        >
                          <span className="flex items-center">
                            <span className="mr-2 text-ctm">
                              {proj.external_url}
                            </span>
                            &nbsp;
                            <FontAwesomeIcon
                              className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-0.5 text-ctm"
                              icon={faArrowUpRightFromSquare}
                            />
                          </span>
                        </a>
                      </li>
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default page
