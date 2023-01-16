import { createContext } from 'react';

import { State } from '../types/State';

export interface Props {
  readonly state?: State;
  readonly setState: (state?: State) => void;
}

export const AuthContext = createContext<Props>({} as Props);
