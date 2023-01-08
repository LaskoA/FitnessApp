import { FC, useRef, useState } from 'react';
import Cropper, { ReactCropperElement } from 'react-cropper';
import Skeleton from '@mui/material/Skeleton';
import Button from '@mui/material/Button';
import { useAppSelector } from '@app/redux/hooks';

type Props = {
  getCroppedFile: (img: string) => void,
};

export const CropperDemo: FC<Props> = ({ getCroppedFile }) => {
  const cropperRef = useRef<ReactCropperElement>(null);
  const [loading, setLoading] = useState(true);
  const { preview } = useAppSelector(state => state.avatar);

  const handleClick = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    const img = cropper?.getCroppedCanvas().toDataURL();

    if (img) {
      getCroppedFile(img);
    }
  };

  return (
    <>
      {loading && (
        <Skeleton variant="rectangular" width="100%" height={400} />
      )}
      <Cropper
        src={typeof preview === 'string' && preview}
        style={{
          height: 400,
          width: '100%',
          borderRadius: '14px',
        }}
        viewMode={1}
        aspectRatio={1}
        guides={true}
        ready={() => {
          setLoading(false);
        }}
        background={false}
        ref={cropperRef}
        modal={false}
      />

      <Button
        sx={{
          float: 'right',
          mt: 1,
        }}
        onClick={handleClick}
        autoFocus
        color="success"
        variant="contained"
      >
        Обрізати
      </Button>
    </>
  );
};
