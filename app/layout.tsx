import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'TrendPulseZone - Stay Ahead of the Curve',
    template: '%s | TrendPulseZone'
  },
  description: 'Stay ahead of the curve with the latest trends, insights, and stories that matter. Your pulse on what\'s happening now.',
  keywords: ['trends', 'news', 'technology', 'business', 'lifestyle', 'insights'],
  authors: [{ name: 'TrendPulseZone Team' }],
  creator: 'TrendPulseZone',
  publisher: 'TrendPulseZone',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://trendpulsezone.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'TrendPulseZone',
    title: 'TrendPulseZone - Stay Ahead of the Curve',
    description: 'Stay ahead of the curve with the latest trends, insights, and stories that matter.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'TrendPulseZone',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TrendPulseZone - Stay Ahead of the Curve',
    description: 'Stay ahead of the curve with the latest trends, insights, and stories that matter.',
    images: ['/og-image.jpg'],
    creator: '@trendpulsezone',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}