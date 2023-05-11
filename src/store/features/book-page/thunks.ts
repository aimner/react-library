import { createAsyncThunk } from '@reduxjs/toolkit';

import * as apiFunctions from '../../../api';
import { Book, Category } from '../../../types/books-types';
import { Profile } from '../../../types/profile-types';
import { RootState } from '../../store';

const errorText = 'Что-то пошло не так. Обновите страницу через некоторое время.';

export const fetchBook = createAsyncThunk<
  [Book, Category[], Profile],
  number,
  { extra: typeof apiFunctions; state: RootState }
>('book/fetchBook', async (id, { extra: api, rejectWithValue }) => {
  try {
    return await Promise.all([api.getBook(id), api.getCategories(), api.getProfile()]);
  } catch (error) {
    return rejectWithValue(errorText);
  }
});

export const fetchBookWithoutCategories = createAsyncThunk<
  Book,
  number,
  { extra: typeof apiFunctions; state: RootState }
>('book/fetchBookWithoutCategories', async (id, { extra: api, rejectWithValue }) => {
  try {
    return await api.getBook(id);
  } catch (error) {
    return rejectWithValue(errorText);
  }
});
