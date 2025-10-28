/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'myshed.io',
      },
      {
        protocol: 'https',
        hostname: 'northwoodoutdoor.b-cdn.net',
      },
    ],
  },
};

module.exports = nextConfig;
