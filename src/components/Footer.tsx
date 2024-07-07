import React from 'react'

const Footer = () => {
  return (
    <div className="w-full py-4">
      <p className="text-center text-black dark:text-white">
        &copy; copyright {new Date().getFullYear()}
      </p>
    </div>
  )
}

export default Footer
