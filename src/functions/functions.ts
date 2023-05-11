import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

import { Books } from '../types/books-types';

export const buttonClass = (
  booked: boolean | undefined,
  classes: Record<string, string>,
  dateHandedTo: string | undefined
) => {
  if (!booked && !dateHandedTo) {
    return `${classes.book__button___active}`;
  }

  return `${classes.book__button___booked}`;
};

export const buttonText = (booked: boolean | undefined, dateHandedTo: string | undefined) => {
  if (dateHandedTo) {
    const month = new Date(dateHandedTo).getMonth() + 1;
    const date = new Date(dateHandedTo).getDate();

    return `занята до ${date < 10 ? 0 : ''}${new Date(dateHandedTo).getDate()}.${month < 10 ? 0 : ''}${month}`;
  }
  if (!booked) {
    return 'забронировать';
  }

  return 'забронирована';
};

export const enableScroll = () => {
  const targetElement = document.querySelector('#root');

  enableBodyScroll(targetElement!);
};
export const disableScroll = () => {
  const targetElement = document.querySelector('#root');

  disableBodyScroll(targetElement!);
};

export const getDate = (text: string) => {
  return new Date(text).toLocaleString('ru', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

export const fullUrl = (url: string | undefined | null) => {
  return `https://strapi.cleverland.by${url}`;
};

export const booksQuantity = (books: Books[] | null, text: string) => {
  if (books) {
    const booksWithСertainCategory = books.filter((book) => book.categories.some((category) => category === text));

    return booksWithСertainCategory.length;
  }

  return 0;
};

export const setDataAttr = (text: string) => {
  return text.length > 0 ? 'on' : 'off';
};
