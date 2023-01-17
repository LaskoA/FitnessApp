import { UserDraft } from '@app/users/types';
import { AUTH_KEY } from '../constants';

export const set = (state: UserDraft) => {
  localStorage.setItem(AUTH_KEY, JSON.stringify(state));
};

export const get = () => {
  if (typeof localStorage === 'undefined') {
    return undefined;
  }

  const data = localStorage.getItem(AUTH_KEY);

  if (data) {
    try {
      return JSON.parse(data) as UserDraft;
    } catch (e) {
      console.log('auth storage error:', e)
    }
  }

  return undefined;
};

export const clear = () => {
  localStorage.removeItem(AUTH_KEY);
};

export const authStorage = {
  set,
  get,
  clear,
};
