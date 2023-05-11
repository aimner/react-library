import { useLocation, useNavigate } from 'react-router-dom';

import no_book from '../../../../../assets/img/main/books/no_book.png';
import { fullUrl } from '../../../../../functions/functions';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks';
import { selectUserId } from '../../../../../store/features/auth/selectors';
import { selectSearchValue } from '../../../../../store/features/filters/selectors';
import { Img } from '../../../../../types/books-types';

export function useBook(image: Img) {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const searchValue = useAppSelector(selectSearchValue);

  const userId = useAppSelector(selectUserId);

  const location = useLocation();

  const splitLocation = location.pathname.split('/');

  const finalUrl = image?.url ? fullUrl(image?.url) : no_book;

  return {
    dispatch,
    navigate,
    searchValue,
    userId,
    splitLocation,
    location,
    finalUrl,
  };
}
