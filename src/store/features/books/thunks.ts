import { createAsyncThunk } from '@reduxjs/toolkit';

import * as apiFunctions from '../../../api';
import { Books, Category } from '../../../types/books-types';
import { Profile } from '../../../types/profile-types';
import { RootState } from '../../store';

const errorText = 'Что-то пошло не так. Обновите страницу через некоторое время.';

export const fetchBooks = createAsyncThunk<
  [Books[], Category[], Profile],
  void,
  { extra: typeof apiFunctions; state: RootState }
>('books/fetchBooks', async (_, { extra: api, rejectWithValue }) => {
  try {
    return await Promise.all([api.getBooks(), api.getCategories(), api.getProfile()]);
  } catch (error) {
    return rejectWithValue(errorText);
  }
});

export const fetchBooksWithoutCategories = createAsyncThunk<
  Books[],
  void,
  { extra: typeof apiFunctions; state: RootState }
>('books/fetchBooksWithoutCategories', async (_, { extra: api, rejectWithValue }) => {
  try {
    return await api.getBooks();
  } catch (error) {
    return rejectWithValue(errorText);
  }
});

export const fetchCategories = createAsyncThunk<Category[], void, { extra: typeof apiFunctions; state: RootState }>(
  'books/fetchCategories',
  async (_, { extra: api, rejectWithValue }) => {
    try {
      return await api.getCategories();
    } catch (error) {
      return rejectWithValue(errorText);
    }
  }
);
