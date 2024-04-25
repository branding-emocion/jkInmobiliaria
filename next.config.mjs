/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jkinmobiliaria.com",
      },
    ],
  },
};

export default nextConfig;
