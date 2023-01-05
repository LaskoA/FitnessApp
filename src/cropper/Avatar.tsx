import { useRef, useState } from 'react';
import { ButtonBase } from '@mui/material';
import { Popup } from './Popup';
import { Upload } from './Upload';
import Image from 'next/image';
import userAvatar from '@app/app/images/user-avatar.png';

import 'cropperjs/dist/cropper.css';

export const Avatar = () => {
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState<string>(userAvatar as unknown as string);
  const avatarRef = useRef<HTMLInputElement | null>(null);

  const handleClose = () => {
    setOpen(false);
  };

  const getCroppedFile = (img: string) => {
    if (typeof img === 'string') {
      setPreview(img);
    }

    handleClose();
  };

  const getUploadedFile = (img: string | ArrayBuffer | null) => {
    setOpen(true);

    if (typeof img === 'string') {
      setPreview(img);
    }
  };

  return (
    <ButtonBase
      sx={{
        overflow: 'hidden',
        borderRadius: '50%',
      }}
      aria-label="upload picture"
      component="label"
    >
      <Image
        src={preview}
        alt="avatar"
        height={122}
        width={122}
        priority
        style={{ objectFit: 'cover' }}
      />
      <Upload getUploadedFile={getUploadedFile} ref={avatarRef} />

      <Popup
        preview={preview}
        open={open}
        handleClose={handleClose}
        getCroppedFile={getCroppedFile}
      />
    </ButtonBase>
  );
};
