export const appConfig = {
  isServer: typeof window === 'undefined',
  format: {
    date: 'DD.MM.YYYY',
    shortDate: 'DD.MM',
  },
  apiHost: process.env.NEXT_PUBLIC_API_HOST || '',
  host: process.env.NEXT_PUBLIC_HOST || '',
};
