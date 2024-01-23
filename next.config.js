/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_APP_NAME: process.env.APP_NAME || 'NextJS Application',
  },
  experimental: {
    serverComponentsExternalPackages: ['mongoose'],
  },
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  webpack(config) {
    (config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    }),
      (config.resolve.fallback = {
        'mongodb-client-encryption': false,
        aws4: false,
      });
    return config;
  },
};
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: true,
});
module.exports = process.env.NEXT_ANALYZE === 'true' ? withBundleAnalyzer(nextConfig) : nextConfig;
