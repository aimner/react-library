import axios from 'axios';

import {
  Authorization,
  RecoveryPassword,
  Registration,
  RegistrationRequest,
  SuccessfulRegistration,
} from '../types/auth-types';

import { AUTHORIZATION_API, FORGOT_PASSWORD_API, RECOVERY_PASSWORD_API,REGISTATION_API } from './query-strings';

export const registration = async (data: RegistrationRequest) => {
  const result = await axios
    .post<SuccessfulRegistration>(REGISTATION_API, data)
    .then((value) => value.data);

  return result;
};

export const authorization = async (data: Authorization) => {
  const result = await axios.post<SuccessfulRegistration>(AUTHORIZATION_API, data).then((value) => value.data);

  return result;
};

export const forgotPassword = async (data: Pick<Registration, 'email'>) => {
  const result = await axios.post<{ ok: boolean }>(FORGOT_PASSWORD_API, data).then((value) => value.data);

  return result;
};

export const recoveryPassword = async (data: RecoveryPassword) => {
  const result = await axios
    .post<SuccessfulRegistration>(RECOVERY_PASSWORD_API, data)
    .then((value) => value.data);

  return result;
};
