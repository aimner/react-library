import React from 'react';
import { Outlet } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { enableScroll } from '../../functions/functions';
import { useAppSelector } from '../../hooks/hooks';
import { ShowSideBarType } from '../../pages/app';
import { selectOpenBookingMenu } from '../../store/features/booking/selectors';
import { selectLoading } from '../../store/features/books/selectors';
import { selectOpenCommentsBlock } from '../../store/features/comments/selectors';
import { selectToastElements } from '../../store/features/toast/selectors';
import { Calendary } from '../calendary';
import { Footer } from '../footer';
import { Header } from '../header';
import { Loader } from '../loader';
import { RateBook } from '../rate-book';
import { ToastCustom } from '../toast-custom';

import classes from './layout-main.module.scss';

type PropsType = {
  showSideBar: ShowSideBarType;
  setShowSideBar: React.Dispatch<React.SetStateAction<ShowSideBarType>>;
  openMenu: boolean;
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

export const LayoutMain: React.FC<PropsType> = ({ showSideBar, setShowSideBar, openMenu, setOpenMenu }) => {
  const loading = useAppSelector(selectLoading);

  const openBookingMenu = useAppSelector(selectOpenBookingMenu);

  const toastElements = useAppSelector(selectToastElements);

  const openCommentsBlock = useAppSelector(selectOpenCommentsBlock);

  const closeSideBar = (element: HTMLElement) => {
    if (openMenu && !element.closest('nav')) setOpenMenu(false);
    if (!element.closest('nav') && showSideBar.show && window.innerWidth <= 950) {
      enableScroll();
      loading !== 'succeeded'
        ? setShowSideBar({ show: false, open: false })
        : setShowSideBar({ show: false, open: true });
    }
  };

  return (
    <>
      {!!toastElements.length &&
        toastElements.map((item) => (
          <ToastCustom key={uuidv4()} text={item.text} error={item.error} id={item.id} top={item.top} />
        ))}

      <div className={classes.app} onClick={(e) => closeSideBar(e.target as HTMLElement)}>
        {loading === 'pending' || loading === 'idle' ? <Loader /> : null}
        {openCommentsBlock && <RateBook />}
        {openBookingMenu && <Calendary />}

        <Header
          showSideBar={showSideBar}
          setShowSideBar={setShowSideBar}
          openMenu={openMenu}
          setOpenMenu={setOpenMenu}
        />

        <div className={classes.wrapper}>
          <Outlet />
        </div>

        <Footer />
      </div>
    </>
  );
};
