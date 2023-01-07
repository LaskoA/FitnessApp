import { useRouter } from 'next/router';

export const useParams = (): Record<any, string> => {
  return useRouter().query as Record<any, string>;
};
