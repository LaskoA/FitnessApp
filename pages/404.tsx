import type { NextPage, GetStaticProps } from 'next';
import Error from 'next/error';
import { Box } from '@mui/material';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { LeftMenu } from '@app/app/components/LeftMenu';

const Page404: NextPage = () => {
  return (
    <LeftMenu>
      <Box
        sx={{
          div: { backgroundColor: 'common.white', color: 'common.black' },
          '.next-error-h1': { borderRight: '1px solid rgba(0, 0, 0, .3)' },
        }}
      >
        <Error statusCode={404} />
      </Box>
    </LeftMenu>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common'])),
    },
  };
};

export default Page404;
