import { Box, Dialog, DialogTitle, DialogContent, DialogProps, Typography } from '@mui/material';

import { useTrainQuery } from '@app/queries';
import { LeftMenu } from '@app/app/components/LeftMenu';
import { Avatar } from '@app/cropper';

import { useGetUser } from '../api';
import { authStorage } from '../utils/authStorage';

export const Profile = () => {

  return (
    <LeftMenu>
      <Box px={{ md: 6 }}>
        change-form patch data on success
        <Avatar />
      </Box>
    </LeftMenu>
  );
};
