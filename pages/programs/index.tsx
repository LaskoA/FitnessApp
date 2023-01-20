import type { NextPage, GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { auth } from '@app/auth/hooks';
import { Programs } from '@app/programs';

const ProgramsPage: NextPage = () => {
  return <Programs />;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common'])),
    },
  };
};

export default auth(ProgramsPage);
