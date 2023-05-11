import React from 'react';

type PropsType = {
  authors: string[];
  issueYear: string;
  classname: string;
};

export const Authors: React.FC<PropsType> = ({ authors, issueYear, classname }) => {
  return (
    <span className={classname}>
      {authors.map((item) => `${item}, `)} {issueYear}
    </span>
  );
};
