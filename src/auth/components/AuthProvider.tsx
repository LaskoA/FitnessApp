import { useState, ReactNode, useCallback, useEffect } from 'react';
import deepEqual from 'fast-deep-equal';

import { AuthContext } from '../context';
import { State } from '../types/State';
import { authStorage } from '../utils/authStorage';
import { getUser } from '../api';

export interface Props {
  readonly children: ReactNode;
}

export function AuthProvider({ children }: Props) {
  const [state, setState] = useState<State | undefined>(authStorage.get());

  const handleSetState = useCallback(
    (newState?: State) => {
      if (!deepEqual(newState, state)) {
        setState(newState);

        if (newState) {
          authStorage.set(newState);
        } else {
          authStorage.clear();
        }
      }
    },
    [state],
  );

  useEffect(() => {
    if (state?.token) {
      (async () => {
        try {
          const user = await getUser();

          handleSetState({ ...state, user });
        } catch (e) {
          handleSetState(undefined);
        }
      })();
    }
  }, []);

  return <AuthContext.Provider value={{ state, setState: handleSetState }}>{children}</AuthContext.Provider>;
}
