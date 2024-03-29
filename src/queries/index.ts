import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from '@tanstack/react-query';
import snakecaseKeys from 'snakecase-keys';
import camelcaseKeys from 'camelcase-keys';
import { AxiosRequestConfig } from 'axios';

import { apiClient } from '@app/query';
import { UserDraft } from '@app/users/types';
import { TypeForm } from '@app/formik/components/formRegistration/typeForm';

import { Train, ApiError, Shape, Exercise, Program, MyTrain, ProgramList } from './types';
import { authStorage } from '@app/auth/utils/authStorage';

export const getTraining = async (id?: number, options: AxiosRequestConfig = {}): Promise<Train[]> => {
  return await apiClient.get(`app/trainings/${id}/`, options);
};

export const useTrainQuery = (id: number, options: UseQueryOptions<Train[], ApiError> = {}) => {
  return useQuery<Train[], ApiError>(['fitnes'], () => getTraining(id), options);
};

export const getTrainings = async (options: AxiosRequestConfig = {}): Promise<MyTrain[]> => {
  return await apiClient.get('app/trainings/', options);
};

export const useTrainingsQuery = (options: UseQueryOptions<MyTrain[], ApiError> = {}) => {
  return useQuery<MyTrain[], ApiError>(['trainings'], getTrainings, options);
};

export const getShapes = async (options: AxiosRequestConfig = {}): Promise<Shape> => {
  return await apiClient.get('app/shapes/', options);
};

export const useShapesQuery = (options: UseQueryOptions<Shape, ApiError> = {}) => {
  return useQuery<Shape, ApiError>(['shapes'], getShapes, options);
};

export const getExercises = async (options: AxiosRequestConfig = {}): Promise<Exercise[]> => {
  return camelcaseKeys(await apiClient.get('app/exercises/', options), { deep: true });
};

export const useExercisesQuery = (options: UseQueryOptions<Exercise[], ApiError> = {}) => {
  return useQuery<Exercise[], ApiError>(['exercise'], getExercises, options);
};

export const createUser = async (data: TypeForm) => {
  const result: UserDraft = await apiClient.post('user/register/', data);

  authStorage.set(result);
  
  // await localStorage.setItem('userId', String(result?.user?.id));

  return result;
};

export const getUser = async (id?: number) => {
  authStorage.get()
}

export const getPrograms = async () => {
  return await apiClient.get('app/programs/');
};

export const createTrains = async (data: MyTrain): Promise<MyTrain> => {
  return await apiClient.post('app/trainings/', data);
}

export const deleteTrain = async (id: number) => {
  return await apiClient.delete(`app/trainings/${id}/`);
}

export const getProgramsList = async (options: AxiosRequestConfig = {}): Promise<ProgramList[]> => {
  return camelcaseKeys(await apiClient.get('app/programs/', options), { deep: true });
};

export const useProgramsListQuery = (options: UseQueryOptions<ProgramList[], ApiError> = {}) => {
  return useQuery<ProgramList[], ApiError>(['programs-list'], getProgramsList, options);
};
