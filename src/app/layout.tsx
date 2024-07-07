import type { Metadata } from 'next'
import '@/styles/output.scss'
import { Toaster } from '@/components/ui/toaster'

export const metadata: Metadata = {
  title: 'Home - Dennis Kibet R.',
  description: 'Dennis Kibet portfolio homepage',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`bg-white dark:bg-[#040405] relative`}>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  )
}
