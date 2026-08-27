import type { Metadata } from 'next'
import { Familjen_Grotesk, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { PageTransition } from '@/components/PageTransition'
import { ScrollRuler } from '@/components/ScrollRuler'
import { SITE_URL } from '@/lib/constants'

const familjenGrotesk = Familjen_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['500', '600', '700'],
  display: 'swap',
})

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600'],
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: '%s | Jack Paul Brookes',
    default: 'Jack Paul Brookes | Digital Growth Architect, Suffolk',
  },
  description:
    'Digital Growth Architect in Suffolk. I build revenue platforms, not just websites. Digital transformation, B2B commerce, and conversion optimisation for businesses ready to scale.',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: 'Jack Paul Brookes',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${familjenGrotesk.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('theme');if(t)document.documentElement.setAttribute('data-theme',t)})()`,
          }}
        />
      </head>
      <body className="bg-bg text-ink font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-1/2 focus:-translate-x-1/2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-blueprint focus:text-bg focus:text-xs"
        >
          Skip to main content
        </a>
        <PageTransition />
        <ScrollRuler />
        <Navigation />
        <main id="main-content" className="pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
