import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import * as apiFunctions from '../../../api';
import {
  Authorization,
  RecoveryPassword,
  Registration,
  RegistrationRequest,
  SuccessfulRegistration,
} from '../../../types/auth-types';
import { RootState } from '../../store';

export type KnownError = {
  message: string;
  description: string;
  code: number | undefined;
};

export const fetchAuth = createAsyncThunk<
  SuccessfulRegistration,
  Authorization,
  { extra: typeof apiFunctions; state: RootState; rejectValue: AxiosError }
>('auth/fetchAuth', async (data, { extra: api, rejectWithValue }) => {
  try {
    return await api.authorization(data);
  } catch (error) {
    return rejectWithValue(error as AxiosError);
  }
});

export const fetchRegistration = createAsyncThunk<
  SuccessfulRegistration,
  RegistrationRequest,
  { extra: typeof apiFunctions; state: RootState }
>('auth/fetchRegistration', async (data, { extra: api, rejectWithValue }) => {
  try {
    return await api.registration(data);
  } catch (error) {
    return rejectWithValue(error as AxiosError);
  }
});

export const fetchForgotPassword = createAsyncThunk<
  { ok: boolean },
  Pick<Registration, 'email'>,
  { extra: typeof apiFunctions; state: RootState }
>('auth/fetchForgotPassword', async (data, { extra: api, rejectWithValue }) => {
  try {
    return await api.forgotPassword(data);
  } catch (error) {
    return rejectWithValue(error as AxiosError);
  }
});

export const fetchRecoveryPassword = createAsyncThunk<
  SuccessfulRegistration,
  RecoveryPassword,
  { extra: typeof apiFunctions; state: RootState }
>('auth/fetchRecoveryPassword', async (data, { extra: api, rejectWithValue }) => {
  try {
    return await api.recoveryPassword(data);
  } catch (error) {
    return rejectWithValue(error as AxiosError);
  }
});
