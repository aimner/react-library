import { RootState } from '../../store';

export const selectBooking = (state: RootState) => state.booking.booking
export const selectBookingBookId = (state: RootState) => state.booking.bookId
export const selectOpenBookingMenu = (state: RootState) => state.booking.openBookingMenu

