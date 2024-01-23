/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_APP_NAME: process.env.APP_NAME || "NextJS Application",
  },
  experimental: {
    serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
  webpack(config) {
    (config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    }),
      (config.resolve.fallback = {
        "mongodb-client-encryption": false,
        aws4: false,
      });
    return config;
  },
};

module.exports = nextConfig;
