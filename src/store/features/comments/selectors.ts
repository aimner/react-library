import { RootState } from '../../store';

export const selectOpenCommentsBlock = (state: RootState) => state.comments.openCommentsBlock
export const selectComment = (state: RootState) => state.comments.comment
export const selectCommentsBookId = (state: RootState) => state.comments.bookId
export const selectCommentRating = (state: RootState) => state.comments.comment?.rating

