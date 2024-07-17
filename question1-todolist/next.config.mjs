/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/',
          destination: '/1',
        },
      ]
    }
  },
  experimental: {
    typedRoutes: true,
  }
};

export default nextConfig;
