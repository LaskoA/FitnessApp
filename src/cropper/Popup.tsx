import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FC } from 'react';
import { CropperDemo } from './Cropper';

type Props = {
  open: boolean,
  handleClose: () => void,
  getCroppedFile: (img: string) => void,
  preview: string,
};

export const Popup: FC<Props> = ({
  open,
  handleClose,
  getCroppedFile,
  preview,
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
        {/* <DialogTitle id="alert-dialog-title">Crop Image</DialogTitle> */}
        <DialogContent
          sx={{
            overflowX: 'hidden',
            p: 1,
          }}
        >
          {/* <DialogContentText id="alert-dialog-description"> */}
            <CropperDemo
              preview={preview}
              getCroppedFile={getCroppedFile}
            />
          {/* </DialogContentText> */}
        </DialogContent>
      </Dialog>
    </div>
  );
};
