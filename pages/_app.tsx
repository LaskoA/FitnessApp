import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { appWithTranslation } from 'next-i18next';
import { ModalProvider } from 'react-modal-hook';
import createCache from '@emotion/cache';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';
import Head from 'next/head';
import 'dayjs/locale/uk';

import { theme } from '@app/app/configs/theme';
import { appConfig } from '@app/app/configs/app';
import { QueryProvider } from '@app/query/components';
import { AuthProvider } from '@app/auth/components/AuthProvider';
import { useLanguage, useAutoLocale } from '@app/language';
import { store } from '@app/redux/store';

export const createEmotionCache = () => {
  return createCache({ key: 'css', prepend: true });
};

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const MyApp = ({ Component, emotionCache = clientSideEmotionCache, pageProps }: MyAppProps) => {
  const { pathname } = useRouter();
  const language = useLanguage();

  useAutoLocale();

  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>FitnessApp</title>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={`${appConfig.host}${pathname}`} />
        </Head>
        <QueryProvider>
          <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={language === 'ua' ? 'uk' : language}>
              <ModalProvider>
                <AuthProvider>
                  <CssBaseline />
                  <Component {...pageProps} />
                </AuthProvider>
              </ModalProvider>
            </LocalizationProvider>
          </ThemeProvider>
        </QueryProvider>
      </CacheProvider>
    </Provider>
    
  );
};

export default appWithTranslation(MyApp);
