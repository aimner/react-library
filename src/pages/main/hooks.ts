import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useOpenToast } from '../../components/toast-custom/hooks';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { selectCategories } from '../../store/features/books/selectors';
import { fetchBooks } from '../../store/features/books/thunks';
import { changeActiveCategory, setSearchValue } from '../../store/features/filters/filter-slice';
import { ShowSideBarType } from '../app';

export const useMain = (setShowSideBar: React.Dispatch<React.SetStateAction<ShowSideBarType>>) => {
  const location = useLocation();
  const splitLocation = location.pathname.split('/');
  const dispatch = useAppDispatch();
  const openToast = useOpenToast();
  const categories = useAppSelector(selectCategories);

  // GET BOOKS
  useEffect(() => {
    dispatch(fetchBooks())
      .unwrap()
      .catch((err) => {
        openToast(err, true);
        setShowSideBar({ open: true, show: false });
      });
      return () => {
        dispatch(setSearchValue(''))
      }
  }, []);

  // CHANGE CATEGORY
  useEffect(() => {
    const path = categories?.find((item) => item.path === splitLocation.at(-1));

    if (path) {
      dispatch(changeActiveCategory(path.name));
    }
  }, [categories]);
};
