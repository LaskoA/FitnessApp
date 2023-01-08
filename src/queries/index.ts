import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from '@tanstack/react-query';
import camelcaseKeys from 'camelcase-keys';
import { AxiosRequestConfig } from 'axios';

import { apiClient } from '@app/query';

import { Train, ApiError, Shape, Exercise } from './types';
import { Values } from '@app/formik/components/formRegistration/typeForm';

export const getTraining = async (id?: number, options: AxiosRequestConfig = {}): Promise<Train[]> => {
  return await apiClient.get(`app/trainings/${id}/`, options);
};

export const useTrainQuery = (id: number, options: UseQueryOptions<Train[], ApiError> = {}) => {
  return useQuery<Train[], ApiError>(['fitnes'], () => getTraining(id), options);
};

export const getTrainings = async (options: AxiosRequestConfig = {}): Promise<Train[]> => {
  return await apiClient.get('app/trainings/', options);
};

export const useTrainingsQuery = (options: UseQueryOptions<Train[], ApiError> = {}) => {
  return useQuery<Train[], ApiError>(['trainings'], getTrainings, options);
};

export const getShapes = async (options: AxiosRequestConfig = {}): Promise<Shape> => {
  return await apiClient.get('app/shapes/', options);
};

export const useShapesQuery = (options: UseQueryOptions<Shape, ApiError> = {}) => {
  return useQuery<Shape, ApiError>(['shapes'], getShapes, options);
};

export const getExercises = async (options: AxiosRequestConfig = {}): Promise<Exercise[]> => {
  return camelcaseKeys(await apiClient.get('app/exercises/', options));
};

export const useExercisesQuery = (options: UseQueryOptions<Exercise[], ApiError> = {}) => {
  return useQuery<Exercise[], ApiError>(['exercise'], getExercises, options);
};

export const createUser = async (data: Values) => {
  return await apiClient.post('user/register/', data);
} 
