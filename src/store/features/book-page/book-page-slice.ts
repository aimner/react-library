import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Book, Category } from '../../../types/books-types';
import { Profile } from '../../../types/profile-types';

import { fetchBook, fetchBookWithoutCategories } from './thunks';

type BooksState = {
  book: Book | null;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: BooksState = {
  book: null,
  loading: 'idle',
};

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = 'pending';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBook.fulfilled, (state, { payload: [book] }: PayloadAction<[Book, Category[], Profile]>) => {
      state.loading = 'succeeded';
      if (book.comments) {
        state.book = {
          ...book,
          comments: [...book.comments].sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          ),
        };
      } else {
        state.book = book;
      }
    });
    builder.addCase(fetchBookWithoutCategories.fulfilled, (state, { payload: book }: PayloadAction<Book>) => {
      state.loading = 'succeeded';
      if (book.comments) {
        state.book = {
          ...book,
          comments: [...book.comments].sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          ),
        };
      } else {
        state.book = book;
      }
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
      (action: PayloadAction) => action.type.endsWith('fulfilled'),
      (state) => {
        state.loading = 'succeeded';
      }
    );
  },
});

export const { setLoading } = bookSlice.actions;

export default bookSlice.reducer;
