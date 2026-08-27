import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  devIndicators: false,
  experimental: {
    optimizePackageImports: ['resend'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig
