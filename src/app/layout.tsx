import type { Metadata } from 'next'
import { Bricolage_Grotesque, Fraunces, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { PageTransition } from '@/components/PageTransition'
import { SITE_URL } from '@/lib/constants'

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
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
    <html lang="en-GB" className={`${bricolage.variable} ${fraunces.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('theme');if(t==='dark'||(t!=='light'&&matchMedia('(prefers-color-scheme:dark)').matches))document.documentElement.classList.add('dark')})()`,
          }}
        />
      </head>
      <body className="bg-background text-foreground font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-1/2 focus:-translate-x-1/2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-accent focus:text-foreground focus:text-xs focus:rounded-pill"
        >
          Skip to main content
        </a>
        <PageTransition />
        <Navigation />
        <main id="main-content" className="pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
