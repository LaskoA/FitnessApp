import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { FC } from 'react';
import { CropperDemo } from './Cropper';

type Props = {
  open: boolean,
  handleClose: () => void,
  getCroppedFile: (img: string) => void,
};

export const Popup: FC<Props> = ({
  open,
  handleClose,
  getCroppedFile,
}) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          p: 5,
        }}
      >
        <DialogContent
          sx={{
            overflowX: 'hidden',
            p: 1,
          }}
        >
          <CropperDemo
            // preview={preview}
            getCroppedFile={getCroppedFile}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};
