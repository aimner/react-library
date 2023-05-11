import { createAsyncThunk } from '@reduxjs/toolkit';

import * as apiFunctions from '../../../api';
import { Comments, CommentsSuccess } from '../../../types/comments-types';
import { RootState } from '../../store';

const unsuccessfulCommentsRequest = 'Оценка не была отправлена. Попробуйте позже!';
const unsuccessfulChangeCommentsRequest = 'Изменения не были сохранены. Попробуйте позже!';

export const sendComment = createAsyncThunk<
  CommentsSuccess,
  { data: Comments },
  { extra: typeof apiFunctions; state: RootState }
>('comments/sendComments', async (data, { extra: api, rejectWithValue }) => {
  try {
    return await api.setComment(data);
  } catch (error) {
    return rejectWithValue(unsuccessfulCommentsRequest);
  }
});

export const changeComment = createAsyncThunk<
  CommentsSuccess,
  { data: Comments; id: number },
  { extra: typeof apiFunctions; state: RootState }
>('comments/changeComment', async (data, { extra: api, rejectWithValue }) => {
  try {
    return await api.changeComment(data);
  } catch (error) {
    return rejectWithValue(unsuccessfulChangeCommentsRequest);
  }
});
