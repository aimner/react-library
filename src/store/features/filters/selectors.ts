import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../../store';
import { selectBooks } from '../books/selectors';

export const selectSearchValue = (state: RootState) => state.filters.searchValue;
export const selectAscendingSort = (state: RootState) => state.filters.ascendingSort;
export const selectActiveCategory = (state: RootState) => state.filters.activeCategory;

export const booksSelector = createSelector(
  [selectBooks, selectSearchValue, selectAscendingSort, selectActiveCategory],
  (allBooks, searchValue, ascendingSort, activeCategory) => {
    if (allBooks) {
      let books = [...allBooks];

      ascendingSort ? books.sort((a, b) => a.rating - b.rating) : books.sort((a, b) => b.rating - a.rating);

      if (!activeCategory) {
        return books?.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()));
      }
      books = books.filter((item) => item.categories.some((category) => category === activeCategory));

      return books?.filter((item) => item.title.toLowerCase().includes(searchValue));
    }

    return null;
  }
);

export const booksLengthSelector = createSelector([selectBooks, selectActiveCategory], (allBooks, activeCategory) => {
  if (allBooks) {
    let books = [...allBooks];

    if (!activeCategory) return books.length;
    books = books.filter((item) => item.categories.some((category) => category === activeCategory));

    return books.length;
  }

  return null;
});
