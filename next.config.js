/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*", // Check if something like this exists
        destination: "http://localhost:5000/:path*", // If so, ensure it's configured correctly
      },
    ];
  },
  images: {
    domains: ["images.unsplash.com"], // Add the domain of the external image
  },
};

module.exports = nextConfig
