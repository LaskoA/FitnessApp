import { Box, Typography, Grid, TextField, Button, ButtonBase } from '@mui/material';
import Image, { StaticImageData } from 'next/image';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { Date } from '../../formik/components/fields/Date';

import { Svg } from '@app/ui/svg';

import { Avatar } from '@app/cropper';
import userAvatar from '@app/app/images/user-avatar.png';
import { LeftMenu } from '@app/app/components/LeftMenu';

import { ReactComponent as CameraIcon } from '../images/icons/camera-icon.svg';
import { FormRegistration } from '@app/formik/components/formRegistration/FormRegistration';

export const Register = () => {
  const { back } = useRouter();

  return (
    <LeftMenu>
      <Box borderRadius={5} mx={6} mb={15.5} pb={4} sx={{ backgroundColor: 'primary.main' }}>
        <Box display="flex" justifyContent="center" py={4}>
          <Box position="relative">
            <Avatar />

            <Box sx={{ position: 'absolute', bottom: 0, right: 0 }}>
              <Svg Icon={CameraIcon} size={30} />
            </Box>
          </Box>
        </Box>
        <Grid container px={10.75}>
          <Grid item m="auto" maxWidth={368}>
            <Typography variant="h4">Персональні дані</Typography>
          </Grid>
          <Grid container mt={2.75}>
            <FormRegistration />
          </Grid>
        </Grid>
      </Box>
    </LeftMenu>
  );
};
