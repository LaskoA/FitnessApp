import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface trainingState {
  date: string;
  program: string;
  programName: string;
}

const initialState: trainingState = {
  date: '',
  program: '',
  programName: '',
};

export const trainingSlice = createSlice({
  name: 'avatar',
  initialState,
  reducers: {
    setDate: (state, action: PayloadAction<string>) => {
      state.date = action.payload;
    },
    setProgram: (state, action: PayloadAction<string>) => {
      state.program = action.payload;
    },
    setProgramName: (state, action: PayloadAction<string>) => {
      state.programName = action.payload;
    },
  },
});

export default trainingSlice.reducer;
export const { actions } = trainingSlice;
