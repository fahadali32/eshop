/** @type {import('next').NextConfig} */
const nextConfig = {
  
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
    'static.nike.com',
    'assets.adidas.com',
    'images.puma.com',
    'rukminim1.flixcart.com',
    'avatars.dicebear.com',
    ],
  },
}

module.exports = nextConfig
