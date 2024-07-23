'use client'
import { faCheck, faCopy } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function CodeCopyBtn({ children }: any) {
  const [copyOk, setCopyOk] = React.useState(false)
  const iconColor = copyOk ? '#0af20a' : '#ddd'

  const handleClick = (e: any) => {
    const textToCopy = children

    console.log(textToCopy)

    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy)
      setCopyOk(true)
      setTimeout(() => {
        setCopyOk(false)
      }, 500)
    }
  }

  return (
    <div className="code-copy-btn">
      {copyOk ? (
        <FontAwesomeIcon
          icon={faCheck}
          onClick={handleClick}
          style={{ fill: iconColor, color: iconColor }}
        />
      ) : (
        <FontAwesomeIcon
          icon={faCopy}
          onClick={handleClick}
          style={{ fill: iconColor, color: iconColor }}
        />
      )}
    </div>
  )
}
