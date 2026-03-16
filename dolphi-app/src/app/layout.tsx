import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dolphi — Australian Marketing Suite',
  description: 'SEO, social media, email, blogs and paid ads — all in one place, powered by AI. Built for Australian businesses.',
  keywords: 'marketing software australia, social media management, email marketing, seo tools, campaign builder',
  openGraph: {
    title: 'Dolphi — Your Entire Marketing Suite in One Place',
    description: 'Launch campaigns across every channel in under 10 minutes. Built for Australian businesses.',
    url: 'https://dolphi.com.au',
    siteName: 'Dolphi',
    locale: 'en_AU',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
