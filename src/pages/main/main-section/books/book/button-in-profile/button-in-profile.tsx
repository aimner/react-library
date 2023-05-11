import React from 'react';
import classNames from 'classnames/bind';

import { Delivery } from '../../../../../../types/books-types';
import { ICoomentInProfile } from '../../../../../../types/profile-types';

import { buttonTextInBook } from './functions';
import { useButtonInProfile } from './hooks';

import classes from './button-in-profile.module.scss';

const cx = classNames.bind(classes);

type PropsType = {
  bookingBlock: boolean | undefined;
  delivery: Delivery | null;
  comments?: ICoomentInProfile[] | undefined;
  id: number;
};

export const ButtonInProfile: React.FC<PropsType> = ({ bookingBlock, comments, delivery, id }) => {
  const { commentInBook, cancelBooking, rateTheBook } = useButtonInProfile({ id });

  // IN HISTORY BLOCK
  if (comments) {
    return (
      <button
        type='button'
        onClick={(e) => {
          rateTheBook(e);
        }}
        className={cx({
          book__button___active: true,
          book__button___booked: commentInBook,
        })}
      >
        {commentInBook ? 'Изменить оценку' : 'Оставить отзыв'}
      </button>
    );
  }

  // IN BOOKED OR DELIVERED BLOCK
  return (
    <>
      {bookingBlock ? (
        // BOOKED BLOCK
        <button
          type='button'
          onClick={async (e) => {
            e.stopPropagation();
            cancelBooking();
          }}
          className={cx({
            book__button___active: true,
          })}
        >
          Отменить бронь
        </button>
      ) : (
        // DELIVERED BLOCK
        <div className={classes.returnBlock}>{buttonTextInBook(delivery)} </div>
      )}
    </>
  );
};
