import { RegistrationRequest } from '../types/auth-types';
import { Profile } from '../types/profile-types';

import { api } from './api';
import { CHANGE_PROFILE, PROFILE_API, UPLOAD_AVATAR_API } from './query-strings';

export const getProfile = async () => {
  const result = await api.get<Profile>(PROFILE_API).then((value) => value.data);

  return result;
};

export const uploadAvatar = async (file: File) => {
  const result = await api
    .post(
      UPLOAD_AVATAR_API,
      { files: file },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    .then((value) => value.data);

  return result;
};

export const getAvatar = async ({ id, userId }: { id: number; userId: number }) => {
  const result = await api.put<Profile>(`${CHANGE_PROFILE}${userId}`, { avatar: id }).then((value) => value.data);

  return result;
};

export const changeProfile = async ({ data, userId }: { data: RegistrationRequest; userId: number }) => {
  const result = await api.put<Profile>(`${CHANGE_PROFILE}${userId}`, data).then((value) => value.data);

  return result;
};
