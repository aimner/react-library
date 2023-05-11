import React from 'react';

import { StarsList } from '../stars-list';

import { useRate } from './hooks';

import classes from './rate-book.module.scss';

export const RateBook: React.FC = () => {
  const { commentValue, onSendComment, saveRate, setCommentValue, setSaveRate, closeModal, comment, onChangeComment } =
    useRate();

  return (
    <div
      className={classes.outer}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
  
    >
      <div className={classes.outer_block} >
        <h2 >Оцените книгу</h2>
        <button
        
          className={classes.closeButton}
          type='button'
          onClick={() => closeModal()}
        >
          {null}
        </button>
        <p>Ваша оценка</p>
        <StarsList classname={classes.rateList} saveRate={saveRate} setSaveRate={setSaveRate} />
        <textarea
    
          className={classes.commentTextArea}
          placeholder='Оставить отзыв'
          name='comment'
          value={commentValue}
          onChange={(e) => setCommentValue(e.target.value)}
        />

        <button
          type='button'
        
          onClick={() => {
            comment ? onChangeComment() : onSendComment();
          }}
          className={classes.submit}
        >
          {comment ? 'изменить оценку' : 'оценить'}
        </button>
      </div>
    </div>
  );
};
