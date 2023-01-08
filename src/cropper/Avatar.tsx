import { useEffect, useRef, useState } from 'react';
import { ButtonBase } from '@mui/material';
import { Popup } from './Popup';
import { Upload } from './Upload';
import Image from 'next/image';

import 'cropperjs/dist/cropper.css';
import { useAppDispatch, useAppSelector } from '@app/redux/hooks';
import { actions as actionsAvatar } from '../redux/userAvatarSlice';

export const Avatar = () => {
  const [open, setOpen] = useState(false);
  const avatarRef = useRef<HTMLInputElement | null>(null);
  const { preview, avatar } = useAppSelector(state => state.avatar);
  const dispatch = useAppDispatch();

  const handleClose = async () => {
    setOpen(false);

    // if (typeof preview === 'string') {
    //   const ggg = await dataURLtoFile(preview, `${new Date().getTime().toString()}.png`);

    //   dispatch(actionsAvatar.setAvatar(ggg));
    // }
  };

  useEffect(() => {
    console.log(avatar);
  }, [avatar]);

  const getCroppedFile = (img: string) => {
    if (typeof img === 'string') {
      dispatch(actionsAvatar.setPreview(img));
    }

    handleClose();
  };

  const getUploadedFile = (img: string | ArrayBuffer | null) => {
    setOpen(true);

    if (typeof img === 'string') {
      dispatch(actionsAvatar.setPreview(img));
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
        open={open}
        handleClose={handleClose}
        getCroppedFile={getCroppedFile}
      />
    </ButtonBase>
  );
};
