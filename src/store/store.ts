import { configureStore } from '@reduxjs/toolkit';

import * as api from '../api';

import auth from './features/auth/auth-slice';
import book from './features/book-page/book-page-slice';
import booking from './features/booking/booking-slice';
import books from './features/books/books-slice';
import comments from './features/comments/comments-slice';
import filters from './features/filters/filter-slice';
import profile from './features/profile/profile-slice';
import toast from './features/toast/toast-slice';

const store = configureStore({
  reducer: {
    books,
    filters,
    auth,
    booking,
    comments,
    toast,
    profile,
    book
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
      serializableCheck: {
        ignoredActions: [
          'auth/fetchAuth/rejected',
          'auth/fetchRegistration/rejected',
          'auth/fetchRecoveryPassword/rejected',
          'auth/fetchForgotPassword/rejected',
        ],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
