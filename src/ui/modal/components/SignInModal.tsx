import { Dialog, Button, Typography, Box } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { ReactNode } from 'react';

export interface ConfirmationModalProps {
  readonly title?: ReactNode;
  readonly description?: ReactNode;
  readonly open?: boolean;
  readonly onClose: () => void;
  readonly onSubmit: () => void;
  readonly cancelText?: string;
  readonly submitText?: string;
  readonly isLoading?: boolean;
}

export const ConfirmationModal = ({
  open = false,
  title,
  description,
  onClose,
  onSubmit,
  cancelText,
  submitText,
  isLoading = false,
}: ConfirmationModalProps) => {
  // const { t } = useTranslation('common');

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        '.MuiPaper-root': { backgroundColor: 'white', borderRadius: 10 },
        '.MuiDialogActions-root, .MuiDialogActions-spacing': { justifyContent: 'space-evenly' },
        '.MuiDialog-paper': { maxWidth: { md: 630 } },
      }}
    >
      <Box py={5} px={{ xs: 5, sm: 12.5 }} textAlign="center">
        {title && (
          <Box textTransform="uppercase">
            <Typography variant="h2">
              {title}
            </Typography>
          </Box>
        )}
        {description && (
          <Box mt={2}>
            {typeof description === 'string' ? (
              <Typography variant="h2" paragraph>
                {description}
              </Typography>
            ) : (
              description
            )}
          </Box>
        )}
        <Box
          display="flex"
          flexDirection={{ xs: 'column', sm: 'row' }}
          justifyContent={{ xs: 'space-between', sm: 'space-evenly' }}
          gap={{ xs: 1, sm: 0 }}
          mt={3}
        >
          <Button variant="contained" onClick={onClose}>
            {cancelText}
          </Button>
          <LoadingButton loading={isLoading} variant="contained" onClick={onSubmit}>
            {submitText}
          </LoadingButton>
        </Box>
      </Box>
    </Dialog>
  );
};
