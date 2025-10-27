/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['pbs.twimg.com']
  },
  images: {
    domains: ["scardigno-strapi.ndorzn.easypanel.host"],
  },
}

module.exports = nextConfig
