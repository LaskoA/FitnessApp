import type { NextPage, GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { auth } from '@app/auth/hooks';
import { User } from '@app/auth/components/User';

const UserPage: NextPage = () => {
  return <User />;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common'])),
    },
  };
};

export default auth(UserPage);
