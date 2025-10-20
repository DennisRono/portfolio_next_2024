'use client'

import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Twitter from '@/assets/images/twitter.png'
import Facebook from '@/assets/images/facebook.png'
import Linkedin from '@/assets/images/linkedin.png'
import Bluesky from '@/assets/images/bluesky.png'
import Reddit from '@/assets/images/Reddit.webp'
import { Link } from 'lucide-react'

export default function ShareButtons() {
  const url = typeof window !== 'undefined' ? window.location.href : ''
  const encodedUrl = encodeURIComponent(url)

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        className="h-9 w-9 p-0 border-none"
        onClick={() =>
          window.open(
            `https://twitter.com/intent/tweet?url=${encodedUrl}`,
            '_blank',
            'noopener,noreferrer'
          )
        }
      >
        <div className="h-8 w-8">
          <Image src={Twitter} alt="twitter icon" />
        </div>
        <span className="sr-only">Share on Twitter</span>
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="h-9 w-9 p-0 border-none"
        onClick={() =>
          window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
            '_blank',
            'noopener,noreferrer'
          )
        }
      >
        <div className="h-8 w-8">
          <Image src={Facebook} alt="facebook icon" />
        </div>
        <span className="sr-only">Share on Facebook</span>
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="h-9 w-9 p-0 border-none"
        onClick={() =>
          window.open(
            `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
            '_blank',
            'noopener,noreferrer'
          )
        }
      >
        <div className="h-8 w-8">
          <Image src={Linkedin} alt="linkedin icon" />
        </div>
        <span className="sr-only">Share on LinkedIn</span>
      </Button>

      <Button
        variant="outline"
        size="sm"
        className="h-9 w-9 p-0 border-none"
        onClick={() =>
          window.open(
            `https://bsky.app/profile?share=${encodedUrl}`,
            '_blank',
            'noopener,noreferrer'
          )
        }
      >
        <div className="h-7 w-7">
          <Image src={Bluesky} alt="BlueSky icon" />
        </div>
        <span className="sr-only">Share on Bluesky</span>
      </Button>

      <Button
        variant="outline"
        size="sm"
        className="h-9 w-9 p-0 border-none"
        onClick={() =>
          window.open(
            `https://www.reddit.com/submit?url=${encodedUrl}`,
            '_blank',
            'noopener,noreferrer'
          )
        }
      >
        <div className="h-7 w-7">
          <Image src={Reddit} alt="BlueSky icon" />
        </div>
        <span className="sr-only">Share on Reddit</span>
      </Button>

      <Button
        variant="outline"
        size="sm"
        className="h-9 w-9 p-0 border-none"
        onClick={() => {
          navigator.clipboard.writeText(url)
          alert('Link copied to clipboard')
        }}
      >
        <Link className="h-8 w-8" />
        <span className="sr-only">Copy link</span>
      </Button>
    </div>
  )
}
