import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Book, Books, Category } from '../../../types/books-types';
import { Profile } from '../../../types/profile-types';
import {delivery } from './delivery'

import { fetchAvatar, fetchProfile } from './thunks';

type ProfileSlice = {
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  profile: Profile | null;
}

const initialState: ProfileSlice = {
  loading: 'idle',
  profile: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = 'pending';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchProfile.fulfilled,
      (
        state,
        {
          payload,
        }: PayloadAction<
          [PromiseSettledResult<Profile>, PromiseSettledResult<Category[]>, PromiseSettledResult<Books[]>]
        >
      ) => {
        state.loading = 'succeeded';
        if (payload[0].status === 'fulfilled') {
          state.profile = { ...payload[0].value };
        }
      }
    );
    builder.addCase(fetchAvatar.fulfilled, (state, { payload }: PayloadAction<Profile>) => {
      state.loading = 'succeeded';
      state.profile = payload;
    });
    builder.addMatcher(
      (action: PayloadAction) => action.type.endsWith('/pending'),
      (state) => {
        state.loading = 'pending';
      }
    );
    builder.addMatcher(
      (action: PayloadAction) => action.type.endsWith('/rejected'),
      (state) => {
        state.loading = 'failed';
      }
    );
    builder.addMatcher(
      (action: PayloadAction) => action.type.endsWith('/fulfilled'),
      (state, action) => {
        state.loading = 'succeeded';
      }
    );
    builder.addMatcher(
      (action: PayloadAction) => action.type.endsWith('fetchBooks/fulfilled'),
      (state, action: PayloadAction<[Books[], Category[], Profile]>) => {
        state.profile = { ...action.payload[2] };
      }
    );
    builder.addMatcher(
      (action: PayloadAction) => action.type.endsWith('fetchBook/fulfilled'),
      (state, action: PayloadAction<[Book, Category[], Profile]>) => {
        state.profile = { ...action.payload[2] };
      }
    );
  },
});

export const { setLoading } = profileSlice.actions;

export default profileSlice.reducer;
