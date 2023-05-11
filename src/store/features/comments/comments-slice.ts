import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CommentInSlice = {
  commentId: number;
  text: string;
  rating: number;
}

type InitialState = {
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  openCommentsBlock: boolean;
  bookId: number | null;
  comment: CommentInSlice | null;
}

const initialState: InitialState = {
  loading: 'idle',
  openCommentsBlock: false,
  bookId: null,
  comment: null,
};

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setOpenCommentsBlock: (state, action: PayloadAction<number>) => {
      state.openCommentsBlock = !state.openCommentsBlock;
      state.bookId = action.payload;
      state.comment = null;
    },
    setOpenCommentsBlockWithValue: (state, action: PayloadAction<{ id: number; comment: CommentInSlice }>) => {
      state.openCommentsBlock = !state.openCommentsBlock;
      state.bookId = action.payload.id;
      state.comment = action.payload.comment;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      (action: PayloadAction) => action.type.endsWith('/pending'),
      (state) => {
        state.loading = 'pending';
      }
    );
    builder.addMatcher(
      (action: PayloadAction) => action.type.endsWith('/rejected'),
      (state) => {
        state.loading = 'failed';
      }
    );
    builder.addMatcher(
      (action: PayloadAction) => action.type.endsWith('/fulfilled'),
      (state) => {
        state.loading = 'succeeded';
      }
    );
  },
});

export const { setOpenCommentsBlock, setOpenCommentsBlockWithValue } = commentSlice.actions;

export default commentSlice.reducer;
