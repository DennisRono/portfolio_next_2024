import { StaticImageData } from 'next/image'
import Mail from 'nodemailer/lib/mailer'
import MimeNode from 'nodemailer/lib/mime-node'

interface Slide {
  id: number
  imageUrl: string
  stack: string
  title: string
  preview: string
  slug: string
  external_url: string
}

interface ListAction {
  url: string
  comment: string
}

export interface DocType {
  type:
    | 'pdf'
    | 'docx'
    | 'doc'
    | 'txt'
    | 'md'
    | 'rtf'
    | 'csv'
    | 'xlsx'
    | 'xls'
    | 'ods'
    | 'pptx'
    | 'ppt'
    | 'odp'
    | 'html'
    | 'json'
    | 'xml'
    | 'yaml'
    | 'yml'
    | 'jpg'
    | 'jpeg'
    | 'png'
    | 'gif'
    | 'svg'
    | 'webp'
    | 'zip'
    | 'rar'
    | 'tar'
    | '7z'
    | 'mp3'
    | 'wav'
    | 'mp4'
    | 'mov'
    | 'avi'
  path: string
  file_name: string
}

export interface ProjectType {
  id: number
  imageUrl: StaticImageData
  stack_string: string
  stack: string[]
  title: string
  preview: string
  slug: string
  external_url: string
  made_at: string
  year: string
  client: string
  docs?: DocType[]
}

export interface EmailOptionsType {
  from?: string
  to: string | string[]
  cc?: string | Array<{ name: string; address: string }>
  bcc?: string | Array<{ name: string; address: string }>
  subject: string
  text?: string
  html?: string
  attachments?: Array<{
    filename?: string
    content?: any
    encoding?: string
    raw?: string
    path?: string
    contentType?: string
  }>
  alternatives?: Array<{
    contentType: string
    content: string
  }>
  icalEvent?: {
    filename: string
    method: 'request' | 'publish' | 'cancel'
    content?: any
    path?: string
    href?: string
  }
  list?: {
    help: string
    unsubscribe: ListAction
    subscribe: (string | ListAction)[]
    post: (string | ListAction)[]
  }
  headers?: {
    [key: string]: string
  }
  envelope?: Mail.Envelope | MimeNode.Envelope | undefined
}
