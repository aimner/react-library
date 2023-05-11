import React from 'react';

import { Profile } from '../../../../types/profile-types';
import { Book } from '../../../main/main-section/books/book';
import { ProfileEmpty } from '../profile-empty';
import { ProfileExpired } from '../profile-expired';

import classes from './profile-delivery-book.module.scss';

type PropsType = {
  profile: Profile | null;
  bookingBlock: boolean;
};

export const ProfileDeliveryBook: React.FC<PropsType> = ({ profile, bookingBlock }) => {
  const { delivery } = profile || {};

  const expired = () => {
    if (delivery?.dateHandedFrom) {
      const date = new Date(delivery.dateHandedTo);
      const today = new Date();

      today.setHours(0, 0, 0, 0);

      return today.getTime() > date.getTime();
    }

    return false;
  };

  return (
    <div className={classes.profileDelivery}>
      <h3>Книга которую взяли</h3>
      <p>Здесь можете просмотреть информацию о книге и узнать сроки возврата</p>
      {delivery?.book ? (
        <Book
          active={false}
          authors={delivery.book.authors!}
          booking={null}
          title={delivery.book.title!}
          id={delivery.book.id}
          delivery={delivery!}
          image={{ url: delivery.book.image! }}
          rating={delivery.book.rating!}
          issueYear={delivery.book.issueYear!}
          bookingBlock={bookingBlock}
        />
      ) : (
        <ProfileEmpty text='Прочитав книгу, она отобразится в истории' />
      )}
      {expired() && <ProfileExpired text={['Вышел срок пользования книги', 'Верните книгу, пожалуйста']} />}
    </div>
  );
};
