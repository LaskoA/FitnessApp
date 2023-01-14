import { deleteTrain } from '@app/queries';
import { MyTrain } from '@app/queries/types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface trainingState {
  myTrains: MyTrain[];
  deleting: boolean;
  errorDeleting: boolean;
  deletedTrainId: number;
  // plainTrain: MyTrain;
}

const initialState: trainingState = {
  myTrains: null,
  deleting: false,
  errorDeleting: false,
  deletedTrainId: null,
  // plainTrain: {},
};

export const removeTrain = createAsyncThunk(
  'myTrains/fetch',
  (id: number) => deleteTrain(id),
);

export const myTrainsSlice = createSlice({
  name: 'myTrains',
  initialState,
  reducers: {
    setMyTrains: (state, action: PayloadAction<MyTrain[]>) => {
      state.myTrains = action.payload;
    },
    setErrorDeleting: (state, action: PayloadAction<boolean>) => {
      state.errorDeleting = action.payload;
    },
    setDeletedTrainId: (state, action: PayloadAction<number>) => {
      state.deletedTrainId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeTrain.pending, (state) => {
        state.deleting = true;
      })
      .addCase(removeTrain.fulfilled, (state) => {
        state.deleting = false;
        state.myTrains = state.myTrains.filter(train => train.id !== state.deletedTrainId);
      })
      .addCase(removeTrain.rejected, (state) => {
        state.deleting = false;
        state.errorDeleting = true;
      });
  },
});

export default myTrainsSlice.reducer;
export const { actions } = myTrainsSlice;
