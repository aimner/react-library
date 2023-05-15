import React from 'react';

import no_avatar from '../../../assets/img/profile/no_avatar.svg';
import { StarsList } from '../../../components/stars-list';
import { getDate } from '../../../functions/functions';
import { Comment } from '../../../types/books-types';

import classes from './comment.module.scss';

export const Сommentary: React.FC<Comment> = ({ user: { avatarUrl, firstName, lastName }, createdAt, rating, text }) => {



  return (
    <li className={classes.book_comments_list_item} >
      <div className={classes.book_comments_list_item__info}>
        <img src={avatarUrl || no_avatar} alt='avatar' />
        <span>
          {firstName} {lastName}
        </span>
        <span>{getDate(createdAt)}</span>
      </div>
      <div>
        {rating >= 0 ? (
          <StarsList classname={classes.book_comments_list_item__raiting} rating={rating} />
        ) : (
          'ещё нет оценок'
        )}
      </div>
      <div className={classes.book_comments_list_item__text}>
        {text}
      </div>
    </li>
  );
};
