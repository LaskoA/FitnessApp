import { useEffect, FunctionComponent } from 'react';
import { useRouter } from 'next/router';

import { appConfig } from '@app/app/configs';
import { LeftMenu } from '@app/app/components/LeftMenu';

import { useAuth } from './useAuth';

export const auth = (Component: FunctionComponent<React.PropsWithChildren<unknown>>) => (props: Record<any, any>) => {
  const { isSignedIn, isSaved } = useAuth();
  const { push, pathname } = useRouter();

  useEffect(() => {
    if (!isSignedIn) {
      push('/');
    } else if (!isSaved && pathname !== '/profile') {
      push('/profile');
    }
  }, [isSignedIn, isSaved]);

  return !isSignedIn || (!isSaved && pathname !== '/profile') ? (
    appConfig.isServer ? (
      <></>
    ) : (
      <LeftMenu />
    )
  ) : (
    <Component {...props} />
  );
};
