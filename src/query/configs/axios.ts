import axios from 'axios';

import { appConfig } from '@app/app/configs';
import { authStorage } from '@app/auth/utils/authStorage';

const apiClient = axios.create({
  baseURL: appConfig.apiHost,
  responseType: 'json',
  headers: {
    common: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
  },
});

apiClient.interceptors.request.use(async config => {
  // @ts-ignore
  if (!config?.headers?.common?.Authorization) {
    try {
      const token = authStorage.getToken();

      if (token) {
        // @ts-ignore
        config.headers.common.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      // nothing
    }
  }

  return config;
});

apiClient.interceptors.response.use(
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

export default apiClient;
