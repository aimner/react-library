import React from 'react';
import classNames from 'classnames/bind';
import { v4 as uuidv4 } from 'uuid';

import { ReactComponent as Star } from '../../assets/img/main/comments/star.svg';

import { useStars } from './hooks';

import classes from './stars-list.module.scss';

const cx = classNames.bind(classes);

type PropsType = {
  rating?: number;
  saveRate?: number;
  setSaveRate?: React.Dispatch<React.SetStateAction<number>>;
  classname: string;
};

export const StarsList: React.FC<PropsType> = ({ classname, rating, saveRate, setSaveRate }) => {
  const { mouseOnStar, setMouseOnStar, starsArr } = useStars();

  // RATING IN BOOK AND BOOK-PAGE COMPONENTS
  if (rating) {
    return (
      <ul className={classname} >
        {starsArr().map((item) => (
          <li  key={uuidv4()}>
            <Star
           
              className={cx({
                fillStar: item <= rating,
                emptyStar: item > rating,
              })}
            />
          </li>
        ))}
      </ul>
    );
  }

  // RATING IN RATE-BOOK COMPONENTS
  if (setSaveRate && saveRate !== undefined) {
    return (
      <ul className={classname}>
        {starsArr().map((item) => (
          <li
      
            key={uuidv4()}
            onMouseEnter={() => {
              if (!saveRate) setMouseOnStar(item);
            }}
            onMouseLeave={() => {
              if (!saveRate) setMouseOnStar(0);
            }}
            onClick={() => {
              setSaveRate(item);
              setMouseOnStar(item);
            }}
          >
            <Star
  
              className={cx({
                fillStar: item <= mouseOnStar,
                emptyStar: item > mouseOnStar,
              })}
            />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className={classname} >
      {starsArr().map(() => (
        <li key={uuidv4()}>
          <Star />
        </li>
      ))}
    </ul>
  );
};
