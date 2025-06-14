import type React from "react"
import type { Metadata, Viewport } from "next"
import "@/styles/output.scss"
import "katex/dist/katex.min.css"
import { Toaster } from "@/components/ui/toaster"
import Script from "next/script"

const title = "Dennis Kibet Rono"
const description = `${title} is a software engineer with more than five years of experience. He has worked on nullchemy group softwares, NBO Tech Labs and many more. He is a graduate of Machakos University and Moringa School`
const url = "https://denniskibet.com"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#4F46E5",
  colorScheme: "light dark",
}

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: {
    template: `%s | ${title}`,
    default: title,
  },
  description: description,
  generator: "Next.js",
  applicationName: title,
  referrer: "origin-when-cross-origin",
  authors: [{ name: "Dennis Kibet", url: url }],
  creator: "Dennis Kibet",
  publisher: "Dennis Kibet",
  category: "portfolio",
  keywords: [
    "Dennis Kibet",
    "Dennis",
    "Kibet",
    "Rono",
    "Kenya",
    "Nairobi",
    "Software Engineer",
    "Software Developer",
    "Engineer",
    "Developer",
    "Typescript",
    "React.js",
    "nullchemy",
    "tenafriq",
    "Portfolio",
    "Full Stack Developer",
    "Frontend Developer",
    "Backend Developer",
    "FastAPI",
    "Transformers"
  ],

  openGraph: {
    title: title,
    description: description,
    type: "website",
    locale: "en_US",
    url: url,
    siteName: title,
    images: [
      {
        url: `${url}/profile.png`,
        width: 1200,
        height: 630,
        alt: "Dennis Kibet - Software Engineer",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: title,
    description: description,
    images: [`${url}/profile.png`],
    creator: "@dennisrkibet",
  },

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png" }, { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#4F46E5",
      },
    ],
  },

  manifest: `${url}/manifest.json`,

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  verification: {
    google: "your-google-site-verification-code",
  },

  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },

  appleWebApp: {
    capable: true,
    title: title,
    statusBarStyle: "black-translucent",
  },

  formatDetection: {
    email: true,
    address: true,
    telephone: true,
    date: true,
    url: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body
        className={`min-h-screen bg-gradient-to-b bg-no-repeat from-[#e3e1ff] from-10% via-[#e3edff] via-30% to-[#fff] to-90% dark:bg-gradient-to-b dark:from-[#09090e] dark:from-20% dark:via-[#090c14] dark:via-50% dark:to-[#0f121a] dark:to-90% dark:bg-no-repeat relative antialiased`}
      >
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Dennis Kibet Rono",
              url: url,
              image: `${url}/profile.png`,
              jobTitle: "Software Engineer",
              worksFor: {
                "@type": "Organization",
                name: "Nullchemy Group",
              },
              alumniOf: [
                {
                  "@type": "EducationalOrganization",
                  name: "Machakos University",
                },
                {
                  "@type": "EducationalOrganization",
                  name: "Moringa School",
                },
              ],
              address: {
                "@type": "PostalAddress",
                addressLocality: "Nairobi",
                addressCountry: "KE",
              },
              sameAs: [
                "https://github.com/DennisRono",
                "https://linkedin.com/in/dennisrkibet",
                "https://twitter.com/dennisrkibet",
              ],
              knowsAbout: [
                "Software Engineering",
                "TypeScript",
                "React.js",
                "Next.js",
                "Full Stack Development",
                "Frontend Development",
                "Backend Development",
                "Machine Learning",
                "Artificial Intelligence"
              ],
              description: description,
            }),
          }}
        />

        <Script
          id="gtm"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-XXXXXXX'); 
            `,
          }}
        />

        <main>{children}</main>
        <Toaster />

        <div className="sr-only">
          <a href="/accessibility">Accessibility Statement</a>
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms-of-service">Terms of Service</a>
        </div>
      </body>
    </html>
  )
}
