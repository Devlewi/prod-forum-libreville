import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,//Désactiver l'optimisation d'images
    remotePatterns: [      
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "controlpanel.demoforumlibreville.cynomedia.com",
        pathname: "/wp-content/uploads/**",
      },        
    ],
    domains: ['formum-libreville.com','controlpanel.demoforumlibreville.cynomedia.com','forum-frontendv2.vercel.app','adserver.cynomedia.com','googleads.g.doubleclick.net'],
  },
  async redirects() {
    return [
      {
        source: "/Home",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
