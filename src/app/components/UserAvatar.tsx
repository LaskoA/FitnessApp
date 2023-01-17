import Image, { StaticImageData } from 'next/image';

import avatar from '../../../media/decoded_pictures/43.webp';

export const UserAvatar = () => {
  return (
    <Image src={avatar} alt="avatar" />
  );
};
