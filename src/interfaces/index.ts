interface Slide {
  id: number
  imageUrl: string
  stack: string
  title: string
  preview: string
  slug: string
  external_url: string
}

interface EmailOptionsType {
  from?: string
  to: string | string[]
  subject: string
  text?: string
  html?: string
}
