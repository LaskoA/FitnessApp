import ReactPlayer from 'react-player/youtube';
import { useRef } from 'react';

export const Video = () => {
  const player = useRef<ReactPlayer>(null);

  return (
    <ReactPlayer
      ref={player}
    />
  );
};
