import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type MyTrain = {
  date: string,
  program: string,
  nameTrain: string,
}

export interface trainingState {
  myTrains: MyTrain[];
}

const initialState: trainingState = {
  myTrains: [],
};

export const myTrainingsSlice = createSlice({
  name: 'avatar',
  initialState,
  reducers: {
    setMyTrain: (state, action: PayloadAction<MyTrain[]>) => {
      state.myTrains = action.payload;
    },
  },
});

export default myTrainingsSlice.reducer;
export const { actions } = myTrainingsSlice;
