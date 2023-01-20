import type { NextPage, GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { auth } from '@app/auth/hooks';
import { Parameters } from '@app/parameters/components/Parameters';

const ParametersPage: NextPage = () => {
  return <Parameters />;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common'])),
    },
  };
};

export default auth(ParametersPage);
