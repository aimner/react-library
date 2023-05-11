import { Delivery } from '../../../../../../types/books-types';

export const buttonTextInBook = (delivery: Delivery | null) => {
  if (delivery?.dateHandedFrom) {
    const month = new Date(delivery.dateHandedTo).getMonth() + 1;
    const date = new Date(delivery.dateHandedTo).getDate();

    return `возврат ${date < 10 ? 0 : ''}${date}.${month < 10 ? 0 : ''}${month}`;
  }

  return '';
};
