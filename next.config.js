/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: false,
  output: 'standalone',
  images: {
    formats: ['image/webp'],
  },
  // experimental: {
  //   scrollRestoration: true,
  //   modularizeImports: {
  //     lodash: {
  //       transform: 'lodash/{{member}}',
  //     },
  //   },
  // },
  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: require.resolve('@svgr/webpack'),
          //   options: {
          //     prettier: false,
          //     svgo: false,
          //     svgoConfig: {
          //       plugins: [{ removeViewBox: false }],
          //     },
          //     titleProp: true,
          //     ref: true,
          //   },
        },
        'url-loader',
      ],
    });

    return config;
  },
};

module.exports = nextConfig;
