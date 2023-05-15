import React from 'react';
import Highlighter from 'react-highlight-words';

import { Authors } from '../../../../../components/authors';
import { StarsList } from '../../../../../components/stars-list';
import { buttonClass, buttonText } from '../../../../../functions/functions';
import { setOpenBookingMenu } from '../../../../../store/features/booking/booking-slice';
import { Books } from '../../../../../types/books-types';
import { ICoomentInProfile } from '../../../../../types/profile-types';

import { ButtonInProfile } from './button-in-profile';
import { useBook } from './hooks';

import classes from './book.module.scss';

export const Book: React.FC<
  Omit<Books, 'categories' | 'histories'> & {
    active: boolean;
    bookingBlock?: boolean;
    comments?: ICoomentInProfile[] | undefined;
  }
> = ({ title, rating, active, id, authors, booking, image, issueYear, delivery, bookingBlock, comments }) => {
  const { dispatch, finalUrl, navigate, searchValue, splitLocation, userId } = useBook(image);



  return (
    <li
      onClick={() => navigate(`/books/${splitLocation[2] || 'all'}/${id}`)}
      className={active ? `${classes.book} ${classes.book___icon}` : `${classes.book} ${classes.book___list}`}
    >
      <img src={finalUrl} alt='book' className={classes.book__img} />

      {rating > 0 ? (
        <StarsList classname={classes.book__rating} rating={rating} />
      ) : (
        <span className={classes.book__rating}>ещё нет оценок</span>
      )}

      <span className={classes.book__title}>
        <Highlighter
          highlightClassName={classes.book__title___match}
          searchWords={[searchValue]}
          textToHighlight={title}
        />
      </span>

      <Authors authors={authors} issueYear={issueYear} classname={classes.book__authorYear} />
      {splitLocation.at(-1) === 'profile' ? (
        // IN PROFILE PAGE
        <ButtonInProfile bookingBlock={bookingBlock} id={id} delivery={delivery} comments={comments} />
      ) : (
        // IN BOOKS PAGE
        <button
          type='button'
          onClick={(e) => {
            e.stopPropagation();
            dispatch(setOpenBookingMenu({ openBookingMenu: true, booking, bookId: id }));
          }}
          disabled={(!!booking && booking?.customerId !== userId) || !!delivery}
          className={buttonClass(booking?.order, classes, delivery?.dateHandedTo)}
        >
          {buttonText(booking?.order, delivery?.dateHandedTo)}
        </button>
      )}
    </li>
  );
};
