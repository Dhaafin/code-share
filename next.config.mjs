/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/code-share', // Remove if using a custom domain or root site
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
