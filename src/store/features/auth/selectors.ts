import { RootState } from '../../store';

export const selectUser = (state: RootState) => state.auth.user
export const selectUserId = (state: RootState) => state.auth.user?.id
export const selectIsAuth = (state: RootState) => state.auth.isAuth