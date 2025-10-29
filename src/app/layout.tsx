import type React from 'react'
import type { Metadata, Viewport } from 'next'
import '@/styles/output.scss'
import 'katex/dist/katex.min.css'
import { Toaster } from '@/components/ui/sonner'
import Script from 'next/script'
import { VisitorTrackingProvider } from '@/contexts/visitor-tracking'
import { Glow, GlowArea } from '@/components/glow'
import { ProgressProvider } from '@bprogress/next/app'
import ProgressIndicator from '@/contexts/progress'

const title = 'Dennis Kibet Rono'
const description = `${title} is a software engineer with more than five years of experience. He has worked on nullchemy group softwares, NBO Tech Labs and many more. He is a graduate of Machakos University and Moringa School`
const url = 'https://denniskibet.com'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#4F46E5',
  colorScheme: 'light dark',
}

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: {
    template: `%s | ${title}`,
    default: title,
  },
  description: description,
  generator: 'Next.js',
  applicationName: title,
  referrer: 'origin-when-cross-origin',
  authors: [{ name: 'Dennis Kibet', url: url }],
  creator: 'Dennis Kibet',
  publisher: 'Dennis Kibet',
  category: 'portfolio',
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
    'Portfolio',
    'Full Stack Developer',
    'Frontend Developer',
    'Backend Developer',
    'FastAPI',
    'Transformers',
  ],

  openGraph: {
    title: title,
    description: description,
    type: 'website',
    locale: 'en_US',
    url: url,
    siteName: title,
    images: [
      {
        url: `${url}/profile.png`,
        width: 1200,
        height: 630,
        alt: 'Dennis Kibet - Software Engineer',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: title,
    description: description,
    images: [`${url}/profile.png`],
    creator: '@dennisrkibet',
  },

  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png' },
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#4F46E5',
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
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },

  verification: {
    google: 'your-google-site-verification-code',
  },

  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
    },
  },

  appleWebApp: {
    capable: true,
    title: title,
    statusBarStyle: 'black-translucent',
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
      <body className={`min-h-screen relative antialiased`}>
        <GlowArea className="bg-gradient-to-b bg-no-repeat from-[#e3e1ff] from-10% via-[#e3edff] via-30% to-[#fff] to-90% dark:bg-gradient-to-b dark:from-[#09090e] dark:from-20% dark:via-[#090c14] dark:via-50% dark:to-[#0f121a] dark:to-90% dark:bg-no-repeat">
          <Glow color="#00ffff16">
            <ProgressIndicator>
              <Script
                id="schema-org"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'Person',
                    name: 'Dennis Kibet Rono',
                    url: url,
                    image: `${url}/profile.png`,
                    jobTitle: 'Software Engineer',
                    worksFor: {
                      '@type': 'Organization',
                      name: 'NBO Tech Labs',
                    },
                    alumniOf: [
                      {
                        '@type': 'EducationalOrganization',
                        name: 'Machakos University',
                      },
                      {
                        '@type': 'EducationalOrganization',
                        name: 'Moringa School',
                      },
                    ],
                    address: {
                      '@type': 'PostalAddress',
                      addressLocality: 'Nairobi',
                      addressCountry: 'KE',
                    },
                    sameAs: [
                      'https://github.com/DennisRono',
                      'https://linkedin.com/in/dennisrkibet',
                      'https://twitter.com/dennisrkibet',
                    ],
                    knowsAbout: [
                      'Software Engineering',
                      'TypeScript',
                      'React.js',
                      'Next.js',
                      'Full Stack Development',
                      'Frontend Development',
                      'Backend Development',
                      'Machine Learning',
                      'Artificial Intelligence',
                      'digital solutions',
                      'IT consulting',
                      'Agile software development',
                      'cloud architecture',
                    ],
                    description: description,
                    skills: [
                      'JavaScript',
                      'Next.js',
                      'React',
                      'Node.js',
                      'TypeScript',
                      'UX',
                      'FastAPI',
                      'Django',
                      'React Native',
                      'Flutter',
                      'Python',
                      'TailwindCSS',
                    ],
                  }),
                }}
              />

              <Script
                id="schema-org"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'BreadcrumbList',
                    itemListElement: [
                      {
                        '@type': 'ListItem',
                        position: 1,
                        name: 'Home',
                        item: 'https://denniskibet.com/',
                      },
                      {
                        '@type': 'ListItem',
                        position: 2,
                        name: 'Resume',
                        item: 'https://denniskibet.com/resume',
                      },
                      {
                        '@type': 'ListItem',
                        position: 3,
                        name: 'Projects',
                        item: 'https://denniskibet.com/projects',
                      },
                      {
                        '@type': 'ListItem',
                        position: 4,
                        name: 'Blog - Foundations of Code (Specialized LLMs)',
                        item: 'https://denniskibet.com/blog/01-foundations-of-code-specialized-llms',
                      },
                      {
                        '@type': 'ListItem',
                        position: 5,
                        name: 'Comprehensive Guide to Activation Functions in Neural Networks',
                        item: 'https://denniskibet.com/blog/comprehensive-guide-to-activation-functions-in-neural-networks',
                      },
                      {
                        '@type': 'ListItem',
                        position: 6,
                        name: 'Comprehensive Guide to Modern Machine Learning (2025)',
                        item: 'https://denniskibet.com/blog/comprehensive-guide-to-modern-machine-learning-2025',
                      },
                      {
                        '@type': 'ListItem',
                        position: 7,
                        name: 'Deploying Express + AWS EC2 + Nginx',
                        item: 'https://denniskibet.com/blog/deploying-express-aws-ec2-nginx',
                      },
                      {
                        '@type': 'ListItem',
                        position: 8,
                        name: 'Designing Models for PCB Design',
                        item: 'https://denniskibet.com/blog/designing-models-for-pcb-design',
                      },
                      {
                        '@type': 'ListItem',
                        position: 9,
                        name: 'Dynamic Sitemaps with Next.js 14',
                        item: 'https://denniskibet.com/blog/dynamic-sitemaps-with-nextjs-14',
                      },
                      {
                        '@type': 'ListItem',
                        position: 10,
                        name: 'Essential Data Cleaning and Preprocessing Guide',
                        item: 'https://denniskibet.com/blog/essential-data-cleaning-and-preprocessing-guide',
                      },
                      {
                        '@type': 'ListItem',
                        position: 11,
                        name: 'Farm Management System (CLI)',
                        item: 'https://denniskibet.com/blog/farm-management-system-cli',
                      },
                      {
                        '@type': 'ListItem',
                        position: 12,
                        name: 'From Idea to Product (Sit-Stand Desk)',
                        item: 'https://denniskibet.com/blog/from-idea-to-product-sit-stand-desk',
                      },
                      {
                        '@type': 'ListItem',
                        position: 13,
                        name: 'Image Upload to Cloudinary in React',
                        item: 'https://denniskibet.com/blog/image-upload-to-cloudinary-in-react',
                      },
                      {
                        '@type': 'ListItem',
                        position: 14,
                        name: 'Introduction to Javascript',
                        item: 'https://denniskibet.com/blog/introduction-to-javascript',
                      },
                      {
                        '@type': 'ListItem',
                        position: 15,
                        name: 'Latest Advancements in Neural Network Technologies',
                        item: 'https://denniskibet.com/blog/latest-advishments-in-neural-network-technologies',
                      },
                      {
                        '@type': 'ListItem',
                        position: 16,
                        name: 'Private Routes in React JS',
                        item: 'https://denniskibet.com/blog/private-routes-in-react-js',
                      },
                      {
                        '@type': 'ListItem',
                        position: 17,
                        name: 'Quest for Artificial General Intelligence',
                        item: 'https://denniskibet.com/blog/quest-for-artificial-general-intelligence',
                      },
                      {
                        '@type': 'ListItem',
                        position: 18,
                        name: 'State Management with Redux in Next.js 14',
                        item: 'https://denniskibet.com/blog/state-management-with-redux-in-nextjs-14',
                      },
                      {
                        '@type': 'ListItem',
                        position: 19,
                        name: 'Vim Shortcuts (VSCode Efficiency)',
                        item: 'https://denniskibet.com/blog/vim-shortcuts-vscode-efficiency',
                      },
                      {
                        '@type': 'ListItem',
                        position: 20,
                        name: 'We Care',
                        item: 'https://denniskibet.com/project/wecare',
                      },
                      {
                        '@type': 'ListItem',
                        position: 21,
                        name: 'Nullchemy Shop',
                        item: 'https://denniskibet.com/project/nullchemy-shop',
                      },
                      {
                        '@type': 'ListItem',
                        position: 22,
                        name: 'Null EMS',
                        item: 'https://denniskibet.com/project/null-ems',
                      },
                      {
                        '@type': 'ListItem',
                        position: 23,
                        name: 'WeNotify Kenya',
                        item: 'https://denniskibet.com/project/wenotify-kenya',
                      },
                      {
                        '@type': 'ListItem',
                        position: 24,
                        name: 'Tenafriq',
                        item: 'https://denniskibet.com/project/tenafriq',
                      },
                      {
                        '@type': 'ListItem',
                        position: 25,
                        name: 'Bebewa Logistics',
                        item: 'https://denniskibet.com/project/bebewa-logistics',
                      },
                      {
                        '@type': 'ListItem',
                        position: 26,
                        name: 'Shop Yangu',
                        item: 'https://denniskibet.com/project/shop-yangu',
                      },
                      {
                        '@type': 'ListItem',
                        position: 27,
                        name: 'Aerial Properties Solutions Limited',
                        item: 'https://denniskibet.com/project/aerial-properties-solutions-limited',
                      },
                      {
                        '@type': 'ListItem',
                        position: 28,
                        name: 'LinkedIn Clone',
                        item: 'https://denniskibet.com/project/linkedin-clone',
                      },
                      {
                        '@type': 'ListItem',
                        position: 29,
                        name: 'Nullchemy',
                        item: 'https://denniskibet.com/project/nullchemy',
                      },
                      {
                        '@type': 'ListItem',
                        position: 30,
                        name: 'Npay',
                        item: 'https://denniskibet.com/project/npay',
                      },
                      {
                        '@type': 'ListItem',
                        position: 31,
                        name: 'N-Analytics',
                        item: 'https://denniskibet.com/project/n-analytics',
                      },
                    ],
                  }),
                }}
              />

              <Script
                id="schema-org"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'BlogPosting',
                    headline: 'Quest for Artificial General Intelligence',
                    description:
                      'A deep dive into React Hooks and how to use them in functional components.',
                    author: { '@type': 'Person', name: 'Dennis Kibet' },
                    datePublished: '2024-10-01T08:00:00+00:00',
                    dateModified: '2024-10-05T09:30:00+00:00',
                    image: [
                      'https://example.com/images/react-hooks-1x1.jpg',
                      'https://example.com/images/react-hooks-4x3.jpg',
                      'https://example.com/images/react-hooks-16x9.jpg',
                    ],
                    keywords: [
                      'React',
                      'JavaScript',
                      'Hooks',
                      'Web Development',
                    ],
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

              <Script
                id="analytics"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                  __html: `
              // Initialize dataLayer for both GTM and gtag
              window.dataLayer = window.dataLayer || [];

              // gtag script
              (function(){
                var script = document.createElement('script');
                script.async = true;
                script.src = "https://www.googletagmanager.com/gtag/js?id=G-7K0PJKTTMD";
                document.head.appendChild(script);
              })();

              function gtag(){
                dataLayer.push(arguments);
              }
              gtag('js', new Date()); 
              gtag('config', 'G-7K0PJKTTMD'); 
            `,
                }}
              />

              <VisitorTrackingProvider>
                <main>{children}</main>
              </VisitorTrackingProvider>
              <Toaster />

              <div className="sr-only">
                <a href="/accessibility">Accessibility Statement</a>
                <a href="/privacy-policy">Privacy Policy</a>
                <a href="/terms-of-service">Terms of Service</a>
              </div>
            </ProgressIndicator>
          </Glow>
        </GlowArea>
      </body>
    </html>
  )
}
