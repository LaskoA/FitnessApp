import type { NextPage, GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { auth } from '@app/auth/hooks';
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

export default auth(ExercisesListPage);
