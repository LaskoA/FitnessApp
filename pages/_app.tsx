import type { AppProps } from 'next/app';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { CacheProvider, EmotionCache } from '@emotion/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
// import { appWithTranslation } from 'next-i18next';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ModalProvider } from 'react-modal-hook';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import 'dayjs/locale/uk';

import createCache from '@emotion/cache';

// prepend: true moves MUI styles to the top of the <head> so they're loaded first.
// It allows developers to easily override MUI styles with other styling solutions, like CSS modules.
export const createEmotionCache = () => {
  return createCache({ key: 'css', prepend: true });
};

import { LeftMenu } from '@app/app/components/LeftMenu';
// import '@app/app/utils/ignoreErrors';
// import { appConfig } from '@app/app/configs/app';
import { theme } from '@app/app/configs/theme';
// import { createEmotionCache } from '@app/app/utils/emotions';
import { QueryProvider } from '@app/query/components';
// import { AuthProvider } from '@app/auth/components/AuthProvider';
// import { Layout } from '@app/app/components/Layout';
// import { SnackbarsProvider } from '@app/snackbars/components/SnackbarsProvider';
// import { useLanguage, useAutoLocale } from '@app/language';
// import { useGoogleAnalytics, useFacebookAnalytics } from '@app/analytics';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const MyApp = ({ Component, emotionCache = clientSideEmotionCache, pageProps }: MyAppProps) => {
  const { pathname } = useRouter();
  // const language = useLanguage();

  // useAutoLocale();
  // useGoogleAnalytics();
  // useFacebookAnalytics();

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>FitnessApp</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:type" content="website" />
        {/* <meta property="og:url" content={`${appConfig.host}${pathname}`} /> */}
        {/* <meta property="og:image" content={`${appConfig.host}/intensfit.png`} /> */}
      </Head>
      <QueryProvider>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <ModalProvider>
              <CssBaseline />
              <Component {...pageProps} />
            </ModalProvider>
          </LocalizationProvider>
        </ThemeProvider>
      </QueryProvider>
    </CacheProvider>
  );
};

export default MyApp;
