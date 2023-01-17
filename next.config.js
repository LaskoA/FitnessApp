const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
  swcMinify: true,
  reactStrictMode: false,
  output: 'standalone',
  images: {
    formats: ['image/webp'],
  },
  redirects: async () => {
    return [
      {
        source: '/404',
        destination: '/profile',
        permanent: true,
      },
    ];
  },
  experimental: {
    scrollRestoration: true,
    modularizeImports: {
      lodash: {
        transform: 'lodash/{{member}}',
      },
    },
  },
  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: require.resolve('@svgr/webpack'),
          options: {
            //     prettier: false,
            svgo: false,
            //     svgoConfig: {
            //       plugins: [{ removeViewBox: false }],
            //     },
            titleProp: true,
            ref: true,
          },
        },
        'url-loader',
      ],
    });

    return config;
  },
};

module.exports = nextConfig;
