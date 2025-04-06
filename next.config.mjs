const isProd = process.env.NODE_ENV === 'production'

const repoName = 'nsreekum.github.io' // Replace this with your actual repo name

/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: '',
  basePath: '',
  trailingSlash: true, // recommended for GitHub Pages
  images: {
    unoptimized: true, // Required for static export
  },
  output: 'export', // required for static export (`next export`)
}

export default nextConfig