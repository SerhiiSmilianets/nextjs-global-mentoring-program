/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'image.tmdb.org',
            port: '',
          },
        ],
      },
    experimental: {
      missingSuspenseWithCSRBailout: false
    },
};

export default nextConfig;
