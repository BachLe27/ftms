/** @type {import('next').NextConfig} */
const nextConfig = {
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
  reactStrictMode: false,
  headers: () => [
    {
      source: '/staff-page/request',
      headers: [
        {
          key: 'Cache-Control',
          value: 'no-store',
        },
      ],
    },
  ],


  rewrites: async () => [
    {
      source: "/welcome",
      destination: "/index.html",
    },
  ],
  images: {
    domains: ["lh3.googleusercontent.com", "img.freepik.com"],
  },
  env: {
    GHN_TOKEN: process.env.GHN_TOKEN
  },
  experimental: {},

};


export default nextConfig;
