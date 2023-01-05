const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'ua',
    locales: ['en', 'ua'],
    localeDetection: true,
  },
  react: {
    transSupportBasicHtmlNodes: true,
    transKeepBasicHtmlNodesFor: ['b', 'br', 'strong', 'a', 'href', 'span'],
  },
  interpolation: {
    escapeValue: false,
  },
  localePath: path.resolve('./src/language/locales'),
};
