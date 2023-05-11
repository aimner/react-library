import { BookingBook, BookingBookSuccess } from '../types/booking-types';

import { api } from './api';
import { BOOKINGS_API } from './query-strings';

export const setBooking = async (data: { data: BookingBook }) => {
  const result = await api.post<BookingBookSuccess>(BOOKINGS_API, data).then((value) => value.data);

  return result;
};

export const changeBooking = async (data: { data: BookingBook }, id: number | undefined) => {
  const result = await api.put<BookingBookSuccess>(`${BOOKINGS_API}/${id}`, data).then((value) => value.data);

  return result;
};

export const cancelBooking = async (id: string) => {
  const result = await api.delete<BookingBookSuccess>(`${BOOKINGS_API}/${id}`).then((value) => value.data);

  return result;
};
