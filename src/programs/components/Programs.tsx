import { Box, Grid, Typography, Button } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import { Svg } from '@app/ui/svg';
import { useParams } from '@app/query';
import { LeftMenu } from '@app/app/components/LeftMenu';

import { ReactComponent as ArrowRightIcon } from '../images/icons/arrow-right.svg';

export const Programs = () => {
  const params = useParams();
  const { push } = useRouter();
  const { t } = useTranslation('common');
  // useProgramsQuery(params.level)

  const levels = [
    {
      title: 'easy',
      color: 'green.100',
    },
    {
      title: 'medium',
      color: 'yellow.100',
    },
    {
      title: 'high',
      color: 'red.100',
    },
  ];

  return (
    <LeftMenu>
      <Box px={{ md: 6 }}>
        <Box display="flex" flexDirection="column" gap={1}>
          {levels.map(item => (
            <Box key={item.title}>
              <Button
                fullWidth
                variant="contained"
                key={item.title}
                onClick={() => push('/programs/level')}
                // onClick={() => push(`/programs/${item.title}`)}
                sx={{ display: 'flex', flexDirection: 'column', backgroundColor: 'primary.main', px: 4, ':hover': {backgroundColor: 'primary.main'} }}
              >
                <Grid container justifyContent="space-between">
                  <Grid item md={6}>
                    <Typography variant="body1" color="common.black" textAlign="start">
                      {t(`programs.levels.${item.title}.title`)}
                    </Typography>
                  </Grid>
                  <Grid item md={3} display="flex" justifyContent="space-between">
                    <Typography variant="h4" color={item.color}>
                      {t(`programs.levels.${item.title}.subtitle`)}
                    </Typography>
                    <Svg Icon={ArrowRightIcon} size={24} />
                  </Grid>
                </Grid>
              </Button>
            </Box>
          ))}
        </Box>
      </Box>
    </LeftMenu>
  );
};
