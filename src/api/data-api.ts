import { Book, Books, Category } from '../types/books-types';

import { api } from './api';
import { BOOKS_API, CATEGORIES_API } from './query-strings';

export const getBooks = async () => {
  const result = await api.get<Books[]>(BOOKS_API).then((value) => value.data);

  return result;
};

export const getBook = async (id: number) => {
  const result = await api.get<Book>(`${BOOKS_API}/${id}`).then((value) => value.data);

  return result;
};

export const getCategories = async () => {
  const result = await api.get<Category[]>(CATEGORIES_API).then((value) => value.data);

  return result;
};
