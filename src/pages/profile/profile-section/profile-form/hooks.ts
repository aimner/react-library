import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useOpenToast } from '../../../../components/toast-custom/hooks';
import { useAppDispatch } from '../../../../hooks/hooks';
import { fetchChangeProfile } from '../../../../store/features/profile/thunks';
import { Registration, RegistrationRequest } from '../../../../types/auth-types';
import { FormValues } from '../../../../types/forms-type';
import { Profile } from '../../../../types/profile-types';
import { useProfileFetch } from '../../hooks';

export const useProfileForm = (profile: Profile | null) => {
  const { id } = profile || {};

  const dispatch = useAppDispatch();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    setValue,
  } = useForm<FormValues>({ mode: 'onBlur' });

  const [blockChangeProfile, setBlockChangeProfile] = useState(true);

  const openToast = useOpenToast();

  const fetchProfile = useProfileFetch();

  const onSubmit = async (data: Registration): Promise<void> => {
    const values: RegistrationRequest = {
      ...data,
      username: data.login,
    };

    try {
      await dispatch(fetchChangeProfile({ data: values, userId: id! })).unwrap();
      await fetchProfile();
      setBlockChangeProfile((v) => !v);
      openToast('Изменения успешно сохранены!', false);
    } catch (error) {
      setBlockChangeProfile((v) => !v);
      openToast('Изменения не были сохранены. Попробуйте позже!', true);
    }
  };

  return { onSubmit, blockChangeProfile, setValue, handleSubmit, errors, isValid, register, setBlockChangeProfile };
};
