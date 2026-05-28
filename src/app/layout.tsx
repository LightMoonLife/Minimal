import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s — Your Name',
    default: 'Your Name — CRO & UX Specialist',
  },
  description:
    'CRO and UX specialist turning behavioural data into design decisions. Eight years of optimising digital experiences for e-commerce, SaaS, and financial services.',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: 'Your Name',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-background text-foreground font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-1/2 focus:-translate-x-1/2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-foreground focus:text-background focus:font-mono focus:text-xs focus:tracking-widest"
        >
          Skip to main content
        </a>
        <Navigation />
        <main id="main-content" className="pt-14">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
