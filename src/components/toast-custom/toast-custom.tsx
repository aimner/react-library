import React from 'react';
import classNames from 'classnames/bind';

import errorImg from '../../assets/img/toast/e.png';
import successImg from '../../assets/img/toast/s.png';

import { useToast } from './hooks';

import classes from './toast-custom.module.scss';

const cx = classNames.bind(classes);

type PropsType = {
  text: string;
  id: number;
  error: boolean;
  top: string;
};

export const ToastCustom: React.FC<PropsType> = ({ error, id, text, top }) => {
  const { closeModal } = useToast(id);

  return (
    <div
      className={cx({
        toastCustom: true,
        error,
        success: !error,
      })}
   
      data-id={id}
      style={{ top }}
    >
      <img src={error ? errorImg : successImg} alt='alert' />
      <p>{text}</p>

      <button onClick={closeModal} type='button'>
        {null}
      </button>
    </div>
  );
};
