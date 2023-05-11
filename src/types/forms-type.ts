import { Authorization, RecoveryPassword, Registration } from './auth-types';

export type FormValues = Authorization & Registration & Omit<RecoveryPassword, 'code'>;

export type InputNames = 'email'
| 'password'
| 'login'
| 'firstName'
| 'lastName'
| 'phone'
| 'username'
| 'identifier'
| 'passwordConfirmation';
