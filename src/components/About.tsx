/* eslint-disable react/no-unescaped-entities */
import { Fragment } from 'react'
import Image from 'next/image'
import ProfileImage from '@/assets/images/profile.png'

import ExperienceItem from '@/components/experience-item'
import TechnologyList from '@/components/technology-list'
import ServiceCard from '@/components/service-card'

import experienceData from '@/data/experience.json'
import technologiesData from '@/data/technologies.json'
import servicesData from '@/data/services.json'

const About = () => {
  return (
    <Fragment>
      <div className="container mx-auto px-4 py-8" id="about-me">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 md:sticky md:top-0">
            <h1 className="text-xl font-space-mono text-gray-900 mb-8 text-center md:text-left dark:text-white">
              About me{' '}
              <code>
                <span style={{ color: '#e85535' }}>&lt;/&gt;</span>
              </code>
            </h1>
            <div className="relative w-56 h-56 mx-auto md:mx-0 mb-6">
              <div className="absolute inset-0 rounded-xl border-30 border-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-green-400 blur-md opacity-80 animate-changeBackground"></div>
              <div className="absolute inset-2 rounded-xl overflow-hidden bg-gray-900">
                <Image
                  className="w-full h-full object-cover"
                  key="profile-picture"
                  alt="my profile picture"
                  src={ProfileImage}
                />
              </div>
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-2xl text-gray-900 dark:text-white">
                Dennis Kibet R.
              </h2>
              <h4 className="text-xl text-gray-600 dark:text-white">
                Full-Stack Software Developer
              </h4>
            </div>
          </div>
          <div className="md:flex-1 mt-8 md:mt-0 md:pl-8">
            <div className="mb-8">
              <h2 className="text-2xl text-right md:text-left dark:text-white">
                Background <span className="text-teal-500 text-sm">.01</span>
              </h2>
              <p className="text-lg text-gray-700 dark:text-white">
                Hello, I’m Dennis, a Software Engineer passionate about building
                impactful solutions for the web. My journey began at Samoei Boys
                Secondary School, where I first developed an interest in
                technology, and continued through my studies at Alphax College,
                Machakos University, and Moringa School, where I refined my
                software engineering skills.
                <br />
                <br />
                I’ve gained hands-on experience at the Water Resources Authority
                and Innovex Solutions Ltd, working on backend systems,
                databases, and user-focused applications. Recently, I joined{' '}
                <a
                  href="https://www.uab.edu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-teal-500 hover:underline"
                >
                  University of Alabama at Birmingham (UAB)
                </a>{' '}
                to pursue a Master’s degree in Computer Science. Originally from
                Eldoret, Kenya, I’m driven by continuous learning,
                problem-solving, and building technology that creates real-world
                impact.
              </p>
            </div>
          </div>
        </div>

        <div className="my-14">
          <h2 className="text-2xl dark:text-white text-center mb-8">
            <span className="text-teal-500 text-sm mr-2">.02</span>
            Technologies I use
          </h2>
          <p className="text-lg text-gray-700 dark:text-white mb-4">
            Here are a few technologies I've been working with recently:
          </p>
          <div className="flex flex-wrap justify-between mt-4">
            <TechnologyList
              title="Languages"
              items={technologiesData.languages}
            />
            <TechnologyList
              title="Frameworks"
              items={technologiesData.frameworks}
            />
            <TechnologyList
              title="AI & Machine Learning"
              items={technologiesData.aiAndMl}
            />
            <TechnologyList title="Design" items={technologiesData.design} />
          </div>
        </div>

        <div className="my-14">
          <h2 className="text-2xl dark:text-white text-center">
            <span className="text-teal-500 text-sm">.03</span> Career
          </h2>
          <div className="flex flex-col md:flex-row mt-4 gap-8 min-h-min relative">
            <div className="md:w-2/3 h-min md:sticky md:top-2">
              <h2 className="text-xl font-space-mono text-gray-900 dark:text-white mb-2">
                Full-Stack Software Developer
              </h2>
              <p className="text-lg text-gray-700 mb-4 dark:text-white">
                I am an innovative full-stack software developer with over three
                years of expertise, specializing in the seamless integration of
                frontend and backend components for intricate, scalable web and
                mobile applications.
              </p>
              <p className="text-lg text-gray-700 dark:text-white">
                Over the past three years, my journey as a software artisan led
                to a portfolio with remote agency work, startup collaborations,
                and diverse partnerships. This path resulted in innovative
                digital solutions for business and consumer domains, reflecting
                my dedication to advancing technology.
              </p>
            </div>
            <div className="md:w-1/3">
              <h4 className="text-xl font-space-mono text-gray-900 mb-4 dark:text-white">
                ~ what i do
              </h4>
              <div className="space-y-4">
                {servicesData.map((service, index) => (
                  <ServiceCard
                    key={index}
                    title={service.title}
                    description={service.description}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="my-14">
          <h2 className="text-2xl dark:text-white text-center">
            <span className="text-teal-500 text-sm mr-2">.04</span> Experience &
            Schooling
          </h2>
          {experienceData.map((item) => (
            <ExperienceItem
              key={item.id}
              institution={item.institution}
              description={item.description}
              period={item.period}
              logo={item.logo}
            />
          ))}
        </div>
      </div>
    </Fragment>
  )
}

export default About
