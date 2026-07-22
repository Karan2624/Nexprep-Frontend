/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return {
     
      beforeFiles: [
        {
          source: '/api/v1/:path*',
          destination: 'https://nexprep-backend-1.onrender.com/api/v1/:path*'
        }
      ]
    }
  }
};

export default nextConfig;