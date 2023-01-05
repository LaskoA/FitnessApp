import { useEffect } from 'react';
import { useLanguage } from '@app/language';
import { useRouter } from 'next/router';

const SELECTED_LOCALE = 'SELECTED_LOCALE';

const getLocale = () => {
  let found = [];

  if (typeof navigator !== 'undefined') {
    if (navigator.languages) {
      for (let i = 0; i < navigator.languages.length; i++) {
        found.push(navigator.languages[i]);
      }
    }
    // @ts-ignore
    if (navigator.userLanguage) {
      // @ts-ignore
      found.push(navigator.userLanguage);
    }
    if (navigator.language) {
      found.push(navigator.language);
    }
  }

  return found.some(l => l && (l.toLowerCase().includes('ua') || l.toLowerCase().includes('ru'))) ? 'ua' : 'en';
};

export const useAutoLocale = () => {
  const language = useLanguage();
  const { replace, pathname } = useRouter();

  useEffect(() => {
    if (!window?.location?.pathname.includes('ua') && !window?.location?.pathname.includes('en')) {
      const selectedLocale = localStorage.getItem(SELECTED_LOCALE);

      const link = `${pathname}${window?.location?.search || ''}`;

      if (selectedLocale === 'ua' || selectedLocale === 'en') {
        if (selectedLocale !== language) {
          replace(link, link, { locale: selectedLocale });
        }
      } else {
        const autoLocale = getLocale();
        localStorage.setItem(SELECTED_LOCALE, autoLocale);

        if (autoLocale !== language) {
          replace(link, link, { locale: autoLocale });
        }
      }
    }
  }, []);
};
