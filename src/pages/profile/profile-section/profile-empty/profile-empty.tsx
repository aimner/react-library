import React from 'react';

import classes from './profile-empty.module.scss'

type PropsType = {
  text: string;
};

export const ProfileEmpty: React.FC<PropsType> = ({ text }) => {
  return (
    <div className={classes.emptyBlock} >
      {text}
    </div>
  );
};
