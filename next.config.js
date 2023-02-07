/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
  async redirects() {
    return [
      {
        source: "/github",
        destination: "https://github.com/beforeoafterm/eddard-bday-event",
        permanent: false,
      },
    ];
  },
  serverRuntimeConfig: {
    API_EMAIL: process.env.API_EMAIL,
    API_PW: process.env.API_PW,
    API_URL: process.env.API_URL
  }
};

module.exports = nextConfig;
