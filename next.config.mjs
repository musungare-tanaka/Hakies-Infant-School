/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/about', destination: '/#about', permanent: true },
      { source: '/learning', destination: '/#learning', permanent: true },
      { source: '/school-life', destination: '/#school-life', permanent: true },
      { source: '/parents', destination: '/#contact', permanent: true },
      { source: '/calendar', destination: '/#contact', permanent: true },
      { source: '/news/:path*', destination: '/#contact', permanent: true },
      { source: '/admissions', destination: '/#contact', permanent: true },
    ];
  },
  async headers() {
    return [{
      source: '/:path*',
      headers: [
        { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
      ],
    }];
  },
};
export default nextConfig;
