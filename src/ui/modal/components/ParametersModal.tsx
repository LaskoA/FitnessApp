import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogProps,
  Typography,
  Button,
  TextField,
  Grid,
} from '@mui/material';
import { Formik, Form } from 'formik';
import { useTranslation } from 'next-i18next';
import dayjs, { Dayjs } from 'dayjs';

import { appConfig } from '@app/app/configs';
import { Date as DateInput, Input } from '@app/ui/forms';

export interface Param {
  readonly day: string;
  readonly value: number;
  readonly change: number;
}

export interface ParametersModalProps extends DialogProps {
  readonly open: boolean;
  readonly onClose?: () => void;
  readonly params?: Param[];
}

export const ParametersModal = ({ open, onClose, children, title, params, ...props }: ParametersModalProps) => {
  const { t } = useTranslation('common');

  const today = dayjs(Date.now()).format(appConfig.format.date);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      {...props}
      sx={{ px: { md: 8 }, py: { md: 6 }, '.MuiPaper-root': { backgroundColor: 'primary.main', width: 550 } }}
    >
      <DialogTitle p={0}>
        <Typography variant="h3">{title}</Typography>
      </DialogTitle>
      <DialogContent>
        <Formik initialValues={{}} onSubmit={() => {}}>
          <Form>
            <Grid container columnSpacing={{ md: 3 }} mt={{ md: 2.75 }}>
              <Grid item md={6}>
                <Input type="number" label={t('general.history.value')} placeholder="0" />
              </Grid>
              <Grid item md={6}>
                <DateInput
                  label={t('general.history.date')}
                  name={title}
                  // onChange={() => {}}
                  // value="asd"
                />
              </Grid>
            </Grid>
            <Box mt={{ md: 4 }} display="flex" mx="auto" width={220}>
              <Button variant="contained" fullWidth>
                {t('general.buttons.add')}
              </Button>
            </Box>
            <Box mt={{ md: 3 }}>
              <Typography variant="h3">{t('general.history.title')}</Typography>
              <Box
                mt={{ md: 3 }}
                display="flex"
                justifyContent="space-between"
                px={{ md: 3 }}
                py={{ md: 1.5 }}
                borderRadius={2.5}
                sx={{ backgroundColor: 'common.white' }}
              >
                <Typography variant="body1">{t('general.history.date')}</Typography>
                <Typography variant="body1">{t('general.history.value')}</Typography>
                <Typography variant="body1">{t('general.history.changes')}</Typography>
              </Box>
              {/* {params.map(param => */}
              <Box
                display="flex"
                justifyContent="space-between"
                px={{ md: 3 }}
                py={{ md: 1.5 }}
                borderBottom="1px solid"
                borderColor={theme => theme.palette.grey[100]}
              >
                <Typography variant="body1">
                  01.12.2022
                  {/* {param.day} */}
                </Typography>
                <Typography variant="body1" color="grey.400">
                  92
                  {/* {param.value} */}
                </Typography>
                <Typography variant="body1" color="grey.400">
                  -2 кг
                  {/* {param.change} */}
                </Typography>
              </Box>
              {/* )} */}
            </Box>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
