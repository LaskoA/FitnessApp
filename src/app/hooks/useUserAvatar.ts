import { useMemo } from 'react';
import dynamic, { LoaderComponent } from 'next/dynamic';

export const useUserAvatar = (id: number, format: LoaderComponent) => {
  return `@decoded/${id}.${format}`;
};
