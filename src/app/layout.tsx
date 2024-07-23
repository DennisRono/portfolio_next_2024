import type { Metadata } from 'next'
import '@/styles/output.scss'
import { Toaster } from '@/components/ui/toaster'
import ThemeSwitcher from '@/components/ThemeSwitcher'

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
      <body
        className={`min-h-screen bg-gradient-to-b bg-no-repeat from-[#e3e1ff] from-10% via-[#e3edff] via-30% to-[#fff] to-90% dark:bg-gradient-to-b dark:from-[#09090e] dark:from-20% dark:via-[#090c14] dark:via-50% dark:to-[#0f121a] dark:to-90% dark:bg-no-repeat relative`}
      >
        <main>{children}</main>
        <Toaster />
        <ThemeSwitcher />
      </body>
    </html>
  )
}
