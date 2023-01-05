import { Box, Dialog, DialogTitle, DialogContent, DialogProps, Typography } from '@mui/material';

export interface ModalProps extends DialogProps {
  readonly open: boolean;
  readonly onClose: () => void;
  readonly title: string;
}

export const Modal = ({ open, onClose, children, title, ...props }: ModalProps) => {
  return (
    <Dialog open={open} onClose={onClose} {...props}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
    </Dialog>
  );
};
