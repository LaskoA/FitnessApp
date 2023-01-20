import { StaticImageData } from 'next/image';

export interface User {
  id?: number;
  email: string;
  firstName: string;
  lastName?: string;
  password: number;
  base64?: number;
  decodedPicture?: string;
  // decodedPicture?: StaticImageData;
}

export interface UserDraft {
  user?: User;
}
