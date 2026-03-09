/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'http2.mlstatic.com',
      'img.olx.com.br',
      'enjoei.com.br',
      'scontent.xx.fbcdn.net',
      'via.placeholder.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.mlstatic.com',
      },
      {
        protocol: 'https',
        hostname: '**.olx.com.br',
      },
      {
        protocol: 'https',
        hostname: '**.enjoei.com.br',
      },
      {
        protocol: 'https',
        hostname: '**.fbcdn.net',
      }
    ],
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig
