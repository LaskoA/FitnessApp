import { Box, Dialog, DialogTitle, DialogContent, DialogProps, Typography, Button, TextField } from '@mui/material';
import { Form, Formik } from 'formik';

import { Date } from '@app/formik/components/fields/Date';

export interface SignInModalProps extends DialogProps {
  readonly open: boolean;
  readonly onClose?: () => void;
  // readonly title: string;
  // readonly onSubmit: () => void;
  // readonly cancelText?: string;
  // readonly submitText?: string;
  // readonly isLoading?: boolean;
}

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  birth: '',
};

export const SignInModal = ({ open, onClose, children, title, ...props }: SignInModalProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      {...props}
      sx={{ px: { md: 8 }, py: { md: 6 }, '.MuiPaper-root': { backgroundColor: 'primary.main' } }}
    >
      <DialogTitle p={0}>
        <Typography variant="h3">Реєстрація</Typography>
      </DialogTitle>
      <DialogContent>
        <Formik initialValues={initialValues} onSubmit={() => {/* push into back */}}>
          <Form>
            <TextField type="text" rows={1} fullWidth helperText="" />
          </Form>
        </Formik>
        <Box mt={{ md: 3 }}>
          <Typography variant="subtitle1" color="grey.800">
            Імʼя
          </Typography>
          <Box mt={{ md: 1.25 }}>
            <TextField type="text" rows={1} fullWidth />
          </Box>
        </Box>
        <Box mt={{ md: 3 }}>
          <Typography variant="subtitle1" color="grey.800">
            Фамілія
          </Typography>
          <Box mt={{ md: 1.25 }}>
            <TextField type="text" rows={1} fullWidth />
          </Box>
        </Box>
        <Box mt={{ md: 3 }}>
          <Typography variant="subtitle1" color="grey.800">
            Дата народження
          </Typography>
          <Box mt={{ md: 1.25 }}>
            <Date name="date" />
          </Box>
        </Box>
      </DialogContent>
      <Box mt={{ md: 4 }} display="flex" justifyContent="flex-end">
        <Button variant="contained">Зареєструватись</Button>
      </Box>
    </Dialog>
  );
};
