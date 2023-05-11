import React, { useState } from 'react';

import { Books } from './books';
import { Management } from './management';

import classes from './main-section.module.scss';



export const MainSection: React.FC = () => {
  const [activeButton, setActiveButton] = useState(true);

  return (
    <section className={classes.section_block}>
      <Management active={activeButton} changeActiveButton={setActiveButton} />
      <Books active={activeButton} />
    </section>
  );
};
