/** @type {import('next').NextConfig} */
const nextConfig = {
  // Prevent any i18n or locale-based redirects
  i18n: undefined,

  // Ensure no automatic language redirects
  async redirects() {
    return [
      // Explicitly block any /en redirects
      {
        source: '/en/:path*',
        destination: '/:path*',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
