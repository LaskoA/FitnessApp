import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import avatarReducer from './userAvatarSlice';

export const store = configureStore({
  reducer: {
    avatar: avatarReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

/* eslint-disable @typescript-eslint/indent */
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
