/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    assetPrefix: process.env.NODE_ENV === 'production' ? `/${process.env.GITHUB_USERNAME}.github.io/` : '',
    images: {
      unoptimized: true, // Required for static export
    },
  };
  
  export default nextConfig;