import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { useAppSelector } from '../../../../hooks/hooks';
import { booksLengthSelector, booksSelector, selectSearchValue } from '../../../../store/features/filters/selectors';

import { Book } from './book';

import classes from './books.module.scss';

type PropsType = {
  active: boolean;
};

export const Books: React.FC<PropsType> = ({ active }) => {
  const booksArr = booksSelector(useAppSelector((state) => state));

  const booksArrLength = booksLengthSelector(useAppSelector((state) => state));

  return (
    <div className={classes.books}>
      {booksArr && booksArr.length ? (
        <ul className={active ? classes.books___icons : classes.books___lists}>
          {booksArr?.map((item) => (
            <Book {...item} id={item.id} active={active} key={uuidv4()} />
          ))}
        </ul>
      ) : (
        <>
          {booksArrLength! > 0 ? (
            <div className={classes.books___notFound}>По запросу ничего не найдено</div>
          ) : (
            <div className={classes.books___notFound}>В этой категории книг ещё нет</div>
          )}
        </>
      )}
    </div>
  );
};
