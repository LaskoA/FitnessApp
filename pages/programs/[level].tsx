import type { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Program } from '@app/programs/components/Program';

const ProgramPage: NextPage = () => {
  return <Program />;
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      '/programs/easy',
      '/programs/medium',
      '/programs/hard',
      { params: { level: 'easy' } },
      { params: { level: 'medium' } },
      { params: { level: 'hard' } },
    ],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common'])),
    },
  };
};

export default ProgramPage;
