/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["mongoose"],
    //experimental line to remove Suspense with CSR bailout warning when deploying or trying to build. Documentation found here. (https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout)
    missingSuspenseWithCSRBailout: false,
  },
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    },
      config.resolve.fallback = {
        "mongodb-client-encryption": false,
        "aws4": false
      };
    return config
  }
}

module.exports = nextConfig