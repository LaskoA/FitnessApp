import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from '@tanstack/react-query';
import axios, { AxiosRequestConfig } from 'axios';

export interface Train {
  id: number;
  name: string,
  comment: string;
  day: number;
  muscles: number[];
  user: number;
}
export interface ApiError {
  message: string;
  status: number;
  statusText: string;
  data: Record<any, any>;
}
const baseUrl = 'http://127.0.0.1:8000';
const app = 'http://127.0.0.1:8000/app/trainings/1/'
const neq = 'https://jsonplaceholder.typicode.com/todos';
const user = 'http://127.0.0.1:8000/admin/auth/group/1';

const apiClient = axios.create({
  baseURL: app,
  responseType: 'json',
  // withCredentials: false,
  headers: {
    // accept: 'application/json, text/plain, */*',
    common: {
      'Content-Type': 'application/json',
    },
  },
});

const response = apiClient.interceptors.response.use(
  response => {
    if (response?.data) {
      if (typeof response?.data?.data === 'object' && Object.keys(response?.data).length === 1) {
        return response?.data?.data;
      }

      return response?.data;
    }

    return response;
  },
  error => {
    const result: Record<string, any> = {
      status: error.response?.status,
      statusText: error.response?.statusText,
    };

    if (result.status === 422 && error?.response?.data?.errors) {
      result.data = {};

      return Promise.reject(
        Object.entries(error.response.data.errors).reduce((draft, [field, error]) => {
          if (Array.isArray(error)) {
            draft.data[field] = error[0];
          }

          return draft;
        }, result),
      );
    }

    result.data = error?.response?.data;

    return Promise.reject(result);
  },
);

// export const getTrain = (id: number) => {
//   return axios.get(`${baseUrl}/app/trainings/${id}`);
// };

export const t1 = async (options: AxiosRequestConfig = {}): Promise<Train[]> => {
  return await axios.get(app, options);
};

export const useTrainQuery = (options: UseQueryOptions<Train[], ApiError> = {}) =>
  useQuery<Train[], ApiError>(['fitnes'], t1, options);

// export const base = async (options: AxiosRequestConfig = {}): Promise<Train[]> => {
//   return await apiClient.get(baseUrl, options);
// };

// export const useBase = (options: UseQueryOptions<Train[], ApiError> = {}) =>
//   useQuery<Train[], ApiError>(['base'], base, options);

export const ne = async (options: AxiosRequestConfig = {}): Promise<Train[]> => {
  return await apiClient.get(neq, options);
};

export const useNeq = (options: UseQueryOptions<Train[], ApiError> = {}) =>
  useQuery<Train[], ApiError>(['jsonplaceholder'], ne, options);

export const getUser = async (options: AxiosRequestConfig = {}) => {
  return await apiClient.get(user, options);
}

export const useGetUser = (options: UseQueryOptions<{}, ApiError> = {}) => {
  return useQuery<{}, ApiError>(['user'], getUser, options)
};
