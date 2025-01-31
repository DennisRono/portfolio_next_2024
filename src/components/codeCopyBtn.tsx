'use client'
import { faCheck, faCopy } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function CodeCopyBtn({ children }: any) {
  const [copyOk, setCopyOk] = React.useState(false)
  const iconColor = copyOk ? '#0af20a !important' : '#ddd !important'

  const handleClick = (e: any) => {
    const textToCopy = children

    console.log(textToCopy)
    console.log(children)

    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy)
      setCopyOk(true)
      setTimeout(() => {
        setCopyOk(false)
      }, 500)
    }
  }

  return (
    <div className="code-copy-btn !text-white">
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
