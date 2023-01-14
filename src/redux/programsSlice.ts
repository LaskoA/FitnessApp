import { MyTrain, Program } from '@app/queries/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface programState {
  programs: Program[];
  // plainTrain: MyTrain;
}

const initialState: programState = {
  programs: [],
  // plainTrain: {},
};

export const programsSlice = createSlice({
  name: 'program',
  initialState,
  reducers: {
    setPrograms: (state, action: PayloadAction<Program[]>) => {
      state.programs = action.payload;
    },
  },
});

export default programsSlice.reducer;
export const { actions } = programsSlice;
