/** @type {import('next').NextConfig} */
const nextConfig = {
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
