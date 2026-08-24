import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['resend'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      { source: '/portfolio', destination: '/work', permanent: true },
      { source: '/portfolio/:slug', destination: '/work/:slug', permanent: true },
      { source: '/blog', destination: '/writing', permanent: true },
      { source: '/blog/:slug', destination: '/writing/:slug', permanent: true },
    ]
  },
}

export default nextConfig
