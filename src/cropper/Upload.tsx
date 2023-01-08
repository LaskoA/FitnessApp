import { FC, MutableRefObject } from 'react';
import { styled } from '@mui/material/styles';
import { actions as actionsAvatar } from '../redux/userAvatarSlice';
import { useAppDispatch } from '@app/redux/hooks';

const Input = styled('input')({
  display: 'none',
});

type Props = {
  getUploadedFile: (img: string | ArrayBuffer | null) => void,
  ref: MutableRefObject<HTMLInputElement>,
};

export const Upload: FC<Props> = ({ getUploadedFile, ref }) => {
  const dispatch = useAppDispatch();
  
  const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    let files;

    if (event.target) {
      files = event.target.files;

      // dispatch(actionsAvatar.setAvatar(files[0]));
    }

    const reader = new FileReader();

    reader.onload = () => {
      getUploadedFile(reader.result);
    };

    if (files) {
      reader.readAsDataURL(files[0]);
    }

    event.target.value = '';
  };

  return (
    <Input
      accept="image/*"
      id="contained-button-file"
      multiple
      type="file"
      onChange={onChange}
      ref={ref}
    />
  );
};
