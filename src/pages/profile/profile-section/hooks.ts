import { uploadAvatar } from '../../../api/profile-api';
import { useOpenToast } from '../../../components/toast-custom/hooks';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { setLoading } from '../../../store/features/books/books-slice';
import { selectProfile } from '../../../store/features/profile/selectors';
import { fetchAvatar } from '../../../store/features/profile/thunks';

export function useProfileData() {
  const dispatch = useAppDispatch();

  const openToast = useOpenToast();

  const profile  = useAppSelector(selectProfile);

  const uploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      dispatch(setLoading());
      try {
        const id = await uploadAvatar(e.target.files[0]).then((v) => v[0].id);

        await dispatch(fetchAvatar({ id, userId: profile!.id })).unwrap();
        openToast('Фото успешно сохранено!', false);
      } catch {
        openToast('Что-то пошло не так, фото не сохранилось. Попробуйте позже!', true);
      }
    }
  };

  return {
    dispatch,
    uploadFile,
    profile,
  };
}
