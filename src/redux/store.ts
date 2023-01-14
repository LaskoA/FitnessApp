import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import avatarReducer from './userAvatarSlice';
import myTrainingsReducer from './myTrainingsSlice';
import plainTrainReducer from './plainTrainSlice';
import programsReducer from './programsSlice';

export const store = configureStore({
  reducer: {
    avatar: avatarReducer,
    myTrainings: myTrainingsReducer,
    plainTrain: plainTrainReducer,
    programs: programsReducer,
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
