/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.ctfassets.net", "googleusercontent.com", "lh3.googleusercontent.com"]
  },
  env: {
    orders: JSON.stringify({})
  }
};

module.exports = nextConfig;
