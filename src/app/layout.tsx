import type { Metadata } from 'next'
import '@/styles/output.scss'
import "katex/dist/katex.min.css"
import { Toaster } from '@/components/ui/toaster'

const title = 'Dennis Kibet Rono'
const description = `${title} is a software engineer with more than five years of experience. He has worked on nullchemy group softwares, Aerial Properties solutions and many more. He is a graduate of Machakos University and Moringa School`

export const metadata: Metadata = {
  metadataBase: new URL('https://denniskibet.com'),
  title: title,
  description: description,
  generator: 'Next.js',
  applicationName: title,
  referrer: 'origin-when-cross-origin',
  authors: [{ name: 'Dennis Kibet', url: 'https://denniskibet.com' }],
  creator: 'Dennis Kibet',
  publisher: 'Dennis Kibet',
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'de-DE': '/de-DE',
    },
  },
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  keywords: [
    'Dennis Kibet',
    'Dennis',
    'Kibet',
    'Rono',
    'Kenya',
    'Nairobi',
    'Software Engineer',
    'Software Developer',
    'Engineer',
    'Developer',
    'Typescript',
    'React.js',
    'nullchemy',
    'tenafriq',
  ],
  openGraph: {
    title: title,
    description: description,
    type: 'website',
    url: 'https://denniskibet.com',
    images: [
      {
        url: `https://denniskibet.com/profile.png`,
        width: 1200,
        height: 630,
        alt: 'Dennis Kibet',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: title,
    description: description,
    images: ['https://denniskibet.com/profile.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`min-h-screen bg-gradient-to-b bg-no-repeat from-[#e3e1ff] from-10% via-[#e3edff] via-30% to-[#fff] to-90% dark:bg-gradient-to-b dark:from-[#09090e] dark:from-20% dark:via-[#090c14] dark:via-50% dark:to-[#0f121a] dark:to-90% dark:bg-no-repeat relative`}
      >
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  )
}
