import { useCallback, useContext } from 'react';
import { produce } from 'immer';

import { User, UserDraft } from '@app/users/types';

import { AuthContext } from '../context';

export const useAuth = () => {
  const { state, setState } = useContext(AuthContext);

  const updateUser = useCallback(
    (data: User) => {
      if (state) {
        setState(
          produce(state, draft => {
            draft.user = data;
          }),
        );
      }
    },
    [state],
  );

  const isSaved = state?.user?.firstName && state.user?.email;

  return {
    updateUser,
    isSaved,
    isSignedIn: !!state?.user,
    user: state?.user as UserDraft['user'],
  };
};
