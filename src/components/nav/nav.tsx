import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';

import { booksQuantity, enableScroll } from '../../functions/functions';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { ShowSideBarType } from '../../pages/app';
import { logout } from '../../store/features/auth/auth-slice';
import { selectBooks, selectCategories, selectLoading } from '../../store/features/books/selectors';
import { changeActiveCategory } from '../../store/features/filters/filter-slice';

import { Arrow } from './arrow/arrow';

import classes from './nav.module.scss';

const cx = classNames.bind(classes);

type PropsType = {
  showSideBar: ShowSideBarType;
  setShowSideBar: React.Dispatch<React.SetStateAction<ShowSideBarType>>;
};

export const Nav: React.FC<PropsType> = ({ showSideBar, setShowSideBar }) => {
  const dispatch = useAppDispatch();

  const location = useLocation();

  const splitLocation = location.pathname.split('/');

  const closeSideBar = (open: boolean) => {
    setShowSideBar({ open, show: false });
    enableScroll();
  };

  const changeCategory = (category: string | null) => {
    dispatch(changeActiveCategory(category));
    closeSideBar(true);
  };

  const books = useAppSelector(selectBooks);
  const categories = useAppSelector(selectCategories)
  const loading = useAppSelector(selectLoading);

  useEffect(() => {
    if (loading !== 'succeeded') setShowSideBar({ open: true, show: false });
  }, [loading]);

  return (
    <nav
      className={cx({
        nav: true,
        nav__active: showSideBar.show,
      })}

    >
      <ul className={classes.nav__list}>
        <li className={classes.nav__item}>
          <div
            className={cx({
              nav__item1___active: splitLocation[1] === 'books',
              nav__item1: splitLocation[1] !== 'books',
            })}
            onClick={() => {
              if (loading !== 'failed') setShowSideBar({ open: !showSideBar.open, show: true });
            }}
  
          >
            <span
              className={cx({
                nav__link___active: splitLocation[1] === 'books',
                nav__link: splitLocation[1] !== 'books',
              })}

            >
              Витрина книг
            </span>
            {loading !== 'failed' && (
              <button type='button' className={classes.nav__arrowButton}>
                <Arrow location={splitLocation[1]} open={showSideBar.open} />
              </button>
            )}
          </div>

          <ul
            className={cx({
              books: true,
              books___open: showSideBar.open,
              books___сlose: !showSideBar.open,
            })}
          >
            <li
              className={cx({
                books__item___active: splitLocation[2] === 'all',
                books__item: splitLocation[2] !== 'all',
              })}
            >
              <Link to='/books/all' onClick={() => changeCategory(null)}>
                <span className={classes.book__name}>
                  Все книги
                </span>
                <span />
              </Link>
            </li>
            {categories?.map((item) => (
              <li
                key={item.name}
                className={cx({
                  books__item___active: splitLocation[2] === item.path,
                  books__item: splitLocation[2] !== item.path,
                })}
              >
                <Link to={`/books/${item.path}`} onClick={() => changeCategory(item.name)}>
                  <span >
                    <span className={classes.book__name} >
                      {item.name}
                    </span>
                  </span>
                  <span>
                    <span className={classes.books__quantity}>
                      {booksQuantity(books, item.name)}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </li>
        <li
          className={cx({
            nav__item___active: splitLocation[1] === 'terms',
            nav__item: splitLocation[1] !== 'terms',
          })}

          onClick={() => closeSideBar(false)}
        >
          <Link
            to='/terms'
            className={cx({
              nav__link___active: splitLocation[1] === 'terms',
              nav__link: splitLocation[1] !== 'terms',
            })}
    
          >
            Правила пользования
          </Link>
        </li>
        <li
          className={cx({
            nav__item___active: splitLocation[1] === 'offer',
            nav__item: splitLocation[1] !== 'offer',
          })}
      
          onClick={() => closeSideBar(false)}
        >
          <Link
            to='/offer'
            className={cx({
              nav__link___active: splitLocation[1] === 'offer',
              nav__link: splitLocation[1] !== 'offer',
            })}
          
          >
            Договор оферты
          </Link>
        </li>
        {window.innerWidth <= 950 && (
          <li className={classes.nav_logOutBlock}>
            <ul className={classes.nav_logOutBlock_list}>
              <li className={classes.nav__link}>
                <Link
                  className={cx({
                    nav__link___active: splitLocation.at(-1) === 'profile',
                  })}
           
                  to='/profile'
                  onClick={() => closeSideBar(false)}
                >
                  Профиль
                </Link>
              </li>
              <li className={classes.nav__link}>
                <Link
                  to='/auth'
                  onClick={() => {
                    closeSideBar(false);
                    dispatch(logout());
                  }}
               
                >
                  Выход
                </Link>
              </li>
            </ul>
          </li>
        )}
      </ul>
    </nav>
  );
};
