import { MyTrain } from '@app/queries/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: MyTrain = {
  date: null,
  program: null,
  name: '',
  user: 1,
  id: null,
  comment: '',
};

export const plainTrainSlice = createSlice({
  name: 'plainTrain',
  initialState,
  reducers: {
    setDate: (state, action: PayloadAction<Date>) => {
      state.date = action.payload;
    },
    setProgram: (state, action: PayloadAction<number>) => {
      state.program = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setUser: (state, action: PayloadAction<number>) => {
      state.user = action.payload;
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
