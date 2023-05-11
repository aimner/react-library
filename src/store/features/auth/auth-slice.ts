import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SuccessfulRegistration, User } from '../../../types/auth-types';

import { fetchAuth, fetchRegistration } from './thunks';

type AuthState = {
  isAuth: boolean;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  jwt: string;
  user: User | null;
}

const initialState: AuthState = {
  isAuth: !!localStorage.getItem('jwtlocalhost') && true,
  loading: 'idle',
  jwt: localStorage.getItem('jwtlocalhost') || '',
  user: JSON.parse(localStorage.getItem('bookUser')!) || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('jwtlocalhost');
      state.isAuth = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAuth.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.isAuth = true;
      localStorage.setItem('jwtlocalhost', action.payload.jwt);
      state.user = action.payload.user;
      localStorage.setItem('bookUser', JSON.stringify(action.payload.user));
    });
    builder.addCase(fetchRegistration.fulfilled, (state, action: PayloadAction<SuccessfulRegistration>) => {
      state.loading = 'succeeded';
      localStorage.setItem('jwtlocalhost', action.payload.jwt);
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
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
