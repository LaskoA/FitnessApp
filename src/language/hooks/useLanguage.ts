import { useRouter } from 'next/router';

export const useLanguage = (): 'ua' | 'en' => {
  const { locale } = useRouter();

  return locale as 'ua' | 'en';
};
