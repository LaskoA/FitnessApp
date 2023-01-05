import type { NextPage, GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { MyTrainings } from '@app/components/MyTrainings';

const ExercisesListPage: NextPage = () => {
  return <MyTrainings />;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common'])),
    },
  };
};

export default ExercisesListPage;
