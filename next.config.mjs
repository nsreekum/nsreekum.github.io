const isProd = process.env.NODE_ENV === 'production'

/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: isProd ? '/docs' : '', // Set asset prefix to `/docs` in production
  basePath: '',  // No base path needed for GitHub Pages user site
  trailingSlash: true,
  images: {
    unoptimized: true,  // Required for static export
  },
  output: 'export',
}

export default nextConfig