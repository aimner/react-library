import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { useProfileFetch } from '../../pages/profile/hooks';
import { selectUserId } from '../../store/features/auth/selectors';
import { fetchBookWithoutCategories } from '../../store/features/book-page/thunks';
import { setOpenCommentsBlock } from '../../store/features/comments/comments-slice';
import { selectComment, selectCommentsBookId } from '../../store/features/comments/selectors';
import { changeComment, sendComment } from '../../store/features/comments/thunks';
import { useOpenToast } from '../toast-custom/hooks';

export const useRate = () => {
  const location = useLocation();

  const splitLocation = location.pathname.split('/');

  const comment  = useAppSelector(selectComment);
  const bookId = useAppSelector(selectCommentsBookId);

  const [saveRate, setSaveRate] = useState<number>(comment?.rating || 1);

  const [commentValue, setCommentValue] = useState(comment?.text || '');

  const dispatch = useAppDispatch();

  const userId = useAppSelector(selectUserId);

  const openToast = useOpenToast();
  const fetchProfile = useProfileFetch();

  const updateData = async () => {
    if (splitLocation.at(-1) === 'profile') {
      return fetchProfile()
    }

    return dispatch(fetchBookWithoutCategories(bookId!))
      .unwrap()
      .catch((err) => openToast(err, true));
  };

  const closeModal = () => dispatch(setOpenCommentsBlock(bookId!));

  const onSendComment = () => {
    closeModal();
    dispatch(
      sendComment({
        data: {
          rating: saveRate,
          text: commentValue,
          user: String(userId),
          book: String(bookId),
        },
      })
    )
      .unwrap()
      .then(async () => {
        await updateData();
        openToast('Спасибо, что нашли время оценить книгу!', false);
      })
      .catch((err) => {
        openToast(err, true);
      });
  };

  const onChangeComment = () => {
    closeModal();
    dispatch(
      changeComment({
        data: {
          rating: saveRate,
          text: commentValue,
          user: String(userId),
          book: String(bookId),
        },
        id: comment!.commentId,
      })
    )
      .unwrap()
      .then(async () => {
        await updateData();
        openToast('Спасибо, что нашли время изменить оценку!', false);
      })
      .catch((err) => {
        openToast(err, true);
      });
  };

  return {
    saveRate,
    setSaveRate,
    commentValue,
    setCommentValue,
    onSendComment,
    closeModal,
    comment,
    onChangeComment,
  };
};
