import { MyTrain } from '@app/queries/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface trainingState {
  myTrains: MyTrain[];
  // plainTrain: MyTrain;
}

const initialState: trainingState = {
  myTrains: [],
  // plainTrain: {},
};

export const myTrainsSlice = createSlice({
  name: 'myTrains',
  initialState,
  reducers: {
    setMyTrains: (state, action: PayloadAction<MyTrain[]>) => {
      state.myTrains = action.payload;
    },
  },
});

export default myTrainsSlice.reducer;
export const { actions } = myTrainsSlice;
