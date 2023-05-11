import { createAsyncThunk } from '@reduxjs/toolkit';

import * as apiFunctions from '../../../api';
import { BookingBook, BookingBookSuccess } from '../../../types/booking-types';
import { RootState } from '../../store';

const unsuccessfulBookingRequest = 'Что-то пошло не так, книга не забронирована. Попробуйте позже!';
const unsuccessfulCancelBookingRequest = 'Не удалось снять бронирование книги. Попробуйте позже!';
const unsuccessfulCnahgingookingRequest = 'Изменения не были сохранены. Попробуйте позже!';

export const sendBookingBook = createAsyncThunk<
  BookingBookSuccess,
  { data: BookingBook },
  { extra: typeof apiFunctions; state: RootState }
>('booking/sendBookingBook', async (data, { extra: api, rejectWithValue }) => {
  try {
    return await api.setBooking(data);
  } catch (error) {
    return rejectWithValue(unsuccessfulBookingRequest);
  }
});

export const changeBookingBook = createAsyncThunk<
  BookingBookSuccess,
  { value: { data: BookingBook }; id: number | undefined },
  { extra: typeof apiFunctions; state: RootState }
>('booking/changeBookingBook', async ({ value, id }, { extra: api, rejectWithValue }) => {
  try {
    return await api.changeBooking(value, id);
  } catch (error) {
    return rejectWithValue(unsuccessfulCnahgingookingRequest);
  }
});

export const sendCancelBooking = createAsyncThunk<
  BookingBookSuccess,
  string,
  { extra: typeof apiFunctions; state: RootState }
>('booking/sendBookingBook', async (id, { extra: api, rejectWithValue }) => {
  try {
    return await api.cancelBooking(id);
  } catch (error) {
    return rejectWithValue(unsuccessfulCancelBookingRequest);
  }
});
