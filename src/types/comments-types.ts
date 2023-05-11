export type Comments = {
  rating: number;
  text: string;
  book: string;
  user: string;
}


export type CommentsSuccess = {
  id: string;
  attributes: {
    order: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    dateOrder: string;
  };
}
