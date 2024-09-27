/** @type {import('next').NextConfig} */
const nextConfig = {
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path*", // Check if something like this exists
  //       destination: "http://localhost:5000/:path*", // If so, ensure it's configured correctly
  //       destination: "",
  //     },
  //   ];
  // },
  images: {
    domains: [
      "images.unsplash.com",
      "pbs.twimg.com",
      "source.unsplash.com",
      "res.cloudinary.com",
    ], // Add the domain of the external image
  },
  eslint: {
    // This option disables ESLint during production builds
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
