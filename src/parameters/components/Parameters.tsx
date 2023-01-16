import { Box, Grid, Typography, TextField, IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

import { Svg } from '@app/ui/svg';
import { useParams } from '@app/query';
import { useShapesQuery } from '@app/queries';
import { LeftMenu } from '@app/app/components/LeftMenu';
import { useParametersModal } from '@app/ui/modal/hooks/useModal';

import { ReactComponent as PlusIcon } from '../images/icons/plus.svg';

export const Parameters = () => {
  const [parameter, setParameter] = useState<string>('');
  const { t } = useTranslation('common');
  const { data } = useShapesQuery();
  const { push } = useRouter();
  const params = useParams();

  const [showModal] = useParametersModal({
    title: t(`menu.parameters.options.${parameter}`),
    onSubmit: () => {},
  });

  useEffect(() => {
    console.log(params.title);
    setParameter(params.title);
  }, [params]);

  const parametersList = useMemo(
    () => [
      {
        title: 'height',
        value: data?.height,
      },
      {
        title: 'weight',
        value: data?.weight,
      },
      {
        title: 'waist',
        value: data?.waist,
      },
      {
        title: 'glutes',
        value: data?.glutes,
      },
      {
        title: 'biceps',
        value: data?.biceps,
      },
      {
        title: 'thighs',
        value: data?.thighs,
      },
      {
        title: 'calf',
        value: data?.calf,
      },
      {
        title: 'neck',
        value: data?.neck,
      },
      {
        title: 'shoulders',
        value: data?.shoulders,
      },
      {
        title: 'chest',
        value: data?.chest,
      },
      {
        title: 'forearm',
        value: data?.forearm,
      },
    ],
    [data],
  );

  return (
    <LeftMenu>
      <Box px={{ md: 6 }} pb={{ md: 4 }}>
        <Grid container gap={{ md: 2 }}>
          {parametersList.map(item => (
            <Grid key={item.title} item md={12}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                py={{ md: 0.75 }}
                px={{ md: 2 }}
                borderRadius={2.5}
                sx={{ border: theme => `2px solid ${theme.palette.grey[100]}`, backgroundColor: 'primary.main' }}
              >
                <Typography variant="body1">{t(`menu.parameters.options.${item.title}`)}</Typography>
                <Box display="flex" textAlign="center">
                  <TextField type="number" defaultValue={0} sx={{ maxWidth: 100 }} />
                  {/* <Box>{item.value}</Box> */}
                  <IconButton
                    sx={{ height: 50, width: 50 }}
                    onClick={async () => {
                      await push(`/parameters?title=${item.title}`);
                      showModal();
                    }}
                  >
                    <Svg Icon={PlusIcon} size={24} />
                  </IconButton>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </LeftMenu>
  );
};
