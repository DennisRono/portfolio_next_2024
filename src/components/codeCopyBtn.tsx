'use client'
import { faCheck, faCopy } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function CodeCopyBtn({ children }: { children: string }) {
  const [copyOk, setCopyOk] = React.useState(false)
  const iconColor = copyOk ? '#0af20a !important' : '#ddd !important'

  const handleClick = () => {
    // Clean up the text to copy by removing any extra whitespace
    const textToCopy = typeof children === 'string' ? children.trim() : ''

    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy)
      setCopyOk(true)
      setTimeout(() => {
        setCopyOk(false)
      }, 1500)
    }
  }

  return (
    <div className="code-copy-btn !text-white absolute top-2 right-2 cursor-pointer p-2 rounded hover:bg-gray-700/50">
      {copyOk ? (
        <FontAwesomeIcon
          icon={faCheck}
          onClick={handleClick}
          className="text-white"
          style={{ fill: iconColor, color: iconColor }}
        />
      ) : (
        <FontAwesomeIcon
          icon={faCopy}
          onClick={handleClick}
          className="text-white"
          style={{ fill: iconColor, color: iconColor }}
        />
      )}
    </div>
  )
}
