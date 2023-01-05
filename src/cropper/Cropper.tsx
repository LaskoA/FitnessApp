import { FC, useRef, useState } from 'react';
import Cropper, { ReactCropperElement } from 'react-cropper';
import Skeleton from '@mui/material/Skeleton';
import Button from '@mui/material/Button';
// import ButtonGroup from '@mui/material/ButtonGroup';
// import Box from '@mui/material/Box';

type Props = {
  preview: string,
  getCroppedFile: (img: string) => void,
};

export const CropperDemo: FC<Props> = ({ getCroppedFile, preview }) => {
  const cropperRef = useRef<ReactCropperElement>(null);
  const [loading, setLoading] = useState(true);
  // const [scaleX, setScaleX] = useState(1);
  // const [scaleY, setScaleY] = useState(1);

  const handleClick = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    const img = cropper?.getCroppedCanvas().toDataURL();

    if (img) {
      getCroppedFile(img);
    }
  };

  // const rotate = () => {
  //   const imageElement = cropperRef?.current;
  //   const cropper = imageElement?.cropper;

  //   cropper?.rotate(90);
  // };

  // const flip = (type: string) => {
  //   const imageElement = cropperRef?.current;
  //   const cropper = imageElement?.cropper;

  //   if (type === 'h') {
  //     cropper?.scaleX(scaleX === 1 ? -1 : 1);
  //     setScaleX(scaleX === 1 ? -1 : 1);
  //   } else {
  //     cropper?.scaleY(scaleY === 1 ? -1 : 1);
  //     setScaleY(scaleY === 1 ? -1 : 1);
  //   }
  // };

  return (
    <>
      {loading && (
        <Skeleton variant="rectangular" width="100%" height={400} />
      )}
      {/* <Box display="flex" justifyContent="flex-end" mb={1}>
        <ButtonGroup disableElevation variant="contained">
          <Button onClick={rotate}>Rotate</Button>
          <Button onClick={() => flip('h')}>Flip H</Button>
          <Button onClick={() => flip('v')}>Flip V</Button>
        </ButtonGroup>
      </Box> */}

      <Cropper
        src={preview}
        style={{
          height: 400,
          width: '100%',
          borderRadius: '14px',
        }}
        // initialAspectRatio={1}
        viewMode={1}
        aspectRatio={1}
        guides={true}
        // center={true}
        // highlight={true}
        // cropBoxResizable={true}
        ready={() => {
          setLoading(false);
        }}
        background={false}
        ref={cropperRef}
        modal={false}
        // responsive={true}
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
