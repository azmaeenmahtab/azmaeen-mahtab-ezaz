import type { Metadata } from 'next'
import './globals.css'

import Footer from '@/components/Footer/Footer'
import Navbar from '@/components/Navbar/Navbar'
// import ThemeMenu from '@/components/Theme/ThemeMenu'
// import { Fira_Code } from 'next/font/google'
// import {Poppins} from 'next/font/google'
import { jetbrainsmono } from '@/fonts'

// const firaCode = Fira_Code(
  // { subsets: ['latin'], 
  //   weight: ['300', '400', '500', '600', '700'] 
  // })

const title = 'Azmaeen Mahtab Ezaz | Aspiring Full-Stack Web Developer | Frontend Developer at Upwork'

const description =
  "An aspiring full-stack web developer. Currently working on Upwork as a Frontend Developer I build responsive, user-friendly websites with React, NextJS, and NodeJS. Let's bring your vision to life. Hire me today!"

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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" data-theme="dark">
      <body className={`${jetbrainsmono.className}`}>
        <header>
          <Navbar />
        </header>
        {children}
        {/* <ThemeMenu /> */}
        <Footer />
      </body>
    </html>
  )
}
