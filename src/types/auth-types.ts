export type SuccessfulRegistration = {
  jwt: string;
  user: User;
};

export type RegistrationRequest = {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
};

export type Registration = {
  email: string;
  login: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  username: string;
};

export type User = {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  phone: string;
};

export type Authorization = {
  identifier: string;
  password: string;
};

export type RecoveryPassword = {
  password: string;
  passwordConfirmation: string;
  code: string;
};
