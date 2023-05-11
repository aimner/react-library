import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import classes from './profile-expired.module.scss';

type PropsType = {
  text: string[];
};

export const ProfileExpired: React.FC<PropsType> = ({ text }) => {
  return (
    <div className={classes.expired}>
      {text.map((item) => (
        <span key={uuidv4()}>{item}</span>
      ))}
    </div>
  );
};
