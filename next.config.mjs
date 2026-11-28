const isDevelopment = process.env.NODE_ENV === 'development';
const scriptSources = isDevelopment ? "'self' 'unsafe-inline' 'unsafe-eval'" : "'self' 'unsafe-inline'";
const connectSources = isDevelopment ? "'self' https: ws:" : "'self' https:";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // The floating dev badge sat over page content in local review.
  devIndicators: false,
  eslint: {
    // Lint all source, not only Next's default folders.
    dirs: ['src', 'prisma', 'tests']
  },
  // Single source for the public résumé link (content/public-content.js points here).
  async redirects() {
    return [{
      source: '/cv',
      destination: 'https://drive.google.com/file/d/1EueZG0rO636nQ1B5BfwWZtoMDmotF_yd/view?usp=sharing',
      permanent: false
    }];
  },
  async headers() {
    return [{
      source: '/(.*)',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        { key: 'Content-Security-Policy', value: `default-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; script-src ${scriptSources}; font-src 'self' data:; connect-src ${connectSources}; frame-ancestors 'none'; base-uri 'self'; form-action 'self'` }
      ]
    }];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.s3.*.amazonaws.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: '*.s3.amazonaws.com',
        pathname: '/**'
      },
      // Support for custom CloudFront URLs if AWS_S3_BASE_URL is set
      ...( process.env.AWS_S3_BASE_URL ? (() => {
        try {
          const baseUrl = new URL( process.env.AWS_S3_BASE_URL );
          return [{
            protocol: baseUrl.protocol.replace( ':', '' ),
            hostname: baseUrl.hostname,
            pathname: '/**'
          }];
        } catch {
          return [];
        }
      })() : [] )
    ]
  }
};

export default nextConfig;
