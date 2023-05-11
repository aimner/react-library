import React from 'react';

import { Profile } from '../../../../types/profile-types';
import { Book } from '../../../main/main-section/books/book';
import { ProfileEmpty } from '../profile-empty';
import { ProfileExpired } from '../profile-expired';

import classes from './profile-booked-book.module.scss';

type PropsType = {
  profile: Profile | null;
  bookingBlock: boolean;
};

export const ProfileBookedBook: React.FC<PropsType> = ({ profile, bookingBlock }) => {
  const { booking, delivery } = profile || {};

  const expired = () => {
    if (booking?.dateOrder) {
      const date = new Date(booking.dateOrder);
      const today = new Date();

      today.setHours(0, 0, 0, 0);

      return today.getTime() > date.getTime();
    }

    return false;
  };

  return (
    <div className={classes.profileBooking}>
      <h3>Забронированная книга</h3>
      <p>Здесь вы можете просмотреть забронированную книгу, а так же отменить бронь</p>
      {booking?.book ? (
        <Book
          active={false}
          authors={booking.book.authors!}
          booking={null}
          title={booking.book.title!}
          id={booking.book.id}
          delivery={delivery!}
          image={{ url: booking.book.image! }}
          rating={booking.book.rating!}
          issueYear={booking.book.issueYear!}
          bookingBlock={bookingBlock}
        />
      ) : (
        <ProfileEmpty text='Забронируйте книгу и она отобразится' />
      )}

      {expired() && (
        <ProfileExpired text={['Дата бронирования книги истекла', 'Через 24 часа книга будет доступна всем']} />
      )}
    </div>
  );
};
