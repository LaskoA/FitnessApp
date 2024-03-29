import type { NextPage, GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { ExercisesList } from '@app/components/ExercisesList';

const ExercisesListPage: NextPage = () => {
  return <ExercisesList />;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common'])),
    },
  };
};

export default ExercisesListPage;
