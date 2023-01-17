import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';
import nullfined from 'nullfined';
import { AxiosRequestConfig } from 'axios';

import { apiClient } from '@app/query';
import { User, UserDraft } from '@app/users/types';
import { ApiError } from '@app/queries/types';
import { removeUndefined, toNumber } from '@app/app/utils';

import { State } from '../types/State';
import { SignUpForm, SignInForm } from '../types/forms';

export const login = async (data: SignInForm, options: AxiosRequestConfig = {}): Promise<State> => {
  const result: State = camelcaseKeys(nullfined(await apiClient.post('/user/register/', data, options)), {
    deep: true,
  });

  if (result?.user) {
    result.user = toNumber(removeUndefined(result.user));
  }

  return result;
};

export const getUser = async (id: number, options: AxiosRequestConfig = {}): Promise<User> => {
  const result: User = toNumber(
    camelcaseKeys(removeUndefined(nullfined(await apiClient.get(`/user/users/${id}/`, options))), { deep: true }),
  );

  return result;
};

export const useGetUser = (id, options: UseQueryOptions<User, ApiError> = {}) => {
  return useQuery<User, ApiError>([`user-${id}`], () => getUser(id), options);
};

export const register = async (data: SignUpForm, options: AxiosRequestConfig = {}): Promise<State> => {
  return camelcaseKeys(await apiClient.post('/register/', snakecaseKeys(data, { deep: true }), options), {
    deep: true,
  });
};
