/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'rb.gy',
      'static-exp1.licdn.com',
      'content.linkedin.com',
      'www.iconsdb.com',
      'images.fastcompany.net',
    ],
    // see：https://github.com/milliHQ/terraform-aws-next-js/issues/297
    // the latest version uses the Image Optimizer of Next.js 12.1.0 SVGs are no longer automatically optimized
    // To keep SVG optimized, we have to add the following configuration:
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

module.exports = nextConfig;
