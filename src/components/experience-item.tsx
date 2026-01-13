import type React from 'react'
import Image from 'next/image'
import Innovex from '@/assets/images/innovex.png'
import Moringa from '@/assets/images/moringa.png'
import WRA from '@/assets/images/wra.webp'
import MKSU from '@/assets/images/mksu.png'
import SamoeiBoys from '@/assets/images/samoei_boys_logo.png'
import NBO from '@/assets/images/nbo_tech_labs.png'
import UAB from '@/assets/images/uab.png'

interface ExperienceItemProps {
  institution: string
  description: string
  period: string
  logo?: string | null
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({
  institution,
  description,
  period,
  logo,
}) => {
  const logoMap: Record<
    string,
    { href: string; src: any; alt: string; size: string }
  > = {
    Innovex: {
      href: 'https://www.innovexsolutions.co.ke/',
      src: Innovex,
      alt: 'Innovex Solutions Logo',
      size: 'h-[50px] w-[50px]',
    },
    Moringa: {
      href: 'https://moringaschool.com/',
      src: Moringa,
      alt: 'Moringa School Logo',
      size: 'h-[50px] w-[50px]',
    },
    WRA: {
      href: 'https://wra.go.ke/',
      src: WRA,
      alt: 'WRA Logo',
      size: 'h-[50px] w-[50px]',
    },
    MKSU: {
      href: 'https://www.mksu.ac.ke/',
      src: MKSU,
      alt: 'MKSU Logo',
      size: 'h-[40px] w-[40px]',
    },
    SamoeiBoys: {
      href: 'https://samoeiboys.sc.ke/',
      src: SamoeiBoys,
      alt: 'Samoei Boys Secondary School Logo',
      size: 'h-[40px] w-[40px]',
    },
    NBO: {
      href: 'https://nbotechlabs.com/',
      src: NBO,
      alt: 'NBO Tech Labs',
      size: 'h-[60px] w-[60px]',
    },
    UAB: {
      href: 'https://uab.edu/',
      src: UAB,
      alt: 'University of Alabama at Birmingham',
      size: 'h-[30px] w-auto',
    }
  }

  const logoData = logo ? logoMap[logo] : null

  return (
    <div className="py-3 mx-4">
      <div className="my-8 sm:flex sm:items-center sm:justify-between sm:gap-14">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            {logoData && (
              <a href={logoData.href} target="_blank" rel="noopener noreferrer">
                <Image
                  src={logoData.src}
                  className={logoData.size}
                  alt={logoData.alt}
                />
              </a>
            )}
            {logoData ? (
              <a href={logoData.href} target="_blank" rel="noopener noreferrer">
                <h2 className="text-3xl mb-2 dark:text-white hover:underline inline-flex items-center gap-2">
                  <span className="break-words">{institution}</span>
                </h2>
              </a>
            ) : (
              <h2 className="text-3xl mb-2 dark:text-white">{institution}</h2>
            )}
          </div>
          <p className="text-lg dark:text-white">{description}</p>
        </div>
        <div className="sm:w-1/4 sm:flex sm:items-start sm:justify-end">
          <span className="text-nowrap dark:text-white">{period}</span>
        </div>
      </div>
    </div>
  )
}

export default ExperienceItem
