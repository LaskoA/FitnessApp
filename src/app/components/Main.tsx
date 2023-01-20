import { Box, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';

import { LeftMenu } from '@app/app/components/LeftMenu';
import { authStorage } from '@app/auth/utils/authStorage';

export const Main = () => {
  const { t } = useTranslation('common');
  const { push } = useRouter();
  const local = authStorage.get();

  const button = !!local?.user ? t('menu.profile.title') : t('menu.register.description');
  
  return (
    <LeftMenu>
      <Box px={{ md: 6 }}>
        <Button variant="contained" onClick={e => push('/register')}>
          {button}
        </Button>
      </Box>
    </LeftMenu>
  );
};
