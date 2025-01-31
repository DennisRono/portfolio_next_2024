/* eslint-disable react/no-unescaped-entities */
import React, { Fragment } from 'react'
import ProfileImage from '@/assets/images/profile.png'
import Image from 'next/image'

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
                  key={`profile-picture`}
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
              <h2 className="text-2xl  text-right md:text-left dark:text-white">
                Background <span className="text-teal-500 text-sm">.01</span>
              </h2>
              <p className="text-lg text-gray-700 dark:text-white">
                Hello, I am Dennis, a Software Engineer passionate about
                building things for the internet. I recently graduated from
                Moringa School in Kenya, where I honed my skills in software
                development. My journey into computers began during High School
                when I worked on a science fair project focused on web
                development. That simple project ignited my curiosity about how
                the internet works and gave me foundational experience in HTML
                and CSS.
                <br />
                <br />
                Now, as a graduate, I am actively seeking a role where I can
                contribute to solving software challenges and building reliable,
                innovative solutions. I have a strong command of English and a
                proven ability to collaborate with cross-cultural, global teams
                effectively.
                <br />
                <br />
                Originally from Eldoret, Kenya, I bring not only technical
                expertise but also a dedication to continuous learning and
                problem-solving.
              </p>
            </div>
          </div>
        </div>
        <div className="my-14">
          <h2 className="text-2xl  dark:text-white text-center mb-8">
            <span className="text-teal-500 text-sm mr-2">.02</span>
            Technologies I use
          </h2>
          <p className="text-lg text-gray-700 dark:text-white mb-4">
            Here are a few technologies I've been working with recently:
          </p>
          <div className="flex flex-wrap justify-between mt-4">
            <div>
              <h2 className="text-xl text-gray-900 mb-2 dark:text-white">
                Languages
              </h2>
              <ul>
                <li className="relative pl-4 mb-2 text-lg text-gray-700 before:absolute before:left-0 before:content-['▹'] before:text-teal-500 dark:text-white">
                  php
                </li>
                <li className="relative pl-4 mb-2 text-lg text-gray-700 before:absolute before:left-0 before:content-['▹'] before:text-teal-500 dark:text-white">
                  Node.js
                </li>
                <li className="relative pl-4 mb-2 text-lg text-gray-700 before:absolute before:left-0 before:content-['▹'] before:text-teal-500 dark:text-white">
                  Java
                </li>
                <li className="relative pl-4 mb-2 text-lg text-gray-700 before:absolute before:left-0 before:content-['▹'] before:text-teal-500 dark:text-white">
                  C#
                </li>
                <li className="relative pl-4 mb-2 text-lg text-gray-700 before:absolute before:left-0 before:content-['▹'] before:text-teal-500 dark:text-white">
                  Python
                </li>
                <li className="relative pl-4 mb-2 text-lg text-gray-700 before:absolute before:left-0 before:content-['▹'] before:text-teal-500 dark:text-white">
                  Javascript (ES6+)
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-xl text-gray-900 mb-2 dark:text-white">
                Frameworks
              </h2>
              <ul>
                <li className="relative pl-4 mb-2 text-lg text-gray-700 before:absolute before:left-0 before:content-['▹'] before:text-teal-500 dark:text-white">
                  React.js
                </li>
                <li className="relative pl-4 mb-2 text-lg text-gray-700 before:absolute before:left-0 before:content-['▹'] before:text-teal-500 dark:text-white">
                  Next.js
                </li>
                <li className="relative pl-4 mb-2 text-lg text-gray-700 before:absolute before:left-0 before:content-['▹'] before:text-teal-500 dark:text-white">
                  React Native
                </li>
                <li className="relative pl-4 mb-2 text-lg text-gray-700 before:absolute before:left-0 before:content-['▹'] before:text-teal-500 dark:text-white">
                  Electron
                </li>
                <li className="relative pl-4 mb-2 text-lg text-gray-700 before:absolute before:left-0 before:content-['▹'] before:text-teal-500 dark:text-white">
                  Django & Flask
                </li>
                <li className="relative pl-4 mb-2 text-lg text-gray-700 before:absolute before:left-0 before:content-['▹'] before:text-teal-500 dark:text-white">
                  Flutter
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-xl text-gray-900 mb-2 dark:text-white">
                AI & Machine Learning
              </h2>
              <ul>
                <li className="relative pl-4 mb-2 text-lg text-gray-700 before:absolute before:left-0 before:content-['▹'] before:text-teal-500 dark:text-white">
                  TensorFlow
                </li>
                <li className="relative pl-4 mb-2 text-lg text-gray-700 before:absolute before:left-0 before:content-['▹'] before:text-teal-500 dark:text-white">
                  PyTorch
                </li>
                <li className="relative pl-4 mb-2 text-lg text-gray-700 before:absolute before:left-0 before:content-['▹'] before:text-teal-500 dark:text-white">
                  sklearn
                </li>
                <li className="relative pl-4 mb-2 text-lg text-gray-700 before:absolute before:left-0 before:content-['▹'] before:text-teal-500 dark:text-white">
                  Pandas
                </li>
                <li className="relative pl-4 mb-2 text-lg text-gray-700 before:absolute before:left-0 before:content-['▹'] before:text-teal-500 dark:text-white">
                  Numpy
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-xl text-gray-900 mb-2 dark:text-white">
                Design
              </h2>
              <ul>
                <li className="relative pl-4 mb-2 text-lg text-gray-700 before:absolute before:left-0 before:content-['▹'] before:text-teal-500 dark:text-white">
                  Adobe XD
                </li>
                <li className="relative pl-4 mb-2 text-lg text-gray-700 before:absolute before:left-0 before:content-['▹'] before:text-teal-500 dark:text-white">
                  Figma
                </li>
                <li className="relative pl-4 mb-2 text-lg text-gray-700 before:absolute before:left-0 before:content-['▹'] before:text-teal-500 dark:text-white">
                  Sketch
                </li>
                <li className="relative pl-4 mb-2 text-lg text-gray-700 before:absolute before:left-0 before:content-['▹'] before:text-teal-500 dark:text-white">
                  Webflow
                </li>
              </ul>
            </div>
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
                <div className="p-4 bg-[var(--background-modals)] rounded-[5px] overflow-hidden border border-[#fff2]">
                  <h3 className="text-lg font-space-mono text-gray-900 mb-2 dark:text-white">
                    Web Apps & APIs
                  </h3>
                  <p className="text-sm font-space-mono text-gray-700 dark:text-white">
                    I develop both front-end & back-end of websites using
                    Express.js, React.js, Python Flask/Django, Node.js and
                    Go-lang
                  </p>
                </div>
                <div className="p-4 bg-[var(--background-modals)] rounded-[5px] border border-[#fff2]">
                  <h3 className="text-lg font-space-mono text-gray-900 mb-2 dark:text-white">
                    Machine Learning
                  </h3>
                  <p className="text-sm font-space-mono text-gray-700 dark:text-white">
                    With knowledge in AI & Machine learning, I create effective
                    models for complex business challenges using
                    Tensorflow/Keras & Scikit-learn.
                  </p>
                </div>
                <div className="p-4 bg-[var(--background-modals)] rounded-[5px] border border-[#fff2]">
                  <h3 className="text-lg font-space-mono text-gray-900 mb-2 dark:text-white">
                    Mobile Development
                  </h3>
                  <p className="text-sm font-space-mono text-gray-700 dark:text-white">
                    I build cross-platform mobile apps using React Native &
                    Flutter, delivering seamless user experiences on both iOS
                    and Android.
                  </p>
                </div>
                <div className="p-4 bg-[var(--background-modals)] rounded-[5px] border border-[#fff2]">
                  <h3 className="text-lg font-space-mono text-gray-900 mb-2 dark:text-white">
                    UI/UX
                  </h3>
                  <p className="text-sm font-space-mono text-gray-700 dark:text-white">
                    I design user-centered digital experiences emphasizing
                    functionality, usability, and aesthetics, ensuring
                    user-friendly products.
                  </p>
                </div>
                <div className="p-4 bg-[var(--background-modals)] rounded-[5px] border border-[#fff2]">
                  <h3 className="text-lg font-space-mono text-gray-900 mb-2 dark:text-white">
                    DevOps
                  </h3>
                  <p className="text-sm font-space-mono text-gray-700 dark:text-white">
                    I use CI/CD practices to automate deployment and testing
                    processes, ensuring robust and stable releases, while
                    leveraging Docker & Kubernetes for scalability.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="my-14">
          <h2 className="text-2xl dark:text-white text-center">
            <span className="text-teal-500 text-sm mr-2">.04</span> Experience &
            Schooling
          </h2>
          <div className="py-3 mx-4">
            <div className="my-8 sm:flex sm:items-center sm:justify-between sm:gap-14">
              <div className="flex-1">
                <h2 className="text-2xl mb-2 dark:text-white">
                  Samoei Boys Secondary School, Nandi Hills
                </h2>
                <p className="text-lg dark:text-white">
                  at samoei i learned alot of life skills and career developing
                  skills through my four years there, This is where i had my
                  first intrest in computers
                </p>
              </div>
              <div className="sm:w-1/4 sm:flex sm:items-start sm:justify-end">
                <span className="text-nowrap dark:text-white">
                  2016 Jan - 2019 Dec
                </span>
              </div>
            </div>
          </div>
          <div className="py-3 mx-4">
            <div className="my-8 sm:flex sm:items-center sm:justify-between sm:gap-14">
              <div className="flex-1">
                <h2 className="text-2xl mb-2 dark:text-white">
                  Alphax College (Web Development), Eldoret
                </h2>
                <p className="text-lg dark:text-white">
                  here i took a practical course on web development where i
                  gained skills in HTML, css, javascript and php. I also got
                  certified in web development
                </p>
              </div>
              <div className="sm:w-1/4 sm:flex sm:items-start sm:justify-end">
                <span className="text-nowrap dark:text-white">
                  2020 Jan - 2020 April
                </span>
              </div>
            </div>
          </div>
          <div className="py-3 mx-4">
            <div className="my-8 sm:flex sm:items-center sm:justify-between sm:gap-14">
              <div className="flex-1">
                <h2 className="text-2xl mb-2 dark:text-white">
                  Machakos University (Computer Science), Machakos
                </h2>
                <p className="text-lg dark:text-white">
                  At Machakos University, I gained a deep understanding of the
                  theoretical foundations of computing technologies. I had the
                  opportunity to collaborate with many peers on various school
                  projects over the four years. This experience was incredibly
                  rewarding, allowing me to forge lifelong connections and
                  acquire a range of skills that enhanced my personal
                  development and advanced my career.
                </p>
              </div>
              <div className="sm:w-1/4 sm:flex sm:items-start sm:justify-end">
                <span className="text-nowrap dark:text-white">
                  2020 Sept - 2024 April
                </span>
              </div>
            </div>
          </div>
          <div className="py-3 mx-4">
            <div className="my-8 sm:flex sm:items-center sm:justify-between sm:gap-14">
              <div className="flex-1">
                <h2 className="text-2xl mb-2 dark:text-white">
                  Water Resources Authority (Attaché), Nairobi
                </h2>
                <p className="text-lg dark:text-white">
                  As an Attaché at WRA, I adeptly applied ICT expertise,
                  enhancing tech solutions, workflow efficiency, and
                  communication. Adept in tech advancements, I boosted
                  organizational proficiency and innovation.
                </p>
              </div>
              <div className="sm:w-1/4 sm:flex sm:items-start sm:justify-end">
                <span className="text-nowrap dark:text-white">
                  2023 May - 2023 August
                </span>
              </div>
            </div>
          </div>
          <div className="py-3 mx-4">
            <div className="my-8 sm:flex sm:items-center sm:justify-between sm:gap-14">
              <div className="flex-1">
                <h2 className="text-2xl mb-2 dark:text-white">
                  Moringa School (Software Engineering), Nairobi
                </h2>
                <p className="text-lg dark:text-white">
                  I successfully completed my software engineering program at
                  Moringa School. During my time there, I gained comprehensive
                  knowledge of web technologies, including backend, frontend,
                  and database systems, which I have applied to several
                  projects. In addition to technical skills, I also developed
                  strong intrapersonal skills and a solid understanding of
                  system design.
                </p>
              </div>
              <div className="sm:w-1/4 sm:flex sm:items-start sm:justify-end">
                <span className="text-nowrap dark:text-white">
                  2024 June - 2024 November
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default About
