import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  elements: Array<{ text: string; error: boolean; id: number; top: string }>;
}

const initialState: InitialState = {
  elements: [],
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    createToast: (state, action: PayloadAction<{ text: string; error: boolean }>) => {
      state.elements = [
        ...state.elements,
        {
          text: action.payload.text,
          error: action.payload.error,
          id: state.elements.length,
          top: state.elements.length === 0 ? '64px' : `${(state.elements.length + 1) * 90}px`,
        },
      ];
    },
    closeToast: (state, action: PayloadAction<number>) => {
      state.elements = state.elements.filter((item) => item.id !== action.payload);
      state.elements.forEach((item, id) => {
        item.top = id === 0 ? '64px' : `${id * 90}px`;
      });
    },
  },
});

export const { createToast, closeToast } = toastSlice.actions;

export default toastSlice.reducer;
