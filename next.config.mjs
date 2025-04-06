/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/docs',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  output: 'export',
}

export default nextConfig