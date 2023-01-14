import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';
import nullfined from 'nullfined';
import { AxiosRequestConfig } from 'axios';

import { apiClient } from '@app/query';
import { User } from '@app/users/types';
import { removeUndefined, toNumber } from '@app/app/utils';

import { State } from '../types/State';
import { SignUpForm, SignInForm } from '../types/forms';

export const login = async (data: SignInForm, options: AxiosRequestConfig = {}): Promise<State> => {
  const result: State = camelcaseKeys(nullfined(await apiClient.post('/login', data, options)), { deep: true });

  if (result?.user) {
    result.user = toNumber(removeUndefined(result.user));
  }

  return result;
};

export const getUser = async (options: AxiosRequestConfig = {}): Promise<User> => {
  return toNumber(
    camelcaseKeys(removeUndefined(nullfined(await apiClient.get('/user/profile', options))), { deep: true }),
  );
};

export const register = async (data: SignUpForm, options: AxiosRequestConfig = {}): Promise<State> => {
  return camelcaseKeys(await apiClient.post('/register', snakecaseKeys(data, { deep: true }), options), { deep: true });
};
