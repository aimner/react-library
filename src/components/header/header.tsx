import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';

import logo from '../../assets/img/header/logo.svg';
import no_avatar from '../../assets/img/profile/no_avatar.svg';
import { disableScroll, enableScroll } from '../../functions/functions';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { ShowSideBarType } from '../../pages/app';
import { logout } from '../../store/features/auth/auth-slice';
import { selectLoading } from '../../store/features/books/selectors';
import { selectProfile } from '../../store/features/profile/selectors';

import classes from './header.module.scss';

const cx = classNames.bind(classes);

type PropsType = {
  showSideBar: ShowSideBarType;
  setShowSideBar: React.Dispatch<React.SetStateAction<ShowSideBarType>>;
  openMenu: boolean;
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Header: React.FC<PropsType> = ({ setShowSideBar, showSideBar, openMenu, setOpenMenu }) => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const splitLocation = location.pathname.split('/');

  const loading = useAppSelector(selectLoading);

  const profile = useAppSelector(selectProfile);

  return (
    <header
      className={cx({
        header___shadow: openMenu,
      })}
    >
      <div className={classes.container}>
        <div
          onClick={() => {
            !showSideBar.show ? disableScroll() : enableScroll();
            loading !== 'succeeded'
              ? setShowSideBar({ show: !showSideBar.show, open: false })
              : setShowSideBar({ show: !showSideBar.show, open: splitLocation[1] === 'books' ? true : false });
          }}
          className={showSideBar.show ? classes.hamburger__active : classes.hamburger}
        >
          <span />
          <span />
          <span />
        </div>
        <Link to='/' className={classes.container_logo}>
          <img src={logo} alt='logo' />
          <h2 className={classes.container_logo__title}>Cleverland</h2>
        </Link>
        <h1 className={classes.container__title}>
          {splitLocation.at(-1) === 'profile' ? 'Личный кабинет' : 'Библиотека'}
        </h1>
        <div className={classes.container_avatar} onClick={() => setOpenMenu(true)}>
          <p className={classes.container_avatar__text}>
            Привет, {profile?.firstName} {profile?.lastName}!
          </p>
          <img src={profile?.avatar || no_avatar} alt='avatar' className={classes.container_avatar__img} />
        </div>

        <div
          id='header-menu'
          className={cx({
            container_menu: true,
            close: !openMenu,
          })}
        >
          <ul>
            <li>
              <Link to='/profile'>Профиль</Link>
            </li>
            <li>
              <Link to='/auth' onClick={() => dispatch(logout())}>
                Выход
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};
