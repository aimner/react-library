import React, { useEffect } from 'react';

import { Nav } from '../../components/nav';
import { useOpenToast } from '../../components/toast-custom/hooks';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { selectCategories } from '../../store/features/books/selectors';
import { fetchCategories } from '../../store/features/books/thunks';
import { ShowSideBarType } from '../app';

import { TermsSection } from './terms-section';

import classes from './terms.module.scss';

type PropsType = {
  showSideBar: ShowSideBarType;
  setShowSideBar: React.Dispatch<React.SetStateAction<ShowSideBarType>>;
};

export const Terms: React.FC<PropsType> = ({ showSideBar, setShowSideBar }) => {
  const dispatch = useAppDispatch();

  const categories = useAppSelector(selectCategories)

  const openToast = useOpenToast();

  useEffect(() => {
    if (!categories)
      dispatch(fetchCategories())
        .unwrap()
        .catch((err) => openToast(err, true));
  }, []);

  return (
    <main>
      <div className={classes.container}>
        <Nav showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
        <TermsSection />
      </div>
    </main>
  );
};
