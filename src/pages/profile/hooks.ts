import { useEffect } from 'react';

import { useOpenToast } from '../../components/toast-custom/hooks';
import { useAppDispatch } from '../../hooks/hooks';
import { changeActiveCategory } from '../../store/features/filters/filter-slice';
import { fetchProfile } from '../../store/features/profile/thunks';

export function useProfile() {
  const dispatch = useAppDispatch();
  const fetchProfileData = useProfileFetch();

  useEffect(() => {
    dispatch(changeActiveCategory(null))
    fetchProfileData();
  }, []);
}

export function useProfileFetch() {
  const dispatch = useAppDispatch();

  const openToast = useOpenToast();

  return async () => {
    await dispatch(fetchProfile())
      .unwrap()
      .catch((err) => openToast(err, true));
  };
}
