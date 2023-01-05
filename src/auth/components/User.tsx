import { Box, Typography, Grid, TextField, Button, ButtonBase } from '@mui/material';
import Image, { StaticImageData } from 'next/image';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';

import { Svg } from '@app/ui/svg';

import { useTrainQuery, useShapesQuery, useExercisesQuery } from '@app/queries';
import userAvatar from '@app/app/images/user-avatar.png';
import { LeftMenu } from '@app/app/components/LeftMenu';

import { ReactComponent as CameraIcon } from '../images/icons/camera-icon.svg';
import { Avatar } from '@app/cropper';

export const User = () => {
  // const { data } = useTrainQuery(1);
  // const { data: shape } = useShapesQuery();
  const { data: exercises = [] } = useExercisesQuery();
  // console.log(data)
  // console.log(shape);
  exercises.map(item => console.log(item));
  const { back } = useRouter();
  const [avatar, setAvatar] = useState<StaticImageData | string>(userAvatar);
  const avatarRef = useRef<HTMLInputElement | null>(null);

  return (
    <LeftMenu>
      <Box py={{ md: 4 }} px={{ md: 6 }}>
        <Typography variant="h1">Профіль</Typography>
      </Box>
      <Box borderRadius={5} mx={6} mb={15.5} pb={4} sx={{ backgroundColor: 'primary.main' }}>
        <Box display="flex" justifyContent="center" py={4}>
          <Box position="relative">
            <Avatar />

            <Box sx={{ position: 'absolute', bottom: 0, right: 0 }}>
              <Svg Icon={CameraIcon} size={30} />
            </Box>
          </Box>
        </Box>
        <Grid container px={17.75}>
          <Grid item md={12}>
            <Typography variant="h4">Персональні дані</Typography>
          </Grid>
          {/* replace textfield later with @app/ui/forms/components/Text */}
          <Grid container mt={2.75} columnSpacing={8}>
            <Grid item md={6}>
              <TextField fullWidth placeholder="user.name" />
              <Box mt={1.75}>
                <TextField fullWidth placeholder="user.surname" />
              </Box>
            </Grid>
            <Grid item md={6}>
              <TextField fullWidth placeholder="user.email" />
            </Grid>
            <Grid item md={6} ml="auto" mt={5}>
              <Grid container columnSpacing={3}>
                <Grid item md={6}>
                  <Button variant="outlined" fullWidth onClick={back}>
                    Скасувати
                  </Button>
                </Grid>
                <Grid item md={6}>
                  {/* onclick save changes with formik values onSubmit */}
                  <Button variant="contained" fullWidth onClick={() => {}}>
                    Зберегти
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </LeftMenu>
  );
};
