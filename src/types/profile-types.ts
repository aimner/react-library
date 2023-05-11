import { User } from './auth-types';

export type Profile = {
  comments: ICoomentInProfile[];
  role: Role;
  avatar: string | null;
  booking: BookingInProfile;
  delivery: DeliveryInProfile;
  history: HistoryInProfile;
} & Omit<User, 'provider'>;

export type Role = {
  id: number;
  name: string;
  description: string;
  type: string;
};

export type BookingInProfile = {
  id: number | null;
  order: boolean | null;
  dateOrder: string | null;
  book: BookInProfile | null;
}

export type DeliveryInProfile = {
  id: number;
  handed: boolean;
  dateHandedFrom: string;
  dateHandedTo: string;
  book: BookInProfile;
}

export type BookInProfile = {
  id: number;
  title: string;
  rating: number;
  issueYear: string | null;
  authors: string[];
  image: string | null;
}

export type HistoryInProfile = {
  id: number | null;
  books: BookInProfile[] | null;
}

export type  ICoomentInProfile = {
  id: number;
  rating: number;
  text: string;
  bookId: number;
}
