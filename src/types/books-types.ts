export type Booking = {
  id: number;
  order: boolean;
  dateOrder: string;
  customerId: number;
  customerFirstName: string;
  customerLastName: string;
};

export type Delivery = {
  id: number;
  handed: boolean;
  dateHandedFrom: string;
  dateHandedTo: string;
};

export type History = {
  id: number;
  userId: number;
};

export type Img = {
  url: string;
};

export type User = {
  commentUserId: number;
  firstName: string;
  lastName: string;
  avatarUrl: string;
};

export type Comment = {
  id: number;
  rating: number;
  text: string;
  createdAt: string;
  user: User;
};

export type Books = {
  authors: string[];
  booking: Booking | null;
  categories: string[];
  delivery: Delivery | null;
  histories: History | null;
  id: number;
  image: Img;
  issueYear: string;
  rating: number;
  title: string;
};

export type Book = {
  id: number;
  title: string;
  rating: number;
  issueYear: string;
  description: string;
  publish: string;
  pages: string;
  cover: string;
  weight: string;
  format: string;
  ISBN: string;
  producer: string;
  authors: string[];
  images: Img[] | null;
  categories: string[];
  comments: Comment[];
  booking: Booking;
  delivery: Delivery;
  histories: History;
};

export type Category = {
  name: string;
  path: string;
  id: number;
}
