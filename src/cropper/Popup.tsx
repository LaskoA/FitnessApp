import { useAppSelector } from '@app/redux/hooks';
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
  // preview: string,
};

export const Popup: FC<Props> = ({
  open,
  handleClose,
  getCroppedFile,
  // preview,
}) => {
  const { preview } = useAppSelector(state => state.avatar);

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
