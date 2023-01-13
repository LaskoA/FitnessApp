import { MyTrain } from '@app/queries/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// type MyTrain = {
//   day_id: number,
//   program_id: number,
//   name: string,
//   user_id: number,
//   id: number,
//   comment: string,
// }

// export interface trainingState {
//   myTrains: MyTrain[];
//   plainTrain: MyTrain;
// }

const initialState: MyTrain = {
  // myTrains: [],
  day_id: null,
  program_id: null,
  name: '',
  user_id: 1,
  id: null,
  comment: '',
};

export const plainTrainSlice = createSlice({
  name: 'plainTrain',
  initialState,
  reducers: {
    setDayId: (state, action: PayloadAction<Date>) => {
      state.day_id = action.payload;
    },
    setProgramId: (state, action: PayloadAction<number>) => {
      state.program_id = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setUserId: (state, action: PayloadAction<number>) => {
      state.user_id = action.payload;
    },
    setId: (state, action: PayloadAction<number>) => {
      state.id = action.payload;
    },
    setComment: (state, action: PayloadAction<string>) => {
      state.comment = action.payload;
    },
  },
});

export default plainTrainSlice.reducer;
export const { actions } = plainTrainSlice;
