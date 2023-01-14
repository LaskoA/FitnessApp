import { AUTH_KEY } from '../constants';
import { State } from '../types/State';

export const set = (state: State) => {
  localStorage.setItem(AUTH_KEY, JSON.stringify(state));
};

export const get = () => {
  if (typeof localStorage === 'undefined') {
    return undefined;
  }

  const data = localStorage.getItem(AUTH_KEY);

  if (data) {
    try {
      return JSON.parse(data) as State;
    } catch (e) {
      console.log(e)
    }
  }

  return undefined;
};

export const getToken = () => {
  const auth = get();

  return auth?.token;
};

export const clear = () => {
  localStorage.removeItem(AUTH_KEY);
};

export const authStorage = {
  set,
  get,
  getToken,
  clear,
};
