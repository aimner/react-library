import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  searchValue: string;
  ascendingSort: boolean;
  activeCategory: string | null | undefined;
}

const initialState: InitialState = {
  searchValue: '',
  ascendingSort: false,
  activeCategory: null,
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    changeAscendingSort: (state) => {
      state.ascendingSort = !state.ascendingSort;
    },
    changeActiveCategory: (state, action: PayloadAction<string | null | undefined>) => {
      state.activeCategory = action.payload;
    },
  },
});

export const { setSearchValue, changeAscendingSort, changeActiveCategory } = filterSlice.actions;

export default filterSlice.reducer;
