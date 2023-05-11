export const emailRegExp =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

export const passwordRegExp = /(?=.*[0-9])(?=.*[A-Z])[0-9a-zA-Z*]{8,}/;

export const loginRegExp = /^(?=.*[0-9])(?=.*[A-Za-z])[A-Za-z0-9]+$/;

export const nameRegExp = /[0-9A-Za-zА-Яа-я]/g;

export const phoneRegExp = /^(\+375) (\()(29|25|44|33)(\)) (\d{3})(-)(\d{2})(-)(\d{2})$/;

export const emptyField = 'Поле не может быть пустым'