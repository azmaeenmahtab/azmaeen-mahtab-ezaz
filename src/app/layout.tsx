import type { Metadata } from 'next'
import './globals.css'

import Script from 'next/script'
import Footer from '@/components/Footer/Footer'
import Navbar from '@/components/Navbar/Navbar'
import ThemeMenu from '@/components/Theme/ThemeMenu'
import MainLayout from '@/components/Layout/MainLayout'
import SmoothScroll from '@/components/Providers/SmoothScroll'
import MobileNav from '@/components/MobileNav/MobileNav'
import { roboto } from '@/fonts'

// const firaCode = Fira_Code(
  // { subsets: ['latin'], 
  //   weight: ['300', '400', '500', '600', '700'] 
  // })

const title = 'Azmaeen Mahtab Ezaz | Full-Stack Web Developer | AI Trainer at Outlier.ai'

const description =
  "A full-stack web developer. Currently working on Outlier.ai as AI Trainer as Full Stack Engineer and also have working experience on Upwork as a Full Stack Developer. I build responsive, user-friendly websites with React, NextJS, NodeJS. Express.JS, Postgresql/Mongodb. Let's bring your vision to life. Hire me today!"

const url = process.env.NEXT_PUBLIC_SITE_URL

export const metadata: Metadata = {
  title,
  description,
  category: 'technology',
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: url,
  },
  openGraph: {
    title,
    description,
    url,
    siteName: 'Azmaeen Mahtabs Portfolio',
    type: 'website',
  },
  twitter: {
    title,
    description,
    card: 'summary_large_image',
    creator: '@Basit_Miyanji',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon1.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon2.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/icon2.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" data-theme="light">
      <head>
        <link rel="preconnect" href="https://ka-f.fontawesome.com" crossOrigin="anonymous" />
        <Script
          src="https://kit.fontawesome.com/78f2740b36.js"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${roboto.className} ${roboto.variable}`}>
        <SmoothScroll>
          <header>
            <Navbar />
          </header>
          <MainLayout>
            {children}
            <Footer />
          </MainLayout>
          <ThemeMenu />
          <MobileNav />
        </SmoothScroll>
      </body>
    </html>
  )
}
