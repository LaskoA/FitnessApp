import type { NextPage, GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { auth } from '@app/auth/hooks';
import { Register } from '@app/auth/components/Register';

const UserPage: NextPage = () => {
  return <Register />;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common'])),
    },
  };
};

export default UserPage;
