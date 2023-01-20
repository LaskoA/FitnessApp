import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { NextPage, GetStaticProps } from 'next';

import { Main } from '@app/app/components/Main';

const MainPage: NextPage = () => {
  return <Main />;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common'])),
    },
  };
};

export default MainPage;
