/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')


const nextConfig = {
  reactStrictMode: true,
}

const pwaConfig = {
  pwa: {
    dest: 'public'
  }
}

module.exports = withPWA({ ...pwaConfig, ...nextConfig })