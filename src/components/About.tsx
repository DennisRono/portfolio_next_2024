/* eslint-disable react/no-unescaped-entities */
import React, { Fragment } from 'react'
import ProfileImage from '@/assets/images/profile.png'
import Image from 'next/image'

const About = () => {
  return (
    <Fragment>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 sticky top-0">
            <h1 className="text-3xl font-mono text-gray-900 mb-4 text-center md:text-left">
              About me <code>&lt;/&gt;</code>
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
              <h2 className="text-2xl text-gray-900">Dennis Kibet R.</h2>
              <h4 className="text-xl text-gray-600">
                Full-Stack Software Developer
              </h4>
            </div>
          </div>
          <div className="md:flex-1 mt-8 md:mt-0 md:pl-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-right md:text-left">
                Background <span className="text-teal-500">.01</span>
              </h2>
              <p className="text-lg text-gray-700">
                Hello, I am Dennis. I am currently a student at Moringa School
                Kenya, studying Software Engineering. I love building things for
                the internet. My native home place is Eldoret Kenya. My interest
                in computers started back when I was in High School when I did a
                science fair project on web development. As simple as the
                project was it taught me a lot on how the internet works and
                moreover gave me a little Experience on HTML & CSS.
                <br />
                <br />
                Currently, I focus on finding reliable solutions for software
                issues. I am fluent in English and accustomed to working with
                cross-cultural, global teams.
              </p>
            </div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold">
                <span className="text-teal-500">.02</span> Technologies I use
              </h2>
              <p className="text-lg text-gray-700">
                Here are a few technologies I've been working with recently:
              </p>
              <div className="flex flex-wrap justify-between mt-4">
                <div>
                  <h2 className="text-xl text-gray-900 mb-2">Languages</h2>
                  <ul>
                    <li className="relative pl-4 mb-2 text-lg text-gray-700 before:absolute before:left-0 before:content-['▹'] before:text-teal-500">
                      php
                    </li>
                    <li className="relative pl-4 mb-2 text-lg text-gray-700 before:absolute before:left-0 before:content-['▹'] before:text-teal-500">
                      Node.js
                    </li>
                    <li className="relative pl-4 mb-2 text-lg text-gray-700 before:absolute before:left-0 before:content-['▹'] before:text-teal-500">
                      Java
                    </li>
                    <li className="relative pl-4 mb-2 text-lg text-gray-700 before:absolute before:left-0 before:content-['▹'] before:text-teal-500">
                      C#
                    </li>
                    <li className="relative pl-4 mb-2 text-lg text-gray-700 before:absolute before:left-0 before:content-['▹'] before:text-teal-500">
                      Python
                    </li>
                    <li className="relative pl-4 mb-2 text-lg text-gray-700 before:absolute before:left-0 before:content-['▹'] before:text-teal-500">
                      Javascript (ES6+)
                    </li>
                  </ul>
                </div>
                <div>
                  <h2 className="text-xl text-gray-900 mb-2">Frameworks</h2>
                  <ul>
                    <li className="relative pl-4 mb-2 text-lg text-gray-700 before:absolute before:left-0 before:content-['▹'] before:text-teal-500">
                      React.js
                    </li>
                    <li className="relative pl-4 mb-2 text-lg text-gray-700 before:absolute before:left-0 before:content-['▹'] before:text-teal-500">
                      TensorFlow
                    </li>
                    <li className="relative pl-4 mb-2 text-lg text-gray-700 before:absolute before:left-0 before:content-['▹'] before:text-teal-500">
                      Electron
                    </li>
                    <li className="relative pl-4 mb-2 text-lg text-gray-700 before:absolute before:left-0 before:content-['▹'] before:text-teal-500">
                      Django
                    </li>
                  </ul>
                </div>
                <div>
                  <h2 className="text-xl text-gray-900 mb-2">Design</h2>
                  <ul>
                    <li className="relative pl-4 mb-2 text-lg text-gray-700 before:absolute before:left-0 before:content-['▹'] before:text-teal-500">
                      Adobe XD
                    </li>
                    <li className="relative pl-4 mb-2 text-lg text-gray-700 before:absolute before:left-0 before:content-['▹'] before:text-teal-500">
                      Figma
                    </li>
                    <li className="relative pl-4 mb-2 text-lg text-gray-700 before:absolute before:left-0 before:content-['▹'] before:text-teal-500">
                      Sketch
                    </li>
                    <li className="relative pl-4 mb-2 text-lg text-gray-700 before:absolute before:left-0 before:content-['▹'] before:text-teal-500">
                      Webflow
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold">
            <span className="text-teal-500">.03</span> Career
          </h2>
          <div className="flex flex-col md:flex-row mt-4 gap-8">
            <div className="md:w-2/3">
              <h2 className="text-xl font-mono text-gray-900 mb-2">
                Full-Stack Software Developer
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                I am an innovative full-stack software developer with over three
                years of expertise, specializing in the seamless integration of
                frontend and backend components for intricate, scalable web and
                mobile applications.
              </p>
              <p className="text-lg text-gray-700">
                Over the past three years, my journey as a software artisan led
                to a portfolio with remote agency work, startup collaborations,
                and diverse partnerships. This path resulted in innovative
                digital solutions for business and consumer domains, reflecting
                my dedication to advancing technology.
              </p>
            </div>
            <div className="md:w-1/3">
              <h4 className="text-xl font-mono text-gray-900 mb-4">
                ~ what i do
              </h4>
              <div className="space-y-4">
                <div className="p-4 bg-gray-100 rounded-lg">
                  <h3 className="text-lg font-mono text-gray-900 mb-2">
                    Web Apps & APIs
                  </h3>
                  <p className="text-sm text-gray-700">
                    I develop both front-end & back-end of websites using
                    Express.js, React.js, Python Flask/Django, Node.js and
                    Go-lang
                  </p>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg">
                  <h3 className="text-lg font-mono text-gray-900 mb-2">
                    Machine Learning
                  </h3>
                  <p className="text-sm text-gray-700">
                    With knowledge in AI & Machine learning, I create effective
                    models for complex business challenges using
                    Tensorflow/Keras & Scikit-learn.
                  </p>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg">
                  <h3 className="text-lg font-mono text-gray-900 mb-2">
                    Mobile Development
                  </h3>
                  <p className="text-sm text-gray-700">
                    I build cross-platform mobile apps using React Native &
                    Flutter, delivering seamless user experiences on both iOS
                    and Android.
                  </p>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg">
                  <h3 className="text-lg font-mono text-gray-900 mb-2">
                    UI/UX
                  </h3>
                  <p className="text-sm text-gray-700">
                    I design user-centered digital experiences emphasizing
                    functionality, usability, and aesthetics, ensuring
                    user-friendly products.
                  </p>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg">
                  <h3 className="text-lg font-mono text-gray-900 mb-2">
                    Technical Writing
                  </h3>
                  <p className="text-sm text-gray-700">
                    I create clear and concise technical documentation,
                    tutorials, and articles, simplifying complex topics for
                    diverse audiences.
                  </p>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg">
                  <h3 className="text-lg font-mono text-gray-900 mb-2">
                    DevOps
                  </h3>
                  <p className="text-sm text-gray-700">
                    I use CI/CD practices to automate deployment and testing
                    processes, ensuring robust and stable releases, while
                    leveraging Docker & Kubernetes for scalability.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold">
            <span className="text-teal-500">.04</span> Current
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-gray-100 p-4 rounded-lg">
              <h4 className="text-lg font-bold text-gray-900">
                IT Services Provider
              </h4>
              <p className="text-gray-700">
                Offering IT support, infrastructure management, and consulting
                services to optimize business operations and ensure system
                efficiency.
              </p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h4 className="text-lg font-bold text-gray-900">
                Cross-Platform Mobile Development
              </h4>
              <p className="text-gray-700">
                Creating cross-platform mobile applications using React Native &
                Flutter to deliver seamless experiences across iOS and Android
                devices.
              </p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h4 className="text-lg font-bold text-gray-900">UI/UX Design</h4>
              <p className="text-gray-700">
                Focusing on designing intuitive user interfaces and experiences
                that enhance user satisfaction and engagement.
              </p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h4 className="text-lg font-bold text-gray-900">
                Technical Writing
              </h4>
              <p className="text-gray-700">
                Producing technical documentation, tutorials, and articles to
                simplify complex topics for a broader audience.
              </p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h4 className="text-lg font-bold text-gray-900">
                Cloud Solutions Architect
              </h4>
              <p className="text-gray-700">
                Designing and implementing scalable cloud-based solutions to
                meet the evolving needs of businesses.
              </p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h4 className="text-lg font-bold text-gray-900">
                E-Learning Platform Development
              </h4>
              <p className="text-gray-700">
                Developing innovative e-learning platforms to enhance
                educational experiences and accessibility.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default About
