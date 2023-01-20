import { useState, ReactNode, useCallback, useEffect } from 'react';
import deepEqual from 'fast-deep-equal';

import { UserDraft } from '@app/users/types';

import { getUser } from '../api';
import { State } from '../types/State';
import { AuthContext } from '../context';
import { authStorage } from '../utils/authStorage';


export interface Props {
  readonly children: ReactNode;
}

export function AuthProvider({ children }: Props) {
  const local = authStorage.get();
  const [state, setState] = useState<UserDraft | undefined>(local);

  const handleSetState = useCallback(
    (newState?: UserDraft) => {
      if (!deepEqual(newState, state)) {
        setState(newState);

        if (newState) {
          authStorage.set(newState);
        }
        //  else {
        //   authStorage.clear();
        // }
      }
    },
    [state],
  );

  useEffect(() => {
    // if (state?.token) {
      (async () => {
        try {
          const user = await getUser(local.user.id);

          handleSetState({ ...state, user });
        } catch (e) {
          handleSetState(undefined);
        }
      })();
    // }
  }, []);

  return <AuthContext.Provider value={{ state, setState: handleSetState }}>{children}</AuthContext.Provider>;
}
