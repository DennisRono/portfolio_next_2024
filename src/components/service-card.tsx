import type React from "react"

interface ServiceCardProps {
  title: string
  description: string
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description }) => {
  return (
    <div className="p-4 rounded-[5px] overflow-hidden border border-1 border-gray-500 dark:border-[#fff2]">
      <h3 className="text-lg font-space-mono text-gray-900 mb-2 dark:text-white">{title}</h3>
      <p className="text-sm font-space-mono text-gray-700 dark:text-white">{description}</p>
    </div>
  )
}

export default ServiceCard

