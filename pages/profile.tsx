import type { NextPage, GetStaticProps } from 'next';
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { User } from '@app/auth/components/User';
// import { LandingMainPage } from '@app/landings/components/main';

const UserPage: NextPage = () => {
  return <User />;
};

export default UserPage;
