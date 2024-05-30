/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  serverRuntimeConfig: {
    async rewrites() {
      return [
        {
          source: "/register",
          destination: "/auth/register",
        },
        {
          source: "/login",
          destination: "/auth/login",
        },
      ];
    },
  },
  images: {
    domains: [
      "drive.google.com",
      "localhost",
      "172.16.10.240",
      "localhost:2005",
    ],
  },
};



export default nextConfig;
