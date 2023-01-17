import { createContext } from 'react';

import { UserDraft } from '@app/users/types';

export interface Props {
  readonly state?: UserDraft;
  readonly setState: (state?: UserDraft) => void;
}

export const AuthContext = createContext<Props>({} as Props);
