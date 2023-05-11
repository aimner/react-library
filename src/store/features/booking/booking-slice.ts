import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Booking } from '../../../types/books-types';

type InitialState = {
  openBookingMenu: boolean;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  booking: Booking | null;
  bookId: number | null;
}

const initialState: InitialState = {
  openBookingMenu: false,
  booking: null,
  loading: 'idle',
  bookId: null,
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setOpenBookingMenu: (state, action: PayloadAction<Omit<InitialState, 'loading'>>) => {
      state.openBookingMenu = action.payload.openBookingMenu;
      state.booking = action.payload.booking;
      state.bookId = action.payload.bookId;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      (action: PayloadAction) => action.type.endsWith('/pending'),
      (state) => {
        state.loading = 'pending';
        state.openBookingMenu = false;
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
      (state) => {
        state.loading = 'succeeded';
      }
    );
  },
});

export const { setOpenBookingMenu } = bookingSlice.actions;

export default bookingSlice.reducer;
