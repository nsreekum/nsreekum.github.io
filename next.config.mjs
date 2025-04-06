/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: '',
  basePath: '',
  trailingSlash: true,
  images: {
    unoptimized: true,  // Required for static export
  },
  output: 'export',
}

export default nextConfig