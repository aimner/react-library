import { Comments, CommentsSuccess } from '../types/comments-types';

import { api } from './api';
import { COMMENTS_API } from './query-strings';

export const setComment = async (data: { data: Comments }) => {
  const result = await api.post<CommentsSuccess>(COMMENTS_API, data).then((value) => value.data);

  return result;
};

export const changeComment = async ({ data, id }: { data: Comments; id: number }) => {
  const result = await api.put<CommentsSuccess>(`${COMMENTS_API}/${id}`, { data }).then((value) => value.data);

  return result;
};
