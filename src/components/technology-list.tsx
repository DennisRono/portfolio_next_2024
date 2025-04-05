import type React from "react"

interface TechnologyListProps {
  title: string
  items: string[]
}

const TechnologyList: React.FC<TechnologyListProps> = ({ title, items }) => {
  return (
    <div>
      <h2 className="text-xl text-gray-900 mb-2 dark:text-white">{title}</h2>
      <ul>
        {items.map((item, index) => (
          <li
            key={index}
            className="relative pl-4 mb-2 text-lg text-gray-700 before:absolute before:left-0 before:content-['▹'] before:text-teal-500 dark:text-white"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TechnologyList

