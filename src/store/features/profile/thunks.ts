import { createAsyncThunk } from '@reduxjs/toolkit';

import * as apiFunctions from '../../../api';
import { RegistrationRequest } from '../../../types/auth-types';
import { Books, Category } from '../../../types/books-types';
import { Profile } from '../../../types/profile-types';
import { RootState } from '../../store';

const unsuccessfulProfileRequest = 'Что-то пошло не так. Попробуйте позже!';
const unsuccessfulChangeProfileRequest = 'Изменения не были сохранены. Попробуйте позже!';
const unsuccessfulAvatarRequest = 'Что-то пошло не так, фото не сохранилось. Попробуйте позже!';

export type ProfileThunkType = [
  PromiseSettledResult<Profile>,
  PromiseSettledResult<Category[]>,
  PromiseSettledResult<Books[]>
];

export const fetchProfile = createAsyncThunk<ProfileThunkType, void, { extra: typeof apiFunctions; state: RootState }>(
  'profile/fetchProfile',
  async (_, { extra: api, rejectWithValue }) => {
    try {
      return await Promise.allSettled([api.getProfile(), api.getCategories(), api.getBooks()]);
    } catch (error) {
      return rejectWithValue(unsuccessfulProfileRequest);
    }
  }
);

export const fetchAvatar = createAsyncThunk<
  Profile,
  { id: number; userId: number },
  { extra: typeof apiFunctions; state: RootState }
>('profile/fetchAvatar', async (data, { extra: api, rejectWithValue }) => {
  try {
    return await api.getAvatar(data);
  } catch (error) {
    return rejectWithValue(unsuccessfulAvatarRequest);
  }
});

export const fetchChangeProfile = createAsyncThunk<
  Profile,
  { data: RegistrationRequest; userId: number },
  { extra: typeof apiFunctions; state: RootState }
>('profile/fetchChangeProfile', async (data, { extra: api, rejectWithValue }) => {
  try {
    return await api.changeProfile(data);
  } catch (error) {
    return rejectWithValue(unsuccessfulChangeProfileRequest);
  }
});
