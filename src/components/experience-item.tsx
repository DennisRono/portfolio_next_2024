import type React from "react"
import Image from "next/image"
import Innovex from "@/assets/images/innovex.png"
import Moringa from "@/assets/images/moringa.png"
import WRA from "@/assets/images/wra.webp"
import MKSU from "@/assets/images/mksu.png"

interface ExperienceItemProps {
  institution: string
  description: string
  period: string
  logo?: string | null
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({ institution, description, period, logo }) => {
  return (
    <div className="py-3 mx-4">
      <div className="my-8 sm:flex sm:items-center sm:justify-between sm:gap-14">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            {logo === "Innovex" && (
              <a href="https://www.innovexsolutions.co.ke/" target="_blank" rel="noopener noreferrer">
                <Image src={Innovex} className="h-[50px] w-[50px]" alt="Innovex Solutions Logo" />
              </a>
            )}
            {logo === "Moringa" && (
              <a href="https://moringaschool.com/" target="_blank" rel="noopener noreferrer">
                <Image src={Moringa} className="h-[50px] w-[50px]" alt="Moringa School Logo" />
              </a>
            )}
            {logo === "WRA" && (
              <a href="https://wra.go.ke/" target="_blank" rel="noopener noreferrer">
                <Image src={WRA} className="h-[50px] w-[50px]" alt="WRA Logo" />
              </a>
            )}
            {logo === "MKSU" && (
              <a href="https://www.mksu.ac.ke/" target="_blank" rel="noopener noreferrer">
                <Image src={MKSU} className="h-[40px] w-[40px]" alt="MKSU Logo" />
              </a>
            )}
            <h2 className={`text-3xl mb-2 dark:text-white`}>{institution}</h2>
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

