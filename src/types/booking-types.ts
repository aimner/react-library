export type BookingBook = {
  order: boolean;
  dateOrder: string;
  book: string;
  customer: string;
};

export type BookingBookSuccess = {
  id: string;
  attributes: {
    order: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    dateOrder: string;
  };
}
