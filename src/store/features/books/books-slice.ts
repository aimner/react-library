import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Book, Books, Category } from '../../../types/books-types';
import { Profile } from '../../../types/profile-types';
import { ProfileThunkType } from '../profile/thunks';

import { fetchBooks, fetchBooksWithoutCategories, fetchCategories } from './thunks';

type BooksState = {
  books: Books[] | null;
  categories: Category[] | null;

  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: BooksState = {
  books: null,
  categories: null,

  loading: 'idle',
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = 'pending';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchBooks.fulfilled,
      (state, { payload: [books, categories] }: PayloadAction<[Books[], Category[], Profile]>) => {
        state.loading = 'succeeded';
        state.books = books.sort((a, b) => b.rating - a.rating);
        state.categories = categories;
      }
    );
    builder.addCase(fetchBooksWithoutCategories.fulfilled, (state, { payload: books }: PayloadAction<Books[]>) => {
      state.loading = 'succeeded';
      state.books = books.sort((a, b) => b.rating - a.rating);
    });

    builder.addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
      state.loading = 'succeeded';
      state.categories = action.payload;
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
      (action: PayloadAction) => action.type.endsWith('fetchProfile/fulfilled'),
      (state, action: PayloadAction<ProfileThunkType>) => {
        if (action.payload[1].status === 'fulfilled') {
          state.categories = [...action.payload[1].value];
        }
        if (action.payload[2].status === 'fulfilled') {
          state.books = [...action.payload[2].value];
        }
        state.loading = 'succeeded';
      }
    );
    builder.addMatcher(
      (action: PayloadAction) => action.type.endsWith('fetchBook/fulfilled'),
      (state, action: PayloadAction<[Book, Category[], Profile]>) => {
        state.categories = [...action.payload[1]];
        state.loading = 'succeeded';
      }
    );
  },
});

export const { setLoading } = booksSlice.actions;

export default booksSlice.reducer;
