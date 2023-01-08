/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import userAvatar from '@app/app/images/user-avatar.png';
import { StaticImageData } from 'next/image';

export interface CommentsState {
  avatar: File | null;
  preview: string | StaticImageData;
}

const initialState: CommentsState = {
  avatar: null,
  preview: userAvatar,
};

export const avatarSlice = createSlice({
  name: 'avatar',
  initialState,
  reducers: {
    setAvatar: (state, action: PayloadAction<File>) => {
      state.avatar = action.payload;
    },
    setPreview: (state, action: PayloadAction<string>) => {
      state.preview = action.payload;
    },
  },
});

export default avatarSlice.reducer;
export const { actions } = avatarSlice;
