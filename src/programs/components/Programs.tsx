import { Box, Grid, Typography, Button } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import { Svg } from '@app/ui/svg';
import { useParams } from '@app/query';
import { useProgramsListQuery } from '@app/queries';
import { LeftMenu } from '@app/app/components/LeftMenu';

import { ReactComponent as ArrowRightIcon } from '../images/icons/arrow-right.svg';

const colors = {
  easy: 'green.100',
  medium: 'yellow.100',
  hard: 'red.100',
};

export const Programs = () => {
  const params = useParams();
  const { push } = useRouter();
  const { t } = useTranslation('common');
  const { data = [] } = useProgramsListQuery();

  return (
    <LeftMenu>
      <Box px={{ md: 6 }}>
        <Box display="flex" flexDirection="column" gap={1}>
          {data.map(item => {
            const difficulty = item.difficulty.toLowerCase();
            const color = colors[difficulty];

            return (
              <Box key={item.id}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => push(`/programs/${difficulty}`)}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: 'primary.main',
                    px: 4,
                    ':hover': { backgroundColor: 'primary.main' },
                  }}
                >
                  <Grid container justifyContent="space-between">
                    <Grid item md={6}>
                      <Typography variant="body1" color="common.black" textAlign="start">
                        {item.name}
                      </Typography>
                    </Grid>
                    <Grid item md={3} display="flex" justifyContent="space-between">
                      <Typography variant="h4" color={color}>
                        {item.difficulty}
                      </Typography>
                      <Svg Icon={ArrowRightIcon} size={24} />
                    </Grid>
                  </Grid>
                </Button>
              </Box>
            );
          })}
        </Box>
      </Box>
    </LeftMenu>
  );
};
