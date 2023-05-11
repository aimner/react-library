import { RootState } from '../../store';

export const selectLoading = (state: RootState) => state.books.loading
export const selectBooks= (state: RootState) => state.books.books
export const selectCategories = (state: RootState) => state.books.categories
