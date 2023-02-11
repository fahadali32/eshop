/** @type {import('next').NextConfig} */
const nextConfig = {
  
  reactStrictMode: true,
  swcMinify: true,
  target: 'serverless',
  images: {
    domains: [
    'static.nike.com',
    'assets.adidas.com',
    'images.puma.com',
    'rukminim1.flixcart.com',
    'avatars.dicebear.com',
    'jevelin.shufflehound.com'
    ],
  },
}

module.exports = nextConfig
