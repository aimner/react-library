import React from 'react';

import { useOpenToast } from '../../../../../../components/toast-custom/hooks';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks/hooks';
import { fetchBookWithoutCategories } from '../../../../../../store/features/book-page/thunks';
import { sendCancelBooking } from '../../../../../../store/features/booking/thunks';
import { selectProfileBookingId, selectProfileComments, selectProfileDelivery } from '../../../../../../store/features/profile/selectors';
import { fetchProfile } from '../../../../../../store/features/profile/thunks';
import { useRateBook } from '../../../../../book/hooks';


type HookType = {
  id: number;
};

export const useButtonInProfile = ({ id }: HookType) => {
  const dispatch = useAppDispatch();
  const { changeComment, createComment } = useRateBook();

  const comments = useAppSelector(selectProfileComments);
  const delivery = useAppSelector(selectProfileDelivery);
  const bookingId = useAppSelector(selectProfileBookingId);

  const commentInBook = comments?.find((item) => item.bookId === id);




  const openToast = useOpenToast();
  const cancelBooking = async () => {
    try {
      await dispatch(sendCancelBooking(String(bookingId))).unwrap();

      await dispatch(fetchProfile())
        .unwrap()
        .then(() => openToast('Бронирование книги успешно отменено!', false))
        .catch((v) => openToast(v, true));
    } catch (error) {
      openToast('Не удалось снять бронирование книги. Попробуйте позже!', true);
    }
  };

  const fetchBook = async (bookId: number) => {
    await dispatch(fetchBookWithoutCategories(bookId))
      .unwrap()
      .catch((err) => {
        openToast(err, true);
      });
  };

  const editCommentRequest = async () => {
    await fetchBook(commentInBook!.bookId);
    changeComment(id, commentInBook!.id, commentInBook!.rating, commentInBook!.text);
  };

  const createCommentRequest = async () => {
    await fetchBook(id);
    createComment(id);
  };

  const rateTheBook = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    if (commentInBook) {
      editCommentRequest();
    } else {
      createCommentRequest();
    }
  };

  return {
    rateTheBook,
    commentInBook,
    cancelBooking,
    comments,
    delivery,
  };
};
