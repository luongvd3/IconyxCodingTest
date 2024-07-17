/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return  [
        {
          source: '/',
          destination: '/table/1/asc/all',
          permanent: true,
        },
      ]
  },
  experimental: {
    typedRoutes: true,
  }
};

export default nextConfig;
