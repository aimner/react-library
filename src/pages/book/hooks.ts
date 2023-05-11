import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import no_book_img from '../../assets/img/main/books/no_book.png';
import { useOpenToast } from '../../components/toast-custom/hooks';
import { fullUrl } from '../../functions/functions';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { selectUserId } from '../../store/features/auth/selectors';
import { selectBook } from '../../store/features/book-page/selectors';
import { fetchBook } from '../../store/features/book-page/thunks';
import { setOpenBookingMenu } from '../../store/features/booking/booking-slice';
import { setOpenCommentsBlock, setOpenCommentsBlockWithValue } from '../../store/features/comments/comments-slice';
import { selectOpenCommentsBlock } from '../../store/features/comments/selectors';
import { selectActiveCategory } from '../../store/features/filters/selectors';

export const useRateBook = () => {
  const dispatch = useAppDispatch();

  const changeComment = (id: number, commentId: number, rating: number, text: string) => {
    dispatch(
      setOpenCommentsBlockWithValue({
        id,
        comment: {
          commentId,
          rating,
          text,
        },
      })
    );
  };

  const createComment = (id: number) => {
    dispatch(setOpenCommentsBlock(id));
  };

  return {
    changeComment,
    createComment,
  };
};

export const useBookPage = () => {
  const location = useLocation();

  const splitLocation = location.pathname.split('/');

  const bookId = splitLocation.at(-1) || 0;

  const book = useAppSelector(selectBook);

  const activeCategory  = useAppSelector(selectActiveCategory);

  const userId = useAppSelector(selectUserId);

  const detailInformationArr = [
    { property: 'Издательство', value: book?.publish },
    { property: 'Год издания', value: book?.issueYear },
    { property: 'Страниц', value: book?.pages },
    { property: 'Переплёт', value: book?.cover },
    { property: 'Формат', value: book?.format },
    { property: 'Жанр', value: book?.categories },
    { property: 'Вес', value: book?.weight },
    { property: 'ISBN', value: book?.ISBN },
    {
      property: 'Изготовитель',
      value: book?.producer,
    },
  ];

  const openToast = useOpenToast();

  const [openComments, setOpenComments] = useState(true);

  const openCommentsBlock = useAppSelector(selectOpenCommentsBlock);

  const [activeImg, setActiveImg] = useState<string>();

  const dispatch = useAppDispatch();

  // TO PASS THE TEST

  //

  useEffect(() => {
    dispatch(fetchBook(+bookId))
      .unwrap()
      .catch((err) => {
        openToast(err, true);
      });
  }, [bookId]);

  useEffect(() => {
    setActiveImg(book?.images?.length ? fullUrl(book?.images[0]?.url) : no_book_img);
  }, [book]);

  const wasComment = () => {
    return book?.comments?.some((item) => item.user.commentUserId === userId);
  };

  const { changeComment, createComment } = useRateBook();

  const openBookingMenu = () => {
    if (book)
      dispatch(
        setOpenBookingMenu({
          openBookingMenu: true,
          booking: book.booking || null,
          bookId: book.id || null,
        })
      );
  };

  const rateTheBook = () => {
    if (wasComment()) {
      const comment = book?.comments?.find((item) => item.user.commentUserId === userId);

      if (comment) changeComment(+bookId!, comment?.id, comment?.rating, comment?.text);
    } else {
      createComment(+bookId!);
    }
  };

  return {
    bookId,
    book,
    wasComment,
    activeImg,
    setActiveImg,
    openCommentsBlock,
    openComments,
    setOpenComments,
    detailInformationArr,
    userId,
    activeCategory,
    splitLocation,
    dispatch,
    openBookingMenu,
    rateTheBook,
  };
};
