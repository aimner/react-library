import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import dayjs, { Dayjs } from 'dayjs';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { selectUserId } from '../../store/features/auth/selectors';
import { fetchBook } from '../../store/features/book-page/thunks';
import { setOpenBookingMenu } from '../../store/features/booking/booking-slice';
import { selectBooking, selectBookingBookId } from '../../store/features/booking/selectors';
import { changeBookingBook, sendBookingBook, sendCancelBooking } from '../../store/features/booking/thunks';
import { fetchBooksWithoutCategories } from '../../store/features/books/thunks';
import { useOpenToast } from '../toast-custom/hooks';

export function useCalendary() {
  const location = useLocation();

  const splitLocation = location.pathname.split('/');

  const bookIdInUrl = splitLocation.at(-1);

  const dispatch = useAppDispatch();

  const userId = useAppSelector(selectUserId);

  const booking = useAppSelector(selectBooking);
  const bookId = useAppSelector(selectBookingBookId);

  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());

  const [openSelect, setOpenSelect] = useState(false);

  const [bookingData, setBookingData] = useState<string | undefined>(booking?.dateOrder);

  const currentDay = useMemo(() => dayjs().toDate(), []);

  const firstDayOfTheMonth = useMemo(() => selectedDate.clone().startOf('month'), [selectedDate]);

  const firstDayOfFirstWeekOfMonth = useMemo(() => dayjs(firstDayOfTheMonth).startOf('week'), [firstDayOfTheMonth]);

  const data = {
    book: String(bookId),
    customer: String(userId),
    order: true,
    dateOrder: String(bookingData),
  };

  const openToast = useOpenToast();

  const updateData = async () => {
    if (Number(bookIdInUrl)) {
      return dispatch(fetchBook(Number(bookIdInUrl)))
        .unwrap()
        .catch((err) => openToast(err, true));
    }

    return dispatch(fetchBooksWithoutCategories())
      .unwrap()
      .catch((err) => {
        openToast(err, true);
      });
  };

  const onSendBookingBook = () => {
    dispatch(
      sendBookingBook({
        data,
      })
    )
      .unwrap()
      .then(async () => {
        await updateData();
        openToast('Книга забронирована. Подробности можно посмотреть на странице Профиль', false);
      })
      .catch((err) => {
        openToast(err, true);
      });
  };

  const onCnahgeBookingBook = () => {
    dispatch(
      changeBookingBook({
        value: {
          data: {
            book: String(bookId),
            customer: String(userId),
            order: true,
            dateOrder: String(bookingData),
          },
        },
        id: booking?.id,
      })
    )
      .unwrap()
      .then(async () => {
        await updateData();
        openToast('Изменения успешно сохранены!', false);
      })
      .catch((err) => {
        openToast(err, true);
      });
  };

  const cancelBooking = () => {
    if (booking) {
      dispatch(sendCancelBooking(String(booking?.id)))
        .unwrap()
        .then(async () => {
          await updateData();
          openToast('Бронирование книги успешно отменено!', false);
        })
        .catch((err) => {
          openToast(err, true);
        });
    }
  };

  const closeModal = () => {
    dispatch(setOpenBookingMenu({ openBookingMenu: false, booking: null, bookId: null }));
  };

  return {
    onSendBookingBook,
    cancelBooking,
    onCnahgeBookingBook,
    firstDayOfFirstWeekOfMonth,
    currentDay,
    bookingData,
    openSelect,
    selectedDate,
    booking,
    userId,
    setSelectedDate,
    setOpenSelect,
    setBookingData,
    closeModal,
  };
}
