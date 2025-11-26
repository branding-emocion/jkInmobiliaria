/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // 🔥 Desactiva image optimization de Vercel (soluciona el 402)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jkinmobiliaria.com",
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
    ],
  },
};

export default nextConfig;
