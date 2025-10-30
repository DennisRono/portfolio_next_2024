'use client'
import React from 'react'
import { ProgressProvider } from '@bprogress/next/app'

const ProgressIndicator: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <>
      <ProgressProvider
        height="4px"
        color="#e85535"
        options={{ showSpinner: false }}
        shallowRouting
      >
        {children}
      </ProgressProvider>
    </>
  )
}

export default ProgressIndicator
