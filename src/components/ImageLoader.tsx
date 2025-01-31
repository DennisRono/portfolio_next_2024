import React from 'react'
import Image from 'next/image'

const ImageLoader = ({
  imageurl,
  imagealt = '',
}: {
  imageurl: string
  imagealt: string
}) => {
  return (
    <div>
      <Image src={imageurl} alt={imagealt} />
    </div>
  )
}

export default ImageLoader
